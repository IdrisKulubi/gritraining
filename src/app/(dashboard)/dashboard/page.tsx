import { Suspense } from "react";
import { getCurrentEmployee } from "@/lib/auth";

import { DashboardSkeleton } from "@/components/dashboard/loading";
import { ReferralLink } from "@/components/dashboard/referral-link";
import { ReferralStats } from "@/components/dashboard/referral-stats";
import { Leaderboard } from "@/components/dashboard/leaderboard";

export default async function DashboardPage() {
  const employee = await getCurrentEmployee();

  if (!employee) return null;

  return (
    <div className="space-y-8 dark:bg-gray-900">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Dashboard
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Suspense fallback={<DashboardSkeleton />}>
          <ReferralStats employeeId={employee.id} />
          <ReferralLink referralCode={employee.referralCode} />
        </Suspense>
      </div>

      <div className="mt-8">
        <Suspense fallback={<DashboardSkeleton />}>
          <Leaderboard currentEmployeeId={employee.id} />
        </Suspense>
      </div>
    </div>
  );
}
