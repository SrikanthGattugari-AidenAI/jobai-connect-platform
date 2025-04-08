
import { Link } from "react-router-dom";
import { Internship } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { MapPin, Clock, DollarSign, Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useInternships } from "@/context/InternshipContext";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";

interface InternshipCardProps {
  internship: Internship;
}

export function InternshipCard({ internship }: InternshipCardProps) {
  const { saveInternship, unsaveInternship, getSavedInternships } = useInternships();
  const { user, isAuthenticated } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  
  useEffect(() => {
    if (isAuthenticated && user && user.role === "student") {
      const savedInternships = getSavedInternships(user.id);
      setIsSaved(savedInternships.includes(internship.id));
    }
  }, [isAuthenticated, user, internship.id, getSavedInternships]);
  
  const toggleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated || !user || user.role !== "student") return;
    
    try {
      if (isSaved) {
        await unsaveInternship(internship.id, user.id);
      } else {
        await saveInternship(internship.id, user.id);
      }
      setIsSaved(!isSaved);
    } catch (error) {
      console.error("Error toggling save:", error);
    }
  };
  
  return (
    <Link to={`/internships/${internship.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-md h-full flex flex-col">
        <CardContent className="p-6 flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {internship.companyLogo ? (
                <div className="h-12 w-12 rounded-md overflow-hidden border">
                  <img 
                    src={internship.companyLogo} 
                    alt={internship.company} 
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center">
                  <span className="text-xl font-bold">{internship.company.charAt(0)}</span>
                </div>
              )}
              <div>
                <h3 className="font-medium">{internship.title}</h3>
                <p className="text-sm text-muted-foreground">{internship.company}</p>
              </div>
            </div>
            {isAuthenticated && user?.role === "student" && (
              <button 
                onClick={toggleSave}
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={isSaved ? "Unsave internship" : "Save internship"}
              >
                {isSaved ? (
                  <BookmarkCheck className="h-5 w-5 text-primary" />
                ) : (
                  <Bookmark className="h-5 w-5" />
                )}
              </button>
            )}
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-2 h-4 w-4" />
              <span>{internship.isRemote ? "Remote" : `${internship.city}, ${internship.country}`}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-2 h-4 w-4" />
              <span>{internship.duration}</span>
            </div>
            <div className="flex items-center text-sm">
              <DollarSign className="mr-2 h-4 w-4" />
              <span className="font-medium">
                {internship.stipend.isPaid 
                  ? `${internship.stipend.amount} ${internship.stipend.currency}/month` 
                  : "Unpaid"}
              </span>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {internship.category}
            </span>
            <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
              {internship.role}
            </span>
          </div>
        </CardContent>
        
        <CardFooter className="p-6 pt-0 flex items-center justify-between border-t mt-4">
          <div className="text-xs text-muted-foreground">
            Posted {formatDistanceToNow(new Date(internship.postedDate), { addSuffix: true })}
          </div>
          <Button size="sm">Apply Now</Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
