
import React, { createContext, useContext, useState, useEffect } from "react";
import { OfferLetter, OfferStatus } from "@/types/offer";
import { useToast } from "@/components/ui/use-toast";

// Mock data for offer letters
const mockOfferLetters: OfferLetter[] = [
  {
    id: "off-1",
    jobTitle: "Frontend Developer",
    employerName: "Tech Innovators Inc.",
    offeredOn: "2025-05-01T10:00:00.000Z",
    status: "unsigned",
    salary: {
      amount: 95000,
      currency: "USD",
      period: "yearly"
    },
    startDate: "2025-06-15T09:00:00.000Z",
    location: "San Francisco, CA (Remote)",
    benefits: [
      "Health, dental, and vision insurance",
      "401(k) matching",
      "Unlimited PTO",
      "Remote work option",
      "Professional development budget"
    ],
    description: "We're excited to offer you the position of Frontend Developer at Tech Innovators Inc. Your expertise in React and modern web technologies impressed our team during the interview process.",
    contractDetails: "This is a full-time position with a 3-month probation period. The contract will be automatically renewed annually unless otherwise specified."
  },
  {
    id: "off-2",
    jobTitle: "UX Designer",
    employerName: "Creative Solutions Ltd.",
    offeredOn: "2025-04-28T14:30:00.000Z",
    status: "signed",
    salary: {
      amount: 88000,
      currency: "USD",
      period: "yearly"
    },
    startDate: "2025-06-01T09:00:00.000Z",
    location: "Austin, TX",
    benefits: [
      "Comprehensive health coverage",
      "Gym membership",
      "Flexible working hours",
      "Quarterly team outings",
      "Stock options"
    ],
    description: "Based on your excellent portfolio and our interviews, we would like to offer you the position of UX Designer at Creative Solutions Ltd.",
    contractDetails: "This is a permanent position with a 2-month probation period. Performance reviews will be conducted every 6 months."
  },
  {
    id: "off-3",
    jobTitle: "Full Stack Developer",
    employerName: "Data Systems Corp",
    offeredOn: "2025-05-05T11:15:00.000Z",
    status: "unsigned",
    salary: {
      amount: 110000,
      currency: "USD",
      period: "yearly"
    },
    startDate: "2025-07-01T09:00:00.000Z",
    location: "Boston, MA (Hybrid)",
    benefits: [
      "Comprehensive benefits package",
      "Profit sharing",
      "Education reimbursement",
      "Flexible schedule",
      "Parental leave"
    ],
    description: "Congratulations! We are pleased to offer you the position of Full Stack Developer at Data Systems Corp. Your technical expertise and problem-solving abilities make you an excellent fit for our team.",
    contractDetails: "This is a full-time position with a standard 90-day probationary period. Performance and compensation reviews will be conducted annually."
  },
  {
    id: "off-4",
    jobTitle: "DevOps Engineer",
    employerName: "Cloud Platforms Inc.",
    offeredOn: "2025-04-20T09:45:00.000Z",
    status: "rejected",
    salary: {
      amount: 115000,
      currency: "USD",
      period: "yearly"
    },
    startDate: "2025-06-01T09:00:00.000Z",
    location: "Seattle, WA",
    benefits: [
      "Health and dental insurance",
      "401(k) with 6% match",
      "Unlimited vacation policy",
      "Home office stipend",
      "Continuous education budget"
    ],
    description: "Following our recent interviews, we're pleased to offer you the position of DevOps Engineer at Cloud Platforms Inc. Your knowledge of cloud infrastructure and automation tools impressed us greatly.",
    contractDetails: "This is a full-time position with a 90-day probationary period. This offer is contingent upon successful completion of a background check."
  },
  {
    id: "off-5",
    jobTitle: "Mobile App Developer",
    employerName: "AppGenius Technologies",
    offeredOn: "2025-05-10T13:20:00.000Z",
    status: "signed",
    salary: {
      amount: 92000,
      currency: "USD",
      period: "yearly"
    },
    startDate: "2025-06-15T09:00:00.000Z",
    location: "Chicago, IL (Remote)",
    benefits: [
      "Medical, dental, and vision coverage",
      "Retirement plan with matching",
      "Flexible work schedule",
      "Annual tech stipend",
      "Professional development opportunities"
    ],
    description: "We are delighted to offer you the position of Mobile App Developer at AppGenius Technologies. Your portfolio and interview performance showed us that you would be a valuable addition to our team.",
    contractDetails: "This full-time position includes a 60-day onboarding period. You will report directly to the Engineering Manager."
  }
];

interface OfferLetterContextType {
  offerLetters: OfferLetter[];
  isLoading: boolean;
  signOffer: (id: string) => void;
  rejectOffer: (id: string) => void;
}

const OfferLetterContext = createContext<OfferLetterContextType | undefined>(undefined);

export const OfferLetterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [offerLetters, setOfferLetters] = useState<OfferLetter[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, you would fetch data from an API here
    // For now, we're using mock data
    setOfferLetters(mockOfferLetters);
    setIsLoading(false);
  }, []);

  const signOffer = (id: string) => {
    setOfferLetters(prevOffers => 
      prevOffers.map(offer => 
        offer.id === id ? { ...offer, status: "signed" } : offer
      )
    );
    toast({
      title: "Offer Signed",
      description: "You have successfully signed the offer letter.",
      variant: "default",
    });
  };

  const rejectOffer = (id: string) => {
    setOfferLetters(prevOffers => 
      prevOffers.map(offer => 
        offer.id === id ? { ...offer, status: "rejected" } : offer
      )
    );
    toast({
      title: "Offer Rejected",
      description: "You have rejected the offer letter.",
      variant: "destructive",
    });
  };

  return (
    <OfferLetterContext.Provider value={{ offerLetters, isLoading, signOffer, rejectOffer }}>
      {children}
    </OfferLetterContext.Provider>
  );
};

export const useOfferLetters = () => {
  const context = useContext(OfferLetterContext);
  if (context === undefined) {
    throw new Error("useOfferLetters must be used within an OfferLetterProvider");
  }
  return context;
};
