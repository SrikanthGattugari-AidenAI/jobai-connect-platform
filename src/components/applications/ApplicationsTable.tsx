
import React from "react";
import { format } from "date-fns";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { JobApplication } from "@/types/application";

interface ApplicationsTableProps {
  applications: JobApplication[];
  category: string;
}

export const ApplicationsTable: React.FC<ApplicationsTableProps> = ({ applications, category }) => {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "Applied":
        return "default";
      case "Interviewed":
        return "secondary";
      case "Shortlisted":
        return "outline";
      case "Hired":
        return "success";
      case "Rejected":
        return "destructive";
      default:
        return "default";
    }
  };

  const getFitmentScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-amber-600";
    if (score >= 60) return "text-orange-500";
    return "text-red-600";
  };

  if (!applications || applications.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No {category.toLowerCase()} job applications found.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableCaption>List of {category.toLowerCase()} job applications</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Job Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Current Stage</TableHead>
          <TableHead>Applied On</TableHead>
          <TableHead>Fitment Score</TableHead>
          <TableHead>Last Updated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.map((app) => (
          <TableRow key={app.application_id} className="hover:bg-muted/50 cursor-pointer">
            <TableCell className="font-medium">{app.job_title || "Untitled Position"}</TableCell>
            <TableCell>
              <Badge variant={getBadgeVariant(app.status) as any}>{app.status}</Badge>
            </TableCell>
            <TableCell>{app.current_stage}</TableCell>
            <TableCell>{formatDate(app.applied_on)}</TableCell>
            <TableCell className={getFitmentScoreColor(app.fitment_score)}>
              {app.fitment_score}%
            </TableCell>
            <TableCell>{formatDate(app.last_updated)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
