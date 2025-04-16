
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Edit } from "lucide-react";

interface ResumeTemplatePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  templateName: string;
  onEdit: () => void;
}

export const ResumeTemplatePreview = ({
  isOpen,
  onClose,
  templateName,
  onEdit,
}: ResumeTemplatePreviewProps) => {
  const getTemplateStyle = () => {
    switch (templateName.toLowerCase()) {
      case "basic template":
        return {
          container: "p-8",
          header: "text-center mb-6",
          sectionTitle: "text-lg font-semibold border-b pb-1 mb-3",
          itemTitle: "font-medium",
        };
      case "modern template":
        return {
          container: "p-8 border-l-4 border-primary",
          header: "mb-6 border-b pb-4",
          sectionTitle: "text-lg font-semibold text-primary mb-3",
          itemTitle: "font-medium text-primary/80",
        };
      case "technical template":
        return {
          container: "p-8 grid grid-cols-3 gap-6",
          header: "col-span-3 mb-6",
          sectionTitle: "text-lg font-semibold bg-gray-100 p-2 mb-3",
          itemTitle: "font-medium",
        };
      default:
        return {
          container: "p-8",
          header: "mb-6",
          sectionTitle: "text-lg font-semibold mb-3",
          itemTitle: "font-medium",
        };
    }
  };

  const style = getTemplateStyle();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>{templateName} Preview</DialogTitle>
          <DialogDescription>A sample resume with your template</DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto">
          <div className={`bg-white min-h-[600px] border rounded-md ${style.container}`}>
            <div className={style.header}>
              <h1 className="text-2xl font-bold">John Smith</h1>
              <p className="text-gray-500">Software Engineer</p>
              <p className="text-sm">john.smith@example.com | (555) 123-4567</p>
              <p className="text-sm">San Francisco, CA</p>
            </div>

            <div className="mb-6">
              <h2 className={style.sectionTitle}>Professional Summary</h2>
              <p className="text-sm">
                Experienced software engineer with over 5 years of experience in full-stack development.
                Proficient in React, TypeScript, and Node.js with a strong background in building
                scalable web applications and services.
              </p>
            </div>

            <div className="mb-6">
              <h2 className={style.sectionTitle}>Experience</h2>
              <div className="mb-4">
                <div className="flex justify-between">
                  <h3 className={style.itemTitle}>Senior Software Engineer</h3>
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
              <h2 className={style.sectionTitle}>Education</h2>
              <div>
                <div className="flex justify-between">
                  <h3 className={style.itemTitle}>B.S. Computer Science</h3>
                  <span className="text-sm">2016 - 2020</span>
                </div>
                <p className="text-sm">University of Technology</p>
              </div>
            </div>

            <div>
              <h2 className={style.sectionTitle}>Skills</h2>
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
        
        <div className="flex justify-between mt-4">
          <Button onClick={onEdit} variant="default">
            <Edit className="mr-2 h-4 w-4" />
            Edit Resume
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
