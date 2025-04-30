
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useLocation } from "react-router-dom";
import { Home, Briefcase, Users, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

export function EmployerNavigation() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="w-full bg-white shadow-sm py-2 mb-6">
      <div className="container-custom">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/dashboard" className="flex items-center">
                  <Home className="h-4 w-4 mr-1" />
                  Dashboard
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/manage-jobs" className={`flex items-center ${path.includes('manage-jobs') ? 'font-semibold text-primary' : ''}`}>
                  <Briefcase className="h-4 w-4 mr-1" />
                  Manage Jobs
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/candidate-matching" className={`flex items-center ${path.includes('candidate-matching') ? 'font-semibold text-primary' : ''}`}>
                  <Users className="h-4 w-4 mr-1" />
                  Manage Candidates
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/hackathons/employer" className={`flex items-center ${path.includes('hackathons') ? 'font-semibold text-primary' : ''}`}>
                  <Trophy className="h-4 w-4 mr-1" />
                  Hackathons
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
