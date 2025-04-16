
import React, { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/hooks/use-user";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { useResume } from "@/context/ResumeContext";
import { FileText, Download, Upload, Eye } from "lucide-react";
import { ResumePreviewDialog } from "@/components/resume/ResumePreviewDialog";

const Profile = () => {
  const { user: authUser, logout } = useAuth();
  const { user, isLoading, updateUser } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const { uploadedResume, resumePreviewUrl, setUploadedResume } = useResume();
  const [isResumePreviewOpen, setIsResumePreviewOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setBio(user.bio || "");
      setLocation(user.location || "");
      setWebsite(user.website || "");
    }
  }, [user]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateUser({
        name,
        email,
        bio,
        location,
        website,
      });

      toast({
        title: "Profile updated successfully!",
        description: "Your profile information has been updated.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to update profile",
        description: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to sign out",
        description: error.message || "Something went wrong. Please try again.",
      });
    }
  };
  
  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedResume(e.target.files[0]);
      toast({
        title: "Resume Uploaded",
        description: "Your resume has been uploaded successfully.",
      });
    }
  };
  
  const handleDownloadResume = () => {
    if (resumePreviewUrl && uploadedResume) {
      const a = document.createElement('a');
      a.href = resumePreviewUrl;
      a.download = uploadedResume.name || 'resume.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      toast({
        title: "Resume Downloaded",
        description: "Your resume has been downloaded successfully.",
      });
    } else {
      toast({
        title: "No Resume Available",
        description: "There is no resume available to download.",
        variant: "destructive",
      });
    }
  };

  return (
    <MainLayout>
      <div className="container-custom py-8">
        <div className="mb-8">
          <h1 className="heading-2">Profile</h1>
          <p className="text-muted-foreground">Manage your profile information</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>Manage your account settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoading ? (
                  <Skeleton className="h-4 w-[200px]" />
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">
                      Logged in as {user?.name || authUser?.email}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {user?.email || authUser?.email}
                    </p>
                  </div>
                )}
                <Button variant="destructive" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-3">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="w-full justify-start mb-4">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="skills">Skills & Experience</TabsTrigger>
                <TabsTrigger value="social">Social Profiles</TabsTrigger>
                <TabsTrigger value="resume">Resume</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            placeholder="Your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={isLoading}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={true}
                          />
                          <p className="text-sm text-muted-foreground">
                            Email cannot be changed
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          placeholder="Write a short bio about yourself"
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          disabled={isLoading}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            placeholder="Your location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            disabled={isLoading}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="website">Website</Label>
                          <Input
                            id="website"
                            type="url"
                            placeholder="Your website URL"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                      <Button disabled={isLoading || isSubmitting}>
                        {isSubmitting ? "Updating..." : "Update Profile"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="education">
                <Card>
                  <CardHeader>
                    <CardTitle>Education</CardTitle>
                    <CardDescription>Add your education details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>This feature is coming soon!</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="skills">
                <Card>
                  <CardHeader>
                    <CardTitle>Skills & Experience</CardTitle>
                    <CardDescription>Add your skills and experience</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>This feature is coming soon!</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="social">
                <Card>
                  <CardHeader>
                    <CardTitle>Social Profiles</CardTitle>
                    <CardDescription>Add links to your social profiles</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>This feature is coming soon!</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="resume">
                <Card>
                  <CardHeader>
                    <CardTitle>Resume Management</CardTitle>
                    <CardDescription>Upload and manage your resume</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-medium mb-4">Current Resume</h3>
                          {uploadedResume ? (
                            <div className="border rounded-lg p-4">
                              <div className="flex items-start space-x-4 mb-4">
                                <div className="p-2 bg-primary/10 rounded-md">
                                  <FileText className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium">{uploadedResume.name}</h4>
                                  <p className="text-muted-foreground text-sm">
                                    Uploaded {new Date().toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={handleDownloadResume}
                                  className="flex-1"
                                >
                                  <Download className="mr-2 h-4 w-4" />
                                  Download
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => setIsResumePreviewOpen(true)}
                                  className="flex-1"
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  Preview
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="border border-dashed rounded-lg p-6 text-center">
                              <p className="text-muted-foreground mb-2">No resume uploaded yet</p>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => document.getElementById('profile-resume-upload')?.click()}
                              >
                                <Upload className="mr-2 h-4 w-4" />
                                Upload Resume
                              </Button>
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-4">Upload New Resume</h3>
                          <div className="border-2 border-dashed border-input rounded-lg p-6">
                            <input
                              type="file"
                              id="profile-resume-upload"
                              className="hidden"
                              accept=".pdf,.doc,.docx"
                              onChange={handleResumeChange}
                            />
                            <label
                              htmlFor="profile-resume-upload"
                              className="cursor-pointer flex flex-col items-center justify-center"
                            >
                              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                <Upload className="h-5 w-5 text-primary" />
                              </div>
                              <h4 className="text-base font-medium mb-1">
                                Click to update your resume
                              </h4>
                              <p className="text-sm text-muted-foreground mb-4 text-center">
                                PDF, DOC or DOCX (max. 5MB)
                              </p>
                            </label>
                          </div>
                          
                          <div className="mt-4">
                            <h4 className="font-medium mb-2">Tips:</h4>
                            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                              <li>Keep your resume up to date</li>
                              <li>Include relevant skills and experience</li>
                              <li>Use our Resume Builder for a professional layout</li>
                              <li>Check your resume's ATS score for best results</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <ResumePreviewDialog 
        isOpen={isResumePreviewOpen}
        onClose={() => setIsResumePreviewOpen(false)}
        resumeName={uploadedResume?.name || "Resume"}
      />
    </MainLayout>
  );
};

export default Profile;
