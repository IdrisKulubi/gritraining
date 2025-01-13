"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "@/lib/actions/auth";
import { toast } from "@/hooks/use-toast";

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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Input
          type="email"
          placeholder="Work email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border-green-200 focus:border-green-500 focus:ring-green-500"
          disabled={isLoading}
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
