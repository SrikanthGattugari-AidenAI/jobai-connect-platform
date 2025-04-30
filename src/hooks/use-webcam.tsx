import { useState, useEffect, useRef } from 'react';

interface UseWebcamReturn {
  webcamRef: React.RefObject<HTMLVideoElement>;
  isConnected: boolean;
  stream: MediaStream | null;
  startWebcam: (userId?: string) => Promise<void>;
  stopWebcam: () => void;
  lastError: string | null;
  isTerminated: boolean;
  terminationReason: string | null;
}

export function useWebcam(): UseWebcamReturn {
  const webcamRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);
  const frameIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [lastError, setLastError] = useState<string | null>(null);
  const [isTerminated, setIsTerminated] = useState(false);
  const [terminationReason, setTerminationReason] = useState<string | null>(null);

  // Function to start the webcam
  const startWebcam = async (userId?: string) => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      
      if (webcamRef.current) {
        webcamRef.current.srcObject = mediaStream;
      }
      
      setStream(mediaStream);
      setIsConnected(true);
      setLastError(null);
      
      // Only connect WebSocket after camera is successfully started
      if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
        connectWebSocket(mediaStream, userId);
      }
    } catch (error) {
      console.error('Error accessing webcam:', error);
      setIsConnected(false);
      setLastError('Unable to access webcam. Please check your camera permissions.');
    }
  };

  // Function to stop the webcam
  const stopWebcam = () => {
    // Clear the frame capture interval
    if (frameIntervalRef.current) {
      clearInterval(frameIntervalRef.current);
      frameIntervalRef.current = null;
    }

    // Close the WebSocket connection if open
    if (socketRef.current) {
      if (socketRef.current.readyState === WebSocket.OPEN || 
          socketRef.current.readyState === WebSocket.CONNECTING) {
        socketRef.current.close();
      }
      socketRef.current = null;
    }

    // Stop all video tracks
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsConnected(false);
    }
  };

  // Function to connect WebSocket and send frames
  const connectWebSocket = (mediaStream: MediaStream, userId?: string) => {
    try {
      // Use the correct WebSocket endpoint with user ID if provided
      const wsEndpoint = userId 
        ? `ws://localhost:8525/video/${userId}` 
        : 'ws://localhost:8525/video';
      
      socketRef.current = new WebSocket(wsEndpoint);
      
      socketRef.current.onopen = () => {
        console.log('WebSocket connection established');
        
        // Once connected, start sending video frames
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const video = webcamRef.current;
        
        if (!video || !ctx) return;
        
        canvas.width = 320;  // Reduced size for efficiency
        canvas.height = 240;
        
        // Clear any existing interval
        if (frameIntervalRef.current) {
          clearInterval(frameIntervalRef.current);
        }
        
        // Set up new interval to capture and send frames
        const frameInterval = setInterval(() => {
          if (video.readyState === video.HAVE_ENOUGH_DATA && 
              socketRef.current?.readyState === WebSocket.OPEN) {
            
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            // Convert the frame to a JPEG and send via WebSocket
            canvas.toBlob((blob) => {
              if (blob && socketRef.current?.readyState === WebSocket.OPEN) {
                socketRef.current.send(blob);
              }
            }, 'image/jpeg', 0.7);
          }
        }, 100); // Send 10 fps
        
        frameIntervalRef.current = frameInterval;
      };
      
      socketRef.current.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          
          // Handle termination message from backend
          if (message.action === "TERMINATE_INTERVIEW") {
            setIsTerminated(true);
            setTerminationReason(message.reason || "Interview terminated by system");
            stopWebcam();
          }
        } catch (error) {
          console.error('Error processing WebSocket message:', error);
        }
      };
      
      socketRef.current.onclose = () => {
        console.log('WebSocket connection closed');
        if (frameIntervalRef.current) {
          clearInterval(frameIntervalRef.current);
          frameIntervalRef.current = null;
        }
      };
      
      socketRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        setLastError('Connection to interview server failed');
      };
    } catch (error) {
      console.error('WebSocket connection error:', error);
      setLastError('Failed to establish connection to interview server');
    }
  };

  // Clean up resources when component unmounts
  useEffect(() => {
    return () => {
      stopWebcam();
    };
  }, []);

  return {
    webcamRef,
    isConnected,
    stream,
    startWebcam,
    stopWebcam,
    lastError,
    isTerminated,
    terminationReason,
  };
}
