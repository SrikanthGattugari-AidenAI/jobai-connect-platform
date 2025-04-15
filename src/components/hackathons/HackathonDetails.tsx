
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin, Users, Clock, DollarSign } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Hackathon } from "@/pages/hackathons/types";

interface HackathonDetailsProps {
  hackathon: Hackathon;
}

export const HackathonDetails = ({ hackathon }: HackathonDetailsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hackathon Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center">
          <Calendar className="mr-3 h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium">Timeline</p>
            <p className="text-sm text-muted-foreground">
              {format(parseISO(hackathon.startDate), "MMMM d")} - {format(parseISO(hackathon.endDate), "MMMM d, yyyy")}
            </p>
          </div>
        </div>
        
        {hackathon.registrationEndDate && (
          <div className="flex items-center">
            <Clock className="mr-3 h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Registration Deadline</p>
              <p className="text-sm text-muted-foreground">
                {format(parseISO(hackathon.registrationEndDate), "MMMM d, yyyy")}
              </p>
            </div>
          </div>
        )}

        {hackathon.registrationFee && (
          <div className="flex items-center">
            <DollarSign className="mr-3 h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Registration Fee</p>
              <p className="text-sm text-muted-foreground">
                ${hackathon.registrationFee}
              </p>
            </div>
          </div>
        )}
        
        <div className="flex items-center">
          <MapPin className="mr-3 h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium">Location</p>
            <p className="text-sm text-muted-foreground">{hackathon.location}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <Users className="mr-3 h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium">Participants</p>
            <p className="text-sm text-muted-foreground">{hackathon.participants} registered</p>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <p className="font-medium mb-2">Categories</p>
          <div className="flex flex-wrap gap-2">
            {hackathon.categories.map((category, index) => (
              <Badge key={index} variant="outline">{category}</Badge>
            ))}
          </div>
        </div>
        
        <Separator />
        
        <div>
          <p className="font-medium mb-2">Sponsored By</p>
          <div className="flex flex-wrap gap-4">
            {hackathon.sponsoredBy.map((sponsor, index) => (
              <div key={index} className="text-sm font-medium">
                {sponsor}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
