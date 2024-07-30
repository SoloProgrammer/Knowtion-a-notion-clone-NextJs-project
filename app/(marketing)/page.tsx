import { Footer } from "./_components/footer";
import { Heading } from "./_components/heading";
import { HeroScroll } from "./_components/hero-scroll";
import { Heros } from "./_components/heros";
import { BentoGrid } from "./_components/bento-grid";

const MarketingPage = () => {
  return (
    <div className="min-h-full flex flex-col antialiased">
      <div className="flex flex-col flex-grow justify-center md:justify-start text-center px-6 pb-10 gap-5">
        <Heading />
        <Heros />
        <HeroScroll />
        <BentoGrid />
      </div>
      <Footer />
    </div>
  );
};

export default MarketingPage;
