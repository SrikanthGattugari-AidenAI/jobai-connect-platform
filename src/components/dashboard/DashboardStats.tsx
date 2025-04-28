
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardStatsProps {
  totalJobs: number;
  applicationCount: number;
  enrolledCoursesCount: number;
  savedInternshipsCount: number;
}

export function DashboardStats({ 
  totalJobs,
  applicationCount,
  enrolledCoursesCount,
  savedInternshipsCount
}: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Jobs Available</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalJobs}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Active Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{applicationCount}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Enrolled Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{enrolledCoursesCount}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Saved Internships</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{savedInternshipsCount}</div>
        </CardContent>
      </Card>
    </div>
  );
}
