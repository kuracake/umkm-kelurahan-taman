"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Produk", href: "/produk" },
  { label: "UMKM", href: "/umkm" },
  { label: "Tentang", href: "/tentang" },
  { label: "Kontak", href: "/kontak" },
];

export function Navbar({ namaWebsite }: { namaWebsite: string }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/produk?q=${encodeURIComponent(query)}`);
  };

  return (
    <header className="sticky top-0 z-20 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3.5 sm:py-3">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 font-heading text-base font-bold text-brand-dark sm:text-lg"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-light text-lg sm:h-8 sm:w-8">
            🏪
          </span>
          <span className="max-w-50 truncate text-sm sm:max-w-none sm:text-lg">
            {namaWebsite}
          </span>
        </Link>

        {/* Search — desktop */}
        <form
          onSubmit={handleSearch}
          className="hidden flex-1 justify-center sm:flex"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari jajanan favoritmu..."
            className="w-full max-w-sm rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm transition focus:border-brand focus:bg-white focus:outline-none"
          />
        </form>

        {/* Spacer supaya logo & search icon tetap di ujung saat mobile */}
        <div className="flex flex-1 items-center justify-end gap-2 sm:hidden">
          <button
            type="button"
            onClick={() => setMobileSearchOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:border-brand hover:text-brand"
            aria-label="Cari"
          >
            <Search className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation — desktop */}
        <ul className="hidden shrink-0 items-center gap-5 text-sm font-medium text-gray-700 sm:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="transition hover:text-brand">
                {item.label}
              </Link>
            </li>
          ))}

          <li>
            <Link
              href="/login"
              className="rounded-full border border-brand/30 px-3 py-1.5 text-xs font-semibold text-brand transition hover:bg-brand-light/40"
            >
              Admin Login
            </Link>
          </li>
        </ul>
      </div>

      {/* Search — mobile, muncul di bawah header saat ikon ditekan */}
      {mobileSearchOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-3 sm:hidden">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari jajanan favoritmu..."
              className="w-full rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm transition focus:border-brand focus:bg-white focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setMobileSearchOpen(false)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-400 hover:text-gray-600"
              aria-label="Tutup pencarian"
            >
              <X className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </header>
  );
}