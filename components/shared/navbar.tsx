"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/produk?q=${encodeURIComponent(query)}`);
  };

  return (
    <header className="sticky top-0 z-20 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 font-heading text-base font-bold text-brand sm:text-lg"
        >
          {namaWebsite}
        </Link>

        {/* Search */}
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

        {/* Navigation */}
        <ul className="hidden shrink-0 items-center gap-5 text-sm font-medium text-gray-700 sm:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="transition hover:text-brand"
              >
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
    </header>
  );
}