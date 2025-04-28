
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AnalyticsData {
  totalJobs: number;
  jobsByCategory: {
    engineering: number;
    design: number;
    marketing: number;
    business: number;
    other: number;
  };
  jobsByLocation: {
    remote: number;
    onsite: number;
  };
}

export function DashboardAnalytics({ analytics }: { analytics: AnalyticsData }) {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Job Analytics</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => navigate("/market-trends")}>
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Jobs by Category</h3>
            <div className="space-y-2">
              {Object.entries(analytics.jobsByCategory).map(([category, count]) => (
                <div key={category}>
                  <div className="flex justify-between items-center">
                    <span className="text-sm capitalize">{category}</span>
                    <span className="text-sm font-medium">{count}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500" 
                      style={{ width: `${(count / analytics.totalJobs) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Jobs by Location</h3>
            <div className="space-y-2">
              {Object.entries(analytics.jobsByLocation).map(([location, count]) => (
                <div key={location}>
                  <div className="flex justify-between items-center">
                    <span className="text-sm capitalize">{location}</span>
                    <span className="text-sm font-medium">{count}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-teal-500" 
                      style={{ width: `${(count / analytics.totalJobs) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <h3 className="text-sm font-medium mt-6 mb-2">Top Companies Hiring</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Tech Giants</span>
                <span className="text-sm font-medium">42</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Startups</span>
                <span className="text-sm font-medium">78</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Mid-Size Companies</span>
                <span className="text-sm font-medium">63</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t">
          <Button variant="outline" className="w-full" onClick={() => navigate("/market-trends")}>
            <BarChart className="mr-2 h-4 w-4" />
            View Detailed Job Market Analytics
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
