import { TableSkeleton } from "@/components/dashboard/loading";

export default function RegistrationsLoading() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>

      <TableSkeleton
        columns={5}
        rows={5}
        className="rounded-md border dark:border-gray-700"
      />
    </div>
  );
}
