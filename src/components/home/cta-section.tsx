"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const text = textRef.current;
    const button = buttonRef.current;

    gsap.fromTo(
      section,
      { backgroundColor: "#f0fdf4" },
      {
        backgroundColor: "#dcfce7",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      [title, text, button],
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      }
    );

    gsap.to(button, {
      scale: 1.05,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-green-50 overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-green-800 mb-6"
        >
          Ready to Start Your Journey?
        </h2>
        <p
          ref={textRef}
          className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto"
        >
          Join our February 2025 cohort and take the next step in your
          sustainability career. Transform your future today!
        </p>
        <Link href="/register">
          <Button
            ref={buttonRef}
            className="bg-green-600 hover:bg-green-700 text-white px-10 py-6 text-xl font-semibold rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
          >
            Register Now <ArrowRight className="ml-2 w-6 h-6" />
          </Button>
        </Link>
      </div>
      <div className="absolute inset-0 z-0">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C30,40 70,40 100,0 L100,100 0,100 Z"
            fill="#4ade80"
            fillOpacity="0.1"
          />
        </svg>
      </div>
    </section>
  );
}
