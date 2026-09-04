"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Banner = {
  id: string;
  gambar: string;
  judul: string | null;
};

export function HeroBanner({ banners }: { banners: Banner[] }) {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const hasMultiple = banners.length > 1;

  const nextBanner = () => {
    setActive((current) => (current + 1) % banners.length);
  };

  const prevBanner = () => {
    setActive(
      (current) => (current - 1 + banners.length) % banners.length,
    );
  };

  useEffect(() => {
    if (!hasMultiple) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const interval = window.setInterval(() => {
      setActive((current) => (current + 1) % banners.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [hasMultiple, banners.length]);

  useEffect(() => {
    if (active >= banners.length) {
      setActive(0);
    }
  }, [active, banners.length]);

  if (banners.length === 0) return null;

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (!hasMultiple || touchStartX.current === null) return;

    const touchEndX = event.changedTouches[0]?.clientX;

    if (touchEndX === undefined) {
      touchStartX.current = null;
      return;
    }

    const distance = touchEndX - touchStartX.current;

    if (Math.abs(distance) > 50) {
      if (distance < 0) {
        nextBanner();
      } else {
        prevBanner();
      }
    }

    touchStartX.current = null;
  };

  return (
    <section className="bg-[#fffdf8] px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
      <div className="relative mx-auto max-w-7xl">
        {/* =====================================================
            BANNER
        ====================================================== */}

        <div
          className="
            relative
            overflow-hidden
            rounded-2xl
            bg-slate-100
            shadow-[0_12px_32px_-18px_rgba(15,23,42,0.35)]
            sm:rounded-3xl
          "
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="
              relative
              aspect-video
              w-full
              sm:aspect-18/9
              lg:aspect-21/9
            "
          >
            {banners.map((banner, index) => (
              <div
                key={banner.id}
                className={`
                  absolute
                  inset-0
                  transition-opacity
                  duration-700
                  ease-out
                  ${
                    index === active
                      ? "opacity-100"
                      : "pointer-events-none opacity-0"
                  }
                `}
                aria-hidden={index !== active}
              >
                <Image
                  src={banner.gambar}
                  alt={
                    banner.judul ||
                    "Banner promosi UMKM Kelurahan Taman"
                  }
                  fill
                  priority={index === 0}
                  sizes="
                    (max-width: 640px) 100vw,
                    (max-width: 1024px) 90vw,
                    1280px
                  "
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Indicator tetap di dalam banner */}

          {hasMultiple && (
            <div
              className="
                absolute
                bottom-3
                left-1/2
                z-20
                flex
                -translate-x-1/2
                items-center
                gap-1.5
                rounded-full
                bg-black/25
                px-2.5
                py-1.5
                backdrop-blur-sm
                sm:bottom-4
              "
            >
              {banners.map((banner, index) => (
                <button
                  key={banner.id}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`Tampilkan banner ${index + 1}`}
                  aria-current={
                    index === active ? "true" : "false"
                  }
                  className={`
                    h-1.5
                    rounded-full
                    transition-all
                    duration-300
                    ${
                      index === active
                        ? "w-7 bg-white"
                        : "w-1.5 bg-white/60 hover:bg-white/90"
                    }
                  `}
                />
              ))}
            </div>
          )}
        </div>

        {/* =====================================================
            PREVIOUS BUTTON - OUTSIDE BANNER
        ====================================================== */}

        {hasMultiple && (
          <button
            type="button"
            onClick={prevBanner}
            aria-label="Banner sebelumnya"
            className="
              absolute
              left-0
              top-1/2
              z-30
              flex
              h-10
              w-10
              -translate-x-1/2
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-slate-200
              bg-white
              text-slate-700
              shadow-md
              transition-all
              duration-200
              hover:translate-x-[-55%]
              hover:bg-slate-50
              hover:shadow-lg
              sm:h-11
              sm:w-11
            "
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        )}

        {/* =====================================================
            NEXT BUTTON - OUTSIDE BANNER
        ====================================================== */}

        {hasMultiple && (
          <button
            type="button"
            onClick={nextBanner}
            aria-label="Banner berikutnya"
            className="
              absolute
              right-0
              top-1/2
              z-30
              flex
              h-10
              w-10
              translate-x-1/2
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-slate-200
              bg-white
              text-slate-700
              shadow-md
              transition-all
              duration-200
              hover:translate-x-[55%]
              hover:bg-slate-50
              hover:shadow-lg
              sm:h-11
              sm:w-11
            "
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        )}
      </div>
    </section>
  );
}