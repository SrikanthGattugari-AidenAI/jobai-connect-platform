
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { 
  HeroSection, 
  FeaturesSection, 
  FeaturedInternships, 
  MockInterviewSection, 
  SuccessStories, 
  CallToAction, 
  MarketTrendsSection,
  CareerRoadmapSection,
  HackathonSection,
  TopCompaniesSection
} from '@/components/home';
import { mockInternships } from '@/lib/data';

const Home = () => {
  // Featured internships (showing 3 from our mock data)
  const featuredInternships = mockInternships.slice(0, 3);
  
  return (
    <MainLayout>
      <HeroSection />
      <FeaturesSection />
      <MarketTrendsSection />
      <FeaturedInternships internships={featuredInternships} />
      <MockInterviewSection />
      <CareerRoadmapSection />
      <HackathonSection />
      <TopCompaniesSection />
      <SuccessStories />
      <CallToAction />
    </MainLayout>
  );
};

export default Home;
