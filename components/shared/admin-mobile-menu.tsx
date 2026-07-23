"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "UMKM", href: "/dashboard/umkm" },
  { label: "Produk", href: "/dashboard/produk" },
  { label: "Kategori", href: "/dashboard/kategori" },
  { label: "Banner", href: "/dashboard/banner" },
  { label: "Pengaturan", href: "/dashboard/pengaturan" },
];

export function AdminMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col gap-1.5"
        aria-label="Buka menu admin"
      >
        <span className={`h-0.5 w-6 bg-gray-800 transition ${isOpen ? "translate-y-2 rotate-45" : ""}`} />
        <span className={`h-0.5 w-6 bg-gray-800 transition ${isOpen ? "opacity-0" : ""}`} />
        <span className={`h-0.5 w-6 bg-gray-800 transition ${isOpen ? "-translate-y-2 -rotate-45" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute inset-x-0 top-full z-40 border-b border-gray-200 bg-white px-4 py-3 shadow-md">
          <ul className="flex flex-col gap-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block rounded-md px-3 py-2 text-sm font-medium transition ${
                      isActive
                        ? "bg-[#E8F5E9] text-[#2E7D32]"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}