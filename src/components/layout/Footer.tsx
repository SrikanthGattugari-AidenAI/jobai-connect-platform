
import { Link } from "react-router-dom";
import { GraduationCap, Twitter, Facebook, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center space-x-2">
              <GraduationCap className="h-6 w-6 text-brand-purple" />
              <span className="text-xl font-bold">InternAI</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Connecting talented students with high-quality internships and skills development opportunities, powered by AI.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold">For Students</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/internships" className="text-muted-foreground hover:text-foreground transition-colors">
                  Browse Internships
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-muted-foreground hover:text-foreground transition-colors">
                  Explore Courses
                </Link>
              </li>
              <li>
                <Link to="/mock-interview" className="text-muted-foreground hover:text-foreground transition-colors">
                  Mock Interviews
                </Link>
              </li>
              <li>
                <Link to="/register/student" className="text-muted-foreground hover:text-foreground transition-colors">
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold">For Employers</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/post-internship" className="text-muted-foreground hover:text-foreground transition-colors">
                  Post Internship
                </Link>
              </li>
              <li>
                <Link to="/register/employer" className="text-muted-foreground hover:text-foreground transition-colors">
                  Create Account
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Find Talent
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Success Stories
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold">Resources</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Career Advice
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-6">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {currentYear} InternAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
