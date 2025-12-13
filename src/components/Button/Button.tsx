import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'danger' | 'outline';
    size?: 'small' | 'medium' | 'large';
    fullWidth?: boolean;
}

const Button = ({
    children,
    variant = 'primary',
    size = 'medium',
    onClick,
    type = 'button',
    disabled = false,
    fullWidth = false,
    className = '',
    ...rest
}: ButtonProps) => {

    // Base styles (equivalente ao .button)
    const baseStyles = `
        inline-flex items-center justify-center
        font-semibold whitespace-nowrap
        rounded-lg transition-all duration-200
        gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
    `;

    // Variants
    const variantStyles: Record<string, string> = {
        primary: `
            bg-primary-500 text-white
            hover:bg-primary-600 hover:-translate-y-[2px]
            hover:shadow-[0_4px_12px_rgba(16,185,129,0.3)]
            disabled:hover:translate-y-0 disabled:hover:shadow-none
        `,
        secondary: `
            bg-secondary-500 text-white
            hover:bg-secondary-600 hover:-translate-y-[2px]
            hover:shadow-[0_4px_12px_rgba(100,116,139,0.3)]
            disabled:hover:translate-y-0 disabled:hover:shadow-none
        `,
        danger: `
            bg-[var(--color-error)] text-white
            hover:bg-[#dc2626] hover:-translate-y-[2px]
            hover:shadow-[0_4px_12px_rgba(239,68,68,0.3)]
            disabled:hover:translate-y-0 disabled:hover:shadow-none
        `,
        outline: `
            bg-transparent border-2 border-primary-500 text-primary-500
            hover:bg-primary-500 hover:text-white
            disabled:hover:bg-transparent disabled:hover:text-primary-500
        `,
    };

    // Sizes
    const sizeStyles: Record<string, string> = {
        small: `px-4 py-2 text-sm`,
        medium: `px-6 py-3 text-base`,
        large: `px-8 py-4 text-lg`,
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                ${baseStyles}
                ${variantStyles[variant]}
                ${sizeStyles[size]}
                ${fullWidth ? 'w-full' : ''}
                ${className}
            `}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;
