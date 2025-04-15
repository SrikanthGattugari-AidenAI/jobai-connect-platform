
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { FileText, Upload, Download, Edit, Eye, ArrowRight, AlertTriangle } from "lucide-react";

const ResumeBuilder = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploadedResume, setUploadedResume] = useState<string | null>("resume-example.pdf"); // Mock data - would come from user profile
  
  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };
  
  const handleResumeUpload = () => {
    if (resumeFile) {
      // Here you would implement the actual upload logic
      toast({
        title: "Resume Uploaded",
        description: `Your resume "${resumeFile.name}" has been uploaded successfully.`,
      });
      setUploadedResume(resumeFile.name);
      setResumeFile(null);
    } else {
      toast({
        title: "No File Selected",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
    }
  };

  return (
    <MainLayout>
      <div className="container-custom py-8 md:py-12">
        <h1 className="heading-2 mb-2">Resume Builder</h1>
        <p className="text-muted-foreground mb-8">Create, manage and optimize your resume for job applications</p>
        
        <Tabs defaultValue="builder" className="space-y-8">
          <TabsList>
            <TabsTrigger value="uploaded">Uploaded Resume</TabsTrigger>
            <TabsTrigger value="builder">Build New Resume</TabsTrigger>
          </TabsList>
          
          <TabsContent value="uploaded">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Resume</CardTitle>
                    <CardDescription>View or upload your resume</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {uploadedResume ? (
                      <div className="border rounded-lg p-4">
                        <div className="flex flex-col space-y-4">
                          <div className="flex items-start space-x-4">
                            <div className="p-2 bg-primary/10 rounded-md">
                              <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium">{uploadedResume}</h4>
                              <p className="text-muted-foreground text-sm">Uploaded on April 15, 2025</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" size="sm" className="w-full">
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                            <Button variant="outline" size="sm" className="w-full">
                              <Eye className="mr-2 h-4 w-4" />
                              Preview
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                          <AlertTriangle className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">No Resume Found</h3>
                        <p className="text-muted-foreground mb-4">
                          Upload your existing resume below
                        </p>
                      </div>
                    )}
                    
                    <div className="border-2 border-dashed border-input rounded-lg p-4">
                      <input
                        type="file"
                        id="resume-upload"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeChange}
                      />
                      <label
                        htmlFor="resume-upload"
                        className="cursor-pointer flex flex-col items-center justify-center"
                      >
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                          <Upload className="h-5 w-5 text-primary" />
                        </div>
                        <h4 className="text-sm font-medium mb-1">
                          Click to upload resume
                        </h4>
                        <p className="text-xs text-muted-foreground mb-4">
                          PDF, DOC or DOCX (max. 5MB)
                        </p>
                      </label>
                      {resumeFile && (
                        <div className="mt-4">
                          <div className="flex items-center justify-between px-3 py-2 bg-muted rounded">
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 mr-2 text-primary" />
                              <span className="text-sm font-medium">{resumeFile.name}</span>
                            </div>
                            <Button
                              size="sm"
                              onClick={() => setResumeFile(null)}
                              variant="ghost"
                              className="h-8 w-8 p-0"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                            </Button>
                          </div>
                          <Button 
                            onClick={handleResumeUpload} 
                            className="w-full mt-4"
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Resume
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="md:col-span-2">
                {uploadedResume ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Resume Preview</CardTitle>
                      <CardDescription>
                        View and manage your uploaded resume
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="min-h-[400px] flex items-center justify-center border rounded-md">
                      <div className="text-center">
                        <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">Resume Preview</h3>
                        <p className="text-muted-foreground mb-4">
                          Download or replace your current resume
                        </p>
                        <div className="flex space-x-2 justify-center">
                          <Button>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit in Builder
                          </Button>
                          <Button variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Upload Your Resume</CardTitle>
                      <CardDescription>
                        Get started by uploading your existing resume
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="min-h-[400px] flex items-center justify-center">
                      <div className="text-center max-w-md mx-auto">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                          <Upload className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">No Resume Yet</h3>
                        <p className="text-muted-foreground mb-6">
                          Upload your existing resume or create a new one using our professional resume builder
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <Button size="lg">
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Resume
                          </Button>
                          <Button size="lg" variant="outline">
                            Build New Resume
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="builder">
            <Card>
              <CardHeader>
                <CardTitle>Resume Builder</CardTitle>
                <CardDescription>Create a professional resume in minutes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-card/50 border-2 hover:border-primary/50 transition-all cursor-pointer">
                    <CardHeader className="p-4">
                      <div className="p-2 bg-primary/10 w-fit rounded-md mb-2">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-base">Basic Template</CardTitle>
                      <CardDescription>Simple and clean professional template</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="aspect-[8.5/11] bg-muted rounded-md mb-3 border"></div>
                      <Button className="w-full" size="sm">Use Template</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-card/50 border-2 hover:border-primary/50 transition-all cursor-pointer">
                    <CardHeader className="p-4">
                      <div className="p-2 bg-primary/10 w-fit rounded-md mb-2">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-base">Modern Template</CardTitle>
                      <CardDescription>Creative design with modern styling</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="aspect-[8.5/11] bg-muted rounded-md mb-3 border"></div>
                      <Button className="w-full" size="sm">Use Template</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-card/50 border-2 hover:border-primary/50 transition-all cursor-pointer">
                    <CardHeader className="p-4">
                      <div className="p-2 bg-primary/10 w-fit rounded-md mb-2">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-base">Technical Template</CardTitle>
                      <CardDescription>Perfect for technical and engineering roles</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="aspect-[8.5/11] bg-muted rounded-md mb-3 border"></div>
                      <Button className="w-full" size="sm">Use Template</Button>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg mt-6">
                  <h3 className="font-medium text-lg mb-2">Build Your Resume from Scratch</h3>
                  <p className="text-muted-foreground mb-4">
                    Start with a blank template and customize every aspect of your resume
                  </p>
                  <Button>Start From Scratch</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ResumeBuilder;
