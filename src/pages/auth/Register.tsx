
import { useState, FormEvent } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { MainLayout } from "@/components/layout/MainLayout";
import { GraduationCap, Briefcase, Loader2 } from "lucide-react";

const Register = () => {
  const { role } = useParams<{ role: "student" | "employer" }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register: registerUser, isLoading } = useAuth();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [company, setCompany] = useState("");
  
  if (!role || (role !== "student" && role !== "employer")) {
    navigate("/register/student");
    return null;
  }
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    if (role === "employer" && !company) {
      toast({
        title: "Error",
        description: "Please enter your company name",
        variant: "destructive",
      });
      return;
    }
    
    try {
      if (role === "student") {
        await registerUser({ name, email }, role);
      } else {
        await registerUser({ name, email, company }, role);
      }
      
      toast({
        title: "Success",
        description: "Your account has been created successfully",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <MainLayout>
      <div className="flex min-h-[calc(100vh-200px)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              {role === "student" ? (
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
              ) : (
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
              )}
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              {role === "student" ? "Student Registration" : "Employer Registration"}
            </CardTitle>
            <CardDescription className="text-center">
              Create a new account to get started
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {role === "employer" && (
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    placeholder="Your Company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link
                  to={`/login/${role}`}
                  className="font-medium text-primary hover:underline"
                >
                  Login
                </Link>
              </div>
              <div className="text-center text-sm">
                {role === "student" ? (
                  <Link
                    to="/register/employer"
                    className="font-medium text-muted-foreground hover:underline"
                  >
                    Register as an employer instead
                  </Link>
                ) : (
                  <Link
                    to="/register/student"
                    className="font-medium text-muted-foreground hover:underline"
                  >
                    Register as a student instead
                  </Link>
                )}
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Register;
