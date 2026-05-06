import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import AsSeenIn from "@/components/sections/AsSeenIn";
import CodeWindow from "@/components/sections/CodeWindow";
import CTA from "@/components/sections/CTA";
import CustomerStories from "@/components/sections/CustomerStories";
import Features from "@/components/sections/Features";
import Hero from "@/components/sections/Hero";
import LendasatPlatform from "@/components/sections/LendasatPlatform";
import MobileCodePreview from "@/components/sections/MobileCodePreview";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        {/* Split layout: scrollable left + sticky code right (desktop only) */}
        <div className="lg:flex">
          {/* Left — scrollable content */}
          <div className="flex-1 min-w-0">
            <Hero />
            <MobileCodePreview />
            <AsSeenIn />
            <Features />
            <CustomerStories />
            <CTA />
          </div>

          {/* Right — sticky code window, hidden on mobile */}
          <div className="hidden lg:block lg:w-[46%] xl:w-[48%] flex-shrink-0 relative">
            {/* Scrolling lime blobs — organic shapes that drift behind the glass */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-[5%] -right-[20%] w-[500px] h-[350px] bg-gradient-to-br from-lime/12 to-lime/[0.02] dark:from-lime-light/8 dark:to-transparent blur-[90px] rounded-[30%_70%_60%_40%/50%_40%_60%_50%] rotate-[25deg]" />
              <div className="absolute top-[18%] -left-[15%] w-[400px] h-[500px] bg-gradient-to-tr from-lime/8 to-transparent dark:from-lime-light/6 dark:to-transparent blur-[100px] rounded-[60%_40%_50%_50%/40%_60%_40%_60%] -rotate-[12deg]" />
              <div className="absolute top-[40%] -right-[10%] w-[550px] h-[400px] bg-gradient-to-bl from-lime/10 via-lime/[0.03] to-transparent dark:from-lime-light/7 dark:via-lime-light/[0.02] dark:to-transparent blur-[110px] rounded-[45%_55%_60%_40%/55%_35%_65%_45%] rotate-[40deg]" />
              <div className="absolute top-[62%] -left-[10%] w-[450px] h-[350px] bg-gradient-to-r from-lime/8 to-transparent dark:from-lime-light/5 dark:to-transparent blur-[95px] rounded-[55%_45%_40%_60%/45%_55%_50%_50%] -rotate-[30deg]" />
              <div className="absolute top-[82%] -right-[15%] w-[500px] h-[450px] bg-gradient-to-tl from-lime/12 via-lime/[0.04] to-transparent dark:from-lime-light/8 dark:via-lime-light/[0.02] dark:to-transparent blur-[100px] rounded-[40%_60%_45%_55%/60%_40%_55%_45%] rotate-[15deg]" />
            </div>

            {/* Sticky glass window */}
            <div className="sticky top-0 h-screen flex items-end justify-center px-4 pt-20 pb-8 z-10">
              <div className="relative w-full h-[calc(100vh-110px)] max-h-[calc(100vh-110px)]">
                <div className="relative w-full h-full">
                  <CodeWindow />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer — full width, outside the split */}
      <Footer />
    </>
  );
}
