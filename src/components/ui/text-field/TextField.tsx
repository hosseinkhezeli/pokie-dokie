import React from "react";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const TextField: React.FC<TextFieldProps> = ({ label, error, ...props }) => {
  return (
    <div className="w-full mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        {...props}
        className={`w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
          transition-shadow shadow-sm
          ${error ? "border-red-500 focus:ring-red-500" : ""}
        `}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default TextField;