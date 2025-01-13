import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FeaturesSection } from "@/components/home/features-section";
import { CTASection } from "@/components/home/cta-section";
import HeroSection from "@/components/home/hero-section";

export default function Home() {
  return (
    
      <div className="h-screen"> 
        <Header />
        <main>
          <div className="h-screen ">
          {" "}
          <HeroSection />
        </div>
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
