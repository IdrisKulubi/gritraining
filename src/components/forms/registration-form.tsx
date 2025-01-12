"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  RegistrationInput,
  registrationSchema,
} from "../../lib/validations/registration";
import { createRegistration } from "../../lib/actions/registration";
import { PARTICIPANT_TYPES, REFERRAL_SOURCES } from "@/db/schema";

export function RegistrationForm() {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const referralCode = searchParams.get("ref");

  const form = useForm<RegistrationInput>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      country: "",
      participantType: PARTICIPANT_TYPES[0],
      organization: "",
      position: "",
      referralSource: referralCode ? "referral" : undefined,
      additionalInfo: "",
    },
  });

  async function onSubmit(data: RegistrationInput) {
    setLoading(true);
    try {
      const result = await createRegistration({
        ...data,
        referralCode,
      });

      if (result.success) {
        toast({
          title: "Success",
          description: "Registration submitted successfully",
        });
        form.reset();
      } else {
        toast({
          title: "Error",
          description: result.error || "Something went wrong",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting registration", error);
      toast({
        title: "Error",
        description: "Failed to submit registration",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  const formFields = [
    { name: "name", label: "Full Name", placeholder: "John Doe" },
    {
      name: "email",
      label: "Email",
      placeholder: "john@example.com",
      type: "email",
    },
    { name: "phone", label: "Phone Number", placeholder: "+1234567890" },
    { name: "country", label: "Country", placeholder: "Your country" },
    {
      name: "organization",
      label: "Organization",
      placeholder: "Your organization",
    },
    { name: "position", label: "Position", placeholder: "Your position" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <motion.div
          className="grid gap-6 sm:grid-cols-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {formFields.map((field, index) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <FormField
                control={form.control}
                name={field.name as keyof RegistrationInput}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel className="text-green-700">
                      {field.label}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={field.placeholder}
                        {...formField}
                        type={field.type || "text"}
                        className="border-green-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <FormField
            control={form.control}
            name="participantType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-green-700">
                  Participant Type
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="border-green-200 focus:border-green-500 focus:ring-green-500">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {PARTICIPANT_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <FormField
            control={form.control}
            name="referralSource"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-green-700">
                  How did you hear about us?
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="border-green-200 focus:border-green-500 focus:ring-green-500">
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {REFERRAL_SOURCES.map((source) => (
                      <SelectItem key={source} value={source}>
                        {source
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <FormField
            control={form.control}
            name="additionalInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-green-700">
                  Additional Information
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any additional information you'd like to share"
                    {...field}
                    className="border-green-200 focus:border-green-500 focus:ring-green-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Registration"}
          </Button>
        </motion.div>
      </form>
    </Form>
  );
}
