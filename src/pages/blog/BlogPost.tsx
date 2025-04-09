
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  BookmarkPlus, 
  MessageSquare, 
  ThumbsUp, 
  ArrowLeft,
  Linkedin,
  Facebook,
  Twitter,
  Link2
} from "lucide-react";

// Sample blog content
const blogPosts = [
  {
    id: "blog-1",
    title: "How to Ace Your Tech Interview: Tips from Industry Experts",
    excerpt: "Learn the key strategies and preparation techniques that can help you stand out in your next technical interview.",
    content: `
      <p class="text-lg">The technical interview is often the most challenging part of landing a job in the tech industry. Whether you're a fresh graduate or an experienced developer, these interviews can be daunting—but with the right preparation, you can approach them with confidence.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Understanding What Interviewers Are Looking For</h2>
      
      <p>Technical interviewers are not just evaluating your coding skills; they're looking at multiple dimensions of your abilities:</p>
      
      <ul class="list-disc pl-6 space-y-2 my-4">
        <li><strong>Problem-solving approach:</strong> How do you break down and analyze complex problems?</li>
        <li><strong>Technical knowledge:</strong> Do you understand the fundamentals and can you apply them?</li>
        <li><strong>Communication skills:</strong> Can you clearly explain your thought process and solutions?</li>
        <li><strong>Collaboration potential:</strong> Would you work well with the existing team?</li>
      </ul>
      
      <p>"When I interview candidates, I'm much more interested in how they approach problems than whether they get the perfect answer right away," says Maria Rodriguez, Senior Engineering Manager at TechCorp. "I want to see how they think and how they communicate that thinking."</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Preparation Strategies</h2>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">1. Study the Fundamentals</h3>
      
      <p>Regardless of your specialty, make sure you have a solid grasp of computer science fundamentals:</p>
      
      <ul class="list-disc pl-6 space-y-2 my-4">
        <li>Data structures (arrays, linked lists, trees, graphs, hash tables)</li>
        <li>Algorithms (sorting, searching, recursion, dynamic programming)</li>
        <li>Time and space complexity analysis</li>
        <li>System design principles</li>
      </ul>
      
      <p>"Even if you won't use these concepts daily in your job, they form the foundation of how we think about building efficient software," explains James Chen, CTO of AI Innovations.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">2. Practice, Practice, Practice</h3>
      
      <p>Practice coding challenges regularly using platforms like:</p>
      
      <ul class="list-disc pl-6 space-y-2 my-4">
        <li>LeetCode</li>
        <li>HackerRank</li>
        <li>CodeSignal</li>
        <li>AlgoExpert</li>
      </ul>
      
      <p>Set aside dedicated time each week for problem-solving practice. Start with easier problems and gradually work your way up to more complex ones.</p>
      
      <div class="bg-primary/5 border-l-4 border-primary p-4 my-6">
        <p class="text-lg font-medium">Pro Tip</p>
        <p>When practicing, don't just solve the problem. Verbalize your approach as if you're explaining it to an interviewer. This helps build the muscle memory of communicating your thought process clearly.</p>
      </div>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">3. Master the Art of Technical Communication</h3>
      
      <p>Being able to clearly articulate your approach is crucial. Follow these steps when answering technical questions:</p>
      
      <ol class="list-decimal pl-6 space-y-2 my-4">
        <li><strong>Understand the problem:</strong> Repeat the problem back to the interviewer and ask clarifying questions.</li>
        <li><strong>Think aloud:</strong> Share your initial thoughts and possible approaches.</li>
        <li><strong>Analyze trade-offs:</strong> Discuss the pros and cons of different solutions.</li>
        <li><strong>Implement:</strong> Write clean, well-structured code with clear naming conventions.</li>
        <li><strong>Test:</strong> Walk through your solution with test cases, including edge cases.</li>
      </ol>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">During the Interview</h2>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">1. Stay Calm and Collected</h3>
      
      <p>Nervousness is natural, but managing it is essential. Take deep breaths, maintain good posture, and remember that it's okay to take a moment to gather your thoughts before responding.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">2. Use the STAR Method for Behavioral Questions</h3>
      
      <p>For experience-based questions, structure your answers using the STAR method:</p>
      
      <ul class="list-disc pl-6 space-y-2 my-4">
        <li><strong>Situation:</strong> Set the context</li>
        <li><strong>Task:</strong> Describe your responsibility</li>
        <li><strong>Action:</strong> Explain what you did</li>
        <li><strong>Result:</strong> Share the outcome</li>
      </ul>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">3. Ask Thoughtful Questions</h3>
      
      <p>At the end of the interview, ask insightful questions about the team, company, or role. This shows your genuine interest and engagement.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Common Pitfalls to Avoid</h2>
      
      <ul class="list-disc pl-6 space-y-2 my-4">
        <li><strong>Overly complex solutions:</strong> Start with a working solution, then optimize if needed.</li>
        <li><strong>Silence during problem-solving:</strong> Interviewers can't evaluate your thinking if you're silent.</li>
        <li><strong>Giving up too quickly:</strong> If you're stuck, try breaking the problem down or ask for a hint.</li>
        <li><strong>Neglecting to test your code:</strong> Always check your solution with different inputs.</li>
      </ul>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Final Thoughts</h2>
      
      <p>Remember that interviewing is a skill that improves with practice. Even if you don't get an offer, each interview is a valuable learning experience that brings you closer to your goals.</p>
      
      <p>"The best candidates I've interviewed weren't necessarily those who solved every problem perfectly," shares David Wong, VP of Engineering at StartupX. "They were the ones who demonstrated curiosity, resilience, and a genuine passion for problem-solving."</p>
      
      <p>With thorough preparation, clear communication, and a positive attitude, you'll be well-equipped to showcase your abilities and make a strong impression in your next technical interview.</p>
    `,
    date: "2025-03-15",
    author: "Sarah Johnson",
    authorRole: "Senior Tech Recruiter",
    authorBio: "Sarah has over 10 years of experience in tech recruitment and has interviewed thousands of candidates for companies ranging from startups to Fortune 500 corporations.",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    category: "Career Advice",
    tags: ["Interviews", "Tech Careers", "Job Search"],
    readTime: 8,
    relatedPosts: ["blog-3", "blog-4", "blog-6"]
  },
  {
    id: "blog-2",
    title: "The Future of Frontend Development: Trends to Watch in 2025",
    excerpt: "Explore the emerging technologies and methodologies that are reshaping frontend development and how to stay ahead of the curve.",
    content: `Sample content for blog post 2`,
    date: "2025-02-28",
    author: "Alex Chen",
    authorRole: "Frontend Lead, TechGiant Inc.",
    authorBio: "Alex leads frontend development at TechGiant Inc. and is a frequent speaker at web development conferences.",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    category: "Tech Trends",
    tags: ["Frontend", "Web Development", "JavaScript"],
    readTime: 12,
    relatedPosts: ["blog-1", "blog-3", "blog-5"]
  },
  {
    id: "blog-3",
    title: "Building Your Personal Brand as a Developer",
    excerpt: "Discover how to establish a strong personal brand that will make you stand out in the competitive tech industry.",
    content: `Sample content for blog post 3`,
    date: "2025-02-10",
    author: "Maya Patel",
    authorRole: "Developer Advocate",
    authorBio: "Maya is a developer advocate who helps engineers build their personal brands and grow their careers in tech.",
    authorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    category: "Career Growth",
    tags: ["Personal Branding", "Career Development", "Networking"],
    readTime: 6,
    relatedPosts: ["blog-1", "blog-4", "blog-6"]
  },
  {
    id: "blog-4",
    title: "Securing Your First Internship: A Complete Guide",
    excerpt: "A step-by-step guide to help students land their first internship, including resume tips, networking strategies, and interview preparation.",
    content: `Sample content for blog post 4`,
    date: "2025-01-25",
    author: "Carlos Rodriguez",
    authorRole: "University Relations Manager",
    authorBio: "Carlos connects university students with internship opportunities and has helped place over 500 interns in tech companies.",
    authorImage: "https://images.unsplash.com/photo-1531727991582-cfd25ce79613",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    category: "Internships",
    tags: ["Internships", "Students", "Career Advice"],
    readTime: 10,
    relatedPosts: ["blog-1", "blog-3", "blog-6"]
  },
  {
    id: "blog-5",
    title: "The Rise of AI in Software Development: Opportunities and Challenges",
    excerpt: "An in-depth look at how artificial intelligence is transforming software development and what it means for developers.",
    content: `Sample content for blog post 5`,
    date: "2025-01-12",
    author: "Dr. Priya Sharma",
    authorRole: "AI Research Scientist",
    authorBio: "Dr. Sharma specializes in AI applications in software development and has published numerous papers on the subject.",
    authorImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    category: "Tech Trends",
    tags: ["AI", "Machine Learning", "Future of Work"],
    readTime: 15,
    relatedPosts: ["blog-2", "blog-3", "blog-6"]
  },
  {
    id: "blog-6",
    title: "From Bootcamp to Full-Time: Success Stories and Lessons Learned",
    excerpt: "Real-world stories from bootcamp graduates who successfully transitioned into full-time tech roles, along with their key takeaways.",
    content: `Sample content for blog post 6`,
    date: "2024-12-18",
    author: "Jordan Lee",
    authorRole: "Bootcamp Director",
    authorBio: "Jordan has helped hundreds of career changers transition into tech through bootcamp education.",
    authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    category: "Education",
    tags: ["Bootcamps", "Career Transition", "Learning"],
    readTime: 9,
    relatedPosts: ["blog-1", "blog-3", "blog-4"]
  }
];

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the blog post by ID
  const post = blogPosts.find(post => post.id === id);
  
  if (!post) {
    return (
      <MainLayout>
        <div className="container-custom py-12 text-center">
          <h2 className="heading-2 mb-4">Blog Post Not Found</h2>
          <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/blog")}>Back to Blog</Button>
        </div>
      </MainLayout>
    );
  }
  
  // Get related posts
  const relatedPosts = post.relatedPosts.map(relatedId => 
    blogPosts.find(post => post.id === relatedId)
  ).filter(Boolean);
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <MainLayout>
      <div className="container-custom py-12">
        {/* Back button */}
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => navigate("/blog")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">{post.category}</Badge>
                {post.tags.map(tag => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
              <div className="flex flex-wrap justify-between items-center">
                <div className="flex items-center mr-4 mb-2">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <img 
                      src={post.authorImage} 
                      alt={post.author} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{post.author}</p>
                    <p className="text-sm text-muted-foreground">{post.authorRole}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>{post.readTime} min read</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Featured Image */}
            <div className="w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-8">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Blog Content */}
            <div 
              className="prose prose-lg max-w-none mb-8" 
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* Tags */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="px-3 py-1">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Sharing */}
            <div className="flex justify-between items-center mb-8 p-4 bg-muted rounded-lg">
              <div>
                <h3 className="font-medium">Share this article</h3>
                <p className="text-sm text-muted-foreground">
                  Spread the knowledge!
                </p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Link2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Author Box */}
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src={post.authorImage} 
                      alt={post.author} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{post.author}</h3>
                    <p className="text-primary mb-2">{post.authorRole}</p>
                    <p className="text-muted-foreground mb-4">{post.authorBio}</p>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Follow
                      </Button>
                      <Button variant="ghost" size="sm">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Comments */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Comments (12)</h3>
                <Button>Add Comment</Button>
              </div>
              
              <div className="space-y-6">
                {/* Comment 1 */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e" 
                        alt="Commenter" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium">Michael Parker</h4>
                          <p className="text-xs text-muted-foreground">3 days ago</p>
                        </div>
                        <Button variant="ghost" size="sm">Reply</Button>
                      </div>
                      <p className="text-muted-foreground my-2">
                        This is exactly what I needed before my upcoming interviews. The STAR method tip was particularly helpful - I've been struggling with structuring my answers effectively.
                      </p>
                      <div className="flex space-x-4">
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="mr-1 h-4 w-4" />
                          <span>24</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Comment 2 */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e" 
                        alt="Commenter" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium">Jessica Reynolds</h4>
                          <p className="text-xs text-muted-foreground">5 days ago</p>
                        </div>
                        <Button variant="ghost" size="sm">Reply</Button>
                      </div>
                      <p className="text-muted-foreground my-2">
                        Great article! I would add that practicing with a friend acting as the interviewer is incredibly valuable. It helped me get comfortable explaining my thinking out loud.
                      </p>
                      <div className="flex space-x-4">
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="mr-1 h-4 w-4" />
                          <span>18</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  View All 12 Comments
                </Button>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            {/* Actions */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-center space-x-2 mb-4">
                  <Button className="flex-1">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <BookmarkPlus className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    More from <span className="font-medium text-primary">{post.author}</span>
                  </p>
                </div>
              </CardContent>
            </Card>
            
            {/* Table of Contents */}
            <Card>
              <CardHeader>
                <CardTitle>Table of Contents</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="text-primary">
                    <a className="hover:underline" href="#understanding">Understanding What Interviewers Are Looking For</a>
                  </li>
                  <li className="text-primary">
                    <a className="hover:underline" href="#preparation">Preparation Strategies</a>
                    <ul className="ml-4 mt-2 space-y-1">
                      <li className="text-primary text-sm">
                        <a className="hover:underline" href="#fundamentals">Study the Fundamentals</a>
                      </li>
                      <li className="text-primary text-sm">
                        <a className="hover:underline" href="#practice">Practice, Practice, Practice</a>
                      </li>
                      <li className="text-primary text-sm">
                        <a className="hover:underline" href="#communication">Master Technical Communication</a>
                      </li>
                    </ul>
                  </li>
                  <li className="text-primary">
                    <a className="hover:underline" href="#during">During the Interview</a>
                  </li>
                  <li className="text-primary">
                    <a className="hover:underline" href="#pitfalls">Common Pitfalls to Avoid</a>
                  </li>
                  <li className="text-primary">
                    <a className="hover:underline" href="#final">Final Thoughts</a>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            {/* Related Articles */}
            <Card>
              <CardHeader>
                <CardTitle>Related Articles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {relatedPosts.map((relatedPost: any) => (
                  <div 
                    key={relatedPost.id} 
                    className="flex flex-col md:flex-row gap-4 cursor-pointer"
                    onClick={() => navigate(`/blog/${relatedPost.id}`)}
                  >
                    <div className="md:w-1/3 h-24 rounded overflow-hidden">
                      <img 
                        src={relatedPost.image} 
                        alt={relatedPost.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <h4 className="font-medium line-clamp-2 mb-1">{relatedPost.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(relatedPost.date)}</span>
                        <Clock className="h-3 w-3 ml-2" />
                        <span>{relatedPost.readTime} min read</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            {/* Newsletter */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle>Subscribe to Newsletter</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Get the latest articles and career resources sent straight to your inbox.
                </p>
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  <Button className="w-full">Subscribe</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* More From InternAI */}
        <div className="mt-12 pt-12 border-t">
          <h2 className="heading-3 mb-6">More Career Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <div 
                className="h-40 bg-cover bg-center"
                style={{ backgroundImage: `url(https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d)` }}
              />
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-2">Resume Templates for Tech Roles</h3>
                <p className="text-muted-foreground mb-4">
                  Professionally designed resume templates specifically for tech and development positions.
                </p>
                <Button variant="outline" className="w-full" onClick={() => navigate("/resume-builder")}>
                  View Templates
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <div 
                className="h-40 bg-cover bg-center"
                style={{ backgroundImage: `url(https://images.unsplash.com/photo-1531297484001-80022131f5a1)` }}
              />
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-2">Mock Interview Practice</h3>
                <p className="text-muted-foreground mb-4">
                  Prepare for technical interviews with our AI-powered mock interview system.
                </p>
                <Button variant="outline" className="w-full" onClick={() => navigate("/mock-interview")}>
                  Try Mock Interview
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <div 
                className="h-40 bg-cover bg-center"
                style={{ backgroundImage: `url(https://images.unsplash.com/photo-1581091226825-a6a2a5aee158)` }}
              />
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-2">Career Path Roadmaps</h3>
                <p className="text-muted-foreground mb-4">
                  Follow our structured roadmaps to plan your career progression in tech.
                </p>
                <Button variant="outline" className="w-full" onClick={() => navigate("/career-path")}>
                  Explore Roadmaps
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BlogPost;
