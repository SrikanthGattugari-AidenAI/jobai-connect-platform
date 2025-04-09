
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

export const HowItWorksDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Info className="h-4 w-4" />
          How It Works
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>How Hackathons Work</DialogTitle>
          <DialogDescription>
            Learn about our hackathon process and how to participate successfully.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <h4 className="font-medium">1. Register</h4>
            <p className="text-sm text-muted-foreground">
              Create an account and register for the hackathon of your choice. Some hackathons require team registration.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">2. Form Your Team</h4>
            <p className="text-sm text-muted-foreground">
              You can participate solo or form a team of up to 5 members. Use our team-finding feature if needed.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">3. Ideate & Build</h4>
            <p className="text-sm text-muted-foreground">
              Work on your project during the specified timeframe. Most hackathons run for 24-48 hours.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">4. Submit & Present</h4>
            <p className="text-sm text-muted-foreground">
              Submit your project before the deadline and prepare for your presentation to the judges.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">5. Judging & Prizes</h4>
            <p className="text-sm text-muted-foreground">
              Projects are judged on creativity, technical difficulty, design, and impact. Winners receive prizes and recognition.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
