
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardStatsProps {
  totalJobs: number;
  confidenceScore: number;
  enrolledCoursesCount: number;
  dreamInternshipsCount: number;
}

export function DashboardStats({ 
  totalJobs,
  confidenceScore,
  enrolledCoursesCount,
  dreamInternshipsCount
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
          <CardTitle className="text-sm font-medium text-muted-foreground">Confidence Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{confidenceScore}%</div>
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
          <CardTitle className="text-sm font-medium text-muted-foreground">Dream Internships</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{dreamInternshipsCount}</div>
        </CardContent>
      </Card>
    </div>
  );
}
