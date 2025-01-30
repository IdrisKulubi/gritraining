"use client";

import { useState, useEffect } from "react";
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
import { NoReferrals } from "./no-referrals";
import { OrganizationFilter } from "./organization-filter";

interface Props {
  employeeId: number;
}

export function ReferralsTable({ employeeId }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [referrals, setReferrals] = useState<any[]>([]);
  const [selectedOrg, setSelectedOrg] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchReferrals() {
      try {
        const result = await getEmployeeReferrals(employeeId);
        if (result.success) {
          setReferrals(result.data || []);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching referrals:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchReferrals();
  }, [employeeId]);

  if (loading) {
    return (
      <div className="text-center py-6 text-gray-500 dark:text-gray-400">
        Loading referrals...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-6 text-red-500 dark:text-red-400">
        Error loading referrals. Please try again later.
      </div>
    );
  }

  if (!referrals || referrals.length === 0) {
    return <NoReferrals />;
  }

  const filteredReferrals = selectedOrg === "all"
    ? referrals
    : referrals.filter(ref => ref.organization === selectedOrg);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <OrganizationFilter value={selectedOrg} onChange={setSelectedOrg} />
      </div>

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
            {filteredReferrals.map((referral) => (
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
    </div>
  );
}
