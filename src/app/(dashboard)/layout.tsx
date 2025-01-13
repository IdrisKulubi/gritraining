import { DashboardNav } from "@/components/dashboard/nav";
import { getCurrentEmployee } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const employee = await getCurrentEmployee();

  if (!employee) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen dark:bg-gray-900">
      <DashboardNav employee={employee} />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
