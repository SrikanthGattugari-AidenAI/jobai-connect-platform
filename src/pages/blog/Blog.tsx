
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  Filter, 
  ChevronRight, 
  Calendar, 
  User,
  ArrowRight,
  BookOpen
} from "lucide-react";

// Sample blog posts
const blogPosts = [
  {
    id: "blog-1",
    title: "How to Ace Your Tech Interview: Tips from Industry Experts",
    excerpt: "Learn the key strategies and preparation techniques that can help you stand out in your next technical interview.",
    date: "2025-03-15",
    author: "Sarah Johnson",
    authorRole: "Senior Tech Recruiter",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    category: "Career Advice",
    tags: ["Interviews", "Tech Careers", "Job Search"],
    readTime: 8
  },
  {
    id: "blog-2",
    title: "The Future of Frontend Development: Trends to Watch in 2025",
    excerpt: "Explore the emerging technologies and methodologies that are reshaping frontend development and how to stay ahead of the curve.",
    date: "2025-02-28",
    author: "Alex Chen",
    authorRole: "Frontend Lead, TechGiant Inc.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    category: "Tech Trends",
    tags: ["Frontend", "Web Development", "JavaScript"],
    readTime: 12
  },
  {
    id: "blog-3",
    title: "Building Your Personal Brand as a Developer",
    excerpt: "Discover how to establish a strong personal brand that will make you stand out in the competitive tech industry.",
    date: "2025-02-10",
    author: "Maya Patel",
    authorRole: "Developer Advocate",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    category: "Career Growth",
    tags: ["Personal Branding", "Career Development", "Networking"],
    readTime: 6
  },
  {
    id: "blog-4",
    title: "Securing Your First Internship: A Complete Guide",
    excerpt: "A step-by-step guide to help students land their first internship, including resume tips, networking strategies, and interview preparation.",
    date: "2025-01-25",
    author: "Carlos Rodriguez",
    authorRole: "University Relations Manager",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    category: "Internships",
    tags: ["Internships", "Students", "Career Advice"],
    readTime: 10
  },
  {
    id: "blog-5",
    title: "The Rise of AI in Software Development: Opportunities and Challenges",
    excerpt: "An in-depth look at how artificial intelligence is transforming software development and what it means for developers.",
    date: "2025-01-12",
    author: "Dr. Priya Sharma",
    authorRole: "AI Research Scientist",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    category: "Tech Trends",
    tags: ["AI", "Machine Learning", "Future of Work"],
    readTime: 15
  },
  {
    id: "blog-6",
    title: "From Bootcamp to Full-Time: Success Stories and Lessons Learned",
    excerpt: "Real-world stories from bootcamp graduates who successfully transitioned into full-time tech roles, along with their key takeaways.",
    date: "2024-12-18",
    author: "Jordan Lee",
    authorRole: "Bootcamp Director",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    category: "Education",
    tags: ["Bootcamps", "Career Transition", "Learning"],
    readTime: 9
  }
];

// Categories
const categories = [
  { name: "Career Advice", count: 12 },
  { name: "Tech Trends", count: 18 },
  { name: "Education", count: 8 },
  { name: "Internships", count: 15 },
  { name: "Career Growth", count: 10 },
  { name: "Industry Insights", count: 7 },
  { name: "Student Success", count: 9 }
];

// Popular tags
const popularTags = [
  { name: "Frontend", count: 24 },
  { name: "Internships", count: 18 },
  { name: "Career Advice", count: 32 },
  { name: "AI", count: 15 },
  { name: "Job Search", count: 22 },
  { name: "Interviews", count: 28 },
  { name: "Web Development", count: 19 },
  { name: "Remote Work", count: 14 },
  { name: "Career Growth", count: 21 },
  { name: "Student Tips", count: 17 }
];

const Blog = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  const filteredBlogPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <MainLayout>
      <div className="container-custom py-12">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-2xl p-8 mb-10">
          <div className="max-w-3xl">
            <h1 className="heading-2 mb-4">InternAI Blog</h1>
            <p className="text-lg text-gray-700 mb-6">
              Expert advice, industry insights, and success stories to help you navigate your career journey.
            </p>
            <div className="flex">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for articles, topics, or tags..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Blog Posts */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="heading-3">Latest Articles</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="all" className="mb-8">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="career">Career</TabsTrigger>
                <TabsTrigger value="tech">Tech</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="internships">Internships</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="space-y-8">
              {/* Featured Post */}
              <Card className="overflow-hidden">
                <div className="md:flex">
                  <div 
                    className="md:w-2/5 h-60 md:h-auto bg-cover bg-center"
                    style={{ backgroundImage: `url(${filteredBlogPosts[0]?.image})` }}
                  />
                  <div className="p-6 md:w-3/5">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary">{filteredBlogPosts[0]?.category}</Badge>
                      <Badge variant="outline" className="bg-gray-100">
                        {filteredBlogPosts[0]?.readTime} min read
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{filteredBlogPosts[0]?.title}</h3>
                    <p className="text-muted-foreground mb-4">{filteredBlogPosts[0]?.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-primary/10 rounded-full p-2 mr-3">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{filteredBlogPosts[0]?.author}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(filteredBlogPosts[0]?.date)}</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/blog/${filteredBlogPosts[0]?.id}`)}
                        className="flex items-center gap-1"
                      >
                        Read More
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
              
              {/* Regular Posts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredBlogPosts.slice(1).map((post) => (
                  <Card key={post.id} className="overflow-hidden">
                    <div 
                      className="h-48 bg-cover bg-center"
                      style={{ backgroundImage: `url(${post.image})` }}
                    />
                    <CardContent className="pt-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="secondary">{post.category}</Badge>
                        <Badge variant="outline" className="bg-gray-100">
                          {post.readTime} min read
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                      <p className="text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-primary/10 rounded-full p-2 mr-3">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{post.author}</p>
                            <p className="text-xs text-muted-foreground">{formatDate(post.date)}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => navigate(`/blog/${post.id}`)}
                      >
                        Read More
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              {/* Pagination */}
              <div className="flex justify-center mt-8">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" disabled>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
                  </Button>
                  <Button variant="outline" size="sm" className="bg-primary text-white hover:bg-primary/90">1</Button>
                  <Button variant="outline" size="sm">2</Button>
                  <Button variant="outline" size="sm">3</Button>
                  <span>...</span>
                  <Button variant="outline" size="sm">10</Button>
                  <Button variant="outline" size="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div 
                      key={category.name} 
                      className="flex justify-between items-center p-2 hover:bg-muted rounded cursor-pointer transition-colors"
                      onClick={() => setSearchTerm(category.name)}
                    >
                      <span>{category.name}</span>
                      <Badge variant="secondary">{category.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full">
                  View All Categories
                </Button>
              </CardFooter>
            </Card>
            
            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <Badge 
                      key={tag.name} 
                      variant="outline"
                      className="cursor-pointer py-1 hover:bg-muted"
                      onClick={() => setSearchTerm(tag.name)}
                    >
                      {tag.name} ({tag.count})
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Popular Articles */}
            <Card>
              <CardHeader>
                <CardTitle>Most Read Articles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {blogPosts.slice(0, 4).map((post, index) => (
                  <div 
                    key={post.id} 
                    className="flex gap-3 cursor-pointer"
                    onClick={() => navigate(`/blog/${post.id}`)}
                  >
                    <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium line-clamp-2">{post.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full">
                  View More Articles
                </Button>
              </CardFooter>
            </Card>
            
            {/* Newsletter */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle>Subscribe to Newsletter</CardTitle>
                <CardDescription>
                  Get the latest articles and resources sent straight to your inbox.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input placeholder="Your email address" />
                  <Button className="w-full">Subscribe</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Featured Section */}
        <div className="my-12 py-12 border-t">
          <div className="flex justify-between items-center mb-6">
            <h2 className="heading-3">Featured Resources</h2>
            <Button variant="ghost" className="gap-1">
              <span>View All Resources</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Resume Templates</h3>
                <p className="text-muted-foreground mb-4">
                  Download professionally designed resume templates tailored for tech and internship applications.
                </p>
                <Button variant="outline" className="w-full">View Templates</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-video text-primary"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Interview Masterclass</h3>
                <p className="text-muted-foreground mb-4">
                  Free video course on mastering technical and behavioral interviews for internships and entry-level positions.
                </p>
                <Button variant="outline" className="w-full">Watch Now</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open-check text-primary"><path d="M8 3H2v15h7c1.7 0 3 1.3 3 3V7c0-2.2-1.8-4-4-4Z"/><path d="m16 12 2 2 4-4"/><path d="M22 6V3h-6c-2.2 0-4 1.8-4 4v14c0-1.7 1.3-3 3-3h7v-2.3"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Career Guides</h3>
                <p className="text-muted-foreground mb-4">
                  In-depth guides on navigating your tech career, from internships to leadership positions.
                </p>
                <Button variant="outline" className="w-full">Browse Guides</Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-8 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Career Journey?</h2>
            <p className="text-white/90 mb-6">
              Join thousands of students who have used InternAI to find their dream internships and kickstart their careers.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => navigate("/register/student")}
              >
                Sign Up Free
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-white border-white hover:bg-white/20"
                onClick={() => navigate("/internships")}
              >
                <span>Browse Internships</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Blog;
