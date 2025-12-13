import { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

const Modal = ({ isOpen, onClose, title, children, className = '' }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
      <div className={`bg-white rounded-lg p-8 w-full max-w-md relative shadow-lg animate-[slideIn_0.3s_ease-out] ${className}`}>

        <button
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 text-xl"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        {title && (
          <h2 className="text-2xl font-semibold text-slate-900 mb-6 text-center">
            {title}
          </h2>
        )}

        {children}
      </div>
    </div>
  );
};

export default Modal;
