"use client";

import { createContext, useState, useContext, ReactNode } from "react";
import { CheckCircle, XCircle, Info, X } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

// Define Toast Types
type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  addToast: (message: string, type?: ToastType, duration?: number) => void;
}

// Create Context
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Toast Provider Props
interface ToastProviderProps {
  children: ReactNode;
}

// Toast Provider Component
export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);
  
    const addToast = (message: string, type: ToastType = "info", duration = 3000) => {
      const id = uuidv4();
      setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
  
      setTimeout(() => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
      }, duration);
    };
  
    return (
      <ToastContext.Provider value={{ addToast }}>
        {children}
  
        {/* Fixed Toast Container */}
        <div className="fixed top-16 right-0 space-y-2 z-[100]">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              id={toast.id}
              message={toast.message}
              type={toast.type}
              onClose={() => {
                setToasts((prevToasts) => prevToasts.filter((t) => t.id !== toast.id));
              }}
            />
          ))}
        </div>
      </ToastContext.Provider>
    );
  };
  
// Custom Hook to Use Toast
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// Toast Component Props
interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  onClose: () => void;
}

// Toast Component
const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const backgroundColors = {
    success: 'bg-green-500 border-green-600',
    error: 'bg-red-500 border-red-600',
    info: 'bg-blue-500 border-blue-600',
  };

  const iconColors = {
    success: 'text-white',
    error: 'text-white',
    info: 'text-white',
  };

  const icons = {
    success: <CheckCircle className={`${iconColors[type]} w-5 h-5`} />,
    error: <XCircle className={`${iconColors[type]} w-5 h-5`} />,
    info: <Info className={`${iconColors[type]} w-5 h-5`} />,
  };

  return (
    <div className={`flex items-center w-80 p-4 shadow-md rounded-lg ${backgroundColors[type]}`}>
      <div className="mr-3">{icons[type]}</div>
      <p className="flex-grow text-sm text-gray-800">{message}</p>
      <button
        onClick={onClose}
        className="ml-3 hover:bg-opacity-20 hover:bg-gray-500 rounded-full p-1"
      >
        <X className={`${iconColors[type]} hover:text-gray-700 w-4 h-4`} />
      </button>
    </div>
  );
};
