
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
import { ChatbotProvider } from "@/context/ChatbotContext";
import { JobProvider } from "@/context/JobContext";
import { FeedbackProvider } from "@/context/FeedbackContext";
import { JobApplicationProvider } from "@/context/JobApplicationContext";
import { Chatbot } from "@/components/chatbot/Chatbot";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Internships from "./pages/internships/Internships";
import InternshipDetail from "./pages/internships/InternshipDetail";
import PostInternship from "./pages/internships/PostInternship";
import Jobs from "./pages/jobs/Jobs";
import JobDetail from "./pages/jobs/JobDetail";
import Courses from "./pages/courses/Courses";
import CourseDetail from "./pages/courses/CourseDetail";
import MockInterview from "./pages/mock-interview/MockInterview";
import MockInterviewSession from "./pages/mock-interview/MockInterviewSession";
import Dashboard from "./pages/dashboard/Dashboard";
import ManageJobs from "./pages/employer/ManageJobs";
import CandidateMatching from "./pages/employer/CandidateMatching";
import MarketTrends from "./pages/market-trends/MarketTrends";
import CareerPath from "./pages/career-path/CareerPath";
import TechnicalChallenge from "./pages/technical-challenge/TechnicalChallenge";
import Hackathons from "./pages/hackathons/Hackathons";
import HackathonDetail from "./pages/hackathons/HackathonDetail";
import CreateHackathon from "./pages/hackathons/CreateHackathon";
import EmployerHackathons from "./pages/hackathons/EmployerHackathons";
import HackathonDetailPage from "./pages/hackathons/HackathonDetailPage";
import ResumeBuilder from "./pages/resume-builder/ResumeBuilder";
import Blog from "./pages/blog/Blog";
import BlogPost from "./pages/blog/BlogPost";
import CompanyProfiles from "./pages/companies/CompanyProfiles";
import CompanyDetail from "./pages/companies/CompanyDetail";
import Profile from "./pages/profile/Profile";
import Settings from "./pages/settings/Settings";
import L1TechnicalInterview from "./pages/technical-interview/L1TechnicalInterview";
import { ProcessingScreen } from "./components/technical-interview/ProcessingScreen";
import { TerminatedScreen } from "./components/technical-interview/TerminatedScreen";
import InterviewFeedback from "./pages/feedback/InterviewFeedback";
import JobApplications from "./pages/applications/JobApplications";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <InternshipProvider>
          <CourseProvider>
            <AIProvider>
              <ChatbotProvider>
                <JobProvider>
                  <FeedbackProvider>
                    <JobApplicationProvider>
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
                            <Route path="/jobs" element={<Jobs />} />
                            <Route path="/jobs/:id" element={<JobDetail />} />
                            <Route path="/courses" element={<Courses />} />
                            <Route path="/courses/:id" element={<CourseDetail />} />
                            <Route path="/mock-interview" element={<MockInterview />} />
                            <Route path="/mock-interview/:id" element={<MockInterviewSession />} />
                            <Route path="/technical-challenge" element={<TechnicalChallenge />} />
                            <Route path="/technical-challenge/:id" element={<TechnicalChallenge />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/employer/manage-jobs" element={<ManageJobs />} />
                            <Route path="/employer/candidates" element={<CandidateMatching />} />
                            <Route path="/employer/hackathons" element={<EmployerHackathons />} />
                            <Route path="/market-trends" element={<MarketTrends />} />
                            <Route path="/career-path" element={<CareerPath />} />
                            <Route path="/career-roadmaps/:id" element={<CareerPath />} />
                            <Route path="/career-roadmaps" element={<CareerPath />} />
                            <Route path="/hackathons" element={<Hackathons />} />
                            <Route path="/hackathons/:id" element={<HackathonDetail />} />
                            <Route path="/hackathons/create" element={<CreateHackathon />} />
                            <Route path="/hackathons/employer" element={<EmployerHackathons />} />
                            <Route path="/hackathons/view/:id" element={<HackathonDetailPage />} />
                            <Route path="/resume-builder" element={<ResumeBuilder />} />
                            <Route path="/blog" element={<Blog />} />
                            <Route path="/blog/:id" element={<BlogPost />} />
                            <Route path="/companies" element={<CompanyProfiles />} />
                            <Route path="/companies/:id" element={<CompanyDetail />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/l1-technical-interview" element={<L1TechnicalInterview />} />
                            <Route path="/interview-feedback" element={<InterviewFeedback />} />
                            <Route path="/applications" element={<JobApplications />} />
                            <Route path="/processing" element={<ProcessingScreen />} />
                            <Route path="/terminated" element={<TerminatedScreen />} />
                            <Route path="*" element={<NotFound />} />
                          </Routes>
                          <Chatbot />
                        </BrowserRouter>
                      </TooltipProvider>
                    </JobApplicationProvider>
                  </FeedbackProvider>
                </JobProvider>
              </ChatbotProvider>
            </AIProvider>
          </CourseProvider>
        </InternshipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
