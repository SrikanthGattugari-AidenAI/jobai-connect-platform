
import React from "react";

interface ResumePreviewProps {
  fileUrl: string;
  fileName: string;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ fileUrl, fileName }) => {
  const fileType = fileName.split('.').pop()?.toLowerCase();

  // Only handle pdf/doc/docx for now (for doc/docx fallback to download)
  if (fileType === "pdf") {
    return (
      <div className="border mt-2 rounded-md overflow-hidden p-2 bg-muted">
        <iframe
          src={fileUrl}
          title="Resume Preview"
          className="w-full min-h-[480px]"
        />
      </div>
    );
  }

  if (fileType === "doc" || fileType === "docx") {
    return (
      <div className="border mt-2 rounded-md overflow-hidden p-4 text-center bg-muted">
        <p className="text-muted-foreground text-xs mb-2">Unable to preview DOC/DOCX format. <br />Download to view:</p>
        <a 
          href={fileUrl}
          download={fileName}
          className="underline text-primary text-sm"
        >
          Download {fileName}
        </a>
      </div>
    );
  }

  // Unknown format
  return (
    <div className="border mt-2 rounded-md overflow-hidden p-4 text-center bg-muted">
      <p className="text-muted-foreground text-xs">Unsupported format. Please upload PDF, DOC, or DOCX.</p>
    </div>
  );
};

export default ResumePreview;
