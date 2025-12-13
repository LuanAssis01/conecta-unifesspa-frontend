import { ReactNode, MouseEventHandler } from 'react';

interface CardProps {
    children: ReactNode;
    title?: string;
    className?: string;
    onClick?: MouseEventHandler<HTMLDivElement>;
    hoverable?: boolean;
}

const Card = ({
    children,
    title,
    className = '',
    onClick,
    hoverable = false
}: CardProps) => {
    const baseClasses =
        "bg-white rounded-xl p-6 shadow transition-all duration-300";

    const hoverClasses = hoverable
        ? "cursor-pointer hover:-translate-y-1 hover:shadow-xl"
        : "";

    const titleClasses =
        "text-xl font-bold text-gray-900 mb-4";

    const contentClasses =
        "text-gray-600 leading-relaxed";

    return (
        <div
            className={`${baseClasses} ${hoverClasses} ${className}`}
            onClick={onClick}
        >
            {title && <h3 className={titleClasses}>{title}</h3>}
            <div className={contentClasses}>{children}</div>
        </div>
    );
};

export default Card;
