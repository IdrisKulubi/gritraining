"use client";

import React, { useEffect, useRef } from "react";
import { BookOpen, Users, Award } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <BookOpen className="w-16 h-16 text-green-600" />,
    title: "Comprehensive Curriculum",
    description:
      "Learn from industry experts with our detailed course material",
  },
  {
    icon: <Users className="w-16 h-16 text-green-600" />,
    title: "Interactive Sessions",
    description: "Engage in live discussions and practical exercises",
  },
  {
    icon: <Award className="w-16 h-16 text-green-600" />,
    title: "Certification",
    description: "Receive internationally recognized GRI certification",
  },
];

export function FeaturesSection() {
  const sectionRef = useRef(null);
  const featuresRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const featureElements = featuresRef.current;

    gsap.fromTo(
      section,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      }
    );

    featureElements.forEach((feature, index) => {
      gsap.fromTo(
        feature,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2 * index,
          scrollTrigger: {
            trigger: feature,
            start: "top 80%",
          },
        }
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-white to-green-50"
      id="program"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-green-800 mb-16">
          Program Highlights
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) featuresRef.current[index] = el;
              }}
              className="text-center p-8 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2"
            >
              <div className="flex justify-center mb-6 transition-transform duration-300 ease-in-out transform hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold text-green-700 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
