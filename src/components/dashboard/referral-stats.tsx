import db from "@/db/drizzle";
import { registrations } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

interface Props {
  employeeId: number;
}

export async function ReferralStats({ employeeId }: Props) {
  const referralCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(registrations)
    .where(eq(registrations.referredById, employeeId));

  return (
    <div className="bg-background        p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Your Referrals</h3>
      <p className="mt-2 text-3xl font-bold text-green-600 dark:text-white">
        {referralCount[0].count}
      </p>
      <p className="mt-1 text-sm text-gray-500 dark:text-white">Total referrals</p>
    </div>
  );
}
