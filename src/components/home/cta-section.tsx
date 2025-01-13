import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
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
  );
}
