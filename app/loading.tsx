import { Skeleton } from "@/components/editorial/motion";

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      <Skeleton className="h-4 w-44" />
      <Skeleton className="mt-6 h-16 w-3/4 sm:h-20 sm:w-2/3" />
      <Skeleton className="mt-4 h-5 w-2/3 max-w-xl" />
      <div className="mt-9 flex gap-4">
        <Skeleton className="h-12 w-44" />
        <Skeleton className="h-12 w-40" />
      </div>
      <div className="mt-16 grid gap-6 sm:grid-cols-3">
        <Skeleton className="h-44" />
        <Skeleton className="h-44" />
        <Skeleton className="h-44" />
      </div>
    </div>
  );
}
