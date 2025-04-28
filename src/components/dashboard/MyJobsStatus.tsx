
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface JobStatus {
  status: string;
  count: number;
}

interface MyJobsStatusProps {
  statuses: JobStatus[];
}

export function MyJobsStatus({ statuses }: MyJobsStatusProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>My Jobs Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statuses.map((status) => (
            <div key={status.status} className="flex flex-col items-center p-4 bg-muted/10 rounded-lg">
              <span className="text-2xl font-bold mb-2">{status.count}</span>
              <Badge variant="secondary">{status.status}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
