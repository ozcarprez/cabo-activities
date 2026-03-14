import { HeroSection } from '@/components/home/HeroSection';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { FeaturedSection } from '@/components/home/FeaturedSection';
import { WhySection } from '@/components/home/WhySection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { CTASection } from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <FeaturedSection />
      <WhySection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
