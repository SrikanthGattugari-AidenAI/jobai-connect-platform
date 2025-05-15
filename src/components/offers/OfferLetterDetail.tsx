
import React from "react";
import { format } from "date-fns";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { FileCheck, FileX } from "lucide-react";
import { OfferLetter } from "@/types/offer";

interface OfferLetterDetailProps {
  offer: OfferLetter;
  onSign: (id: string) => void;
  onReject: (id: string) => void;
}

export const OfferLetterDetail = ({ 
  offer, 
  onSign, 
  onReject 
}: OfferLetterDetailProps) => {
  const formatSalary = (salary: OfferLetter["salary"]) => {
    return `${salary.currency} ${salary.amount.toLocaleString()} per ${salary.period}`;
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMMM dd, yyyy");
  };

  const getStatusBadge = () => {
    switch (offer.status) {
      case "signed":
        return <Badge className="bg-green-600"><FileCheck className="mr-1 h-3 w-3" /> Signed</Badge>;
      case "rejected":
        return <Badge variant="destructive"><FileX className="mr-1 h-3 w-3" /> Rejected</Badge>;
      case "unsigned":
        return <Badge variant="outline">Pending Response</Badge>;
    }
  };

  return (
    <Card className="border-t-4 border-t-primary">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold">{offer.jobTitle}</CardTitle>
            <CardDescription className="mt-1 text-lg">{offer.employerName}</CardDescription>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Offered on</p>
            <p className="font-medium">{formatDate(offer.offeredOn)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Start Date</p>
            <p className="font-medium">{formatDate(offer.startDate)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Salary</p>
            <p className="font-medium">{formatSalary(offer.salary)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Location</p>
            <p className="font-medium">{offer.location}</p>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-sm">{offer.description}</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Benefits</h3>
          <ul className="list-disc pl-5 text-sm space-y-1">
            {offer.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Contract Details</h3>
          <p className="text-sm">{offer.contractDetails}</p>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end space-x-4">
        {offer.status === "unsigned" && (
          <>
            <Button 
              variant="outline" 
              className="border-destructive text-destructive hover:bg-destructive/10" 
              onClick={() => onReject(offer.id)}
            >
              Reject Offer
            </Button>
            <Button 
              onClick={() => onSign(offer.id)}
            >
              Sign Offer
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};
