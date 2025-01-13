"use server";

import { cookies } from "next/headers";
import db from "@/db/drizzle";
import { employees } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

const getCookieStore = () => cookies();

export async function login(email: string) {
  try {
    const employee = await db.query.employees.findFirst({
      where: eq(employees.email, email.toLowerCase()),
    });

    if (!employee) {
      return { success: false, error: "Invalid email address" };
    }

    const sessionId = createId();
    const cookieStore = await getCookieStore();

    await db
      .update(employees)
      .set({
        sessionId,
        lastLoginAt: new Date(),
      })
      .where(eq(employees.id, employee.id));

    cookieStore.set("session", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: "An error occurred during login" };
  }
}

export async function logout() {
  try {
    const cookieStore = await getCookieStore();
    cookieStore.delete("session");
    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false, error: "An error occurred during logout" };
  }
}
