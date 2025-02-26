"use client";

import { createContext, useState, useContext, ReactNode, useEffect } from "react";
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
        <div className="fixed top-4 right-4 space-y-2 z-[100]">
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
const Toast: React.FC<ToastProps> = ({ id, message, type, onClose }) => {
  const icons = {
    success: <CheckCircle className="text-green-500 w-5 h-5" />,
    error: <XCircle className="text-red-500 w-5 h-5" />,
    info: <Info className="text-blue-500 w-5 h-5" />,
  };

  return (
    <div className="flex items-center w-80 p-4 bg-white shadow-md rounded-lg border border-gray-200 animate-slide-in">
      <div className="mr-3">{icons[type]}</div>
      <p className="flex-grow text-sm">{message}</p>
      <button
        onClick={onClose}
        className="ml-3 hover:bg-gray-100 rounded-full p-1"
      >
        <X className="text-gray-500 hover:text-gray-700 w-4 h-4" />
      </button>
    </div>
  );
};
