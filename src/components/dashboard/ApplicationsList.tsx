
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
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
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Your Applications</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => navigate("/internships")}>
            View All
          </Button>
        </div>
        <CardDescription>
          Track the status of your internship applications
        </CardDescription>
      </CardHeader>
      <CardContent>
        {applications.length > 0 ? (
          <div className="space-y-4">
            {applications.map((application) => {
              const internship = internships.find(i => i.id === application.internshipId);
              if (!internship) return null;
              
              return (
                <div 
                  key={application.id} 
                  className="border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer"
                  onClick={() => navigate(`/internships/${internship.id}`)}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-medium">{internship.title}</h3>
                      <p className="text-sm text-muted-foreground">{internship.company}</p>
                      <div className="flex items-center text-sm mt-2">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>Applied on {format(new Date(application.appliedDate), "MMM d, yyyy")}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-start md:items-end">
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
            <p className="text-muted-foreground mb-4">You haven't applied to any internships yet.</p>
            <Button onClick={() => navigate("/internships")}>
              Browse Internships
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
