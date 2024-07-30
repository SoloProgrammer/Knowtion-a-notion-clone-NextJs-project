import { Footer } from "./_components/footer";
import { Heading } from "./_components/heading";
import { HeroScrollDemo } from "./_components/hero-scroll";
import { Heros } from "./_components/heros";

const MarketingPage = () => {
  return (
    <div className="min-h-full flex flex-col antialiased">
      <div className="flex flex-col flex-grow justify-center md:justify-start text-center px-6 pb-10 gap-5">
        <Heading />
        <Heros />
      </div>
      <HeroScrollDemo />
      <Footer />
    </div>
  );
};

export default MarketingPage;
