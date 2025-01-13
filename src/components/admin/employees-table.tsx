import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTime } from "@/lib/utils";
import { getEmployees } from "@/lib/actions/admin";
import { EmployeeActions } from "./employee-actions-dropdown";

export async function EmployeesTable() {
  const employees = await getEmployees();

  if (!employees || employees.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500 dark:text-gray-400">
        No employees found
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
            <TableHead>Role</TableHead>
            <TableHead>Last Login</TableHead>
            <TableHead className="w-[70px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell className="font-medium">{employee.name}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.role}</TableCell>
              <TableCell>
                {employee.lastLoginAt
                  ? formatDateTime(employee.lastLoginAt).dateTime
                  : "Never"}
              </TableCell>
              <TableCell>
                <EmployeeActions employee={employee} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
