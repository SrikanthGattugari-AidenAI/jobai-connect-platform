
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { Calendar, Trophy, Users, ExternalLink, Plus } from "lucide-react";
import { format, parseISO } from "date-fns";

interface Hackathon {
  id: string;
  title: string;
  organizer: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  image: string;
  participants: number;
  featured: boolean;
  categories: string[];
  prizes: string[];
  sponsoredBy: string[];
  employerId?: string;
}

const EmployerHackathons = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch hackathons from localStorage (in a real app, this would be an API call)
    const fetchHackathons = () => {
      try {
        const allHackathons = JSON.parse(localStorage.getItem('employerHackathons') || '[]');
        // Filter hackathons by employer ID
        const employerHackathons = user?.id 
          ? allHackathons.filter((hackathon: Hackathon) => hackathon.employerId === user.id)
          : [];
        
        setHackathons(employerHackathons);
      } catch (error) {
        console.error("Error fetching hackathons:", error);
        setHackathons([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHackathons();
  }, [user]);

  // If not an employer, redirect to dashboard
  if (user?.role !== "employer") {
    navigate("/dashboard");
    return null;
  }

  return (
    <MainLayout>
      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="heading-2 mb-2">Your Hackathons</h1>
            <p className="text-muted-foreground">
              Manage all the hackathons you've created
            </p>
          </div>
          <Button onClick={() => navigate("/hackathons/create")}>
            <Plus className="mr-2 h-4 w-4" />
            Create New Hackathon
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p>Loading your hackathons...</p>
          </div>
        ) : hackathons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hackathons.map((hackathon) => (
              <Card key={hackathon.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div 
                  className="h-48 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${hackathon.image})` }}
                />
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{hackathon.title}</CardTitle>
                    {hackathon.featured && (
                      <Badge variant="default">Featured</Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {hackathon.categories.slice(0, 3).map((category, idx) => (
                      <Badge key={idx} variant="outline">{category}</Badge>
                    ))}
                    {hackathon.categories.length > 3 && (
                      <Badge variant="outline">+{hackathon.categories.length - 3}</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                    {hackathon.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>
                        {format(parseISO(hackathon.startDate), "MMM d")} - {format(parseISO(hackathon.endDate), "MMM d, yyyy")}
                      </span>
                    </div>
                    {hackathon.location && (
                      <div className="flex items-center text-sm">
                        <ExternalLink className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{hackathon.location}</span>
                      </div>
                    )}
                    <div className="flex items-center text-sm">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{hackathon.participants} participants</span>
                    </div>
                    {hackathon.prizes.length > 0 && (
                      <div className="flex items-center text-sm">
                        <Trophy className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{hackathon.prizes[0]} + more</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/hackathons/${hackathon.id}`)}
                  >
                    View Details
                  </Button>
                  <Button 
                    variant="default"
                    size="sm"
                    onClick={() => {
                      // In a real app, this would navigate to a dashboard for this specific hackathon
                      navigate(`/hackathons/${hackathon.id}/manage`);
                    }}
                  >
                    Manage
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border rounded-lg">
            <Trophy className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-medium mb-2">No Hackathons Created Yet</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              You haven't created any hackathons yet. Create your first hackathon to attract talented developers.
            </p>
            <Button onClick={() => navigate("/hackathons/create")}>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Hackathon
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default EmployerHackathons;
