"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, ShoppingBag, Store, UserRound, MessageCircle } from "lucide-react";

const navItems = [
  { label: "Beranda", href: "/", icon: House },
  { label: "Produk", href: "/produk", icon: ShoppingBag },
  { label: "UMKM", href: "/umkm", icon: Store },
  { label: "User", href: "/login", icon: UserRound },
  { label: "Kontak", href: "/kontak", icon: MessageCircle },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 px-4 pb-[calc(env(safe-area-inset-bottom)+14px)] sm:hidden">
      <div className="mx-auto flex max-w-md items-center justify-between gap-1 rounded-full border border-gray-100 bg-white p-1.5 shadow-[0_10px_30px_-8px_rgba(14,165,233,0.25)]">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-center gap-2 rounded-full transition-all duration-300 ease-out ${
                isActive
                  ? "flex-1 bg-brand px-4 py-2.5 shadow-[0_4px_14px_-2px_rgba(14,165,233,0.5)]"
                  : "h-11 w-11 shrink-0 py-2.5"
              }`}
            >
              <Icon
                size={20}
                strokeWidth={1.8}
                className={isActive ? "text-white shrink-0" : "text-gray-400"}
              />
              {isActive && (
                <span className="whitespace-nowrap text-sm font-semibold text-white">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}