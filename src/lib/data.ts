import { Internship, Course, CountryWithCities, Category, MockInterview } from "@/types";
import { Job } from "@/types/job";

export const categories: Category[] = [
  {
    id: "tech",
    name: "Technology",
    roles: ["Software Developer", "Data Analyst", "UI/UX Designer", "Product Manager", "QA Engineer"]
  },
  {
    id: "marketing",
    name: "Marketing",
    roles: ["Digital Marketing", "Content Writer", "SEO Specialist", "Social Media Manager", "Brand Strategist"]
  },
  {
    id: "finance",
    name: "Finance",
    roles: ["Financial Analyst", "Investment Banking", "Accountant", "Risk Analyst", "Equity Research"]
  },
  {
    id: "design",
    name: "Design",
    roles: ["Graphic Designer", "Product Designer", "Motion Designer", "UI Designer", "Visual Designer"]
  },
  {
    id: "hr",
    name: "Human Resources",
    roles: ["HR Intern", "Recruitment", "Employee Relations", "Compensation Analyst", "HR Operations"]
  },
  {
    id: "operations",
    name: "Operations",
    roles: ["Operations Intern", "Supply Chain", "Logistics", "Business Operations", "Project Coordinator"]
  }
];

export const countriesWithCities: CountryWithCities[] = [
  {
    name: "United States",
    country: "United States",
    cities: ["New York", "San Francisco", "Chicago", "Los Angeles", "Boston", "Seattle", "Austin"]
  },
  {
    name: "United Kingdom",
    country: "United Kingdom",
    cities: ["London", "Manchester", "Birmingham", "Edinburgh", "Glasgow", "Bristol"]
  },
  {
    name: "Canada",
    country: "Canada",
    cities: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"]
  },
  {
    name: "Australia",
    country: "Australia",
    cities: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"]
  },
  {
    name: "India",
    country: "India",
    cities: ["Bangalore", "Mumbai", "Delhi", "Hyderabad", "Pune", "Chennai"]
  },
  {
    name: "Germany",
    country: "Germany",
    cities: ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne"]
  },
  {
    name: "Remote",
    country: "Remote",
    cities: ["Remote"]
  }
];

export const mockInternships: Internship[] = [
  {
    id: "int-001",
    title: "Frontend Developer Intern",
    company: "TechNova",
    companyLogo: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    employerId: "emp-001",
    location: "San Francisco, CA",
    isRemote: false,
    country: "United States",
    city: "San Francisco",
    category: "Technology",
    role: "Software Developer",
    stipend: {
      amount: 2000,
      currency: "USD",
      isPaid: true
    },
    duration: "3 months",
    startDate: "2025-06-01",
    applicationDeadline: "2025-05-15",
    responsibilities: [
      "Develop responsive web interfaces using React",
      "Collaborate with the design team to implement UI/UX designs",
      "Optimize application performance",
      "Write clean, maintainable code"
    ],
    requirements: [
      "Currently pursuing a degree in Computer Science or related field",
      "Knowledge of HTML, CSS, JavaScript",
      "Familiarity with React is a plus",
      "Strong problem-solving skills"
    ],
    description: "Join TechNova as a Frontend Developer Intern and gain hands-on experience building modern web applications. You'll work with a team of experienced developers on real-world projects.",
    postedDate: "2025-04-01"
  },
  {
    id: "int-002",
    title: "Data Science Intern",
    company: "DataMind AI",
    companyLogo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    employerId: "emp-002",
    location: "Remote",
    isRemote: true,
    country: "Remote",
    city: "Remote",
    category: "Technology",
    role: "Data Analyst",
    stipend: {
      amount: 1500,
      currency: "USD",
      isPaid: true
    },
    duration: "6 months",
    startDate: "2025-05-15",
    applicationDeadline: "2025-05-01",
    responsibilities: [
      "Analyze large datasets and extract meaningful insights",
      "Build and improve machine learning models",
      "Create data visualizations and reports",
      "Collaborate with cross-functional teams"
    ],
    requirements: [
      "Currently pursuing a degree in Data Science, Statistics, or related field",
      "Proficiency in Python and data analysis libraries",
      "Experience with machine learning concepts",
      "Strong analytical and problem-solving skills"
    ],
    description: "DataMind AI is seeking a passionate Data Science Intern to join our remote team. You'll gain valuable experience working with real-world data and contribute to innovative AI solutions.",
    postedDate: "2025-03-25"
  },
  {
    id: "int-003",
    title: "Digital Marketing Intern",
    company: "GrowthX",
    companyLogo: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    employerId: "emp-003",
    location: "New York, NY",
    isRemote: false,
    country: "United States",
    city: "New York",
    category: "Marketing",
    role: "Digital Marketing",
    stipend: {
      amount: 1200,
      currency: "USD",
      isPaid: true
    },
    duration: "4 months",
    startDate: "2025-06-01",
    applicationDeadline: "2025-05-10",
    responsibilities: [
      "Assist in creating and implementing digital marketing campaigns",
      "Manage social media accounts and create engaging content",
      "Analyze campaign performance and prepare reports",
      "Research market trends and competitor strategies"
    ],
    requirements: [
      "Currently pursuing a degree in Marketing, Communications, or related field",
      "Strong written and verbal communication skills",
      "Basic knowledge of digital marketing concepts",
      "Familiarity with social media platforms and analytics tools"
    ],
    description: "GrowthX is looking for a Digital Marketing Intern to support our marketing team. This is an excellent opportunity to gain practical experience in digital marketing strategies and tactics.",
    postedDate: "2025-03-30"
  },
  {
    id: "int-004",
    title: "UI/UX Design Intern",
    company: "DesignHub",
    companyLogo: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    employerId: "emp-004",
    location: "London, UK",
    isRemote: false,
    country: "United Kingdom",
    city: "London",
    category: "Design",
    role: "UI/UX Designer",
    stipend: {
      amount: 1300,
      currency: "GBP",
      isPaid: true
    },
    duration: "3 months",
    startDate: "2025-05-01",
    applicationDeadline: "2025-04-15",
    responsibilities: [
      "Create wireframes, prototypes, and user flows",
      "Conduct user research and usability testing",
      "Collaborate with developers to implement designs",
      "Contribute to design system improvements"
    ],
    requirements: [
      "Currently pursuing a degree in Design, HCI, or related field",
      "Proficiency in design tools such as Figma or Adobe XD",
      "Understanding of UI/UX principles and best practices",
      "Strong visual design and problem-solving skills"
    ],
    description: "Join DesignHub as a UI/UX Design Intern and work on exciting projects that enhance user experiences. You'll get hands-on experience with the latest design tools and methodologies.",
    postedDate: "2025-03-15"
  },
  {
    id: "int-005",
    title: "Finance Intern",
    company: "GlobalFinance",
    companyLogo: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    employerId: "emp-005",
    location: "Mumbai, India",
    isRemote: false,
    country: "India",
    city: "Mumbai",
    category: "Finance",
    role: "Financial Analyst",
    stipend: {
      amount: 15000,
      currency: "INR",
      isPaid: true
    },
    duration: "6 months",
    startDate: "2025-06-15",
    applicationDeadline: "2025-05-30",
    responsibilities: [
      "Assist in financial analysis and reporting",
      "Support budget preparation and forecasting",
      "Help with investment analysis and research",
      "Prepare financial models and presentations"
    ],
    requirements: [
      "Currently pursuing a degree in Finance, Economics, or related field",
      "Strong analytical and quantitative skills",
      "Proficiency in Excel and financial modeling",
      "Attention to detail and ability to work with deadlines"
    ],
    description: "GlobalFinance offers a comprehensive Finance Internship program designed to provide hands-on experience in financial analysis, investment research, and corporate finance.",
    postedDate: "2025-04-05"
  },
  {
    id: "int-006",
    title: "Product Management Intern",
    company: "InnovateTech",
    companyLogo: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    employerId: "emp-006",
    location: "Remote",
    isRemote: true,
    country: "Remote",
    city: "Remote",
    category: "Technology",
    role: "Product Manager",
    stipend: {
      amount: 1800,
      currency: "USD",
      isPaid: true
    },
    duration: "4 months",
    startDate: "2025-05-15",
    applicationDeadline: "2025-04-30",
    responsibilities: [
      "Assist in product development lifecycle",
      "Conduct market research and competitive analysis",
      "Support user story creation and feature prioritization",
      "Collaborate with design and engineering teams"
    ],
    requirements: [
      "Currently pursuing a degree in Business, Computer Science, or related field",
      "Strong analytical and problem-solving skills",
      "Excellent communication and interpersonal abilities",
      "Interest in technology products and user experience"
    ],
    description: "InnovateTech is seeking a motivated Product Management Intern to join our remote team. You'll gain valuable experience in product development, market research, and cross-functional collaboration.",
    postedDate: "2025-03-20"
  }
];

export const mockCourses: Course[] = [
  {
    id: "course-001",
    title: "Web Development Fundamentals",
    category: "Technology",
    description: "Learn the essentials of web development including HTML, CSS, and JavaScript to build responsive websites from scratch.",
    duration: "8 weeks",
    level: "Beginner",
    instructor: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    enrolled: 1250,
    rating: 4.7,
    topics: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "DOM Manipulation"]
  },
  {
    id: "course-002",
    title: "Data Science and Machine Learning",
    category: "Technology",
    description: "Master the fundamentals of data science, machine learning, and data visualization with Python and popular libraries.",
    duration: "12 weeks",
    level: "Intermediate",
    instructor: "David Chen",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    enrolled: 980,
    rating: 4.8,
    topics: ["Python", "Pandas", "NumPy", "Scikit-Learn", "TensorFlow", "Data Visualization"]
  },
  {
    id: "course-003",
    title: "Digital Marketing Strategy",
    category: "Marketing",
    description: "Develop comprehensive digital marketing strategies that drive growth using the latest tools and techniques in the industry.",
    duration: "6 weeks",
    level: "Beginner",
    instructor: "Emily Roberts",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    enrolled: 760,
    rating: 4.5,
    topics: ["SEO", "SEM", "Social Media Marketing", "Content Strategy", "Analytics"]
  },
  {
    id: "course-004",
    title: "Financial Analysis and Modeling",
    category: "Finance",
    description: "Learn financial analysis techniques and build sophisticated financial models to support investment decisions and business planning.",
    duration: "10 weeks",
    level: "Intermediate",
    instructor: "Michael Patel",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    enrolled: 650,
    rating: 4.6,
    topics: ["Excel", "Financial Statements", "Valuation", "Forecasting", "Risk Analysis"]
  },
  {
    id: "course-005",
    title: "UI/UX Design Principles",
    category: "Design",
    description: "Master the principles of user interface and user experience design to create intuitive, engaging, and accessible digital products.",
    duration: "8 weeks",
    level: "Beginner",
    instructor: "Lisa Kim",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    enrolled: 890,
    rating: 4.9,
    topics: ["Design Thinking", "Wireframing", "Prototyping", "User Research", "Visual Design"]
  },
  {
    id: "course-006",
    title: "Human Resources Management",
    category: "Human Resources",
    description: "Develop essential HR skills including recruitment, performance management, employee relations, and strategic HR planning.",
    duration: "6 weeks",
    level: "Intermediate",
    instructor: "James Wilson",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    enrolled: 520,
    rating: 4.4,
    topics: ["Recruitment", "Performance Management", "Employment Law", "Compensation", "Employee Development"]
  }
];

export const mockInterviewQuestions: Record<string, string[]> = {
  "Software Developer": [
    "Explain the difference between let, const, and var in JavaScript.",
    "What is the difference between == and === in JavaScript?",
    "Explain how React's virtual DOM works.",
    "What is a closure in JavaScript?",
    "Describe RESTful API design principles.",
    "How would you optimize a web application's performance?",
    "Explain the concept of inheritance in object-oriented programming.",
    "What design patterns are you familiar with and when would you use them?"
  ],
  "Data Analyst": [
    "Explain the difference between supervised and unsupervised learning.",
    "How would you handle missing data in a dataset?",
    "Describe the process of data cleaning and preprocessing.",
    "What statistical methods would you use to identify outliers?",
    "Explain the concept of p-value in statistical testing.",
    "How would you approach a classification problem?",
    "Describe a time when you used data visualization to communicate insights.",
    "What tools and programming languages are you proficient in for data analysis?"
  ],
  "UI/UX Designer": [
    "What is your design process?",
    "How do you conduct user research and implement findings?",
    "Explain the difference between UX and UI design.",
    "How do you ensure your designs are accessible?",
    "Describe a design challenge you faced and how you solved it.",
    "What design tools are you proficient in?",
    "How do you handle feedback on your designs?",
    "Explain the concept of design systems and their importance."
  ],
  "Digital Marketing": [
    "How do you measure the success of a digital marketing campaign?",
    "Explain the difference between SEO and SEM.",
    "What social media platforms would you recommend for B2B marketing and why?",
    "How do you stay updated with digital marketing trends?",
    "Describe a successful campaign you worked on or studied.",
    "How would you optimize a landing page for conversions?",
    "What tools do you use for digital marketing analytics?",
    "How would you approach A/B testing for email campaigns?"
  ],
  "Financial Analyst": [
    "Explain the three financial statements and how they connect.",
    "What is the difference between NPV and IRR?",
    "How would you value a company?",
    "Explain the concept of working capital management.",
    "What factors would you consider when analyzing an investment opportunity?",
    "How do you forecast financial statements?",
    "Describe the impact of interest rate changes on different asset classes.",
    "What financial modeling techniques are you familiar with?"
  ]
};

export const generateMockInterview = (role: string): MockInterview => {
  const questions = mockInterviewQuestions[role] || mockInterviewQuestions["Software Developer"];
  
  return {
    id: `interview-${Date.now()}`,
    role,
    questions: questions.map((question, index) => ({
      id: `q-${index}`,
      question
    }))
  };
};

export const mockJobs: Job[] = [
  {
    id: "job-1",
    employerId: "employer-1",
    title: "Frontend Developer",
    company: "TechCorp",
    category: "Software Development",
    role: "Frontend Developer",
    description: "We're looking for a skilled frontend developer to join our team and help build responsive web applications using React and TypeScript.",
    location: "San Francisco, California",
    isRemote: false,
    city: "San Francisco",
    country: "USA",
    employmentType: "full-time",
    experienceLevel: "mid",
    salary: {
      isDisclosed: true,
      min: 90000,
      max: 120000,
      currency: "USD"
    },
    responsibilities: [
      "Develop user-facing features using React.js",
      "Build reusable components and libraries for future use",
      "Optimize applications for maximum speed and scalability",
      "Collaborate with backend developers and designers"
    ],
    requirements: [
      "3+ years of experience with React.js",
      "Strong proficiency in JavaScript and TypeScript",
      "Experience with responsive design",
      "Understanding of Redux and state management principles"
    ],
    postedDate: "2025-03-01",
    companyLogo: "https://placehold.co/100x100?text=TC",
    applicationDeadline: "2025-05-01"
  },
  {
    id: "job-2",
    employerId: "employer-2",
    title: "Backend Engineer",
    company: "DataSystems Inc.",
    category: "Software Development",
    role: "Backend Engineer",
    description: "Join our backend team to design and implement scalable APIs and microservices architecture for our growing platform.",
    location: "Remote",
    isRemote: true,
    city: "Any",
    country: "Any",
    employmentType: "full-time",
    experienceLevel: "senior",
    salary: {
      isDisclosed: true,
      min: 120000,
      max: 160000,
      currency: "USD"
    },
    responsibilities: [
      "Design and implement backend services using Node.js",
      "Optimize database queries and data structures",
      "Create and maintain API documentation",
      "Work with DevOps to ensure smooth deployment processes"
    ],
    requirements: [
      "5+ years of experience in backend development",
      "Strong knowledge of Node.js and Express",
      "Experience with databases (MongoDB, PostgreSQL)",
      "Understanding of microservices architecture"
    ],
    postedDate: "2025-03-10",
    companyLogo: "https://placehold.co/100x100?text=DS",
    applicationDeadline: "2025-05-15"
  },
  {
    id: "job-3",
    employerId: "employer-3",
    title: "UX/UI Designer",
    company: "CreativeMinds",
    category: "Design",
    role: "UX/UI Designer",
    description: "We're looking for a talented UX/UI Designer to create amazing user experiences for our clients' digital products.",
    location: "Berlin, Germany",
    isRemote: false,
    city: "Berlin",
    country: "Germany",
    employmentType: "full-time",
    experienceLevel: "mid",
    salary: {
      isDisclosed: false
    },
    responsibilities: [
      "Create user flows, wireframes, and prototypes",
      "Design intuitive and visually appealing interfaces",
      "Conduct user research and usability testing",
      "Collaborate with developers to implement designs"
    ],
    requirements: [
      "3+ years of experience in UX/UI design",
      "Proficiency in Figma, Sketch, or similar tools",
      "Strong portfolio demonstrating your design process",
      "Understanding of accessibility and usability principles"
    ],
    postedDate: "2025-03-15",
    companyLogo: "https://placehold.co/100x100?text=CM",
    applicationDeadline: "2025-05-15"
  },
  {
    id: "job-4",
    employerId: "employer-4",
    title: "DevOps Engineer",
    company: "CloudSolutions",
    category: "DevOps",
    role: "DevOps Engineer",
    description: "Join our team to build and maintain our cloud infrastructure and deployment pipelines.",
    location: "Remote",
    isRemote: true,
    city: "Any",
    country: "Any",
    employmentType: "full-time",
    experienceLevel: "senior",
    salary: {
      isDisclosed: true,
      min: 110000,
      max: 150000,
      currency: "USD"
    },
    responsibilities: [
      "Manage AWS cloud infrastructure",
      "Implement CI/CD pipelines",
      "Monitor system performance and troubleshoot issues",
      "Ensure security best practices are followed"
    ],
    requirements: [
      "4+ years of experience in DevOps",
      "Strong knowledge of AWS or similar cloud platforms",
      "Experience with Docker and Kubernetes",
      "Proficiency in scripting languages (Python, Bash)"
    ],
    postedDate: "2025-03-20",
    companyLogo: "https://placehold.co/100x100?text=CS",
    applicationDeadline: "2025-05-20"
  },
  {
    id: "job-5",
    employerId: "employer-5",
    title: "Data Scientist",
    company: "AnalyticsPro",
    category: "Data Science",
    role: "Data Scientist",
    description: "Help us build ML models and extract valuable insights from our vast datasets.",
    location: "New York, USA",
    isRemote: false,
    city: "New York",
    country: "USA",
    employmentType: "full-time",
    experienceLevel: "mid",
    salary: {
      isDisclosed: true,
      min: 100000,
      max: 130000,
      currency: "USD"
    },
    responsibilities: [
      "Build and train machine learning models",
      "Process and analyze large datasets",
      "Create data visualizations and reports",
      "Work with stakeholders to understand business requirements"
    ],
    requirements: [
      "Master's degree in Data Science, Statistics, or related field",
      "Experience with Python and data science libraries",
      "Knowledge of SQL and database systems",
      "Experience with machine learning frameworks"
    ],
    postedDate: "2025-03-25",
    companyLogo: "https://placehold.co/100x100?text=AP",
    applicationDeadline: "2025-05-25"
  }
];
