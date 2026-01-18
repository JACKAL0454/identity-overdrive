"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface Toast {
  id: string;
  message: string;
  type?: "success" | "info" | "warning" | "error";
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (message: string, type?: Toast["type"], duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const addToast = React.useCallback(
    (message: string, type: Toast["type"] = "success", duration = 3000) => {
      const id = Math.random().toString(36).substring(7);
      const toast: Toast = { id, message, type, duration };
      
      setToasts((prev) => [...prev, toast]);

      if (duration > 0) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
      }
    },
    []
  );

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}

function ToastContainer({
  toasts,
  removeToast,
}: {
  toasts: Toast[];
  removeToast: (id: string) => void;
}) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
}

function ToastItem({
  toast,
  onRemove,
}: {
  toast: Toast;
  onRemove: (id: string) => void;
}) {
  const typeStyles = {
    success: "bg-emerald-500/20 border-emerald-500/50 text-emerald-400",
    info: "bg-cyan-500/20 border-cyan-500/50 text-cyan-400",
    warning: "bg-amber-500/20 border-amber-500/50 text-amber-400",
    error: "bg-red-500/20 border-red-500/50 text-red-400",
  };

  return (
    <div
      className={cn(
        "animate-in slide-in-from-right-full fade-in",
        "min-w-[300px] rounded-lg border px-4 py-3 shadow-lg backdrop-blur-sm",
        "font-mono text-sm",
        typeStyles[toast.type || "success"]
      )}
      onClick={() => onRemove(toast.id)}
    >
      <p className="font-semibold">{toast.message}</p>
    </div>
  );
}
