// Card.tsx
import React from "react";

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

const baseClasses =
  "bg-white rounded-xl p-6 shadow-sm transition-all duration-300";

const hoverableClasses =
  "cursor-pointer hover:-translate-y-1 hover:shadow-xl";

const Card: React.FC<CardProps> = ({
  children,
  title,
  className = "",
  onClick,
  hoverable = false,
}) => {
  const classes = [
    baseClasses,
    hoverable ? hoverableClasses : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} onClick={onClick}>
      {title && (
        <h3 className="text-xl font-bold text-slate-900 mb-4">
          {title}
        </h3>
      )}
      <div className="text-slate-600 leading-relaxed">
        {children}
      </div>
    </div>
  );
};

export default Card;
