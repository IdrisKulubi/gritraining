"use server";

import { revalidatePath } from "next/cache";
import db from "@/db/drizzle";
import { employees } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentEmployee } from "@/lib/auth";
import { createId } from "@paralleldrive/cuid2";

export async function addEmployee(data: {
  name: string;
  email: string;
  role: "ADMIN" | "EMPLOYEE";
}) {
  const currentEmployee = await getCurrentEmployee();

  if (!currentEmployee || currentEmployee.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  try {
    await db.insert(employees).values({
      ...data,
      referralCode: createId().slice(0, 24),
    });

    revalidatePath("/admin/employees");
    return { success: true };
  } catch (error) {
    console.error("Failed to add employee:", error);
    return { success: false, error: "Failed to add employee" };
  }
}

export async function deleteEmployee(id: number) {
  const currentEmployee = await getCurrentEmployee();

  if (!currentEmployee || currentEmployee.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  try {
    await db.delete(employees).where(eq(employees.id, id));
    revalidatePath("/admin/employees");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete employee:", error);
    return { success: false, error: "Failed to delete employee" };
  }
}

export async function getRegistrations() {
  const currentEmployee = await getCurrentEmployee();

  if (!currentEmployee || currentEmployee.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  return db.query.registrations.findMany({
    with: {
      referredBy: true,
    },
    orderBy: (registrations, { desc }) => [desc(registrations.createdAt)],
  });
}

export async function getEmployees() {
  const currentEmployee = await getCurrentEmployee();

  if (!currentEmployee || currentEmployee.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  return db.query.employees.findMany({
    orderBy: (employees, { desc }) => [desc(employees.createdAt)],
  });
}

export async function toggleAdminRole(employeeId: number) {
  const currentEmployee = await getCurrentEmployee();

  if (!currentEmployee || currentEmployee.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const employee = await db.query.employees.findFirst({
    where: eq(employees.id, employeeId),
  });

  if (!employee) throw new Error("Employee not found");

  await db
    .update(employees)
    .set({ role: employee.role === "ADMIN" ? "EMPLOYEE" : "ADMIN" })
    .where(eq(employees.id, employeeId));

  revalidatePath("/admin/employees");
  return { success: true };
}

export async function handleAddEmployee(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const role = formData.get("role") as "ADMIN" | "EMPLOYEE";

  if (!name || !email || !role) {
    return { success: false, error: "All fields are required" };
  }

  try {
    const referralCode = createId().slice(0, 24);
    await db.insert(employees).values({
      name,
      email: email.toLowerCase(),
      role,
      referralCode,
    });

    revalidatePath("/admin/employees");
    return { success: true };
  } catch (error) {
    console.error("Failed to add employee:", error);
    return { success: false, error: "Failed to add employee" };
  }
}

export async function deleteEmployeeAction(formData: FormData) {
  const employeeId = Number(formData.get("employeeId"));
  await deleteEmployee(employeeId);
}

export async function toggleAdminRoleAction(formData: FormData) {
  const employeeId = Number(formData.get("employeeId"));
  await toggleAdminRole(employeeId);
}
