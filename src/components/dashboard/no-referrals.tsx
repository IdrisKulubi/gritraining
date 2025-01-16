"use client";

import { Fade } from "react-awesome-reveal";
import { ImpressiveNoReferralScene } from "./NoReferral3DScene";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import Link from "next/link";

export function NoReferrals() {
  return (
    <Fade>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4 sm:p-8 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white rounded-sm">
        <div className="w-full max-w-4xl">
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full mb-6 sm:mb-12 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl ring-2 sm:ring-4 ring-purple-500 ring-opacity-50">
            <ImpressiveNoReferralScene />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
          </div>
          <div className="space-y-4 sm:space-y-8 text-center px-2 sm:px-4">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2 sm:mb-4 animate-pulse">
              You have no referrals
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-4 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              Embark on an exciting adventure 🚀. Share your unique referral
              link 🔗
            </p>
            <Link href="/dashboard">
              <Button className="w-full sm:w-auto group relative inline-flex items-center justify-center px-4 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full overflow-hidden transition-all duration-300 ease-in-out hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-50 transition-opacity duration-300 ease-in-out" />
                <Share className="h-5 w-5 sm:h-6 sm:w-6 mr-2 animate-bounce" />
                <span>Share Your Referral Link</span>
              </Button>
            </Link>
           
          </div>
        </div>
      </div>
    </Fade>
  );
}
