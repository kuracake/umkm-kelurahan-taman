"use client";

import { useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";

export function Toast({
  message,
  onClose,
  duration = 3000,
}: {
  message: string;
  onClose: () => void;
  duration?: number;
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed right-4 top-4 z-50 flex items-center gap-3 rounded-lg border border-green-100 bg-white px-4 py-3 shadow-lg animate-in fade-in slide-in-from-top-2">
      <CheckCircle2 size={20} className="shrink-0 text-green-600" />
      <p className="text-sm font-medium text-[#1F2937]">{message}</p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Tutup notifikasi"
        className="shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
      >
        <X size={14} />
      </button>
    </div>
  );
}