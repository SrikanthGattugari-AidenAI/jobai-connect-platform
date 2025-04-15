
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HackathonAboutProps {
  description: string;
}

export const HackathonAbout = ({ description }: HackathonAboutProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About This Hackathon</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-line">{description}</p>
      </CardContent>
    </Card>
  );
};
