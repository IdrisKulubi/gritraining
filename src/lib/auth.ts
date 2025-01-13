import { cookies } from "next/headers";
import { createId } from "@paralleldrive/cuid2";

import { eq } from "drizzle-orm";
import db from "../../db/drizzle";
import { employees } from "../../db/schema";

const SESSION_COOKIE_NAME = "employee_session";

export async function createSession(employeeId: number) {
  const sessionId = createId();
  const cookieStore = cookies();

  // Update employee with new session ID
  await db
    .update(employees)
    .set({
      sessionId: sessionId,
      lastLoginAt: new Date(),
    })
    .where(eq(employees.id, employeeId));

  (await cookieStore).set(SESSION_COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  return sessionId;
}

export async function verifyEmail(email: string) {
  const employee = await db.query.employees.findFirst({
    where: eq(employees.email, email.toLowerCase()),
  });

  if (!employee) {
    return null;
  }

  return employee;
}

export async function getCurrentEmployee() {
  const cookieStore = cookies();
  const sessionId = (await cookieStore).get(SESSION_COOKIE_NAME);

  if (!sessionId?.value) {
    return null;
  }

  // Store the session ID in the employee record when creating it
  const employee = await db.query.employees.findFirst({
    where: eq(employees.sessionId, sessionId.value),
  });

  return employee;
}
