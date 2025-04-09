
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { TrendingUp, DollarSign, BarChart, LineChart, Users, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const MarketTrendsSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="section-padding bg-gradient-to-r from-accent/50 to-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <Badge variant="outline" className="bg-primary/10 text-primary px-3 py-1 mb-4 flex items-center w-fit">
              <TrendingUp className="mr-1 h-3.5 w-3.5" />
              <span className="relative">
                Live Market Trends
                <span className="absolute -right-3 -top-2 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              </span>
            </Badge>
            <h2 className="heading-2 mb-2">Stay Ahead with Real-Time Market Insights</h2>
            <p className="text-muted-foreground max-w-2xl">Track job trends, salary ranges, and in-demand skills to make informed career decisions</p>
          </div>
          <Button 
            onClick={() => navigate("/market-trends")} 
            className="mt-4 md:mt-0 flex items-center gap-2"
          >
            <BarChart className="h-4 w-4" />
            <span>View Full Analytics</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Top Paying Roles */}
          <div className="bg-white p-6 rounded-xl shadow-md border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold flex items-center">
                <DollarSign className="h-5 w-5 text-primary mr-2" />
                Top Paying Roles
              </h3>
              <Badge>Q2 2025</Badge>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Machine Learning Engineer</span>
                <span className="text-primary font-bold">$135K</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div className="h-2 bg-primary rounded-full" style={{ width: '95%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="font-medium">Backend Developer</span>
                <span className="text-primary font-bold">$120K</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div className="h-2 bg-primary rounded-full" style={{ width: '85%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="font-medium">Product Manager</span>
                <span className="text-primary font-bold">$118K</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div className="h-2 bg-primary rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>
          </div>
          
          {/* Most In-Demand Skills */}
          <div className="bg-white p-6 rounded-xl shadow-md border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold flex items-center">
                <LineChart className="h-5 w-5 text-primary mr-2" />
                Trending Skills
              </h3>
              <Badge>Last 30 Days</Badge>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">React.js</span>
                <span className="text-green-500 font-medium flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" /> 24%
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div className="h-2 bg-green-500 rounded-full" style={{ width: '90%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="font-medium">Python</span>
                <span className="text-green-500 font-medium flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" /> 18%
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div className="h-2 bg-green-500 rounded-full" style={{ width: '85%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="font-medium">AI/ML</span>
                <span className="text-green-500 font-medium flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" /> 32%
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div className="h-2 bg-green-500 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
          </div>
          
          {/* Top Hiring Locations */}
          <div className="bg-white p-6 rounded-xl shadow-md border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold flex items-center">
                <Globe className="h-5 w-5 text-primary mr-2" />
                Top Hiring Locations
              </h3>
              <Badge>Global</Badge>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">San Francisco, USA</span>
                <span className="text-primary font-medium">2,340 jobs</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div className="h-2 bg-primary rounded-full" style={{ width: '90%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="font-medium">Bangalore, India</span>
                <span className="text-primary font-medium">1,980 jobs</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div className="h-2 bg-primary rounded-full" style={{ width: '75%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="font-medium">London, UK</span>
                <span className="text-primary font-medium">1,645 jobs</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div className="h-2 bg-primary rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
