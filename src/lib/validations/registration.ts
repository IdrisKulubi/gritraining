import * as z from "zod";
import { PARTICIPANT_TYPES, REFERRAL_SOURCES, ORGANIZATIONS } from "../../../db/schema";

export const registrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  participantType: z.enum(PARTICIPANT_TYPES),
  organization: z.enum(ORGANIZATIONS, {
    required_error: "Please select an organization",
  }),
  position: z.string().min(2, "Position must be at least 2 characters"),
  referralSource: z.enum(REFERRAL_SOURCES),
  additionalInfo: z.string().optional(),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
