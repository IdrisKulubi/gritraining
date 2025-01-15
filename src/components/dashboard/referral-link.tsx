"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Link, Copy, CheckCircle } from "lucide-react";

interface Props {
  referralCode: string;
}

export function ReferralLink({ referralCode }: Props) {
  const [copied, setCopied] = useState(false);
  const [referralLink, setReferralLink] = useState(
    `/register?ref=${referralCode}`
  );

  useEffect(() => {
    const fullUrl = `${window.location.origin}/register?ref=${referralCode}`;
    if (referralLink !== fullUrl) {
      setReferralLink(fullUrl);
    }
  }, [referralCode, referralLink]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast({
        title: "🎉 Copied!",
        description: "Referral link copied to clipboard",
        className: "bg-gradient-to-r from-green-400 to-blue-500 text-white",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error copying to clipboard", err);
      toast({
        title: "❌ Error",
        description: "Failed to copy link",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-purple-100 to-pink-200 dark:from-purple-900/50 dark:to-pink-900/50 p-6 rounded-2xl shadow-lg"
    >
      <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-300 dark:to-pink-300 mb-4 flex items-center">
        <Link className="h-6 w-6 mr-2 text-blue-500" />
        Your Magical Referral Link
      </h3>
      <div className="mt-2 flex flex-col sm:flex-row gap-2">
        <div className="relative flex-grow">
          <Input
            value={referralLink}
            readOnly
            className="pr-10 bg-white dark:bg-gray-800 border-2 border-purple-300 dark:border-purple-700 focus:border-pink-500 dark:focus:border-pink-500 rounded-xl"
          />
          <motion.div
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            🔮
          </motion.div>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={copyToClipboard}
            className={`w-full sm:w-auto ${
              copied
                ? "bg-gradient-to-r from-green-400 to-blue-500"
                : "bg-gradient-to-r from-purple-500 to-pink-500"
            } text-white font-bold py-2 px-4 rounded-xl transition-all duration-300 ease-in-out transform hover:shadow-lg`}
          >
            {copied ? (
              <CheckCircle className="h-5 w-5 mr-2" />
            ) : (
              <Copy className="h-5 w-5 mr-2" />
            )}
            {copied ? "Copied! ✨" : "Copy Magic Link"}
          </Button>
        </motion.div>
      </div>
      <motion.p
        className="mt-4 text-sm text-gray-600 dark:text-gray-300 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        Share the magic and earn rewards! 🎁✨
      </motion.p>
    </motion.div>
  );
}
