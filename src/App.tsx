
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { InternshipProvider } from "@/context/InternshipContext";
import { CourseProvider } from "@/context/CourseContext";
import { AIProvider } from "@/context/AIContext";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Internships from "./pages/internships/Internships";
import InternshipDetail from "./pages/internships/InternshipDetail";
import PostInternship from "./pages/internships/PostInternship";
import Courses from "./pages/courses/Courses";
import CourseDetail from "./pages/courses/CourseDetail";
import MockInterview from "./pages/mock-interview/MockInterview";
import MockInterviewSession from "./pages/mock-interview/MockInterviewSession";
import Dashboard from "./pages/dashboard/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <InternshipProvider>
          <CourseProvider>
            <AIProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/login/:role" element={<Login />} />
                    <Route path="/register/:role" element={<Register />} />
                    <Route path="/internships" element={<Internships />} />
                    <Route path="/internships/:id" element={<InternshipDetail />} />
                    <Route path="/post-internship" element={<PostInternship />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/courses/:id" element={<CourseDetail />} />
                    <Route path="/mock-interview" element={<MockInterview />} />
                    <Route path="/mock-interview/:id" element={<MockInterviewSession />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </TooltipProvider>
            </AIProvider>
          </CourseProvider>
        </InternshipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
