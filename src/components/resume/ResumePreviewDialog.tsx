
import React from "react";
import { FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ResumePreviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  resumeName: string;
}

export const ResumePreviewDialog = ({
  isOpen,
  onClose,
  resumeName,
}: ResumePreviewDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>Resume Preview: {resumeName}</DialogTitle>
          <DialogDescription>Viewing your uploaded resume</DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-auto">
          <div className="bg-white p-8 min-h-[600px] border rounded-md">
            {/* Mock resume preview - in a real implementation, this would render the actual resume */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold">John Smith</h1>
              <p className="text-gray-500">Software Engineer</p>
              <p className="text-sm">john.smith@example.com | (555) 123-4567</p>
              <p className="text-sm">San Francisco, CA</p>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold border-b pb-1 mb-3">Professional Summary</h2>
              <p className="text-sm">
                Experienced software engineer with over 5 years of experience in full-stack development.
                Proficient in React, TypeScript, and Node.js with a strong background in building
                scalable web applications and services.
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold border-b pb-1 mb-3">Experience</h2>
              <div className="mb-4">
                <div className="flex justify-between">
                  <h3 className="font-medium">Senior Software Engineer</h3>
                  <span className="text-sm">2020 - Present</span>
                </div>
                <p className="text-sm font-medium">TechCorp Inc.</p>
                <ul className="list-disc list-inside text-sm mt-2">
                  <li>Led the development of the company's flagship product</li>
                  <li>Implemented CI/CD pipeline reducing deployment time by 50%</li>
                  <li>Mentored junior developers and conducted code reviews</li>
                </ul>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold border-b pb-1 mb-3">Education</h2>
              <div>
                <div className="flex justify-between">
                  <h3 className="font-medium">B.S. Computer Science</h3>
                  <span className="text-sm">2016 - 2020</span>
                </div>
                <p className="text-sm">University of Technology</p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold border-b pb-1 mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-100 px-2 py-1 rounded text-sm">React</span>
                <span className="bg-gray-100 px-2 py-1 rounded text-sm">TypeScript</span>
                <span className="bg-gray-100 px-2 py-1 rounded text-sm">Node.js</span>
                <span className="bg-gray-100 px-2 py-1 rounded text-sm">GraphQL</span>
                <span className="bg-gray-100 px-2 py-1 rounded text-sm">AWS</span>
                <span className="bg-gray-100 px-2 py-1 rounded text-sm">Docker</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
