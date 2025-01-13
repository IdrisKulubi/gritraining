import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTime } from "@/lib/utils";
import { getEmployeeReferrals } from "@/lib/actions/employees";

interface Props {
  employeeId: number;
}

export async function ReferralsTable({ employeeId }: Props) {
  const result = await getEmployeeReferrals(employeeId);

  if (!result.success) {
    return (
      <div className="text-center py-6 text-red-500 dark:text-red-400">
        Error loading referrals. Please try again later.
      </div>
    );
  }

  if (!result.data || result.data.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500 dark:text-gray-400">
        No referrals found. Share your referral link to get started!
      </div>
    );
  }

  return (
    <div className="rounded-md border dark:border-gray-700">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Organization</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {result.data.map((referral) => (
            <TableRow key={referral.id}>
              <TableCell className="font-medium">{referral.name}</TableCell>
              <TableCell>{referral.email}</TableCell>
              <TableCell>{referral.organization}</TableCell>
              <TableCell>{referral.position}</TableCell>
              <TableCell>
                {formatDateTime(referral.createdAt as Date).dateTime}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
