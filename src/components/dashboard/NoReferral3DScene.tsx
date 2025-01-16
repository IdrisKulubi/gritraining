"use client";

import { motion } from "framer-motion";
import { Share, Gift, Users, Star, Sparkles } from "lucide-react";

const floatingAnimation = {
  y: [-10, 10],
  transition: {
    duration: 2,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut",
  },
};

export function ImpressiveNoReferralScene() {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
      {/* Background sparkles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            opacity: 0,
            scale: 0,
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: Math.random() * 200 - 100,
            y: Math.random() * 200 - 100,
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          <Sparkles className="w-4 h-4 text-purple-400" />
        </motion.div>
      ))}

      {/* Motivational Text */}
      <motion.div
        className="absolute top-8 text-center z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Start Your Referral Journey! 🚀
        </motion.h2>
        <motion.p
          className="mt-2 text-gray-300 text-lg md:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Share your unique link and watch your rewards grow
        </motion.p>
      </motion.div>

      {/* Central elements */}
      <div className="relative flex flex-col items-center mt-24">
        <motion.div animate={floatingAnimation} className="relative z-10 mb-8">
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="relative bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-full"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Share className="w-12 h-12 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Text */}
        <motion.div
          className="absolute bottom-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-emerald-400 font-semibold text-lg">
            Each referral brings exciting rewards ✨
          </p>
          <motion.div
            className="text-sm text-gray-400 mt-2"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Click to copy your referral link
          </motion.div>
        </motion.div>

        {/* Orbiting elements */}
        {[
          { Icon: Gift, delay: 0 },
          { Icon: Users, delay: 0.5 },
          { Icon: Star, delay: 1 },
        ].map(({ Icon, delay }, index) => (
          <motion.div
            key={index}
            className="absolute"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: [0, 360],
              x: [50, -50, 50],
              y: [50, -50, 50],
            }}
            transition={{
              duration: 8,
              delay,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-full">
              <Icon className="w-6 h-6 text-white" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Animated rings */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-purple-500/20"
          style={
            {
              width: `${i * 150}px`,
              height: `${i * 150}px`,
            } as React.CSSProperties
          }
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
