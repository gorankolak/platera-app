const EmptyState = ({ title, message, icon, action }) => (
  <div className="flex h-full items-center justify-center px-6 text-center">
    <div className="flex max-w-md flex-col items-center gap-6">
      <img
        src="/images/empty.svg"
        alt=""
        aria-hidden="true"
        className="w-20 opacity-90"
      />

      {icon}

      <header className="flex flex-col gap-2">
        <h2 className="font-display text-darkgray text-3xl font-bold">
          {title}
        </h2>

        <p className="text-mediumgray">{message}</p>
      </header>

      {action && action}
    </div>
  </div>
);

export default EmptyState;
