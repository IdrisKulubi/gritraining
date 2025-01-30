"use server";

import { revalidatePath } from "next/cache";
import db from "@/db/drizzle";
import { employees, registrations } from "@/db/schema";
import { eq } from "drizzle-orm";
import { RegistrationInput } from "@/lib/validations/registration";

export async function createRegistration(
  data: RegistrationInput & { referralCode?: string | null }
) {
  try {
    // Check if user already registered with this email
    const existingRegistration = await db.query.registrations.findFirst({
      where: eq(registrations.email, data.email),
    });

    if (existingRegistration) {
      return { 
        success: false, 
        error: "You have already registered with this email address" 
      };
    }

    let referredById: number | null = null;

    if (data.referralCode) {
      const employee = await db.query.employees.findFirst({
        where: eq(employees.referralCode, data.referralCode),
      });
      if (employee) {
        referredById = employee.id;
      }
    }

    await db.insert(registrations).values({
      name: data.name,
      email: data.email,
      phone: data.phone,
      country: data.country,
      participantType: data.participantType,
      organization: data.organization,
      position: data.position,
      referralSource: data.referralSource,
      additionalInfo: data.additionalInfo,
      referredById,
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, error: "Failed to create registration" };
  }
}
