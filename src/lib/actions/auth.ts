"use server";

import { verifyEmail, createSession } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(email: string) {
  const employee = await verifyEmail(email);

  if (!employee) {
    return { success: false };
  }

  await createSession(employee.id);
  return { success: true };
}

export async function logout() {
  // Clear the session cookie
  (await
        // Clear the session cookie
        cookies()).delete("employee_session");
  redirect("/login");
}
