import { Suspense } from "react";
import { getCurrentEmployee } from "@/lib/auth";
import { ReferralsTable } from "@/components/dashboard/referrals-table";
import { TableSkeleton } from "@/components/dashboard/loading";

export default async function ReferralsPage() {
  const employee = await getCurrentEmployee();

  if (!employee) return null;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          My Referrals
        </h1>
      </div>

      <Suspense fallback={<TableSkeleton />}>
        <ReferralsTable employeeId={employee.id} />
      </Suspense>
    </div>
  );
}
