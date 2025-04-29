
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, BookOpen, Map, Trophy, FileText, BuildingIcon } from "lucide-react";
import { motion } from "framer-motion";

export function QuickActions() {
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Card className="bg-gradient-to-b from-white to-slate-50 border-slate-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-2"
        >
          <motion.div variants={itemVariants}>
            <Button 
              variant="outline" 
              className="w-full justify-start hover:bg-slate-50 hover:scale-[1.02] transition-all" 
              onClick={() => navigate("/mock-interview")}
            >
              <Mic className="mr-2 h-4 w-4 text-primary" />
              Practice Mock Interviews
            </Button>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Button 
              variant="outline" 
              className="w-full justify-start hover:bg-slate-50 hover:scale-[1.02] transition-all" 
              onClick={() => navigate("/courses")}
            >
              <BookOpen className="mr-2 h-4 w-4 text-emerald-500" />
              Recommended Courses
            </Button>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Button 
              variant="outline" 
              className="w-full justify-start hover:bg-slate-50 hover:scale-[1.02] transition-all" 
              onClick={() => navigate("/career-roadmaps")}
            >
              <Map className="mr-2 h-4 w-4 text-blue-500" />
              Recommended Roadmaps
            </Button>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Button 
              variant="outline" 
              className="w-full justify-start hover:bg-slate-50 hover:scale-[1.02] transition-all" 
              onClick={() => navigate("/hackathons")}
            >
              <Trophy className="mr-2 h-4 w-4 text-amber-500" />
              Recommended Hackathons
            </Button>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Button 
              variant="outline" 
              className="w-full justify-start hover:bg-slate-50 hover:scale-[1.02] transition-all" 
              onClick={() => navigate("/resume-builder")}
            >
              <FileText className="mr-2 h-4 w-4 text-violet-500" />
              Enrich Resume
            </Button>
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
