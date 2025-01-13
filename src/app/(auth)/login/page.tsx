"use client";

import { LoginForm } from "@/components/auth/login-form";
import { redirect } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function LoginPage() {
  useEffect(() => {
    // Check auth status on mount
    const checkAuth = async () => {
      const response = await fetch("/api/auth/check");
      const data = await response.json();
      if (data.authenticated) {
        redirect("/dashboard");
      }
    };
    checkAuth();
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center"
        >
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Employee Login
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Enter your work email to access the dashboard
          </p>
        </motion.div>
        <LoginForm />
      </motion.div>
    </div>
  );
}
