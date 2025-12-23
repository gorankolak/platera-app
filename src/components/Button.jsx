const baseStyles =
  "flex items-center justify-center gap-2 px-4 py-4 rounded-2xl font-semibold cursor-pointer transition active:scale-[0.98]";

const variants = {
  primary: "bg-amber text-white hover:brightness-95",
  secondary: "bg-gray-200 text-darkgray hover:bg-gray-300",
  dark: "bg-darkgray text-white hover:opacity-90",
  ghost: "text-amber hover:opacity-90",
};

const Button = ({
  children,
  type = "button",
  variant = "primary",
  fullWidth = false,
  icon,
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      {...props}
    >
      {icon && icon}
      {children}
    </button>
  );
};

export default Button;
