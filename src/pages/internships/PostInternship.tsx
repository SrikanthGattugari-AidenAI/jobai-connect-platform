
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useInternships } from "@/context/InternshipContext";
import { useAI } from "@/context/AIContext";
import { countriesWithCities, categories } from "@/lib/data";
import { Sparkles, Loader2, Plus, Trash } from "lucide-react";
import { DialogTrigger, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

const PostInternship = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const { createInternship } = useInternships();
  const { generateJobDescription, isLoading: isAILoading } = useAI();
  
  const [title, setTitle] = useState("");
  const [isRemote, setIsRemote] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [role, setRole] = useState("");
  const [isPaid, setIsPaid] = useState(true);
  const [stipendAmount, setStipendAmount] = useState("");
  const [stipendCurrency, setStipendCurrency] = useState("USD");
  const [duration, setDuration] = useState("");
  const [startDate, setStartDate] = useState("");
  const [applicationDeadline, setApplicationDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [responsibilities, setResponsibilities] = useState<string[]>([""]);
  const [requirements, setRequirements] = useState<string[]>([""]);
  
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [availableRoles, setAvailableRoles] = useState<string[]>([]);
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Update available cities when country changes
  const handleCountryChange = (value: string) => {
    setCountry(value);
    setCity("");
    
    if (value) {
      const countryData = countriesWithCities.find(c => c.country === value);
      setAvailableCities(countryData ? countryData.cities : []);
    } else {
      setAvailableCities([]);
    }
  };
  
  // Update available roles when category changes
  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setRole("");
    
    if (value) {
      const categoryData = categories.find(c => c.name === value);
      setAvailableRoles(categoryData ? categoryData.roles : []);
    } else {
      setAvailableRoles([]);
    }
  };
  
  // Add/remove responsibility fields
  const addResponsibility = () => {
    setResponsibilities([...responsibilities, ""]);
  };
  
  const removeResponsibility = (index: number) => {
    if (responsibilities.length > 1) {
      const updated = [...responsibilities];
      updated.splice(index, 1);
      setResponsibilities(updated);
    }
  };
  
  const updateResponsibility = (index: number, value: string) => {
    const updated = [...responsibilities];
    updated[index] = value;
    setResponsibilities(updated);
  };
  
  // Add/remove requirement fields
  const addRequirement = () => {
    setRequirements([...requirements, ""]);
  };
  
  const removeRequirement = (index: number) => {
    if (requirements.length > 1) {
      const updated = [...requirements];
      updated.splice(index, 1);
      setRequirements(updated);
    }
  };
  
  const updateRequirement = (index: number, value: string) => {
    const updated = [...requirements];
    updated[index] = value;
    setRequirements(updated);
  };
  
  // Generate description using AI
  const handleGenerateDescription = async () => {
    if (!title || !category || responsibilities.some(r => !r) || requirements.some(r => !r)) {
      toast({
        title: "Missing information",
        description: "Please fill in the title, category, and at least one responsibility and requirement",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsGeneratingDescription(true);
      const generatedDescription = await generateJobDescription({
        title,
        category,
        responsibilities: responsibilities.filter(r => r),
        requirements: requirements.filter(r => r),
      });
      
      setDescription(generatedDescription);
      setIsGeneratingDescription(false);
      
      toast({
        title: "Description generated",
        description: "AI has generated a job description based on your inputs",
      });
    } catch (error) {
      console.error("Error generating description:", error);
      setIsGeneratingDescription(false);
      
      toast({
        title: "Error",
        description: "Failed to generate description. Please try again",
        variant: "destructive",
      });
    }
  };
  
  // Submit form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated || !user || user.role !== "employer") {
      toast({
        title: "Authentication required",
        description: "Please login as an employer to post internships",
        variant: "destructive",
      });
      return;
    }
    
    // Validate form
    if (
      !title || 
      (!isRemote && (!country || !city)) || 
      !category || 
      !role || 
      !duration || 
      !startDate || 
      !applicationDeadline || 
      !description || 
      responsibilities.some(r => !r) || 
      requirements.some(r => !r) ||
      (isPaid && (!stipendAmount || !stipendCurrency))
    ) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const newInternship = await createInternship({
        title,
        company: user.role === "employer" ? (user as any).company || "Example Company" : "Example Company",
        companyLogo: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d", // Placeholder
        employerId: user.id,
        location: isRemote ? "Remote" : `${city}, ${country}`,
        isRemote,
        country: isRemote ? "Remote" : country,
        city: isRemote ? "Remote" : city,
        category,
        role,
        stipend: {
          amount: isPaid ? Number(stipendAmount) : 0,
          currency: stipendCurrency,
          isPaid,
        },
        duration,
        startDate,
        applicationDeadline,
        responsibilities: responsibilities.filter(r => r),
        requirements: requirements.filter(r => r),
        description,
      });
      
      toast({
        title: "Internship posted",
        description: "Your internship has been successfully posted",
      });
      
      navigate(`/internships/${newInternship.id}`);
    } catch (error) {
      console.error("Error posting internship:", error);
      setIsSubmitting(false);
      
      toast({
        title: "Error",
        description: "Failed to post internship. Please try again",
        variant: "destructive",
      });
    }
  };
  
  // Redirect to login if not authenticated or not an employer
  if (isAuthenticated && user && user.role !== "employer") {
    navigate("/dashboard");
    return null;
  }
  
  return (
    <MainLayout>
      <div className="container-custom py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="heading-2 mb-4">Post a New Internship</h1>
          <p className="text-muted-foreground mb-8">
            Fill out the form below to create a new internship opportunity for students
          </p>
          
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Internship Details</CardTitle>
                <CardDescription>
                  Provide the basic information about this internship
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Internship Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Frontend Developer Intern"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isRemote"
                    checked={isRemote}
                    onCheckedChange={(checked) => setIsRemote(checked as boolean)}
                  />
                  <Label htmlFor="isRemote">This is a remote position</Label>
                </div>
                
                {!isRemote && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select value={country} onValueChange={handleCountryChange}>
                        <SelectTrigger id="country">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countriesWithCities
                            .filter(c => c.country !== "Remote")
                            .map((countryOption) => (
                              <SelectItem key={countryOption.country} value={countryOption.country}>
                                {countryOption.country}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Select
                        value={city}
                        onValueChange={setCity}
                        disabled={!country || availableCities.length === 0}
                      >
                        <SelectTrigger id="city">
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableCities.map((cityOption) => (
                            <SelectItem key={cityOption} value={cityOption}>
                              {cityOption}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={handleCategoryChange}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((categoryOption) => (
                          <SelectItem key={categoryOption.id} value={categoryOption.name}>
                            {categoryOption.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select
                      value={role}
                      onValueChange={setRole}
                      disabled={!category || availableRoles.length === 0}
                    >
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableRoles.map((roleOption) => (
                          <SelectItem key={roleOption} value={roleOption}>
                            {roleOption}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isPaid"
                      checked={isPaid}
                      onCheckedChange={(checked) => setIsPaid(checked as boolean)}
                    />
                    <Label htmlFor="isPaid">This is a paid position</Label>
                  </div>
                  
                  {isPaid && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                      <div className="space-y-2">
                        <Label htmlFor="stipendAmount">Stipend Amount</Label>
                        <Input
                          id="stipendAmount"
                          type="number"
                          min="0"
                          placeholder="e.g., 1000"
                          value={stipendAmount}
                          onChange={(e) => setStipendAmount(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="stipendCurrency">Currency</Label>
                        <Select value={stipendCurrency} onValueChange={setStipendCurrency}>
                          <SelectTrigger id="stipendCurrency">
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="EUR">EUR</SelectItem>
                            <SelectItem value="GBP">GBP</SelectItem>
                            <SelectItem value="CAD">CAD</SelectItem>
                            <SelectItem value="AUD">AUD</SelectItem>
                            <SelectItem value="INR">INR</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      placeholder="e.g., 3 months"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="applicationDeadline">Application Deadline</Label>
                    <Input
                      id="applicationDeadline"
                      type="date"
                      value={applicationDeadline}
                      onChange={(e) => setApplicationDeadline(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Responsibilities and Requirements</CardTitle>
                <CardDescription>
                  List the key responsibilities and requirements for this role
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Responsibilities</Label>
                    <Button type="button" size="sm" variant="outline" onClick={addResponsibility}>
                      <Plus className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </div>
                  
                  {responsibilities.map((responsibility, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        placeholder={`Responsibility ${index + 1}`}
                        value={responsibility}
                        onChange={(e) => updateResponsibility(index, e.target.value)}
                      />
                      {responsibilities.length > 1 && (
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={() => removeResponsibility(index)}
                        >
                          <Trash className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Requirements</Label>
                    <Button type="button" size="sm" variant="outline" onClick={addRequirement}>
                      <Plus className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </div>
                  
                  {requirements.map((requirement, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        placeholder={`Requirement ${index + 1}`}
                        value={requirement}
                        onChange={(e) => updateRequirement(index, e.target.value)}
                      />
                      {requirements.length > 1 && (
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={() => removeRequirement(index)}
                        >
                          <Trash className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Internship Description</CardTitle>
                    <CardDescription>
                      Provide a detailed description of the internship
                    </CardDescription>
                  </div>
                  
                  <Dialog open={isGeneratingDescription} onOpenChange={setIsGeneratingDescription}>
                    <DialogTrigger asChild>
                      <Button type="button" variant="outline" className="flex items-center">
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate with AI
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Generate Description with AI</DialogTitle>
                        <DialogDescription>
                          Our AI will create a compelling internship description based on the information you've provided.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="py-4">
                        <p className="mb-4">
                          The AI will use the following information to generate the description:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li><strong>Title:</strong> {title || "Not provided"}</li>
                          <li><strong>Category:</strong> {category || "Not provided"}</li>
                          <li><strong>Role:</strong> {role || "Not provided"}</li>
                          <li>
                            <strong>Responsibilities:</strong>{" "}
                            {responsibilities.filter(r => r).length > 0 
                              ? `${responsibilities.filter(r => r).length} provided` 
                              : "None provided"}
                          </li>
                          <li>
                            <strong>Requirements:</strong>{" "}
                            {requirements.filter(r => r).length > 0 
                              ? `${requirements.filter(r => r).length} provided` 
                              : "None provided"}
                          </li>
                        </ul>
                      </div>
                      
                      <DialogFooter>
                        <Button type="button" variant="secondary" onClick={() => setIsGeneratingDescription(false)}>
                          Cancel
                        </Button>
                        <Button 
                          type="button" 
                          onClick={handleGenerateDescription}
                          disabled={isAILoading}
                        >
                          {isAILoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Generating...
                            </>
                          ) : (
                            <>
                              <Sparkles className="mr-2 h-4 w-4" />
                              Generate Description
                            </>
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Describe the internship in detail..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={10}
                />
              </CardContent>
              <CardFooter className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Posting...
                    </>
                  ) : (
                    "Post Internship"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default PostInternship;
