import { UseFormRegister, FieldValues, FieldError, Path } from 'react-hook-form';
import { InputHTMLAttributes } from 'react';

interface InputProps<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    name: Path<T>;
    register?: UseFormRegister<T>;
    error?: FieldError;
}

const Input = <T extends FieldValues>({
    label,
    name,
    type = 'text',
    placeholder,
    error,
    register,
    required = false,
    className = '',
    ...rest
}: InputProps<T>) => {
    return (
        <div className={`flex flex-col gap-2 mb-4 ${className}`}>
            
            {label && (
                <label htmlFor={name} className="font-semibold text-gray-800 text-sm">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <input
                id={name}
                type={type}
                placeholder={placeholder}
                className={`
                    w-full px-4 py-3 
                    border rounded-lg 
                    text-base bg-white 
                    transition-all duration-200
                    placeholder:text-gray-500/70
                    focus:outline-none
                    focus:border-green-500
                    focus:ring-2 focus:ring-green-500/20
                    ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-300"}
                `}
                {...(register ? register(name, { required }) : {})}
                {...rest}
            />

            {error && (
                <span className="text-red-500 text-sm -mt-1">
                    {error.message}
                </span>
            )}
        </div>
    );
};

export default Input;
