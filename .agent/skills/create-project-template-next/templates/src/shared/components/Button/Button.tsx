'use client';

import { ButtonProps } from './Button.types';

export default function Button({
    children,
    variant = 'primary',
    onClick,
    className = '',
    disabled = false,
    type = 'button',
    ...props
}: ButtonProps) {
    const baseClasses = "px-4 py-2 rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
    const variantClasses = {
        primary: "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600",
        danger: "bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700",
    };

    return (
        <button
            type={type}
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}
