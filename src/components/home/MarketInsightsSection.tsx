
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  BarChart2, 
  PieChart, 
  TrendingUp,
  ChevronRight,
  Code,
  Database,
  Cpu,
  LineChart
} from "lucide-react";
import { 
  Card, 
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Mock data for job market insights
const trendingSkills = [
  { name: "React.js", growth: "+32%", category: "Frontend" },
  { name: "Python", growth: "+28%", category: "Backend" },
  { name: "Data Analysis", growth: "+24%", category: "Data" },
  { name: "Machine Learning", growth: "+22%", category: "AI" },
  { name: "TypeScript", growth: "+20%", category: "Frontend" },
];

const topRoles = [
  { title: "Frontend Developer", openings: 1240, growth: "+18%" },
  { title: "Data Scientist", openings: 890, growth: "+24%" },
  { title: "ML Engineer", openings: 760, growth: "+32%" },
  { title: "Product Manager", openings: 580, growth: "+14%" },
  { title: "UX Designer", openings: 510, growth: "+12%" },
];

const topCompanies = [
  { name: "TechCorp", openings: 245, logo: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb" },
  { name: "DataViz", openings: 189, logo: "https://images.unsplash.com/photo-1611162616475-46b635cb6868" },
  { name: "AInnova", openings: 156, logo: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7" },
  { name: "CodePro", openings: 122, logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113" },
];

export const MarketInsightsSection = () => {
  const [activeTab, setActiveTab] = useState("trending");
  
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <Badge variant="outline" className="bg-primary/10 text-primary px-3 py-1 mb-2">
              <BarChart2 className="mr-1 h-3.5 w-3.5" />
              Market Insights
            </Badge>
            <h2 className="heading-2 mb-2">Real-Time Job Market Analytics</h2>
            <p className="text-lg text-gray-600">Discover trending skills and opportunities in the job market</p>
          </div>
        </div>
        
        <Tabs defaultValue="trending" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="trending" onClick={() => setActiveTab("trending")}>Trending Skills</TabsTrigger>
            <TabsTrigger value="roles" onClick={() => setActiveTab("roles")}>Top Roles</TabsTrigger>
            <TabsTrigger value="companies" onClick={() => setActiveTab("companies")}>Top Companies</TabsTrigger>
            <TabsTrigger value="domains" onClick={() => setActiveTab("domains")}>Hot Domains</TabsTrigger>
          </TabsList>
          
          <TabsContent value="trending" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="col-span-1 md:col-span-2">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">Trending Skills</h3>
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-4">
                    {trendingSkills.map((skill, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-gray-600 text-sm w-6">{index + 1}.</span>
                          <span className="font-medium">{skill.name}</span>
                          <Badge variant="outline" className="bg-gray-100 text-gray-600 text-xs">
                            {skill.category}
                          </Badge>
                        </div>
                        <span className="text-green-600 font-semibold">{skill.growth}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button variant="ghost" className="w-full justify-between">
                    View all skills <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">Skills by Domain</h3>
                    <PieChart className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-4 mt-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Code className="h-4 w-4 text-blue-500" />
                          <span>Frontend</span>
                        </div>
                        <span className="text-sm font-medium">32%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: "32%" }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Database className="h-4 w-4 text-purple-500" />
                          <span>Backend</span>
                        </div>
                        <span className="text-sm font-medium">28%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: "28%" }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <LineChart className="h-4 w-4 text-green-500" />
                          <span>Data</span>
                        </div>
                        <span className="text-sm font-medium">24%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "24%" }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Cpu className="h-4 w-4 text-amber-500" />
                          <span>AI/ML</span>
                        </div>
                        <span className="text-sm font-medium">16%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: "16%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="roles" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">Top In-Demand Roles</h3>
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-4">
                    {topRoles.map((role, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-gray-600 text-sm w-6">{index + 1}.</span>
                          <span className="font-medium">{role.title}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-gray-600">{role.openings} jobs</span>
                          <span className="text-green-600 font-semibold">{role.growth}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button variant="ghost" className="w-full justify-between">
                    View all roles <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">Role Salary Ranges</h3>
                    <BarChart2 className="h-5 w-5 text-primary" />
                  </div>
                  <div className="h-[300px] flex items-end justify-between gap-2 mt-6">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 bg-blue-500 rounded-t-md" style={{ height: "60%" }}></div>
                      <span className="text-xs text-gray-600 mt-1">Frontend</span>
                      <span className="text-sm font-medium">$75K</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 bg-purple-500 rounded-t-md" style={{ height: "70%" }}></div>
                      <span className="text-xs text-gray-600 mt-1">Backend</span>
                      <span className="text-sm font-medium">$85K</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 bg-green-500 rounded-t-md" style={{ height: "85%" }}></div>
                      <span className="text-xs text-gray-600 mt-1">Data</span>
                      <span className="text-sm font-medium">$95K</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 bg-amber-500 rounded-t-md" style={{ height: "100%" }}></div>
                      <span className="text-xs text-gray-600 mt-1">AI/ML</span>
                      <span className="text-sm font-medium">$110K</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 bg-red-500 rounded-t-md" style={{ height: "75%" }}></div>
                      <span className="text-xs text-gray-600 mt-1">Product</span>
                      <span className="text-sm font-medium">$90K</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 bg-indigo-500 rounded-t-md" style={{ height: "65%" }}></div>
                      <span className="text-xs text-gray-600 mt-1">Design</span>
                      <span className="text-sm font-medium">$80K</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="companies" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {topCompanies.map((company, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="h-32 bg-gray-100">
                    <img 
                      src={company.logo} 
                      alt={company.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-semibold text-lg">{company.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{company.openings} open positions</p>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button variant="ghost" className="w-full justify-between">
                      View jobs <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="domains" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="overflow-hidden">
                <div className="h-40 bg-blue-50 flex items-center justify-center">
                  <Code className="h-16 w-16 text-blue-500" />
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-semibold text-lg">Web Development</h3>
                  <p className="text-sm text-gray-600 mt-1">2,450 open positions</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Growth Rate</span>
                      <span className="font-medium">+18%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "70%" }}></div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button variant="ghost" className="w-full justify-between">
                    Explore career path <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="overflow-hidden">
                <div className="h-40 bg-green-50 flex items-center justify-center">
                  <LineChart className="h-16 w-16 text-green-500" />
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-semibold text-lg">Data Science</h3>
                  <p className="text-sm text-gray-600 mt-1">1,890 open positions</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Growth Rate</span>
                      <span className="font-medium">+24%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button variant="ghost" className="w-full justify-between">
                    Explore career path <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="overflow-hidden">
                <div className="h-40 bg-amber-50 flex items-center justify-center">
                  <Cpu className="h-16 w-16 text-amber-500" />
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-semibold text-lg">AI & Machine Learning</h3>
                  <p className="text-sm text-gray-600 mt-1">1,340 open positions</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Growth Rate</span>
                      <span className="font-medium">+32%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: "95%" }}></div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button variant="ghost" className="w-full justify-between">
                    Explore career path <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
