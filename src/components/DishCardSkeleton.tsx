const DishCardSkeleton = () => {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-200 p-4">
      <div className="mb-4 h-40 w-full rounded-xl bg-gray-200" />
      <div className="mb-2 h-4 w-3/4 rounded bg-gray-200" />
      <div className="h-4 w-1/2 rounded bg-gray-200" />
    </div>
  );
};

export default DishCardSkeleton;
