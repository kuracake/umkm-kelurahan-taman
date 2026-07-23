"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Banner = {
  id: string;
  gambar: string;
  judul: string;
};

export function HeroBanner({ banners }: { banners: Banner[] }) {
  const [active, setActive] = useState(0);
  const hasMultiple = banners.length > 1;

  useEffect(() => {
    if (!hasMultiple) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = setInterval(() => {
      setActive((i) => (i + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [hasMultiple, banners.length]);

  if (banners.length === 0) return null;

  return (
    <section className="relative h-56 w-full overflow-hidden sm:h-80 lg:h-96">
      {banners.map((banner, i) => (
        <div
          key={banner.id}
          className="absolute inset-0 transition-opacity duration-700 ease-out"
          style={{ opacity: i === active ? 1 : 0 }}
          aria-hidden={i !== active}
        >
          <Image
            src={banner.gambar}
            alt={banner.judul}
            fill
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}

      {hasMultiple && (
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {banners.map((banner, i) => (
            <button
              key={banner.id}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ke banner ${i + 1}`}
              aria-current={i === active}
              className={`h-1.5 rounded-full transition-all duration-300 ease-out ${
                i === active ? "w-6 bg-white" : "w-1.5 bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}