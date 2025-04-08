
import { useAuth } from "@/context/AuthContext";
import StudentDashboard from "./StudentDashboard";
import EmployerDashboard from "./EmployerDashboard";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isLoading && !isAuthenticated) {
      navigate("/login/student");
    }
  }, [isAuthenticated, isLoading, navigate]);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated || !user) {
    return null; // Will be redirected by the effect
  }
  
  // Render the appropriate dashboard based on user role
  return user.role === "student" ? <StudentDashboard /> : <EmployerDashboard />;
};

export default Dashboard;
