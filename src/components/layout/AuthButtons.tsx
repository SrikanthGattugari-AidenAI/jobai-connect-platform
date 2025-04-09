
import { useNavigate } from "react-router-dom";
import { GraduationCap, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const AuthButtons = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Login</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={() => navigate("/login/student")}>
            <GraduationCap className="mr-2 h-4 w-4" />
            <span>Student Login</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/login/employer")}>
            <Briefcase className="mr-2 h-4 w-4" />
            <span>Employer Login</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Register</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={() => navigate("/register/student")}>
            <GraduationCap className="mr-2 h-4 w-4" />
            <span>Student Register</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/register/employer")}>
            <Briefcase className="mr-2 h-4 w-4" />
            <span>Employer Register</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
