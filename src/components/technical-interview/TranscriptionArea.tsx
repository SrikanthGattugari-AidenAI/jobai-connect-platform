
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { Mic, MicOff, Save } from "lucide-react";
import { cn } from "@/lib/utils";

interface TranscriptionAreaProps {
  transcription: string;
  setTranscription: React.Dispatch<React.SetStateAction<string>>;
  isListening: boolean;
  toggleListening: () => void;
  handleSave: () => void;
}

export function TranscriptionArea({ 
  transcription, 
  setTranscription, 
  isListening, 
  toggleListening, 
  handleSave 
}: TranscriptionAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <ScrollAnimation animation="fadeIn" delay={0.2}>
      <Card className="mt-6 bg-white shadow-md border">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-gray-700">Your Response</h3>
            <Button
              onClick={toggleListening}
              variant={isListening ? "destructive" : "secondary"}
              size="sm"
              className={cn(
                "flex items-center gap-1",
                isListening && "animate-pulse"
              )}
            >
              {isListening ? (
                <>
                  <MicOff className="h-4 w-4" />
                  Stop Recording
                </>
              ) : (
                <>
                  <Mic className="h-4 w-4" />
                  Start Recording
                </>
              )}
            </Button>
          </div>
          
          <Textarea
            ref={textareaRef}
            value={transcription}
            onChange={(e) => setTranscription(e.target.value)}
            placeholder="Your response will appear here as you speak..."
            className="min-h-[150px] resize-y w-full bg-gray-50 focus:bg-white transition-colors"
          />
        </CardContent>
        <CardFooter className="flex justify-end p-4 pt-0">
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Response
          </Button>
        </CardFooter>
      </Card>
    </ScrollAnimation>
  );
}
