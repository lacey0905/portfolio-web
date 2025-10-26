import Spotlight from "./components/Spotlight";
import AIChat from "./components/AIChat";
import Header from "./components/Header";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import ArchiveSection from "./components/ArchiveSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-[800px]">
      <Spotlight />

      <div className="mx-auto max-w-[1440px] px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-32 lg:min-h-[800px]">
          {/* Left Section */}
          <div
            id="left-section"
            className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:min-h-[800px] lg:w-[45%] lg:flex-col lg:gap-16 lg:pt-24 lg:pb-12"
          >
            <Header />
            <AIChat />
          </div>

          {/* Right Content */}
          <main id="content" className="pt-24 lg:w-[55%] lg:pt-24 lg:pb-14">
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
