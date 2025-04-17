
import { MainLayout } from "@/components/layout/MainLayout";
import { mockInternships, mockJobs } from "@/lib/data";
import {
  HeroSection,
  FeaturesSection,
  FeaturedInternships,
  MockInterviewSection,
  SuccessStories,
  CallToAction,
  MarketInsightsSection,
  CareerPathwaySection,
  HackathonSection,
  CareerRoadmapSection,
  MarketTrendsSection,
  TopCompaniesSection,
  FeaturedJobs
} from "@/components/home";

const Index = () => {
  // Featured internships (showing 3 from our mock data)
  const featuredInternships = mockInternships.slice(0, 3);
  
  // Featured jobs (showing 3 from our mock data)
  const featuredJobs = mockJobs.slice(0, 3);
  
  return (
    <MainLayout>
      <HeroSection />
      <FeaturesSection />
      <MarketTrendsSection />
      <FeaturedInternships internships={featuredInternships} />
      <FeaturedJobs jobs={featuredJobs} />
      <MockInterviewSection />
      <CareerRoadmapSection />
      <HackathonSection />
      <TopCompaniesSection />
      <SuccessStories />
      <CallToAction />
    </MainLayout>
  );
};

export default Index;
