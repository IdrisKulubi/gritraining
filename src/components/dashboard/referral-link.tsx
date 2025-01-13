"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

interface Props {
  referralCode: string;
}

export function ReferralLink({ referralCode }: Props) {
  const [copied, setCopied] = useState(false);
  const [referralLink, setReferralLink] = useState("");

  useEffect(() => {
    setReferralLink(`${window.location.origin}/register?ref=${referralCode}`);
  }, [referralCode]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Referral link copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error copying to clipboard", err);
      toast({
        title: "Error",
        description: "Failed to copy link",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-background p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
        Your Referral Link
      </h3>
      <div className="mt-2 flex gap-2">
        <Input value={referralLink} readOnly />
        <Button onClick={copyToClipboard}>{copied ? "Copied!" : "Copy"}</Button>
      </div>
    </div>
  );
}
