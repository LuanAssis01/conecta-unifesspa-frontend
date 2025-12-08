import React from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps {
    children: React.ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    fullWidth?: boolean;
    className?: string;
}

const baseClasses =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-lg cursor-pointer transition-all whitespace-nowrap";

const sizeClasses: Record<ButtonSize, string> = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
};

const variantClasses: Record<ButtonVariant, string> = {
    primary:
        "bg-emerald-500 text-white hover:bg-emerald-600 hover:-translate-y-0.5 hover:shadow-md",
    secondary:
        "bg-slate-600 text-white hover:bg-slate-700 hover:-translate-y-0.5 hover:shadow-md",
    outline:
        "bg-transparent border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white",
    danger:
        "bg-red-500 text-white hover:bg-red-600 hover:-translate-y-0.5 hover:shadow-md",
};

const disabledClasses =
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0";

const Button: React.FC<ButtonProps> = ({
    children,
    variant = "primary",
    size = "medium",
    onClick,
    type = "button",
    disabled = false,
    fullWidth = false,
    className = "",
}) => {
    const widthClass = fullWidth ? "w-full" : "";
    const classes = [
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        disabledClasses,
        widthClass,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button type={type} className={classes} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};

export default Button;
