export function PaginationSkeleton() {
  return (
    <span
      className={'flex items-center justify-center gap-4 text-text-disabled'}
    >
      <span
        className={
          'min-h-8 min-w-16 rounded-md bg-surface-disabled btn-pagination animate-pulse'
        }
      />
      ...
      {Array.from({ length: 5 }).map((_, idx) => (
        <span
          key={idx}
          className={
            'min-h-8 min-w-8 rounded-md bg-surface-disabled btn-pagination animate-pulse'
          }
        />
      ))}
      ...
      <span
        className={
          'min-h-8 min-w-16 rounded-md bg-surface-disabled btn-pagination animate-pulse'
        }
      />
    </span>
  );
}
