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
import { getAdminRegistrations } from "@/lib/actions/employees";
import { RegistrationDetailsDialog } from "./registration-details-dialog";
import type { Registration } from "@/db/schema";
import { TableSkeleton } from "./loading";

type RegistrationWithReferrer = Registration & {
  referredBy: { name: string } | null;
};

export function RegistrationsTable() {
  const [selectedRegistration, setSelectedRegistration] =
    useState<RegistrationWithReferrer | null>(null);

  const [registrations, setRegistrations] = useState<
    RegistrationWithReferrer[] | null
  >(null);

  useEffect(() => {
    async function fetchRegistrations() {
      const result = await getAdminRegistrations();
      setRegistrations(result.data || []);
    }
    fetchRegistrations();
  }, []);

  if (!registrations) {
    return <TableSkeleton columns={5} rows={5} />;
  }

  if (!registrations || registrations.length === 0) {
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
          {registrations.map((registration: RegistrationWithReferrer) => (
            <TableRow
              key={registration.id}
              className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
              onClick={() => setSelectedRegistration(registration)}
            >
              <TableCell className="font-medium">{registration.name}</TableCell>
              <TableCell>{registration.email}</TableCell>
              <TableCell>{registration.organization}</TableCell>
              <TableCell>
                {registration.referredBy?.name || "Direct Registration"}
              </TableCell>
              <TableCell>
                {formatDateTime(registration.createdAt as Date).dateTime}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedRegistration && (
        <RegistrationDetailsDialog
          registration={selectedRegistration}
          open={true}
          onOpenChange={(open) => !open && setSelectedRegistration(null)}
        />
      )}
    </div>
  );
}
