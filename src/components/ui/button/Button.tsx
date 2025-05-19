import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "contained" | "outlined";
}

const Button: React.FC<ButtonProps> = ({ variant = "contained", children, ...props }) => {
  const baseClasses = "px-6 py-3 rounded-md font-semibold text-white shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";
  const containedClasses = "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500";
  const outlinedClasses = "border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500 bg-transparent";

  return (
    <button
      {...props}
      className={`${baseClasses} ${variant === "contained" ? containedClasses : outlinedClasses}`}
    >
      {children}
    </button>
  );
};

export default Button;