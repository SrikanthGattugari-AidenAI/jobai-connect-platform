
import { useState, useRef, useEffect } from "react";
import { useChatbot } from "@/context/ChatbotContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, X, Send, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export const Chatbot = () => {
  const { messages, isOpen, isLoading, sendMessage, toggleChatbot } = useChatbot();
  const [input, setInput] = useState("");
  const { user } = useAuth();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  // Focus input when chatbot opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    await sendMessage(input);
    setInput("");
  };

  return (
    <>
      {/* Chatbot toggle button */}
      <motion.button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary text-white shadow-lg flex items-center justify-center z-50"
        onClick={toggleChatbot}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Bot size={24} />
      </motion.button>

      {/* Chatbot dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-[350px] md:w-[400px] h-[500px] bg-white rounded-xl shadow-xl flex flex-col z-50 border overflow-hidden"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="p-4 border-b flex items-center justify-between bg-primary/5">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center mr-3">
                  <Bot size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">InternConnect Assistant</h3>
                  <p className="text-xs text-muted-foreground">
                    {user ? `Hi, ${user.name}!` : "How can I help you today?"}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleChatbot}>
                <X size={18} />
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
              <div className="flex flex-col space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex flex-col max-w-[80%] rounded-lg p-3",
                      message.sender === "user"
                        ? "ml-auto bg-primary text-primary-foreground"
                        : "mr-auto bg-muted"
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <span className="text-xs mt-1 opacity-70 self-end">
                      {format(new Date(message.timestamp), "h:mm a")}
                    </span>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-center space-x-2 mr-auto bg-muted rounded-lg p-3 max-w-[80%]">
                    <Loader2 size={16} className="animate-spin" />
                    <p className="text-sm">Thinking...</p>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  disabled={!input.trim() || isLoading}
                >
                  {isLoading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Send size={18} />
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
