
export interface Hackathon {
  id: string;
  title: string;
  organizer: string;
  description: string;
  startDate: string;
  endDate: string;
  registrationEndDate: string;
  location: string;
  image: string;
  participants: number;
  featured: boolean;
  categories: string[];
  prizes: string[];
  sponsoredBy: string[];
  registrationFee: string;
  employerId?: string;
}
