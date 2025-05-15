
import React from "react";
import { format } from "date-fns";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { OfferLetter } from "@/types/offer";

interface OfferLetterListProps {
  offerLetters: OfferLetter[];
  onSelectOffer: (offer: OfferLetter) => void;
  selectedOfferId: string | null;
}

export const OfferLetterList = ({ 
  offerLetters, 
  onSelectOffer, 
  selectedOfferId 
}: OfferLetterListProps) => {
  if (offerLetters.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No offer letters found in this category.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {offerLetters.map((offer) => (
        <Card 
          key={offer.id} 
          className={`cursor-pointer transition-all hover:border-primary ${
            selectedOfferId === offer.id ? "border-primary bg-primary/5" : ""
          }`}
          onClick={() => onSelectOffer(offer)}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{offer.jobTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {offer.employerName}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Offered on {format(new Date(offer.offeredOn), "MMM dd, yyyy")}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
