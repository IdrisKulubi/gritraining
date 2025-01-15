"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Sparkles, Zap } from "lucide-react";
import { getLeaderboard } from "@/lib/actions/employees";
import type { LeaderboardEntry } from "@/lib/actions/employees";
import { cn } from "@/lib/utils";

interface Props {
  currentEmployeeId: number;
}

const emojis = ["🥇", "🥈", "🥉", "🏅", "🌟", "💪", "🚀", "🔥", "⚡️", "💎"];

export function Leaderboard({ currentEmployeeId }: Props) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    async function fetchLeaderboard() {
      const result = await getLeaderboard();
      if (result.success && result.data) {
        setLeaderboard(result.data);
      }
    }
    fetchLeaderboard();
  }, []);

  const getBackgroundGradient = (position: number) => {
    switch (position) {
      case 0:
        return "bg-gradient-to-r from-yellow-100 to-yellow-300 dark:from-yellow-900/30 dark:to-yellow-700/30";
      case 1:
        return "bg-gradient-to-r from-gray-100 to-gray-300 dark:from-gray-800/30 dark:to-gray-600/30";
      case 2:
        return "bg-gradient-to-r from-amber-100 to-amber-300 dark:from-amber-900/30 dark:to-amber-700/30";
      default:
        return "bg-gradient-to-r from-blue-50 to-blue-200 dark:from-blue-900/10 dark:to-blue-700/10";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-purple-100 to-pink-200 dark:from-purple-900/50 dark:to-pink-900/50 p-6 rounded-2xl shadow-lg w-full min-h-[calc(100vh-2rem)] flex flex-col"
    >
      <h3 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-300 dark:to-pink-300 mb-6 flex items-center justify-center">
        <Trophy className="h-8 w-8 text-yellow-400 mr-2" />
        Top Referrers
      </h3>
      <div className="space-y-4 flex-grow">
        <AnimatePresence>
          {leaderboard.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div
                className={cn(
                  "flex items-center justify-between p-4 rounded-xl transition-all transform hover:scale-105",
                  entry.id === currentEmployeeId
                    ? "bg-gradient-to-r from-green-200 to-blue-200 dark:from-green-900/30 dark:to-blue-900/30 ring-2 ring-green-400 dark:ring-green-500"
                    : getBackgroundGradient(index)
                )}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    className="text-2xl"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    {emojis[index]}
                  </motion.div>
                  <span className="font-bold text-lg text-gray-800 dark:text-white">
                    {entry.id === currentEmployeeId ? "You" : entry.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <motion.div
                    className="flex items-center bg-white dark:bg-gray-800 rounded-full px-3 py-1 shadow-md"
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="text-green-600 dark:text-green-400 font-extrabold text-xl mr-1">
                      {entry.referralCount}
                    </span>
                    <Sparkles className="h-4 w-4 text-yellow-400" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center justify-center">
          <Zap className="h-4 w-4 mr-1 text-yellow-400" />
          Keep referring to climb the leaderboard <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="text-2xl">😉</motion.span>
        </p>
      </motion.div>
    </motion.div>
  );
}
