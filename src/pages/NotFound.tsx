
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-300px)] flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <p className="text-2xl text-gray-700 mb-8">Oops! Page not found</p>
          <p className="text-gray-500 max-w-md mx-auto mb-8">
            The page you're looking for doesn't exist or has been moved to another URL.
          </p>
          <Link to="/">
            <Button size="lg">Return to Home</Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFound;
