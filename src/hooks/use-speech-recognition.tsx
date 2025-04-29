
import { useState, useCallback, useEffect } from "react";

// Define the interface for the Web Speech API
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionError) => void;
  onend: () => void;
}

interface SpeechRecognitionError extends Event {
  error: string;
  message: string;
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  item: (index: number) => SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item: (index: number) => SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface UseSpeechRecognitionReturn {
  isListening: boolean;
  transcript: string;
  setTranscript: React.Dispatch<React.SetStateAction<string>>;
  startListening: () => void;
  stopListening: () => void;
  toggleListening: () => void;
  supported: boolean;
}

// Get the Speech Recognition API with proper TypeScript handling
const SpeechRecognitionAPI = typeof window !== 'undefined' ? (
  (window as any).SpeechRecognition || 
  (window as any).webkitSpeechRecognition || 
  null
) : null;

export function useSpeechRecognition(): UseSpeechRecognitionReturn {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const supported = SpeechRecognitionAPI !== null;

  // Initialize recognition
  useEffect(() => {
    if (SpeechRecognitionAPI) {
      const recognitionInstance = new SpeechRecognitionAPI();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = "en-US";
      setRecognition(recognitionInstance);
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  // Set up listeners
  useEffect(() => {
    if (!recognition) return;

    const handleResult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        }
      }
      
      if (finalTranscript) {
        setTranscript(prev => prev + ' ' + finalTranscript.trim());
      }
    };

    const handleEnd = () => {
      setIsListening(false);
    };

    recognition.onresult = handleResult;
    recognition.onend = handleEnd;

    return () => {
      recognition.onresult = null as any;
      recognition.onend = null as any;
    };
  }, [recognition]);

  const startListening = useCallback(() => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  }, [recognition]);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  return {
    transcript,
    setTranscript,
    isListening,
    startListening,
    stopListening,
    toggleListening,
    supported
  };
}
