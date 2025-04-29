
import { useState, useEffect, useRef } from 'react';

interface UseWebcamReturn {
  webcamRef: React.RefObject<HTMLVideoElement>;
  isConnected: boolean;
  stream: MediaStream | null;
  startWebcam: () => Promise<void>;
  stopWebcam: () => void;
}

export function useWebcam(): UseWebcamReturn {
  const webcamRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  // Function to start the webcam
  const startWebcam = async () => {
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
      
      // Set up WebSocket connection
      if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
        connectWebSocket(mediaStream);
      }
    } catch (error) {
      console.error('Error accessing webcam:', error);
      setIsConnected(false);
    }
  };

  // Function to stop the webcam
  const stopWebcam = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsConnected(false);
      
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    }
  };

  // Function to connect WebSocket and send frames
  const connectWebSocket = (mediaStream: MediaStream) => {
    // For demo purposes - in production replace with actual server
    try {
      // Note: This is a placeholder URL, it won't actually connect
      socketRef.current = new WebSocket('ws://localhost:4000/video');
      
      socketRef.current.onopen = () => {
        console.log('WebSocket connection established');
        
        // Once connected, start sending video frames
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const video = webcamRef.current;
        
        if (!video || !ctx) return;
        
        canvas.width = 320;  // Reduced size for efficiency
        canvas.height = 240;
        
        const frameInterval = setInterval(() => {
          if (video.readyState === video.HAVE_ENOUGH_DATA && socketRef.current?.readyState === WebSocket.OPEN) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            // Convert the frame to a JPEG and send via WebSocket
            canvas.toBlob((blob) => {
              if (blob && socketRef.current?.readyState === WebSocket.OPEN) {
                // In a real implementation, you would send the blob here
                console.log('Frame captured and ready to send, size:', blob.size);
                
                // For demo, we won't actually send to avoid console spam
                // socketRef.current.send(blob);
              }
            }, 'image/jpeg', 0.7);
          }
        }, 100); // Send 10 fps
        
        socketRef.current.onclose = () => {
          clearInterval(frameInterval);
          console.log('WebSocket connection closed');
        };
      };
      
      socketRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } catch (error) {
      console.error('WebSocket connection error:', error);
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
  };
}
