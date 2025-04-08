
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { CourseCard } from "@/components/courses/CourseCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCourses } from "@/context/CourseContext";
import { Search, Loader2 } from "lucide-react";
import { categories } from "@/lib/data";

const Courses = () => {
  const { courses, isLoading } = useCourses();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  
  const filteredCourses = courses.filter(course => {
    const matchesSearch = searchQuery === "" || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === "all" || course.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };
  
  return (
    <MainLayout>
      <div className="container-custom py-8 md:py-12">
        <h1 className="heading-2 mb-2">Explore Courses</h1>
        <p className="text-muted-foreground mb-8">
          Enhance your skills with our curated collection of online courses
        </p>
        
        <form onSubmit={handleSearch} className="flex w-full max-w-lg space-x-2 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for courses..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit">Search</Button>
        </form>
        
        <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
          <TabsList className="mb-4 flex flex-wrap h-auto">
            <TabsTrigger value="all">All Categories</TabsTrigger>
            {categories.map(category => (
              <TabsTrigger key={category.id} value={category.name}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search query to find more courses
                </p>
              </div>
            )}
          </TabsContent>
          
          {categories.map(category => (
            <TabsContent key={category.id} value={category.name} className="mt-0">
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map(course => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search query or selecting a different category
                  </p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Courses;
