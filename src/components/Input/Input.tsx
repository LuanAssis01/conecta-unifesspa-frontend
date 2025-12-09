// Input.tsx
import React from "react";

type InputType = React.HTMLInputTypeAttribute;

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  type?: InputType;
  placeholder?: string;
  error?: { message?: string };
  register?: any;
  required?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  error,
  register,
  required = false,
  className = "",
  ...rest
}) => {
  const baseInputClasses =
    "w-full px-4 py-3 border rounded-lg text-base transition-all bg-white outline-none";
  const normalState =
    "border-[var(--color-border)] focus:border-[var(--color-primary)] focus:shadow-[0_0_0_3px_rgba(16,185,129,0.1)]";
  const errorState =
    "border-[var(--color-error)] focus:border-[var(--color-error)] focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]";
  const placeholderClasses = "placeholder:text-[var(--color-text-secondary)]";

  const inputClasses = [
    baseInputClasses,
    placeholderClasses,
    error ? errorState : normalState,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`flex flex-col gap-2 mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="font-semibold text-(--color-text) text-sm"
        >
          {label}
          {required && (
            <span className="text-(--color-error) ml-1">*</span>
          )}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className={inputClasses}
        {...(register ? register(name) : {})}
        {...rest}
      />

      {error && error.message && (
        <span className="text-(--color-error) text-sm -mt-1">
          {error.message}
        </span>
      )}
    </div>
  );
};

export default Input;
