import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import AnimatedBackground from "@/components/ui/AnimatedBackground";

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      <AnimatedBackground />
      <div className="container relative z-10 mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-800 mb-6 animate-fade-in">
          GRI Sustainability Reporting
          <span className="block text-blue-600 animate-fade-in-delayed">
            Certification Program
          </span>
        </h1>
        <p className="text-xl text-white mb-8 max-w-2xl mx-auto animate-slide-up">
          Master sustainability reporting with our comprehensive training
          program. Join the next cohort starting February 2025.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up-delayed">
          <Link href="/register">
            <div className="transform transition-transform duration-200 hover:scale-105 active:scale-95">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg shadow-lg transition-all duration-300 ease-in-out">
                Register Now <ArrowRight className="ml-2" />
              </Button>
            </div>
          </Link>
          <div className="transform transition-transform duration-200 hover:scale-105 active:scale-95">
            <Button
              variant="outline"
              className="border-2 border-blue-600 text-blue-600  px-8 py-6 text-lg shadow-lg transition-all duration-300 ease-in-out"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
