
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import { MainLayout } from "./components/layout/MainLayout";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import { AuthProvider } from "./context/AuthContext";
import { AIProvider } from "./context/AIContext";
import { CourseProvider } from "./context/CourseContext";
import Courses from "./pages/courses/Courses";
import CourseDetails from "./pages/courses/CourseDetails";
import { InternshipProvider } from "./context/InternshipContext";
import Internship from "./pages/internship/Internship";
import Chatbot from "./pages/chatbot/Chatbot";
import { ChatbotProvider } from "./context/ChatbotContext";
import { Toaster } from "@/components/ui/toaster"
import ResumeBuilder from "./pages/resume-builder/ResumeBuilder";
import { ResumeProvider } from "./context/ResumeContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/courses",
    element: <Courses />,
  },
  {
    path: "/course-details/:courseId",
    element: <CourseDetails />,
  },
  {
    path: "/internship",
    element: <Internship />,
  },
  {
    path: "/resume-builder",
    element: <ResumeBuilder />,
  },
  {
    path: "/chatbot",
    element: <Chatbot />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <AIProvider>
        <CourseProvider>
          <InternshipProvider>
            <ChatbotProvider>
              <ResumeProvider>
                <RouterProvider router={router} />
                <Toaster />
              </ResumeProvider>
            </ChatbotProvider>
          </InternshipProvider>
        </CourseProvider>
      </AIProvider>
    </AuthProvider>
  );
}

export default App;
