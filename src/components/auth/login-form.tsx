"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "@/lib/actions/auth";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await login(email);

      if (result.success) {
        toast({
          title: "Success",
          description: "Logged in successfully",
        });
        router.refresh();
        router.push("/dashboard");
      } else {
        toast({
          title: "Error",
          description: result.error || "Invalid email address",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error logging in", error);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <div className="space-y-2">
        <Input
          type="email"
          placeholder="Work email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border-2 border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-lg px-4 py-3 transition-all duration-300 ease-in-out"
          disabled={isLoading}
        />
      </div>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 rounded-lg transition-all duration-300 ease-in-out transform hover:shadow-lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <motion.div
              className="inline-block"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              ⚙️
            </motion.div>
          ) : (
            "Login"
          )}
        </Button>
      </motion.div>
    </motion.form>
  );
}
