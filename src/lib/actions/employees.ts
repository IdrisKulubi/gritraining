"use server";

import db from "@/db/drizzle";
import { registrations } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentEmployee } from "@/lib/auth";

export async function getEmployeeReferrals(employeeId: number) {
  const currentEmployee = await getCurrentEmployee();

  if (!currentEmployee) {
    throw new Error("Unauthorized");
  }

  if (currentEmployee.id !== employeeId && currentEmployee.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  try {
    const referrals = await db.query.registrations.findMany({
      where: eq(registrations.referredById, employeeId),
      orderBy: (registrations, { desc }) => [desc(registrations.createdAt)],
    });

    return { success: true, data: referrals };
  } catch (error) {
    console.error("Failed to fetch referrals:", error);
    return { success: false, error: "Failed to fetch referrals" };
  }
}

export async function getAdminRegistrations() {
  const currentEmployee = await getCurrentEmployee();

  if (!currentEmployee || currentEmployee.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  try {
    const registrations = await db.query.registrations.findMany({
      with: {
        referredBy: true,
      },
      orderBy: (registrations, { desc }) => [desc(registrations.createdAt)],
    });

    return { success: true, data: registrations };
  } catch (error) {
    console.error("Failed to fetch registrations:", error);
    return { success: false, error: "Failed to fetch registrations" };
  }
}
