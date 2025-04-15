
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HowItWorksDialog } from "@/components/hackathons/HowItWorksDialog";
import { useRef } from "react";

interface HackathonActionsProps {
  isOwner: boolean;
  onEditHackathon: () => void;
}

export const HackathonActions = ({ isOwner, onEditHackathon }: HackathonActionsProps) => {
  const howItWorksDialogTriggerRef = useRef<HTMLButtonElement>(null);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isOwner ? (
          <>
            <Button className="w-full">
              View Submissions
            </Button>
            <Button variant="outline" className="w-full" onClick={onEditHackathon}>
              Edit Hackathon
            </Button>
            <Button variant="outline" className="w-full">
              Export Participant Data
            </Button>
          </>
        ) : (
          <>
            <Button className="w-full">
              Register for Hackathon
            </Button>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => {
                if (howItWorksDialogTriggerRef.current) {
                  howItWorksDialogTriggerRef.current.click();
                }
              }}
            >
              How It Works
            </Button>
            <div className="hidden">
              <button 
                ref={howItWorksDialogTriggerRef} 
                id="how-it-works-dialog-trigger"
              />
              <HowItWorksDialog />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
