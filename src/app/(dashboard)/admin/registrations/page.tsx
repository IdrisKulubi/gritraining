import React from "react";
import { Suspense } from "react";
import { RegistrationsTable } from "@/components/dashboard/registrations-table";
import { TableSkeleton } from "@/components/dashboard/loading";
import { getCurrentEmployee } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RegistrationsPage() {
  const employee = await getCurrentEmployee();

  if (!employee || employee.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          All Registrations
        </h1>
      </div>

      <Suspense fallback={<TableSkeleton />}>
        <RegistrationsTable />
      </Suspense>
    </div>
  );
}

export const dynamic = "force-dynamic";
