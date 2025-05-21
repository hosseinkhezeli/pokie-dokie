export function OrderCardSkeleton() {
  return (
    <span className={'order-card-skeleton animate-pulse'}>
      <span className={'flex bg-text-disabled min-h-6 max-w-28 rounded-md'} />
      <div className={'flex w-full gap-5 min-h-6 items-center'}>
        <span
          className={'flex bg-text-disabled w-full  min-h-6 max-h-6 rounded-md'}
        />
        <span
          className={
            'flex bg-text-disabled w-full max-w-40 min-h-11 rounded-xl'
          }
        />
      </div>
    </span>
  );
}
