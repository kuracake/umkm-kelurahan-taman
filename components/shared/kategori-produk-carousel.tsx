"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/shared/product-card";
import type { Produk, Umkm, Kategori } from "@prisma/client";

type ProdukWithRelations = Produk & {
  umkm: Umkm;
  kategori: Kategori;
};

export function KategoriProdukCarousel({
  kategoriId,
  kategoriNama,
  produks,
}: {
  kategoriId: string;
  kategoriNama: string;
  produks: ProdukWithRelations[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => el.removeEventListener("scroll", updateArrows);
    }
    if (produks.length <= 2) {
      return () => el.removeEventListener("scroll", updateArrows);
    }

    let paused = false;
    const pause = () => (paused = true);
    const resume = () => (paused = false);
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resume);

    const interval = setInterval(() => {
      if (paused) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      el.scrollTo({
        left: atEnd ? 0 : el.scrollLeft + el.clientWidth * 0.8,
        behavior: "smooth",
      });
    }, 3500);

    return () => {
      clearInterval(interval);
      el.removeEventListener("scroll", updateArrows);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resume);
    };
  }, [produks.length]);

  if (produks.length === 0) return null;

  return (
    <section className="py-8">
      <div className="mx-auto mb-4 flex max-w-6xl items-center justify-between px-4">
        <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
          {kategoriNama}
        </h2>
        <Link
          href={`/produk?kategori=${kategoriId}`}
          className="flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1 text-sm font-medium text-gray-700 transition-colors hover:border-brand hover:text-brand"
        >
          Lihat Semua <span aria-hidden></span>
        </Link>
      </div>

      <div className="relative mx-auto max-w-6xl">
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Sebelumnya"
            className="absolute left-1 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white p-2 text-gray-700 shadow-md transition-transform duration-200 ease-out hover:scale-105 sm:flex"
          >
            ‹
          </button>
        )}
        {canScrollRight && (
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Berikutnya"
            className="absolute right-1 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white p-2 text-gray-700 shadow-md transition-transform duration-200 ease-out hover:scale-105 sm:flex"
          >
            ›
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 scrollbar-none sm:gap-4 [&::-webkit-scrollbar]:hidden"
        >
          {produks.map((produk) => (
            <div key={produk.id} className="w-36 shrink-0 snap-start sm:w-44">
              <ProductCard produk={produk} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}