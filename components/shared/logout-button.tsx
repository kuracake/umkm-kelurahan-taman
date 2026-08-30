"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";

export function LogoutButton({ variant = "icon" }: { variant?: "icon" | "full" }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleConfirmLogout = () => {
    setLoggingOut(true);
    signOut({ callbackUrl: "/login" });
  };

  return (
    <>
      {variant === "full" ? (
        <button
          onClick={() => setShowConfirm(true)}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={15} />
          Logout
        </button>
      ) : (
        <button
          onClick={() => setShowConfirm(true)}
          aria-label="Logout"
          className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-all duration-200 hover:bg-red-50 hover:text-red-500 active:scale-95"
        >
          <LogOut size={17} strokeWidth={1.8} />
        </button>
      )}

      <ConfirmDialog
        open={showConfirm}
        title="Keluar dari dashboard?"
        description="Kamu perlu login kembali untuk mengakses dashboard admin."
        confirmLabel="Ya, Keluar"
        cancelLabel="Batal"
        loading={loggingOut}
        onConfirm={handleConfirmLogout}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
}