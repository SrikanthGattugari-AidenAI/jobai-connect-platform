
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";

interface HackathonPrizesProps {
  prizes: string[];
}

export const HackathonPrizes = ({ prizes }: HackathonPrizesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Prizes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {prizes.map((prize, index) => (
            <div key={index} className="flex items-start">
              <Trophy className="mt-1 mr-3 h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">{prize}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
