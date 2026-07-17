import Hero from '../../components/Hero/Hero';
import EverythingYouCanDo from '../../components/EverythingYouCanDo/EverythingYouCanDo';
import FeatureCards from '../../components/FeatureCards/FeatureCards';
import CTA from '../../components/CTA/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <EverythingYouCanDo />
      <FeatureCards />
      <CTA />
    </>
  );
}
