import DeuteriumHeroWithAnimation from "@/components/blocks/heros/deuterium-hero-with-animation";
import DeuteriumAboutTimeline from "@/components/blocks/feature-sections/deuterium-about-timeline";
import DeuteriumTechnologies from "@/components/blocks/feature-sections/deuterium-technologies";
import DeuteriumBotCards from "@/components/blocks/cards/deuterium-bot-cards";
import DeuteriumLabsResearch from "@/components/blocks/feature-sections/deuterium-labs-research";
import DeuteriumCareersBoard from "@/components/blocks/ctas/deuterium-careers-board";
import DeuteriumHolographicContact from "@/components/blocks/contact-forms/deuterium-holographic-contact";
import DeuteriumMinimalFooter from "@/components/blocks/footers/deuterium-minimal-footer";

export default function Home() {
  return (
    <>
      {/* The Hero component is a self-contained, full-screen introductory section. */}
      <DeuteriumHeroWithAnimation />

      {/* The main content of the page follows the hero section. */}
      <main className="bg-background">
        <DeuteriumAboutTimeline />
        <DeuteriumTechnologies />
        <DeuteriumBotCards />
        <DeuteriumLabsResearch />
        <DeuteriumCareersBoard />
        <DeuteriumHolographicContact />
      </main>

      {/* The footer is a separate landmark at the end of the page. */}
      <DeuteriumMinimalFooter />
    </>
  );
}