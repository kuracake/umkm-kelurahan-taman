"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, X, Menu } from "lucide-react";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/produk?q=${encodeURIComponent(query)}`);
  };

  return (
    <header className="sticky top-0 z-20 w-full border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-sm">
      <div className="mx-auto grid max-w-6xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-4 py-2.5 sm:gap-4">
        {/* Kiri — hamburger (mobile) / nav (desktop) */}
        <div className="flex min-w-0 items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-50 sm:hidden"
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <ul className="hidden items-center gap-5 text-sm font-medium text-gray-700 sm:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-brand">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Tengah — logo, meluber vertikal keluar header */}
        <div className="flex min-w-0 justify-center">
          <Link href="/" className="flex min-w-0 items-center">
            <Image
              src="/logo.png"
              alt={namaWebsite}
              width={400}
              height={160}
              priority
              className="-my-6 h-24 w-auto max-w-full object-contain sm:-my-8 sm:h-32"
            />
          </Link>
        </div>

        {/* Kanan — search + admin login (desktop) */}
        <div className="flex min-w-0 items-center justify-end gap-2">
          <form onSubmit={handleSearch} className="hidden sm:flex">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari jajanan favoritmu..."
              className="w-48 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm transition focus:border-brand focus:bg-white focus:outline-none lg:w-64"
            />
          </form>

          <button
            type="button"
            onClick={() => setMobileSearchOpen((v) => !v)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-50 sm:hidden"
            aria-label="Cari"
          >
            <Search className="h-5 w-5" />
          </button>

          <Link
            href="/login"
            className="hidden shrink-0 rounded-full border border-brand/30 px-3 py-1.5 text-xs font-semibold text-brand transition hover:bg-brand-light/40 sm:block"
          >
            Admin Login
          </Link>
        </div>
      </div>

      {/* Search — mobile, expandable */}
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
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-gray-400 hover:text-gray-600"
              aria-label="Tutup pencarian"
            >
              <X className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* Menu — mobile, dropdown dari hamburger, cuma Admin Login */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-3 sm:hidden">
          <Link
            href="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-brand transition hover:bg-brand-light/40"
          >
            Admin Login
          </Link>
        </div>
      )}
    </header>
  );
}