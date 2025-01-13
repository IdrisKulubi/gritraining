import { cookies } from "next/headers";
import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";
import db from "../../db/drizzle";
import { employees } from "../../db/schema";
import { cache } from "react";

const SESSION_COOKIE_NAME = "session";

// Helper function to get cookie store synchronously
const getCookieStore = () => cookies();

export async function createSession(employeeId: number) {
  const sessionId = createId();
  const cookieStore = await getCookieStore();

  await db
    .update(employees)
    .set({
      sessionId: sessionId,
      lastLoginAt: new Date(),
    })
    .where(eq(employees.id, employeeId));

  cookieStore.set(SESSION_COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });

  return sessionId;
}

export async function verifyEmail(email: string) {
  try {
    const employee = await db.query.employees.findFirst({
      where: eq(employees.email, email.toLowerCase()),
    });

    return employee || null;
  } catch (error) {
    console.error("Email verification error:", error);
    return null;
  }
}

// Use cache to prevent multiple cookie reads
export const getCurrentEmployee = cache(async () => {
  try {
    const cookieStore = await getCookieStore();
    const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionId) {
      return null;
    }

    const employee = await db.query.employees.findFirst({
      where: eq(employees.sessionId, sessionId),
    });

    return employee;
  } catch (error) {
    console.error("Auth error:", error);
    return null;
  }
});
