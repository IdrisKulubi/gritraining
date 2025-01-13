import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTime    } from "@/lib/utils";
import { getAdminRegistrations } from "@/lib/actions/employees";

export async function RegistrationsTable() {
  const result = await getAdminRegistrations();

  if (!result.success) {
    return (
      <div className="text-center py-6 text-red-500 dark:text-red-400">
        Error loading registrations
      </div>
    );
  }

  if (!result.data || result.data.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500 dark:text-gray-400">
        No registrations found
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
            <TableHead>Referred By</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {result.data.map((registration) => (
            <TableRow key={registration.id}>
              <TableCell className="font-medium">{registration.name}</TableCell>
              <TableCell>{registration.email}</TableCell>
              <TableCell>{registration.organization}</TableCell>
              <TableCell>{registration.referredBy?.name || "Direct"}</TableCell>
              <TableCell>
                {formatDateTime(registration.createdAt as Date).dateTime}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
