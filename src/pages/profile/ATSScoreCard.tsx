
import React from "react";
import { AlertTriangle, Download } from "lucide-react";

interface ATSScoreCardProps {
  score: number; // 0 - 100
  aiFeedback: string[];
  onDownloadImprovedResume: () => void;
}

const ATSScoreCard: React.FC<ATSScoreCardProps> = ({ score, aiFeedback, onDownloadImprovedResume }) => {
  return (
    <div className="rounded-xl border p-6 bg-background flex flex-col items-center space-y-4 shadow-lg">
      <div className="w-full flex flex-col items-center">
        <div className="w-40 h-32 mb-2 relative">
          {/* Custom gauge for ATS Score */}
          <GaugeChart score={score} />
          <div className="absolute top-[60%] left-1/2 -translate-x-1/2 text-center pointer-events-none">
            <div className="text-3xl font-bold text-primary">{score}%</div>
            <div className="text-xs text-muted-foreground">ATS Score</div>
          </div>
        </div>
        <div className="mt-2 w-full">
          <h4 className="font-medium text-sm mb-2">AI Feedback</h4>
          <div className="space-y-3">
          {aiFeedback.map((fb, i) => (
            <div key={i} className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground">{fb}</p>
            </div>
          ))}
          </div>
        </div>
      </div>
      <button
        className="inline-flex items-center mt-4 px-4 py-2 rounded bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
        onClick={onDownloadImprovedResume}
        type="button"
      >
        <Download className="h-4 w-4 mr-2" />
        Download Improved Resume
      </button>
    </div>
  );
};

/** Custom gauge chart implementation using SVG */
const GaugeChart: React.FC<{ score: number }> = ({ score }) => {
  // Ensure score is within bounds
  const value = Math.max(0, Math.min(score, 100));
  const filled = value;
  
  return (
    <svg width={160} height={90} viewBox="0 0 160 90">
      {/* Gray background arc */}
      <path
        d="M20,80 A60,60 0 0,1 140,80"
        fill="none"
        stroke="#f3f3f3"
        strokeWidth="22"
      />
      {/* Filled arc */}
      <path
        d={describeArc(80, 80, 60, 180, 180 + 180 * (filled / 100))}
        fill="none"
        stroke="#8b5cf6"
        strokeWidth="22"
        strokeLinecap="round"
      />
    </svg>
  );
};

// Utility to describe arc (for SVG path)
function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  var start = polarToCartesian(cx, cy, r, endAngle);
  var end = polarToCartesian(cx, cy, r, startAngle);

  var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M", start.x, start.y,
    "A", r, r, 0, arcSweep, 0, end.x, end.y
  ].join(" ");
}

function polarToCartesian(cx: number, cy: number, r: number, angleInDegrees: number) {
  var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: cx + (r * Math.cos(angleInRadians)),
    y: cy + (r * Math.sin(angleInRadians))
  };
}

export default ATSScoreCard;
