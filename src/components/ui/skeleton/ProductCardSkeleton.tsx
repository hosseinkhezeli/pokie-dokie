export function ProductCardSkeleton() {
  return (
    <span className={'med-product-card-skeleton animate-pulse gap-3'}>
      <span
        className={
          'flex bg-background-low min-h-[72px] min-w-[72px] rounded-md'
        }
      />
      <div className={'flex w-full gap-5 min-h-6 items-center justify-between'}>
        <span
          className={'flex bg-background-low w-1/2  min-h-6 max-h-6 rounded-md'}
        />
        <span
          className={
            'flex bg-background-low w-full max-w-40 min-h-11 rounded-xl'
          }
        />
      </div>
    </span>
  );
}
