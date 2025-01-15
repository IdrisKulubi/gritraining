"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Award, TrendingUp } from "lucide-react";
import db from "@/db/drizzle";
import { registrations } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

interface Props {
  employeeId: number;
}

export function ReferralStats({ employeeId }: Props) {
  const [referralCount, setReferralCount] = useState(0);

  useEffect(() => {
    async function fetchReferralCount() {
      const count = await db
        .select({ count: sql<number>`count(*)` })
        .from(registrations)
        .where(eq(registrations.referredById, employeeId));
      setReferralCount(count[0].count);
    }
    fetchReferralCount();
  }, [employeeId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-blue-100 to-purple-200 dark:from-blue-900/50 dark:to-purple-900/50 p-6 rounded-2xl shadow-lg"
    >
      <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-300 dark:to-purple-300 mb-4 flex items-center">
        <Users className="h-6 w-6 mr-2 text-blue-500" />
        Your Referral Power
      </h3>
      <div className="flex items-center justify-between">
        <div>
          <motion.p
            className="text-4xl font-extrabold text-blue-600 dark:text-blue-300"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
          >
            {referralCount}
          </motion.p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            Total Referrals
          </p>
        </div>
        <motion.div
          className="text-5xl"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
        >
          {referralCount > 10 ? "🏆" : referralCount > 5 ? "🌟" : "🚀"}
        </motion.div>
      </div>
      <motion.div
        className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-inner"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-300 flex items-center">
            <Award className="h-4 w-4 mr-1 text-yellow-500" />
            Next Milestone
          </span>
          <span className="font-medium text-purple-600 dark:text-purple-300">
            {referralCount >= 10 ? "Achieved!" : `${10 - referralCount} more`}
          </span>
        </div>
        <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((referralCount / 10) * 100, 100)}%` }}
            transition={{ duration: 1, delay: 1 }}
          />
        </div>
      </motion.div>
      <motion.p
        className="mt-4 text-sm text-gray-600 dark:text-gray-300 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
        Keep referring to level up <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="text-2xl">😉</motion.span>
      </motion.p>
    </motion.div>
  );
}
