
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const CallToAction = () => {
  const navigate = useNavigate();
  
  return (
    <section className="section-padding bg-brand-dark text-white">
      <div className="container-custom text-center">
        <h2 className="heading-2 mb-6">Ready to Start Your Journey?</h2>
        <p className="text-xl max-w-2xl mx-auto mb-8 text-gray-300">
          Join thousands of students and employers on our platform and take the next step in your career or find your perfect intern.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" variant="default" className="bg-brand-purple hover:bg-brand-purple/90" onClick={() => navigate("/register/student")}>
            Sign Up as Student
          </Button>
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" onClick={() => navigate("/register/employer")}>
            Sign Up as Employer
          </Button>
        </div>
      </div>
    </section>
  );
};
