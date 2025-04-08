
import { Course } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useCourses } from "@/context/CourseContext";
import { useState, useEffect } from "react";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const { user, isAuthenticated } = useAuth();
  const { enrollInCourse, getEnrolledCourses, getCompletedCourses } = useCourses();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  
  useEffect(() => {
    if (isAuthenticated && user) {
      const enrolledCourses = getEnrolledCourses(user.id);
      const completedCourses = getCompletedCourses(user.id);
      setIsEnrolled(enrolledCourses.includes(course.id));
      setIsCompleted(completedCourses.includes(course.id));
    }
  }, [isAuthenticated, user, course.id, getEnrolledCourses, getCompletedCourses]);
  
  const handleEnroll = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated || !user) return;
    
    try {
      await enrollInCourse(course.id, user.id);
      setIsEnrolled(true);
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };
  
  return (
    <Link to={`/courses/${course.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-md h-full flex flex-col">
        <div className="aspect-video overflow-hidden">
          {course.image ? (
            <img
              src={course.image}
              alt={course.title}
              className="h-full w-full object-cover transition-transform hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">{course.title}</span>
            </div>
          )}
        </div>
        
        <CardContent className="p-6 flex-1">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {course.category}
            </span>
            <span className="inline-flex items-center text-sm">
              <Star className="mr-1 h-4 w-4 text-yellow-500 fill-yellow-500" />
              {course.rating}
            </span>
          </div>
          
          <h3 className="mt-3 font-semibold">{course.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{course.description}</p>
          
          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center">
              <Users className="mr-1 h-4 w-4" />
              <span>{course.enrolled} enrolled</span>
            </div>
          </div>
          
          <div className="mt-4">
            <span className="text-xs font-medium uppercase text-muted-foreground">Instructor</span>
            <p className="text-sm">{course.instructor}</p>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {course.topics.slice(0, 3).map((topic, index) => (
              <span key={index} className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                {topic}
              </span>
            ))}
            {course.topics.length > 3 && (
              <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                +{course.topics.length - 3}
              </span>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="p-6 pt-0 border-t mt-4">
          {isCompleted ? (
            <Button className="w-full" variant="outline" disabled>
              Completed
            </Button>
          ) : isEnrolled ? (
            <Button className="w-full" variant="secondary">
              Continue Learning
            </Button>
          ) : (
            <Button className="w-full" onClick={handleEnroll}>
              Enroll Now
            </Button>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
