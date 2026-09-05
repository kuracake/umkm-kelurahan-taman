"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  X,
  Menu,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

const navItems = [
  {
    label: "Beranda",
    href: "/",
  },
  {
    label: "Produk",
    href: "/produk",
  },
  {
    label: "UMKM",
    href: "/umkm",
  },
  {
    label: "Kontak",
    href: "/kontak",
  },
];

export function Navbar({
  namaWebsite,
}: {
  namaWebsite: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLoginPage = pathname === "/login";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const value = query.trim();

    if (!value) return;

    setMobileSearchOpen(false);
    router.push(`/produk?q=${encodeURIComponent(value)}`);
  };

  const handleBack = () => {
    router.push("/");
  };

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
  }, [pathname]);

  return (
    <header
      className="
        sticky
        top-0
        z-40
        w-full
        border-b
        border-slate-100
        bg-white/95
        shadow-sm
        backdrop-blur-md
      "
    >
      <div
        className="
          mx-auto
          grid
          max-w-6xl
          grid-cols-[auto_minmax(0,1fr)_auto]
          items-center
          gap-2
          px-4
          py-2.5
          sm:gap-4
        "
      >
        <div className="flex min-w-0 items-center">
          <button
            type="button"
            onClick={
              isLoginPage
                ? handleBack
                : () => setMobileMenuOpen((current) => !current)
            }
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              text-slate-600
              transition-colors
              hover:bg-slate-50
              hover:text-brand
              sm:hidden
            "
            aria-label={
              isLoginPage
                ? "Kembali"
                : mobileMenuOpen
                  ? "Tutup menu"
                  : "Buka menu"
            }
            aria-expanded={
              isLoginPage ? undefined : mobileMenuOpen
            }
            aria-controls={
              isLoginPage ? undefined : "mobile-menu"
            }
          >
            {isLoginPage ? (
              <ArrowLeft className="h-5 w-5" />
            ) : mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          <nav
            className="
              hidden
              items-center
              gap-5
              text-sm
              font-medium
              text-slate-700
              sm:flex
            "
            aria-label="Navigasi utama"
          >
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    transition-colors
                    hover:text-brand
                    ${
                      isActive
                        ? "font-semibold text-brand"
                        : ""
                    }
                  `}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex min-w-0 justify-center">
          <Link
            href="/"
            className="flex min-w-0 items-center"
            aria-label={`Beranda ${namaWebsite}`}
          >
            <Image
              src="/favicon.png"
              alt={namaWebsite}
              width={400}
              height={400}
              priority
              className="
                -my-4
                h-16
                w-auto
                max-w-full
                object-contain
                sm:-my-5
                sm:h-20
              "
            />
          </Link>
        </div>

        <div className="flex min-w-0 items-center justify-end gap-2">
          <form
            onSubmit={handleSearch}
            className="hidden sm:flex"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari jajanan favoritmu..."
              aria-label="Cari produk"
              className="
                w-48
                rounded-full
                border
                border-slate-200
                bg-slate-50
                px-4
                py-2
                text-sm
                text-slate-700
                outline-none
                transition
                placeholder:text-slate-400
                focus:border-brand
                focus:bg-white
                lg:w-64
              "
            />
          </form>

          <button
            type="button"
            onClick={() =>
              setMobileSearchOpen((current) => !current)
            }
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              text-slate-600
              transition-colors
              hover:bg-slate-50
              hover:text-brand
              sm:hidden
            "
            aria-label={
              mobileSearchOpen
                ? "Tutup pencarian"
                : "Cari produk"
            }
            aria-expanded={mobileSearchOpen}
            aria-controls="mobile-search"
          >
            {mobileSearchOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Search className="h-5 w-5" />
            )}
          </button>

          <Link
            href="/login"
            className="
              hidden
              shrink-0
              rounded-full
              border
              border-brand/30
              px-3
              py-1.5
              text-xs
              font-semibold
              text-brand
              transition-colors
              hover:bg-brand-light/40
              sm:block
            "
          >
            Admin Login
          </Link>
        </div>
      </div>

      {mobileSearchOpen && (
        <div
          id="mobile-search"
          className="
            border-t
            border-slate-100
            bg-white
            px-4
            py-3
            sm:hidden
          "
        >
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <Search
                className="
                  pointer-events-none
                  absolute
                  left-3
                  top-1/2
                  h-4
                  w-4
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari produk..."
                aria-label="Cari produk"
                className="
                  w-full
                  rounded-full
                  border
                  border-slate-200
                  bg-slate-50
                  py-2.5
                  pl-10
                  pr-4
                  text-sm
                  outline-none
                  transition
                  focus:border-brand
                  focus:bg-white
                "
              />
            </div>
          </form>
        </div>
      )}

      {mobileMenuOpen && !isLoginPage && (
        <div
          id="mobile-menu"
          className="
            border-t
            border-slate-100
            bg-white
            px-4
            py-3
            sm:hidden
          "
        >
          <Link
            href="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="
              flex
              items-center
              gap-3
              rounded-xl
              border
              border-brand/10
              bg-brand-light/30
              px-3
              py-3
              text-sm
              font-semibold
              text-brand
              transition-colors
              hover:bg-brand-light/50
            "
          >
            <span
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-white
              "
            >
              <ShieldCheck className="h-4 w-4 text-brand" />
            </span>

            <span>Admin Login</span>

            <ArrowRight className="ml-auto h-4 w-4" />
          </Link>
        </div>
      )}
    </header>
  );
}