
import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { StudentJourney } from "../dashboard/StudentJourney";
import { EmployerJourney } from "../dashboard/EmployerJourney";
import { useAuth } from "@/context/AuthContext";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { user } = useAuth();
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {user && user.role === "student" && (
          <div className="container-custom pt-4">
            <StudentJourney />
          </div>
        )}
        {user && user.role === "employer" && (
          <div className="container-custom pt-4">
            <EmployerJourney />
          </div>
        )}
        {children}
      </main>
      <Footer />
    </div>
  );
}
