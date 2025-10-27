import Spotlight from "./components/ui/Spotlight";
import AboutSection from "./components/sections/AboutSection";
import ExperienceSection from "./components/sections/ExperienceSection";
import ArchiveSection from "./components/sections/ArchiveSection";
import Footer from "./components/sections/Footer";
import ChatWrapper from "./components/ChatWrapper";

export default function Home() {
  return (
    <div className="relative min-h-[800px]">
      <Spotlight />

      <div className="mx-auto max-w-[1440px] px-4 py-8 font-sans sm:px-6 sm:py-12 md:px-12 md:py-16 xl:px-24 xl:py-0">
        <div className="xl:flex xl:justify-between xl:gap-32 xl:min-h-[800px]">
          {/* Left Section - AI Chat (1280px 이상에서만 표시) */}
          <ChatWrapper />

          {/* Right Content */}
          <main id="content" className="xl:w-[55%] xl:pb-14 xl:pt-16">
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
