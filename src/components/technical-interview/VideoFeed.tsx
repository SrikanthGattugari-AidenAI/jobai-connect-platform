
import React, { useRef, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

interface VideoFeedProps {
  webcamRef: React.RefObject<HTMLVideoElement>;
  isConnected: boolean;
}

export function VideoFeed({ webcamRef, isConnected }: VideoFeedProps) {
  return (
    <ScrollAnimation animation="popUp">
      <div className="fixed bottom-4 right-4 z-50">
        <Card className="overflow-hidden shadow-lg w-[200px] h-[150px] md:w-[240px] md:h-[180px] rounded-lg border-2 border-primary/20">
          <div className="relative w-full h-full">
            <video 
              ref={webcamRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            {!isConnected && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-sm">
                Camera disconnected
              </div>
            )}
            <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded">
              You
            </div>
          </div>
        </Card>
      </div>
    </ScrollAnimation>
  );
}
