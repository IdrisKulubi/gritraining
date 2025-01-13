import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container max-w-2xl py-10">
      <div className="mb-8 space-y-2 text-center">
        <Skeleton className="h-8 w-[300px] mx-auto" />
        <Skeleton className="h-4 w-[400px] mx-auto" />
      </div>
      <div className="space-y-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}
