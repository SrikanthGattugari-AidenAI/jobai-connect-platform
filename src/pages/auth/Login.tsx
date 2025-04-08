
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

const Login = () => {
  const { role } = useParams<{ role: "student" | "employer" }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, isLoading } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  if (!role || (role !== "student" && role !== "employer")) {
    navigate("/login/student");
    return null;
  }
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await login(email, password, role);
      toast({
        title: "Success",
        description: "You have been logged in successfully",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid email or password",
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
              {role === "student" ? "Student Login" : "Employer Login"}
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
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
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="#"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
              <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link
                  to={`/register/${role}`}
                  className="font-medium text-primary hover:underline"
                >
                  Sign up
                </Link>
              </div>
              <div className="text-center text-sm">
                {role === "student" ? (
                  <Link
                    to="/login/employer"
                    className="font-medium text-muted-foreground hover:underline"
                  >
                    Login as an employer instead
                  </Link>
                ) : (
                  <Link
                    to="/login/student"
                    className="font-medium text-muted-foreground hover:underline"
                  >
                    Login as a student instead
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

export default Login;
