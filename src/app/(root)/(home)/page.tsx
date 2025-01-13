import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, BookOpen, Users, Award } from "lucide-react";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-green-50 to-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-6">
              GRI Sustainability Reporting
              <span className="block text-green-600">
                Certification Program
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Master sustainability reporting with our comprehensive training
              program. Join the next cohort starting February 2025.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg">
                  Register Now <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-6 text-lg"
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16" id="program">
          <div className="container mx-auto px-4 ">
            <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
              Program Highlights
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <BookOpen className="w-12 h-12 text-green-600" />,
                  title: "Comprehensive Curriculum",
                  description:
                    "Learn from industry experts with our detailed course material",
                },
                {
                  icon: <Users className="w-12 h-12 text-green-600" />,
                  title: "Interactive Sessions",
                  description:
                    "Engage in live discussions and practical exercises",
                },
                {
                  icon: <Award className="w-12 h-12 text-green-600" />,
                  title: "Certification",
                  description:
                    "Receive internationally recognized GRI certification",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="text-center p-6 rounded-lg border border-green-100 hover:border-green-200 transition-colors"
                >
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-green-700 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-green-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-green-800 mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join our February 2025 cohort and take the next step in your
              sustainability career.
            </p>
            <Link href="/register">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg">
                Register Now <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
