export function TextSkeleton({ className = '' }: { className?: string }) {
  return (
    <span
      className={`min-h-8 flex min-w-28 rounded-md bg-surface-disabled animate-pulse ${className}`}
    />
  );
}
