import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/utils";
import {
  getEmployees,
  deleteEmployee,
  toggleAdminRole,
} from "@/lib/actions/admin";

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
            <TableHead>Actions</TableHead>
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
              <TableCell className="space-x-2">
                <form className="inline-block" action={toggleAdminRole}>
                  <input type="hidden" name="employeeId" value={employee.id} />
                  <Button variant="outline" size="sm" type="submit">
                    {employee.role === "ADMIN" ? "Remove Admin" : "Make Admin"}
                  </Button>
                </form>
                <form
                  className="inline-block"
                  action={async (formData: FormData) => {
                    "use server";
                    await deleteEmployee(Number(formData.get("employeeId")));
                  }}
                >
                  <input type="hidden" name="employeeId" value={employee.id} />
                  <Button variant="destructive" size="sm" type="submit">
                    Delete
                  </Button>
                </form>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
