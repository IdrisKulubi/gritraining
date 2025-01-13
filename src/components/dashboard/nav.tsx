"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { Employee } from "@/db/schema";
import { logout } from "@/lib/actions/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavProps {
  employee: Employee;
}

export function DashboardNav({ employee }: NavProps) {
  const pathname = usePathname();
  const firstLetter = employee.name.charAt(0).toUpperCase();

  const isAdmin = employee.role === "ADMIN";
  const navItems = [
    {
      href: "/dashboard",
      label: "Overview",
      admin: false,
    },
    {
      href: "/dashboard/referrals",
      label: "My Referrals",
      admin: false,
    },
    {
      href: "/admin/registrations",
      label: "All Registrations",
      admin: true,
    },
    {
      href: "/admin/employees",
      label: "Manage Employees",
      admin: true,
    },
  ];

  return (
    <nav className="bg-white shadow dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            {navItems.map((item) => {
              if (item.admin && !isAdmin) return null;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm text-gray-600 hover:text-green-600 dark:text-white dark:hover:text-green-600 font-medium ${
                    pathname === item.href
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-600"
                      : "text-gray-600 hover:text-green-600 dark:text-white dark:hover:text-green-600"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8 rounded-full  bg-green-100 text-green-700 hover:bg-green-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 "
                >
                  {firstLetter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5 text-sm font-medium text-gray-900 border-b dark:text-white">
                  {employee.name}
                </div>
                <DropdownMenuItem
                  className="text-red-600 cursor-pointer"
                  onClick={() => logout()}
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
