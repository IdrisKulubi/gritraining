import { Suspense } from "react";
import { EmployeesTable } from "@/components/admin/employees-table";
import { TableSkeleton } from "@/components/dashboard/loading";
import { AddEmployeeButton } from "@/components/admin/add-employee-button";

export default async function EmployeesPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Manage Employees
        </h1>
        <AddEmployeeButton />
      </div>

      <Suspense fallback={<TableSkeleton />}>
        <EmployeesTable />
      </Suspense>
    </div>
  );
}
