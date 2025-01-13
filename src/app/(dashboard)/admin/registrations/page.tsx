import { Suspense } from "react";
import { RegistrationsTable } from "@/components/dashboard/registrations-table";
import { TableSkeleton } from "@/components/dashboard/loading";

export default function RegistrationsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">All Registrations</h1>
      </div>

      <Suspense fallback={<TableSkeleton />}>
        <RegistrationsTable />
      </Suspense>
    </div>
  );
}
