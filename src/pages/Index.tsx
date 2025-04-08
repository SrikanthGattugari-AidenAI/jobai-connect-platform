
import { MainLayout } from "@/components/layout/MainLayout";
import { mockInternships } from "@/lib/data";
import {
  HeroSection,
  FeaturesSection,
  FeaturedInternships,
  MockInterviewSection,
  SuccessStories,
  CallToAction
} from "@/components/home";

const Index = () => {
  // Featured internships (showing 3 from our mock data)
  const featuredInternships = mockInternships.slice(0, 3);
  
  return (
    <MainLayout>
      <HeroSection />
      <FeaturesSection />
      <FeaturedInternships internships={featuredInternships} />
      <MockInterviewSection />
      <SuccessStories />
      <CallToAction />
    </MainLayout>
  );
};

export default Index;
