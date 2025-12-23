const EmptyState = ({ title, message, icon, action }) => (
  <div className="h-full flex items-center justify-center px-6 text-center">
    <div className="flex flex-col items-center max-w-md">
      <img
        src="/images/empty.svg"
        alt=""
        aria-hidden="true"
        className="w-20 mb-4 opacity-90"
      />

      {icon}

      <h2 className="text-3xl font-display font-bold mb-4 text-darkgray">
        {title}
      </h2>

      <p className="text-mediumgray mb-8">{message}</p>

      {action && action}
    </div>
  </div>
);

export default EmptyState;
