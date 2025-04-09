
import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  TrendingUp, 
  DollarSign, 
  BarChart, 
  Code, 
  Database, 
  LineChart,
  Cpu,
  Globe,
  ChevronRight
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for market insights
const trendingSkills = {
  global: [
    { name: "React.js", growth: "+32%", category: "Frontend" },
    { name: "Python", growth: "+28%", category: "Backend" },
    { name: "Data Analysis", growth: "+24%", category: "Data" },
    { name: "Machine Learning", growth: "+22%", category: "AI" },
    { name: "TypeScript", growth: "+20%", category: "Frontend" },
  ],
  usa: [
    { name: "React.js", growth: "+28%", category: "Frontend" },
    { name: "AWS", growth: "+30%", category: "Cloud" },
    { name: "Data Science", growth: "+26%", category: "Data" },
    { name: "Node.js", growth: "+18%", category: "Backend" },
    { name: "Kubernetes", growth: "+24%", category: "DevOps" },
  ],
  india: [
    { name: "Python", growth: "+35%", category: "Backend" },
    { name: "React.js", growth: "+30%", category: "Frontend" },
    { name: "Java", growth: "+18%", category: "Backend" },
    { name: "Data Science", growth: "+32%", category: "Data" },
    { name: "Flutter", growth: "+25%", category: "Mobile" },
  ],
  uk: [
    { name: "TypeScript", growth: "+26%", category: "Frontend" },
    { name: "Python", growth: "+22%", category: "Backend" },
    { name: "AWS", growth: "+28%", category: "Cloud" },
    { name: "React.js", growth: "+24%", category: "Frontend" },
    { name: "Power BI", growth: "+20%", category: "Data" },
  ],
  canada: [
    { name: "React.js", growth: "+25%", category: "Frontend" },
    { name: "AWS", growth: "+26%", category: "Cloud" },
    { name: "Python", growth: "+23%", category: "Backend" },
    { name: "UI/UX Design", growth: "+20%", category: "Design" },
    { name: "Docker", growth: "+22%", category: "DevOps" },
  ],
};

const topRoles = {
  global: [
    { title: "Frontend Developer", openings: 1240, growth: "+18%" },
    { title: "Data Scientist", openings: 890, growth: "+24%" },
    { title: "ML Engineer", openings: 760, growth: "+32%" },
    { title: "Product Manager", openings: 580, growth: "+14%" },
    { title: "UX Designer", openings: 510, growth: "+12%" },
  ],
  usa: [
    { title: "ML Engineer", openings: 980, growth: "+36%" },
    { title: "FullStack Developer", openings: 1450, growth: "+20%" },
    { title: "Cloud Architect", openings: 720, growth: "+28%" },
    { title: "Product Manager", openings: 850, growth: "+16%" },
    { title: "DevOps Engineer", openings: 680, growth: "+26%" },
  ],
  india: [
    { title: "Backend Developer", openings: 1680, growth: "+24%" },
    { title: "Data Scientist", openings: 1240, growth: "+30%" },
    { title: "Frontend Developer", openings: 1450, growth: "+22%" },
    { title: "Mobile Developer", openings: 890, growth: "+18%" },
    { title: "UI/UX Designer", openings: 760, growth: "+15%" },
  ],
  uk: [
    { title: "Frontend Developer", openings: 980, growth: "+22%" },
    { title: "Data Analyst", openings: 720, growth: "+20%" },
    { title: "Cloud Engineer", openings: 640, growth: "+26%" },
    { title: "Product Manager", openings: 520, growth: "+15%" },
    { title: "Cybersecurity Specialist", openings: 480, growth: "+28%" },
  ],
  canada: [
    { title: "FullStack Developer", openings: 860, growth: "+24%" },
    { title: "Data Scientist", openings: 580, growth: "+28%" },
    { title: "DevOps Engineer", openings: 480, growth: "+25%" },
    { title: "UX Designer", openings: 420, growth: "+14%" },
    { title: "Project Manager", openings: 360, growth: "+12%" },
  ],
};

const topCompanies = {
  global: [
    { name: "TechCorp", openings: 245, logo: "https://images.unsplash.com/photo-1611162616071-b39a2ec055fb" },
    { name: "DataViz", openings: 189, logo: "https://images.unsplash.com/photo-1611162616475-46b635cb6868" },
    { name: "AInnova", openings: 156, logo: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7" },
    { name: "CodePro", openings: 122, logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113" },
  ],
  usa: [
    { name: "Google", openings: 320, logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd" },
    { name: "Microsoft", openings: 280, logo: "https://images.unsplash.com/photo-1603379777934-404ea4952347" },
    { name: "Amazon", openings: 260, logo: "https://images.unsplash.com/photo-1605548230624-8d2d0509b5f9" },
    { name: "Facebook", openings: 210, logo: "https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea" },
  ],
  india: [
    { name: "Infosys", openings: 420, logo: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7" },
    { name: "TCS", openings: 380, logo: "https://images.unsplash.com/photo-1612810806695-30f7a8258391" },
    { name: "Wipro", openings: 320, logo: "https://images.unsplash.com/photo-1603201667141-5a2d4c673378" },
    { name: "HCL", openings: 290, logo: "https://images.unsplash.com/photo-1611162616475-46b635cb6868" },
  ],
  uk: [
    { name: "BP", openings: 180, logo: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7" },
    { name: "Barclays", openings: 150, logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113" },
    { name: "BBC", openings: 130, logo: "https://images.unsplash.com/photo-1611162616071-b39a2ec055fb" },
    { name: "Dyson", openings: 120, logo: "https://images.unsplash.com/photo-1611162616475-46b635cb6868" },
  ],
  canada: [
    { name: "Shopify", openings: 160, logo: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7" },
    { name: "RBC", openings: 140, logo: "https://images.unsplash.com/photo-1611162616071-b39a2ec055fb" },
    { name: "TD Bank", openings: 120, logo: "https://images.unsplash.com/photo-1611162616475-46b635cb6868" },
    { name: "CGI", openings: 110, logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113" },
  ],
};

const locations = [
  { value: "global", label: "Global" },
  { value: "usa", label: "United States" },
  { value: "india", label: "India" },
  { value: "uk", label: "United Kingdom" },
  { value: "canada", label: "Canada" },
];

const MarketTrends = () => {
  const [activeTab, setActiveTab] = useState("trending");
  const [location, setLocation] = useState("global");
  const [skills, setSkills] = useState(trendingSkills.global);
  const [roles, setRoles] = useState(topRoles.global);
  const [companies, setCompanies] = useState(topCompanies.global);

  useEffect(() => {
    // Update data based on selected location
    setSkills(trendingSkills[location as keyof typeof trendingSkills]);
    setRoles(topRoles[location as keyof typeof topRoles]);
    setCompanies(topCompanies[location as keyof typeof topCompanies]);
  }, [location]);

  return (
    <MainLayout>
      <section id="market-trends" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <Badge variant="outline" className="bg-primary/10 text-primary px-3 py-1 mb-2 flex items-center w-fit">
                <TrendingUp className="mr-1 h-3.5 w-3.5" />
                <span className="relative">
                  Live Market Trends
                  <span className="absolute -right-3 -top-2 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                </span>
              </Badge>
              <h2 className="text-3xl font-bold mb-2">Stay Ahead with Real-Time Market Insights</h2>
              <p className="text-lg text-gray-600">Discover trending skills and opportunities in the job market</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="w-[180px]">
                  <Globe className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc.value} value={loc.value}>
                      {loc.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 text-primary mr-2" />
                      Trending Skills in {locations.find(loc => loc.value === location)?.label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {skills.map((skill, index) => (
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
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      Skills by Domain
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 mt-2">
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
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart className="h-5 w-5 text-primary mr-2" />
                      Top In-Demand Roles in {locations.find(loc => loc.value === location)?.label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {roles.map((role, index) => (
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
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <DollarSign className="h-5 w-5 text-primary mr-2" />
                      Role Salary Ranges
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-end justify-between gap-2 mt-2">
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
                {companies.map((company, index) => (
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
    </MainLayout>
  );
};

export default MarketTrends;
