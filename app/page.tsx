import Spotlight from "./components/ui/Spotlight";
import AIChat from "./components/features/AIChat";
import AboutSection from "./components/sections/AboutSection";
import ExperienceSection from "./components/sections/ExperienceSection";
import ArchiveSection from "./components/sections/ArchiveSection";
import Footer from "./components/sections/Footer";

export default function Home() {
  return (
    <div className="relative min-h-[800px]">
      <Spotlight />

      <div className="mx-auto max-w-[1440px] px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-32 lg:min-h-[800px]">
          {/* Left Section */}
          <div
            id="left-section"
            className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:min-h-[800px] lg:w-[45%] lg:flex-col lg:gap-14 lg:pt-12 lg:pb-12"
          >
            <AIChat />
          </div>

          {/* Right Content */}
          <main id="content" className="pt-24 lg:w-[55%] lg:pb-14 lg:pt-16">
            <AboutSection />
            <ExperienceSection />
            <ArchiveSection />
            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
}
