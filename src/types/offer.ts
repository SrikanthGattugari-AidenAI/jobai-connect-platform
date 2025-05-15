
export type OfferStatus = "signed" | "unsigned" | "rejected";

export interface OfferLetter {
  id: string;
  jobTitle: string;
  employerName: string;
  offeredOn: string; // ISO date string
  status: OfferStatus;
  salary: {
    amount: number;
    currency: string;
    period: "yearly" | "monthly" | "weekly" | "hourly";
  };
  startDate: string; // ISO date string
  location: string;
  benefits: string[];
  description: string;
  contractDetails: string;
}
