
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { Application, Internship } from "@/types";

interface ApplicationsListProps {
  applications: Application[];
  internships: Internship[];
}

export function ApplicationsList({ applications, internships }: ApplicationsListProps) {
  const navigate = useNavigate();
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "reviewing":
        return "bg-blue-100 text-blue-800";
      case "shortlisted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "accepted":
        return "bg-emerald-100 text-emerald-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="bg-gradient-to-b from-white to-slate-50">
      <CardHeader className="pb-3">
        <CardTitle>Applications Tracking</CardTitle>
        <CardDescription>
          Track your internship application progress
        </CardDescription>
      </CardHeader>
      <CardContent>
        {applications.length > 0 ? (
          <div className="space-y-3">
            {applications.map((application) => {
              const internship = internships.find(i => i.id === application.internshipId);
              if (!internship) return null;
              
              return (
                <div 
                  key={application.id} 
                  className="border rounded-lg p-3 hover:border-primary transition-colors cursor-pointer bg-white"
                  onClick={() => navigate(`/internships/${internship.id}`)}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-medium text-sm">{internship.title}</h3>
                      <p className="text-sm text-muted-foreground">{internship.company}</p>
                      <div className="flex items-center text-xs mt-2 text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>Applied on {format(new Date(application.appliedDate), "MMM d, yyyy")}</span>
                      </div>
                    </div>
                    <div>
                      <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getStatusColor(application.status)}`}>
                        {application.status}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-muted-foreground text-sm">No applications yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
