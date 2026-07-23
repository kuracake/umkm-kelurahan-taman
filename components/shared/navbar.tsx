"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

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
        <Link
          href="/"
          className="shrink-0 font-heading text-base font-bold text-brand sm:text-lg"
        >
          {namaWebsite}
        </Link>

        {/* Search bar — desktop */}
        <form onSubmit={handleSearch} className="hidden flex-1 sm:block">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari jajanan favoritmu..."
            className="w-full max-w-sm rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm focus:border-brand focus:bg-white focus:outline-none"
          />
        </form>

        <ul className="hidden shrink-0 gap-5 text-sm font-medium text-gray-700 sm:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="transition hover:text-brand">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}