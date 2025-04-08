import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

type Message = {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: string;
};

interface ChatbotContextType {
  messages: Message[];
  isOpen: boolean;
  isLoading: boolean;
  sendMessage: (content: string) => Promise<void>;
  toggleChatbot: () => void;
  clearMessages: () => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const ChatbotProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuth();

  // Set initial welcome message based on user role
  useEffect(() => {
    let welcomeMessage = "Hello! I'm your InternConnect AI assistant. How can I help you today?";
    
    if (user) {
      if (user.role === "student") {
        welcomeMessage = `Hello ${user.name}! I can help you find internships, prepare for interviews, or recommend courses based on your interests.`;
      } else if (user.role === "employer") {
        welcomeMessage = `Hello ${user.name}! I can help you post internships, review applications, or generate job descriptions.`;
      }
    }
    
    setMessages([
      {
        id: "welcome",
        content: welcomeMessage,
        sender: "bot",
        timestamp: new Date().toISOString(),
      },
    ]);
  }, [user]);

  const generateBotResponse = async (userMessage: string): Promise<string> => {
    // In a real app, this would call an AI service
    // For now, we'll use predefined responses based on user role and message content
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
    
    const lowerCaseMessage = userMessage.toLowerCase();
    
    // Responses for users that are not logged in
    if (!user) {
      if (lowerCaseMessage.includes("apply") || lowerCaseMessage.includes("how to apply")) {
        return "To apply for an internship, first create a student account, then browse available internships and click the 'Apply' button on any that interest you.";
      } else if (lowerCaseMessage.includes("post") || lowerCaseMessage.includes("how to post")) {
        return "To post an internship, create an employer account, go to your dashboard, and click 'Post New Internship'. Fill out the required details about the role, responsibilities, and requirements.";
      } else if (lowerCaseMessage.includes("marketing internship")) {
        return "A marketing internship typically involves assisting with social media campaigns, content creation, market research, and brand strategy. It's a great way to gain hands-on experience in digital marketing, analytics, and customer engagement.";
      } else if (lowerCaseMessage.includes("register") || lowerCaseMessage.includes("sign up") || lowerCaseMessage.includes("create account")) {
        return "To register, click on the 'Sign Up' button in the navigation bar, choose whether you're a student or employer, and fill out the registration form with your details.";
      }
    } 
    // Responses for students
    else if (user.role === "student") {
      if (lowerCaseMessage.includes("recommend") || lowerCaseMessage.includes("suggestion")) {
        return "Based on your profile, I recommend exploring Web Development and UI/UX Design internships. Check out the 'Frontend Developer Intern' positions currently available.";
      } else if (lowerCaseMessage.includes("interview") || lowerCaseMessage.includes("prepare")) {
        return "To prepare for interviews, try our Mock Interview feature. Select your desired role, and I'll generate relevant questions to help you practice your responses.";
      } else if (lowerCaseMessage.includes("skill") || lowerCaseMessage.includes("learn")) {
        return "To enhance your skills, I recommend the 'React for Beginners' and 'UI Design Fundamentals' courses. These align well with your interests and will make you more competitive for tech internships.";
      } else if (lowerCaseMessage.includes("dashboard") || lowerCaseMessage.includes("features")) {
        return "Your dashboard shows recommended internships, your recent applications, course progress, and mock interview results. You can also access the AI chatbot (that's me!) from any page to get help.";
      }
    } 
    // Responses for employers
    else if (user.role === "employer") {
      if (lowerCaseMessage.includes("post") || lowerCaseMessage.includes("create internship")) {
        return "To post a new internship, click the 'Post New Internship' button on your dashboard. Fill out details about the role, requirements, and compensation. You can also use our AI to help generate a compelling job description.";
      } else if (lowerCaseMessage.includes("candidate") || lowerCaseMessage.includes("applicant") || lowerCaseMessage.includes("filter")) {
        return "To filter candidates, go to your internship listing and use the filter options to sort by skills, experience, or education. You can also use our AI to recommend the best-fit candidates from your applicant pool.";
      } else if (lowerCaseMessage.includes("description") || lowerCaseMessage.includes("job description")) {
        return "I can help generate a job description. Just tell me the role, key responsibilities, and requirements, and I'll craft a compelling description to attract qualified candidates.";
      } else if (lowerCaseMessage.includes("dashboard") || lowerCaseMessage.includes("features")) {
        return "Your dashboard shows your posted internships, applicant statistics, and quick actions. You can review applications, update statuses, and access our AI tools to help with your hiring process.";
      }
    }
    
    return "I'm here to help with any questions about internships, courses, or using the platform. Could you please provide more details about what you're looking for?";
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      sender: "user",
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Generate bot response
      const botResponse = await generateBotResponse(content);
      
      // Add bot response
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: botResponse,
        sender: "bot",
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error generating bot response:", error);
      
      // Add error message
      const errorMessage: Message = {
        id: `bot-error-${Date.now()}`,
        content: "Sorry, I'm having trouble responding right now. Please try again later.",
        sender: "bot",
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChatbot = () => {
    setIsOpen(prev => !prev);
  };

  const clearMessages = () => {
    // Keep only the welcome message
    setMessages(prev => prev.slice(0, 1));
  };

  return (
    <ChatbotContext.Provider
      value={{
        messages,
        isOpen,
        isLoading,
        sendMessage,
        toggleChatbot,
        clearMessages,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error("useChatbot must be used within a ChatbotProvider");
  }
  return context;
};
