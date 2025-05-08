
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useJobApplications } from "@/context/JobApplicationContext";
import { ApplicationsTable } from "@/components/applications/ApplicationsTable";
import { ApplicationStatus } from "@/types/application";

const JobApplications: React.FC = () => {
  const { applications, isLoading } = useJobApplications();
  const [activeTab, setActiveTab] = useState<ApplicationStatus>("Applied");
  
  const statusCounts = {
    Applied: applications.Applied.length,
    Interviewed: applications.Interviewed.length,
    Shortlisted: applications.Shortlisted.length,
    Hired: applications.Hired.length,
    Rejected: applications.Rejected.length,
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as ApplicationStatus);
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container-custom py-8">
          <div className="flex justify-center items-center h-64">
            <p>Loading applications...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container-custom py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">My Job Applications</h1>
          <p className="text-muted-foreground">
            Track and manage all your job applications in one place
          </p>
        </div>

        <Tabs defaultValue="Applied" onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="Applied">
              Applied ({statusCounts.Applied})
            </TabsTrigger>
            <TabsTrigger value="Shortlisted">
              Shortlisted ({statusCounts.Shortlisted})
            </TabsTrigger>
            <TabsTrigger value="Interviewed">
              Interviewed ({statusCounts.Interviewed})
            </TabsTrigger>
            <TabsTrigger value="Hired">
              Hired ({statusCounts.Hired})
            </TabsTrigger>
            <TabsTrigger value="Rejected">
              Rejected ({statusCounts.Rejected})
            </TabsTrigger>
          </TabsList>

          {(Object.keys(applications) as ApplicationStatus[]).map((status) => (
            <TabsContent key={status} value={status}>
              <Card>
                <CardHeader>
                  <CardTitle>{status} Applications</CardTitle>
                  <CardDescription>
                    {status === "Applied" && "Applications you've submitted recently"}
                    {status === "Shortlisted" && "Applications where you've been shortlisted for further rounds"}
                    {status === "Interviewed" && "Applications where you've completed interviews"}
                    {status === "Hired" && "Congratulations! These are the positions you've been hired for"}
                    {status === "Rejected" && "Applications that were not selected"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ApplicationsTable 
                    applications={applications[status]} 
                    category={status} 
                  />
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default JobApplications;
