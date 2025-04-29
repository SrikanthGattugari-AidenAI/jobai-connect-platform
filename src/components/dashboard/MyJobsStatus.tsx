
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

interface JobStatus {
  status: string;
  count: number;
}

interface MyJobsStatusProps {
  statuses: JobStatus[];
}

export function MyJobsStatus({ statuses }: MyJobsStatusProps) {
  return (
    <ScrollAnimation animation="fadeIn">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>My Jobs Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statuses.map((status, index) => (
              <ScrollAnimation key={status.status} delay={index * 0.1} animation="popUp">
                <div className="flex flex-col items-center p-4 bg-muted/10 rounded-lg">
                  <span className="text-2xl font-bold mb-2">{status.count}</span>
                  <Badge variant="secondary">{status.status}</Badge>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </CardContent>
      </Card>
    </ScrollAnimation>
  );
}
