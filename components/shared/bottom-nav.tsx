"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, UtensilsCrossed, Store, Phone } from "lucide-react";

const navItems = [
  { label: "Beranda", href: "/", icon: Home },
  { label: "Produk", href: "/produk", icon: UtensilsCrossed },
  { label: "UMKM", href: "/umkm", icon: Store },
  { label: "Kontak", href: "/kontak", icon: Phone },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-gray-100 bg-white shadow-[0_-2px_12px_rgba(0,0,0,0.06)] sm:hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition ${
              isActive ? "text-brand" : "text-gray-500"
            }`}
          >
            <Icon size={22} strokeWidth={isActive ? 2.4 : 1.8} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}