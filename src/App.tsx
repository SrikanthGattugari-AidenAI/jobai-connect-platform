
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import "./App.css";
import { MainLayout } from "./components/layout/MainLayout";
import { AuthProvider } from "./context/AuthContext";
import { CourseProvider } from "./context/CourseContext";
import { InternshipProvider } from "./context/InternshipContext";
import { ChatbotProvider } from "./context/ChatbotContext";
import { ResumeProvider } from "./context/ResumeContext";
import { Toaster } from "@/components/ui/toaster";
import ResumeBuilder from "./pages/resume-builder/ResumeBuilder";

// Note: Creating placeholder components for missing pages
const Home = () => <div className="p-8"><h1 className="text-2xl font-bold">Home Page</h1></div>;
const Login = () => <div className="p-8"><h1 className="text-2xl font-bold">Login Page</h1></div>;
const Register = () => <div className="p-8"><h1 className="text-2xl font-bold">Register Page</h1></div>;
const Profile = () => <div className="p-8"><h1 className="text-2xl font-bold">Profile Page</h1></div>;
const Courses = () => <div className="p-8"><h1 className="text-2xl font-bold">Courses Page</h1></div>;
const CourseDetails = () => <div className="p-8"><h1 className="text-2xl font-bold">Course Details Page</h1></div>;
const Internship = () => <div className="p-8"><h1 className="text-2xl font-bold">Internship Page</h1></div>;
const Chatbot = () => <div className="p-8"><h1 className="text-2xl font-bold">Chatbot Page</h1></div>;

// Create a simple AIProvider component since it's missing
const AIProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout>
      <Outlet />
    </MainLayout>,
    children: [
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
    ],
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
