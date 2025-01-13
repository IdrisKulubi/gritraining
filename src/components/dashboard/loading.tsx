import { Skeleton } from "@/components/ui/skeleton";

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

export function TableSkeleton() {
  return (
    <div className="rounded-md border dark:border-gray-700">
      <div className="h-12 px-4 border-b dark:border-gray-700 flex items-center">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex-1">
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
      {[1, 2, 3].map((row) => (
        <div key={row} className="h-16 px-4 flex items-center">
          {[1, 2, 3, 4, 5].map((cell) => (
            <div key={cell} className="flex-1">
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
