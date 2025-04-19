import Container from "@/components/Global/Container";
import { FeaturesCard } from "@/components/LandingPage/FeatuerCard";
import Features from "@/components/LandingPage/Features";
import Footer from "@/components/LandingPage/Footer";
import Hero from "@/components/LandingPage/Hero";
import NavBar from "@/components/LandingPage/NavBar";
import Pricing from "@/components/LandingPage/Pricing";
import { WorldGlobe } from "@/components/LandingPage/WorldGlobe";
import GetStartedButton from "@/components/ui/get-started-button";
import { LampContainer } from "@/components/ui/lamp";

const LandingPage = () => {
  return (
    <main>
      <NavBar />
      <Hero />
      <Container>
        <Features />
        <div id="features">
          <FeaturesCard />
        </div>
      </Container>

      <WorldGlobe />
      <Container>
        <div className="relative " id="pricing">
          <Pricing />
          <div className="hidden md:block absolute top-0 left-0 w-72 h-72 bg-primary rounded-full blur-[10rem] -z-10 opacity-70"></div>
          <div className="hidden md:block absolute top-0 right-0 w-72 h-72 bg-primary rounded-full blur-[10rem] -z-10 opacity-70"></div>
        </div>
      </Container>
      <div className="mt-20 max-w-[100vw] overflow-x-hidden scrollbar-hide">
        <LampContainer>
          <div className="flex flex-col items-center justify-center relative w-full text-center">
            <h2 className="text-black dark:bg-gradient-to-b dark:from-neutral-200 dark:to-neutral-400 py-4 bg-clip-text text-center text-4xl md:text-7xl !leading-[1.15] font-medium font-heading tracking-tight dark:text-transparent mt-8">
              Step into the future of <br /> job discovery & hiring
            </h2>
            <p className="text-muted-foreground mt-6 max-w-lg mx-auto">
              Experience a powerful platform where AI meets opportunity—making
              job seeking and hiring smarter, faster, and more intuitive than
              ever.
            </p>

            <div className="mt-6">
              <GetStartedButton />
            </div>
          </div>
        </LampContainer>
      </div>
      <div className="pb-10">
        <Footer />
      </div>
    </main>
  );
};
export default LandingPage;
