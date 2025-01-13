"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  Copy,
  UserMinus,
  UserPlus,
  Trash2,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  deleteEmployeeAction,
  toggleAdminRoleAction,
} from "@/lib/actions/admin";

interface EmployeeActionsProps {
  employee: {
    id: number;
    role: string;
    referralCode: string;
  };
}

export function EmployeeActions({ employee }: EmployeeActionsProps) {
  const copyReferralLink = () => {
    const link = `${window.location.origin}/register?ref=${employee.referralCode}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={copyReferralLink} className="cursor-pointer">
          <Copy className="mr-2 h-4 w-4" />
          Copy Referral Link
        </DropdownMenuItem>
        <form action={toggleAdminRoleAction}>
          <input type="hidden" name="employeeId" value={employee.id} />
          <DropdownMenuItem asChild className="cursor-pointer">
            <button className="w-full flex items-center">
              {employee.role === "ADMIN" ? (
                <>
                  <UserMinus className="mr-2 h-4 w-4" />
                  Remove Admin
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Make Admin
                </>
              )}
            </button>
          </DropdownMenuItem>
        </form>
        <form action={deleteEmployeeAction}>
          <input type="hidden" name="employeeId" value={employee.id} />
          <DropdownMenuItem asChild className="text-red-600 cursor-pointer">
            <button className="w-full flex items-center">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Employee
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
