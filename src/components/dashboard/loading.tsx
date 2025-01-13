import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function DashboardSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="bg-white p-6 rounded-lg shadow space-y-3 dark:bg-gray-800"
        >
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
      ))}
    </div>
  );
}

interface TableSkeletonProps {
  columns?: number;
  rows?: number;
  className?: string;
}

export function TableSkeleton({
  columns = 5,
  rows = 5,
  className,
}: TableSkeletonProps) {
  return (
    <div className={className}>
      <Table>
        <TableHeader>
          <TableRow>
            {Array.from({ length: columns }).map((_, i) => (
              <TableHead key={i}>
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, i) => (
            <TableRow key={i}>
              {Array.from({ length: columns }).map((_, j) => (
                <TableCell key={j}>
                  <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
