import Seo from '../../components/Seo/Seo';
import Hero from '../../components/Hero/Hero';
import EverythingYouCanDo from '../../components/EverythingYouCanDo/EverythingYouCanDo';
import FeatureCards from '../../components/FeatureCards/FeatureCards';
import CTA from '../../components/CTA/CTA';

export default function Home() {
  return (
    <>
      <Seo
        title="MoonPair — Your relationship deserves its own universe"
        description="MoonPair is a private universe for couples to share love, understand each other, create memories, and grow closer every day."
      />
      <Hero />
      <EverythingYouCanDo />
      <FeatureCards />
      <CTA />
    </>
  );
}
