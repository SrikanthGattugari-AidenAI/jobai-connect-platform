
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { 
  Code, 
  Database, 
  LineChart, 
  Cpu, 
  Pencil, 
  Terminal, 
  CheckCircle2,
  BookOpen,
  GraduationCap,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock career path data
const careerPaths = {
  "frontend": {
    title: "Frontend Developer",
    description: "From beginner to advanced frontend developer with expertise in modern frameworks and UI/UX principles.",
    avgSalary: "$85,000",
    demand: "High",
    skills: [
      { name: "HTML/CSS", level: "Beginner", duration: "1-2 months" },
      { name: "JavaScript", level: "Intermediate", duration: "3-4 months" },
      { name: "React.js", level: "Intermediate", duration: "3-4 months" },
      { name: "TypeScript", level: "Advanced", duration: "2-3 months" },
      { name: "UI/UX Principles", level: "Advanced", duration: "2-3 months" },
    ],
    tools: ["VSCode", "Chrome DevTools", "Figma", "Git", "npm/yarn"],
    certifications: ["Meta Frontend Developer", "freeCodeCamp Responsive Web Design", "JavaScript Algorithms and Data Structures"],
    projects: [
      "Personal Portfolio Website",
      "E-commerce Product Page",
      "Interactive Dashboard",
      "Social Media Clone",
    ],
    jobTitles: ["Junior Frontend Developer", "Frontend Developer", "Senior Frontend Developer", "UI Engineer", "Frontend Architect"],
    icon: Code,
    color: "blue",
  },
  "backend": {
    title: "Backend Developer",
    description: "Master server-side programming, databases, APIs, and system architecture.",
    avgSalary: "$92,000",
    demand: "Very High",
    skills: [
      { name: "Python/Node.js", level: "Beginner", duration: "2-3 months" },
      { name: "SQL Databases", level: "Intermediate", duration: "2-3 months" },
      { name: "RESTful APIs", level: "Intermediate", duration: "2-3 months" },
      { name: "Authentication & Security", level: "Advanced", duration: "1-2 months" },
      { name: "Microservices", level: "Advanced", duration: "3-4 months" },
    ],
    tools: ["Docker", "Postman", "MongoDB", "Redis", "AWS/GCP"],
    certifications: ["AWS Certified Developer", "MongoDB University", "Node.js Certification"],
    projects: [
      "RESTful API Service",
      "User Authentication System",
      "E-commerce Backend",
      "Real-time Chat Application Backend",
    ],
    jobTitles: ["Junior Backend Developer", "Backend Developer", "API Developer", "Senior Backend Engineer", "Backend Architect"],
    icon: Database,
    color: "purple",
  },
  "data": {
    title: "Data Scientist",
    description: "Analyze complex datasets, build predictive models, and extract valuable insights.",
    avgSalary: "$105,000",
    demand: "Very High",
    skills: [
      { name: "Python for Data Science", level: "Beginner", duration: "2-3 months" },
      { name: "Data Visualization", level: "Intermediate", duration: "1-2 months" },
      { name: "Statistical Analysis", level: "Intermediate", duration: "2-3 months" },
      { name: "Machine Learning", level: "Advanced", duration: "3-4 months" },
      { name: "Deep Learning", level: "Advanced", duration: "3-4 months" },
    ],
    tools: ["Jupyter Notebooks", "Pandas", "NumPy", "Scikit-learn", "TensorFlow/PyTorch", "Tableau"],
    certifications: ["Google Data Analytics", "IBM Data Science Professional", "DataCamp Data Scientist Track"],
    projects: [
      "Predictive Analysis Model",
      "Customer Segmentation",
      "Recommendation System",
      "Time Series Forecasting",
    ],
    jobTitles: ["Junior Data Analyst", "Data Scientist", "Machine Learning Engineer", "Senior Data Scientist", "Lead Data Scientist"],
    icon: LineChart,
    color: "green",
  },
  "ai-ml": {
    title: "AI/ML Engineer",
    description: "Build intelligent systems using machine learning and artificial intelligence techniques.",
    avgSalary: "$115,000",
    demand: "Extremely High",
    skills: [
      { name: "Python Programming", level: "Beginner", duration: "2-3 months" },
      { name: "Machine Learning Fundamentals", level: "Intermediate", duration: "3-4 months" },
      { name: "Deep Learning", level: "Advanced", duration: "3-4 months" },
      { name: "Natural Language Processing", level: "Advanced", duration: "2-3 months" },
      { name: "Computer Vision", level: "Advanced", duration: "2-3 months" },
    ],
    tools: ["TensorFlow", "PyTorch", "Keras", "OpenCV", "Hugging Face", "CUDA"],
    certifications: ["TensorFlow Developer", "AWS Machine Learning Specialty", "NVIDIA Deep Learning Institute"],
    projects: [
      "Image Classification System",
      "Natural Language Processing Model",
      "Recommendation Engine",
      "Autonomous Agent",
    ],
    jobTitles: ["ML Engineer", "AI Developer", "Computer Vision Engineer", "NLP Specialist", "Senior AI Researcher"],
    icon: Cpu,
    color: "amber",
  },
  "ui-ux": {
    title: "UI/UX Designer",
    description: "Create user-centered designs and intuitive user experiences for digital products.",
    avgSalary: "$88,000",
    demand: "High",
    skills: [
      { name: "UI Design Fundamentals", level: "Beginner", duration: "2-3 months" },
      { name: "User Research", level: "Intermediate", duration: "1-2 months" },
      { name: "Wireframing & Prototyping", level: "Intermediate", duration: "2-3 months" },
      { name: "Visual Design", level: "Advanced", duration: "2-3 months" },
      { name: "Interaction Design", level: "Advanced", duration: "2-3 months" },
    ],
    tools: ["Figma", "Adobe XD", "Sketch", "InVision", "Maze", "Zeplin"],
    certifications: ["Google UX Design", "Interaction Design Foundation", "Nielsen Norman Group UX Certification"],
    projects: [
      "Mobile App Redesign",
      "Website UX Audit",
      "Design System Creation",
      "E-commerce User Flow Optimization",
    ],
    jobTitles: ["UI Designer", "UX Designer", "Product Designer", "Senior UI/UX Designer", "UX Lead"],
    icon: Pencil,
    color: "rose",
  },
  "devops": {
    title: "DevOps Engineer",
    description: "Bridge development and operations through automation and infrastructure management.",
    avgSalary: "$95,000",
    demand: "Very High",
    skills: [
      { name: "Linux Administration", level: "Beginner", duration: "1-2 months" },
      { name: "Containerization", level: "Intermediate", duration: "2-3 months" },
      { name: "CI/CD Pipelines", level: "Intermediate", duration: "2-3 months" },
      { name: "Infrastructure as Code", level: "Advanced", duration: "2-3 months" },
      { name: "Cloud Services", level: "Advanced", duration: "3-4 months" },
    ],
    tools: ["Docker", "Kubernetes", "Jenkins", "Terraform", "AWS/Azure/GCP", "Prometheus/Grafana"],
    certifications: ["AWS Certified DevOps Engineer", "Kubernetes Administrator (CKA)", "Azure DevOps Engineer"],
    projects: [
      "Automated CI/CD Pipeline",
      "Containerized Application Deployment",
      "Infrastructure Automation",
      "Monitoring System Setup",
    ],
    jobTitles: ["Junior DevOps Engineer", "DevOps Engineer", "Cloud Engineer", "Platform Engineer", "DevOps Architect"],
    icon: Terminal,
    color: "indigo",
  },
};

const CareerPath = () => {
  const [selectedPath, setSelectedPath] = useState("frontend");
  const currentPath = careerPaths[selectedPath as keyof typeof careerPaths];

  return (
    <MainLayout>
      <section className="section-padding bg-gradient-to-r from-blue-50 to-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <Badge variant="outline" className="bg-primary/10 text-primary px-3 py-1 mb-2">
                <MapPin className="mr-1 h-3.5 w-3.5" />
                Career Roadmap
              </Badge>
              <h2 className="text-3xl font-bold mb-2">Navigate Your Tech Career Path</h2>
              <p className="text-lg text-gray-600 max-w-2xl">Explore structured learning paths for in-demand tech roles with step-by-step guidance</p>
            </div>
          </div>

          <div className="mb-8">
            <Select value={selectedPath} onValueChange={setSelectedPath}>
              <SelectTrigger className="w-full md:w-[300px]">
                <SelectValue placeholder="Select a career path" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="frontend">Frontend Developer</SelectItem>
                <SelectItem value="backend">Backend Developer</SelectItem>
                <SelectItem value="data">Data Scientist</SelectItem>
                <SelectItem value="ai-ml">AI/ML Engineer</SelectItem>
                <SelectItem value="ui-ux">UI/UX Designer</SelectItem>
                <SelectItem value="devops">DevOps Engineer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <Card className="bg-white shadow-md overflow-hidden h-full">
                <div className={`h-24 flex items-center justify-center bg-${currentPath.color}-50`}>
                  <currentPath.icon className={`h-12 w-12 text-${currentPath.color}-500`} />
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold">{currentPath.title}</h3>
                  <p className="text-gray-600 text-sm mt-2">{currentPath.description}</p>
                  
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average Salary:</span>
                      <Badge variant="outline" className="font-medium">{currentPath.avgSalary}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Market Demand:</span>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{currentPath.demand}</Badge>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button className="w-full">
                      Follow This Path
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-3">
              <Tabs defaultValue="skills" className="w-full">
                <TabsList className="grid grid-cols-5 mb-6">
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="tools">Tools</TabsTrigger>
                  <TabsTrigger value="certifications">Certifications</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="career">Career Growth</TabsTrigger>
                </TabsList>
                
                <TabsContent value="skills" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                        Required Skills & Timeline
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="relative">
                        <div className="absolute top-0 bottom-0 left-[19px] w-0.5 bg-gray-200"></div>
                        <div className="space-y-8">
                          {currentPath.skills.map((skill, index) => (
                            <div key={index} className="relative flex items-start pt-2">
                              <div className={`absolute -left-1 flex items-center justify-center w-10 h-10 rounded-full bg-${currentPath.color}-100 border-2 border-white z-10`}>
                                <span className={`text-${currentPath.color}-600 font-bold`}>{index + 1}</span>
                              </div>
                              <div className="ml-12 bg-white p-4 rounded-lg shadow-sm border">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                                  <h4 className="font-semibold text-lg">{skill.name}</h4>
                                  <div className="flex items-center space-x-3 mt-2 md:mt-0">
                                    <Badge variant="outline">{skill.level}</Badge>
                                    <Badge variant="secondary">{skill.duration}</Badge>
                                  </div>
                                </div>
                                <div className="mt-3 flex items-center">
                                  <Button variant="outline" size="sm" className="mr-2">Resources</Button>
                                  <Button variant="outline" size="sm">Practice</Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="tools" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Essential Tools & Technologies</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {currentPath.tools.map((tool, index) => (
                          <Card key={index} className="border shadow-sm">
                            <CardContent className="p-4 flex justify-between items-center">
                              <span>{tool}</span>
                              <Button variant="ghost" size="sm">
                                Learn <ChevronRight className="h-4 w-4 ml-1" />
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="certifications" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <GraduationCap className="h-5 w-5 text-primary mr-2" />
                        Recommended Certifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {currentPath.certifications.map((cert, index) => (
                          <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                            <div className="flex items-center">
                              <div className="rounded-full w-8 h-8 bg-primary/10 flex items-center justify-center mr-3">
                                <GraduationCap className="h-4 w-4 text-primary" />
                              </div>
                              <span className="font-medium">{cert}</span>
                            </div>
                            <Button variant="outline" size="sm">View Details</Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="projects" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Code className="h-5 w-5 text-primary mr-2" />
                        Portfolio Projects
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentPath.projects.map((project, index) => (
                          <Card key={index} className="border shadow-sm">
                            <CardContent className="p-4">
                              <h4 className="font-medium text-lg mb-2">{project}</h4>
                              <p className="text-gray-600 text-sm mb-4">Build a real-world portfolio project to demonstrate your skills.</p>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">Learn More</Button>
                                <Button size="sm">Start Project</Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="career" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Career Progression</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="relative">
                        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gray-200"></div>
                        <div className="space-y-12">
                          {currentPath.jobTitles.map((title, index) => (
                            <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                              <div className={`absolute left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-${currentPath.color}-100 border-4 border-white z-10`}>
                                <span className={`text-${currentPath.color}-600 font-bold`}>{index + 1}</span>
                              </div>
                              <div className={`w-5/12 p-4 rounded-lg shadow-sm border bg-white ${index % 2 === 0 ? 'text-right mr-8' : 'ml-8'}`}>
                                <h4 className="font-semibold text-lg">{title}</h4>
                                <div className="mt-2 flex items-center justify-end gap-2">
                                  <Badge variant="outline">View Salary</Badge>
                                  <Button size="sm">View Jobs</Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">Get personalized guidance, track your progress, and connect with mentors along the way</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button size="lg" className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Browse Learning Materials
              </Button>
              <Button variant="outline" size="lg" className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Take Skill Assessment
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default CareerPath;
