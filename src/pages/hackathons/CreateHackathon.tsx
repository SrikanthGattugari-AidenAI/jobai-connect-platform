
import { useState, useRef, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, Plus, Upload, X, DollarSign } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";

const CreateHackathon = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    organizer: user?.name || "",
    description: "",
    location: "",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    categories: [] as string[],
    prizes: [] as string[],
    sponsoredBy: [] as string[],
    registrationFee: "",
  });
  
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [registrationEndDate, setRegistrationEndDate] = useState<Date | undefined>(undefined);
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentPrize, setCurrentPrize] = useState("");
  const [currentSponsor, setCurrentSponsor] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        setFormData(prev => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const addCategory = () => {
    if (currentCategory && !formData.categories.includes(currentCategory)) {
      setFormData(prev => ({
        ...prev,
        categories: [...prev.categories, currentCategory]
      }));
      setCurrentCategory("");
    }
  };

  const removeCategory = (categoryToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter(category => category !== categoryToRemove)
    }));
  };

  const addPrize = () => {
    if (currentPrize && !formData.prizes.includes(currentPrize)) {
      setFormData(prev => ({
        ...prev,
        prizes: [...prev.prizes, currentPrize]
      }));
      setCurrentPrize("");
    }
  };

  const removePrize = (prizeToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      prizes: prev.prizes.filter(prize => prize !== prizeToRemove)
    }));
  };

  const addSponsor = () => {
    if (currentSponsor && !formData.sponsoredBy.includes(currentSponsor)) {
      setFormData(prev => ({
        ...prev,
        sponsoredBy: [...prev.sponsoredBy, currentSponsor]
      }));
      setCurrentSponsor("");
    }
  };

  const removeSponsor = (sponsorToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      sponsoredBy: prev.sponsoredBy.filter(sponsor => sponsor !== sponsorToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation checks
    if (!formData.title || !formData.description || !startDate || !endDate) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Prepare the hackathon data
    const hackathonData = {
      id: `hack-${Date.now()}`,
      title: formData.title,
      organizer: formData.organizer,
      description: formData.description,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      registrationEndDate: registrationEndDate ? registrationEndDate.toISOString().split('T')[0] : null,
      location: formData.location,
      image: formData.image,
      participants: 0,
      featured: false,
      categories: formData.categories,
      prizes: formData.prizes,
      sponsoredBy: formData.sponsoredBy,
      registrationFee: formData.registrationFee,
      employerId: user?.id
    };
    
    // In a real application, this would save to a database
    // For now, let's store in localStorage to simulate persistence
    const existingHackathons = JSON.parse(localStorage.getItem('employerHackathons') || '[]');
    localStorage.setItem('employerHackathons', JSON.stringify([...existingHackathons, hackathonData]));
    
    toast({
      title: "Hackathon Created!",
      description: "Your hackathon has been successfully posted.",
    });
    
    // Navigate to the hackathons list page
    navigate("/hackathons/employer");
  };

  // If not an employer, redirect to dashboard
  if (user?.role !== "employer") {
    navigate("/dashboard");
    return null;
  }

  return (
    <MainLayout>
      <div className="container-custom py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="heading-2">Create a New Hackathon</h1>
            <p className="text-muted-foreground">Fill out the form below to create and host a hackathon.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Provide the essential details about your hackathon</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Hackathon Title *</Label>
                  <Input 
                    id="title" 
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Web3 Innovation Hackathon"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="organizer">Organizer *</Label>
                  <Input 
                    id="organizer" 
                    name="organizer"
                    value={formData.organizer}
                    onChange={handleInputChange}
                    placeholder="e.g., TechGiant Inc."
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea 
                    id="description" 
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your hackathon, requirements, and objectives..."
                    className="min-h-[120px]"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : "Select start date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>End Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : "Select end date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Registration End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !registrationEndDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {registrationEndDate ? format(registrationEndDate, "PPP") : "Select registration end date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={registrationEndDate}
                        onSelect={setRegistrationEndDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="registrationFee">Registration Fee</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="registrationFee" 
                      name="registrationFee"
                      value={formData.registrationFee}
                      onChange={handleInputChange}
                      placeholder="e.g., 10.00 (leave empty if free)"
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Remote or San Francisco, CA"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
                <CardDescription>Add categories relevant to your hackathon</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input 
                    value={currentCategory}
                    onChange={(e) => setCurrentCategory(e.target.value)}
                    placeholder="e.g., Blockchain, AI, Web Development"
                    className="flex-1"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={addCategory}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                {formData.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.categories.map((category, index) => (
                      <Badge 
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {category}
                        <button 
                          type="button" 
                          onClick={() => removeCategory(category)}
                          className="ml-1 rounded-full h-4 w-4 inline-flex items-center justify-center hover:bg-muted"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Prizes</CardTitle>
                <CardDescription>Add prizes for your hackathon winners</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input 
                    value={currentPrize}
                    onChange={(e) => setCurrentPrize(e.target.value)}
                    placeholder="e.g., $5,000 First Prize"
                    className="flex-1"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={addPrize}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                {formData.prizes.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.prizes.map((prize, index) => (
                      <Badge 
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {prize}
                        <button 
                          type="button" 
                          onClick={() => removePrize(prize)}
                          className="ml-1 rounded-full h-4 w-4 inline-flex items-center justify-center hover:bg-muted"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Sponsors</CardTitle>
                <CardDescription>Add sponsors for your hackathon</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input 
                    value={currentSponsor}
                    onChange={(e) => setCurrentSponsor(e.target.value)}
                    placeholder="e.g., TechGiant"
                    className="flex-1"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={addSponsor}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                {formData.sponsoredBy.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.sponsoredBy.map((sponsor, index) => (
                      <Badge 
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {sponsor}
                        <button 
                          type="button" 
                          onClick={() => removeSponsor(sponsor)}
                          className="ml-1 rounded-full h-4 w-4 inline-flex items-center justify-center hover:bg-muted"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Banner Image</CardTitle>
                <CardDescription>Upload a banner image for your hackathon</CardDescription>
              </CardHeader>
              <CardContent>
                {previewImage ? (
                  <div className="space-y-4">
                    <div className="relative aspect-[3/1] w-full overflow-hidden rounded-lg border border-border">
                      <img 
                        src={previewImage} 
                        alt="Hackathon banner preview" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={triggerFileInput} 
                      className="w-full"
                    >
                      Choose Different Image
                    </Button>
                  </div>
                ) : (
                  <div 
                    className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer"
                    onClick={triggerFileInput}
                  >
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">Drag & drop an image here, or click to browse</p>
                    <p className="text-xs text-muted-foreground mt-1">Recommended size: 1200 x 400px (PNG, JPG)</p>
                    <Button type="button" variant="outline" size="sm" className="mt-4">
                      Browse Files
                    </Button>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </CardContent>
            </Card>
            
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button type="submit">Create Hackathon</Button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateHackathon;
