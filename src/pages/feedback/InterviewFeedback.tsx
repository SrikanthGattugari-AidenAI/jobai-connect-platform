
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { L1Interview } from "@/types/feedback";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, ArrowRight } from "lucide-react";
import { useFeedback } from "@/context/FeedbackContext";
import { FeedbackDetailsCard } from "@/components/feedback/FeedbackDetailsCard";

const InterviewFeedback: React.FC = () => {
  const { feedbackData } = useFeedback();
  const [activeTab, setActiveTab] = useState<"MOCK" | "L1">("MOCK");
  const [selectedFeedback, setSelectedFeedback] = useState<L1Interview | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleViewDetails = (feedback: L1Interview) => {
    setSelectedFeedback(feedback);
    setDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "PPP");
  };

  const formatDateTime = (dateString: string) => {
    return format(new Date(dateString), "PPp");
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600";
    if (score >= 6) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <MainLayout>
      <div className="container-custom py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Interview Feedback</h1>
          <p className="text-muted-foreground">
            Review your interview performance and feedback from different interview stages
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "MOCK" | "L1")} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
            <TabsTrigger value="MOCK">
              Mock Interviews ({feedbackData.MOCK.length})
            </TabsTrigger>
            <TabsTrigger value="L1">
              L1 Interviews ({feedbackData.L1.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="MOCK">
            <Card>
              <CardHeader>
                <CardTitle>Mock Interview Results</CardTitle>
                <CardDescription>
                  Results from your practice interviews with our AI interviewer
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Interview Date</TableHead>
                      <TableHead>Session ID</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {feedbackData.MOCK.map((interview) => (
                      <TableRow key={interview.session_id}>
                        <TableCell>{formatDate(interview.created_at)}</TableCell>
                        <TableCell className="font-mono text-xs">
                          {interview.session_id.substring(0, 8)}...
                        </TableCell>
                        <TableCell className={getScoreColor(interview.score)}>
                          {interview.score}/10
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" onClick={() => {}}>
                            View Session
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  {feedbackData.MOCK.length === 0 && (
                    <TableCaption>No mock interview sessions found.</TableCaption>
                  )}
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="L1">
            <Card>
              <CardHeader>
                <CardTitle>L1 Technical Interview Feedback</CardTitle>
                <CardDescription>
                  Detailed feedback from your L1 technical interview sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Session ID</TableHead>
                      <TableHead>Summary</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {feedbackData.L1.map((feedback) => (
                      <TableRow key={feedback.feedback_id}>
                        <TableCell>{formatDate(feedback.submitted_at)}</TableCell>
                        <TableCell className="font-mono text-xs">
                          {feedback.session_id.substring(0, 8)}...
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {feedback.feedback_summary}
                        </TableCell>
                        <TableCell className={getScoreColor(feedback.overall_score_out_of_10)}>
                          {feedback.overall_score_out_of_10}/10
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" onClick={() => handleViewDetails(feedback)}>
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  {feedbackData.L1.length === 0 && (
                    <TableCaption>No L1 interview feedback found.</TableCaption>
                  )}
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Feedback Details Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-2xl">
            {selectedFeedback && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">Interview Feedback Details</DialogTitle>
                  <DialogDescription>
                    Feedback from session conducted on {formatDateTime(selectedFeedback.submitted_at)}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-6 py-4">
                  <div className="space-y-2">
                    <h3 className="font-medium text-lg">Session Information</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-muted-foreground">Session ID:</div>
                      <div className="font-mono">{selectedFeedback.session_id}</div>
                      <div className="text-muted-foreground">Feedback ID:</div>
                      <div className="font-mono">{selectedFeedback.feedback_id}</div>
                      <div className="text-muted-foreground">Submitted:</div>
                      <div>{formatDateTime(selectedFeedback.submitted_at)}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium text-lg">Overall Assessment</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold">
                        <span className={getScoreColor(selectedFeedback.overall_score_out_of_10)}>
                          {selectedFeedback.overall_score_out_of_10}
                        </span>
                        <span className="text-muted-foreground">/10</span>
                      </span>
                    </div>
                    <p className="text-sm">{selectedFeedback.feedback_summary}</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">Strengths</h3>
                      <ul className="space-y-1">
                        {selectedFeedback.strengths_of_candidate.map((strength, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">Areas for Improvement</h3>
                      <ul className="space-y-1">
                        {selectedFeedback.areas_of_improvement.map((area, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <ArrowRight className="h-4 w-4 text-amber-500 mr-2" />
                            {area}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Recommended Skills to Develop</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedFeedback.skill_recommendations.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button onClick={() => setDialogOpen(false)}>Close</Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default InterviewFeedback;
