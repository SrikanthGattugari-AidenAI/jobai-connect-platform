
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSpeechRecognition } from "@/hooks/use-speech-recognition";
import { Mic, MicOff, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const VoiceSearchSection = () => {
  const { transcript, isListening, startListening, stopListening, toggleListening, supported } = useSpeechRecognition();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  // Update search query when transcript changes
  useEffect(() => {
    if (transcript) {
      setSearchQuery(transcript);
    }
  }, [transcript]);
  
  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/internships?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">Discover Internships with Voice Search</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Finding your dream internship is as easy as saying it out loud. Try our voice-powered search feature!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px]">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
              alt="Student using voice search"
              className="rounded-lg shadow-xl h-full w-full object-cover"
            />
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg hidden md:flex items-center gap-2">
              <Search className="h-5 w-5 text-brand-purple" />
              <span className="text-sm">"Find tech internships in San Francisco"</span>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg hidden md:flex items-center gap-2">
              <Mic className="h-5 w-5 text-brand-purple" />
              <span className="text-sm">Just speak and search instantly</span>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100">
              <h3 className="text-xl font-bold mb-6">Try Voice Search Now</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${isListening ? 'bg-red-500 animate-pulse' : 'bg-primary'}`}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-full w-full rounded-full text-white"
                      onClick={toggleListening}
                      disabled={!supported}
                    >
                      {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                    </Button>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-2">
                      {isListening ? 'Listening...' : 'Click the mic to start'}
                    </p>
                    <div className="border rounded-md p-3 min-h-[50px] bg-muted/30">
                      {searchQuery || 'Your speech will appear here...'}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    onClick={handleSearch} 
                    className="gap-2"
                    disabled={!searchQuery.trim()}
                  >
                    <Search className="h-4 w-4" />
                    Search Internships
                  </Button>
                </div>
                
                {!supported && (
                  <p className="text-sm text-yellow-600 bg-yellow-100 p-3 rounded">
                    Voice recognition is not supported in your browser. Try Chrome or Edge for the best experience.
                  </p>
                )}
                
                <div className="border-t pt-4 mt-2">
                  <h4 className="font-medium mb-2">Try saying:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="bg-primary/10 p-1 rounded text-primary">•</span>
                      "Find software internships in New York"
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="bg-primary/10 p-1 rounded text-primary">•</span>
                      "Show me remote design internships"
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="bg-primary/10 p-1 rounded text-primary">•</span>
                      "Marketing internships with stipend"
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
