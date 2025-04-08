
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Calendar, 
  Bookmark, 
  Share2, 
  BookmarkCheck,
  Building, 
  Tag,
  ChevronLeft,
  Loader2
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useInternships } from "@/context/InternshipContext";
import { formatDistanceToNow, format } from "date-fns";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const InternshipDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { getInternship, saveInternship, unsaveInternship, getSavedInternships, applyToInternship } = useInternships();
  const { toast } = useToast();
  
  const [internship, setInternship] = useState(getInternship(id || ""));
  const [isSaved, setIsSaved] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (!internship) {
      navigate("/internships");
      return;
    }
    
    if (isAuthenticated && user && user.role === "student") {
      const savedInternships = getSavedInternships(user.id);
      setIsSaved(savedInternships.includes(internship.id));
    }
  }, [internship, isAuthenticated, user, getSavedInternships]);
  
  if (!internship) {
    return <MainLayout><div className="container-custom py-12">Loading...</div></MainLayout>;
  }
  
  const toggleSave = async () => {
    if (!isAuthenticated || !user || user.role !== "student") {
      toast({
        title: "Authentication required",
        description: "Please login as a student to save internships",
        variant: "destructive",
      });
      return;
    }
    
    try {
      if (isSaved) {
        await unsaveInternship(internship.id, user.id);
      } else {
        await saveInternship(internship.id, user.id);
      }
      setIsSaved(!isSaved);
      
      toast({
        title: isSaved ? "Internship unsaved" : "Internship saved",
        description: isSaved 
          ? "This internship has been removed from your saved list" 
          : "This internship has been added to your saved list",
      });
    } catch (error) {
      console.error("Error toggling save:", error);
      toast({
        title: "Error",
        description: "An error occurred while saving the internship",
        variant: "destructive",
      });
    }
  };
  
  const handleApply = async () => {
    if (!isAuthenticated || !user || user.role !== "student") {
      toast({
        title: "Authentication required",
        description: "Please login as a student to apply for internships",
        variant: "destructive",
      });
      return;
    }
    
    setIsApplying(true);
  };
  
  const submitApplication = async () => {
    if (!isAuthenticated || !user || user.role !== "student") return;
    
    setIsSubmitting(true);
    
    try {
      await applyToInternship(internship.id, {
        studentId: user.id,
        status: "pending",
        coverLetter,
      });
      
      setIsApplying(false);
      setCoverLetter("");
      
      toast({
        title: "Application submitted",
        description: "Your application has been successfully submitted",
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        title: "Error",
        description: "An error occurred while submitting your application",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <MainLayout>
      <div className="container-custom py-8 md:py-12">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Internships
          </Button>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="heading-2 mb-1">{internship.title}</h1>
              <div className="flex items-center text-muted-foreground">
                <Building className="mr-2 h-4 w-4" />
                <span>{internship.company}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {isAuthenticated && user?.role === "student" && (
                <Button variant="outline" onClick={toggleSave}>
                  {isSaved ? (
                    <>
                      <BookmarkCheck className="mr-2 h-5 w-5" />
                      Saved
                    </>
                  ) : (
                    <>
                      <Bookmark className="mr-2 h-5 w-5" />
                      Save
                    </>
                  )}
                </Button>
              )}
              <Button variant="outline">
                <Share2 className="mr-2 h-5 w-5" />
                Share
              </Button>
              {isAuthenticated && user?.role === "student" && (
                <Dialog open={isApplying} onOpenChange={setIsApplying}>
                  <DialogTrigger asChild>
                    <Button>Apply Now</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Apply for {internship.title}</DialogTitle>
                      <DialogDescription>
                        Write a cover letter to introduce yourself and explain why you're a great fit.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <Textarea
                        placeholder="Write your cover letter here..."
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        rows={8}
                        className="resize-none"
                      />
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsApplying(false)}>
                        Cancel
                      </Button>
                      <Button 
                        onClick={submitApplication} 
                        disabled={!coverLetter.trim() || isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Submit Application"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
              {isAuthenticated && user?.role === "employer" && (
                <Button disabled>Your Posting</Button>
              )}
              {!isAuthenticated && (
                <Button onClick={() => navigate("/login/student")}>
                  Login to Apply
                </Button>
              )}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="details">
              <TabsList className="mb-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="company">Company</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center p-4 bg-muted rounded-md">
                    <MapPin className="mr-3 h-5 w-5 text-primary" />
                    <div>
                      <div className="text-sm font-medium">Location</div>
                      <div>{internship.isRemote ? "Remote" : `${internship.city}, ${internship.country}`}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-muted rounded-md">
                    <DollarSign className="mr-3 h-5 w-5 text-primary" />
                    <div>
                      <div className="text-sm font-medium">Stipend</div>
                      <div>
                        {internship.stipend.isPaid 
                          ? `${internship.stipend.amount} ${internship.stipend.currency}/month` 
                          : "Unpaid"}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-muted rounded-md">
                    <Clock className="mr-3 h-5 w-5 text-primary" />
                    <div>
                      <div className="text-sm font-medium">Duration</div>
                      <div>{internship.duration}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-muted rounded-md">
                    <Calendar className="mr-3 h-5 w-5 text-primary" />
                    <div>
                      <div className="text-sm font-medium">Start Date</div>
                      <div>{format(new Date(internship.startDate), "MMMM d, yyyy")}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-muted rounded-md">
                    <Tag className="mr-3 h-5 w-5 text-primary" />
                    <div>
                      <div className="text-sm font-medium">Category</div>
                      <div>{internship.category}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-muted rounded-md">
                    <Building className="mr-3 h-5 w-5 text-primary" />
                    <div>
                      <div className="text-sm font-medium">Role</div>
                      <div>{internship.role}</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Description</h3>
                  <p className="text-gray-700 whitespace-pre-line">{internship.description}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Responsibilities</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {internship.responsibilities.map((responsibility, index) => (
                      <li key={index}>{responsibility}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {internship.requirements.map((requirement, index) => (
                      <li key={index}>{requirement}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="company">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    {internship.companyLogo ? (
                      <div className="h-16 w-16 rounded-md overflow-hidden border">
                        <img 
                          src={internship.companyLogo} 
                          alt={internship.company} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-16 w-16 rounded-md bg-muted flex items-center justify-center">
                        <span className="text-2xl font-bold">{internship.company.charAt(0)}</span>
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-bold">{internship.company}</h3>
                      <p className="text-muted-foreground">{internship.category}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700">
                    This is a placeholder for the company description. In a real application, this would contain more information about the company.
                  </p>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Company Details</h3>
                    <ul className="space-y-4">
                      <li className="flex">
                        <span className="text-muted-foreground w-32">Location:</span>
                        <span>{internship.city}, {internship.country}</span>
                      </li>
                      <li className="flex">
                        <span className="text-muted-foreground w-32">Industry:</span>
                        <span>{internship.category}</span>
                      </li>
                      <li className="flex">
                        <span className="text-muted-foreground w-32">Website:</span>
                        <a href="#" className="text-primary hover:underline">https://example.com</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <div className="bg-muted rounded-lg p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Application Details</h3>
              
              <ul className="space-y-4">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Posted:</span>
                  <span>{formatDistanceToNow(new Date(internship.postedDate), { addSuffix: true })}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Application Deadline:</span>
                  <span>{format(new Date(internship.applicationDeadline), "MMMM d, yyyy")}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Start Date:</span>
                  <span>{format(new Date(internship.startDate), "MMMM d, yyyy")}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span>{internship.duration}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Stipend:</span>
                  <span>
                    {internship.stipend.isPaid 
                      ? `${internship.stipend.amount} ${internship.stipend.currency}/month` 
                      : "Unpaid"}
                  </span>
                </li>
              </ul>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground block">Apply now to join {internship.company}</span>
                {isAuthenticated && user?.role === "student" ? (
                  <Button className="w-full" onClick={handleApply}>Apply Now</Button>
                ) : isAuthenticated && user?.role === "employer" ? (
                  <Button className="w-full" disabled>Your Posting</Button>
                ) : (
                  <Button className="w-full" onClick={() => navigate("/login/student")}>
                    Login to Apply
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default InternshipDetail;
