const DishPageSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col gap-8">
        {/* Image */}
        <div className="h-96 w-full rounded-3xl bg-gray-200" />

        {/* Title + action */}
        <div className="flex items-start justify-between gap-4">
          <div className="h-8 w-2/3 rounded bg-gray-200" />
          <div className="hidden h-10 w-24 rounded bg-gray-200 sm:block" />
        </div>

        {/* Ingredients */}
        <section className="flex flex-col gap-3">
          <div className="h-5 w-32 rounded bg-gray-200" />
          <div className="grid grid-cols-1 gap-2 rounded-2xl bg-gray-100 p-4 sm:grid-cols-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-4 w-full rounded bg-gray-200" />
            ))}
          </div>
        </section>

        {/* Instructions */}
        <section className="flex flex-col gap-3">
          <div className="h-6 w-40 rounded bg-gray-200" />
          <div className="flex flex-col gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-4 w-full rounded bg-gray-200" />
            ))}
          </div>
        </section>

        {/* Video */}
        <div className="aspect-video rounded-3xl bg-gray-200" />
      </div>
    </div>
  );
};

export default DishPageSkeleton;
