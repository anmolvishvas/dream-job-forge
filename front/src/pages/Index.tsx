
import PageLayout from "@/components/layout/PageLayout";
import HeroBanner from "@/components/home/HeroBanner";
import Categories from "@/components/home/Categories";
import FeaturedJobs from "@/components/home/FeaturedJobs";
import CompaniesSection from "@/components/home/CompaniesSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import CtaSection from "@/components/home/CtaSection";

const Index = () => {
  return (
    <PageLayout>
      <HeroBanner />
      <Categories />
      <FeaturedJobs />
      <CompaniesSection />
      <TestimonialSection />
      <CtaSection />
    </PageLayout>
  );
};

export default Index;
