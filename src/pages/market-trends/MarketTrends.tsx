
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, Globe, BarChart, Code, Database } from "lucide-react";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Sample data for market trends
const topPayingRoles = [
  { role: "Machine Learning Engineer", salary: 135000, color: "#3b82f6" },
  { role: "AI/ML Specialist", salary: 128000, color: "#10b981" },
  { role: "Cloud Solutions Architect", salary: 120000, color: "#6366f1" },
  { role: "Full Stack Developer", salary: 110000, color: "#ec4899" },
  { role: "Cybersecurity Analyst", salary: 105000, color: "#f43f5e" }
];

const trendingSkills = [
  { skill: "AI/ML", growth: 32, color: "#10b981" },
  { skill: "Cloud Computing", growth: 28, color: "#3b82f6" },
  { skill: "Cybersecurity", growth: 25, color: "#f43f5e" },
  { skill: "Data Science", growth: 22, color: "#6366f1" },
  { skill: "Blockchain", growth: 18, color: "#8b5cf6" }
];

const topHiringLocations = [
  { location: "San Francisco", jobs: 2340, color: "#3b82f6" },
  { location: "Bangalore", jobs: 1980, color: "#10b981" },
  { location: "New York", jobs: 1750, color: "#6366f1" },
  { location: "London", jobs: 1645, color: "#ec4899" },
  { location: "Singapore", jobs: 1200, color: "#f43f5e" }
];

export default function MarketTrends() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <TrendingUp className="h-10 w-10 text-green-500" />
            Live Market Trends
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay ahead with real-time insights into job market dynamics, emerging skills, and career opportunities.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Top Paying Roles */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-primary" /> Top Paying Roles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <RechartsBarChart data={topPayingRoles}>
                  <XAxis dataKey="role" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="salary" fill="#3b82f6" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Trending Skills */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Code className="h-5 w-5 mr-2 text-primary" /> Trending Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <RechartsBarChart data={trendingSkills}>
                  <XAxis dataKey="skill" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="growth" fill="#10b981" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Hiring Locations */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Globe className="h-5 w-5 mr-2 text-primary" /> Top Hiring Locations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <RechartsBarChart data={topHiringLocations}>
                  <XAxis dataKey="location" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="jobs" fill="#3b82f6" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Button className="flex items-center gap-2 mx-auto">
            <BarChart className="h-5 w-5" />
            Download Full Market Report
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
