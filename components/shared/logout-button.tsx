"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export function LogoutButton({ variant = "icon" }: { variant?: "icon" | "full" }) {
  const handleLogout = () => {
    if (!confirm("Yakin ingin keluar dari dashboard?")) return;
    signOut({ callbackUrl: "/login" });
  };

  if (variant === "full") {
    return (
      <button
        onClick={handleLogout}
        className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
      >
        <LogOut size={15} />
        Logout
      </button>
    );
  }

  return (
    <button
      onClick={handleLogout}
      aria-label="Logout"
      className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-all duration-200 hover:bg-red-50 hover:text-red-500 active:scale-95"
    >
      <LogOut size={17} strokeWidth={1.8} />
    </button>
  );
}