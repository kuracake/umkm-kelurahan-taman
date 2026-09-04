// hero-intro.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, ShieldCheck, Store } from "lucide-react";

type HeroIntroProps = {
  namaWebsite: string;
};

const bubbles = [
  { size: 18, top: "8%", left: "72%", opacity: 0.18 },
  { size: 10, top: "13%", left: "79%", opacity: 0.3 },
  { size: 24, top: "18%", left: "88%", opacity: 0.12 },
  { size: 14, top: "25%", left: "67%", opacity: 0.2 },
  { size: 32, top: "31%", left: "78%", opacity: 0.1 },
  { size: 12, top: "38%", left: "91%", opacity: 0.24 },
  { size: 20, top: "46%", left: "73%", opacity: 0.16 },
  { size: 9, top: "53%", left: "84%", opacity: 0.3 },
  { size: 28, top: "60%", left: "93%", opacity: 0.1 },
  { size: 15, top: "68%", left: "70%", opacity: 0.2 },
  { size: 22, top: "75%", left: "81%", opacity: 0.12 },
  { size: 11, top: "82%", left: "91%", opacity: 0.24 },
  { size: 36, top: "12%", left: "94%", opacity: 0.08 },
  { size: 16, top: "34%", left: "60%", opacity: 0.18 },
  { size: 26, top: "57%", left: "63%", opacity: 0.09 },
  { size: 13, top: "87%", left: "76%", opacity: 0.18 },
];

export function HeroIntro({ namaWebsite }: HeroIntroProps) {
  const namaLokasi = namaWebsite.replace(/^UMKM\s+/i, "");

  return (
    <section
      className="
        relative isolate overflow-hidden
        bg-brand-dark
        text-white
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -right-32 -top-32
          h-105 w-105
          rounded-full
          bg-sky-300/20
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -left-40 -bottom-45
          h-120 w-120
          rounded-full
          bg-blue-950/30
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {bubbles.map((bubble, index) => (
          <span
            key={index}
            className="
              absolute
              rounded-full
              border
              border-white/20
              bg-white
              blur-[0.2px]
            "
            style={{
              width: bubble.size,
              height: bubble.size,
              top: bubble.top,
              left: bubble.left,
              opacity: bubble.opacity,
            }}
          />
        ))}
      </div>

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          right-[14%] top-[16%]
          h-40 w-40
          rounded-full
          border border-white/10
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          right-[20%] top-[22%]
          h-24 w-24
          rounded-full
          border border-white/10
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          bottom-[8%] right-[32%]
          hidden
          h-20 w-20
          rounded-full
          border border-white/10
          sm:block
        "
      />

      <div
        className="
          relative mx-auto
          min-h-162.5
          max-w-7xl
          px-5
          py-10
          sm:min-h-145
          sm:px-8
          sm:py-14
          lg:min-h-142.5
          lg:px-10
          lg:py-16
        "
      >
        <div
          className="
            relative z-20
            w-[67%]
            max-w-2xl
            sm:w-[58%]
            lg:w-[53%]
          "
        >
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/25
              bg-white/10
              px-3
              py-1.5
              text-[10px]
              font-medium
              text-white
              backdrop-blur-sm
              sm:px-3.5
              sm:py-2
              sm:text-xs
            "
          >
          </div>

          <h1
            className="
              mt-5
              text-[2.15rem]
              font-bold
              leading-[1.02]
              tracking-[-0.035em]
              text-white
              sm:mt-6
              sm:text-5xl
              lg:text-[4.15rem]
            "
          >
            <span className="block">Temukan Produk</span>
            <span className="block">Lokal dari</span>
            <span className="block text-sky-200">
              {namaLokasi}
            </span>
          </h1>

          <p
            className="
              mt-5
              max-w-xl
              text-xs
              leading-6
              text-white/80
              sm:mt-6
              sm:text-sm
              sm:leading-7
              lg:text-base
              lg:leading-8
            "
          >
            Temukan berbagai produk berkualitas dari pelaku UMKM di sekitar
            Anda. Dukung usaha lokal dan bantu ekonomi warga tumbuh bersama.
          </p>

          <div
            className="
              relative mx-auto
              max-w-7xl
              px-5
              py-10
              sm:px-8
              sm:py-14
              lg:min-h-142.5
              lg:px-10
              lg:py-16
            "
          >
            {/* CONTENT TEXT */}
            <div
              className="
                relative z-20
                w-[67%]
                max-w-2xl
                sm:w-[58%]
                lg:w-[53%]
              "
            >
              {/* badge */}
              {/* heading */}
              {/* description */}
            </div>

            {/* CTA */}
            <div
              className="
                relative
                z-30
                mt-6
                flex
                w-full
                max-w-[320px]
                flex-col
                gap-2.5
                sm:max-w-none
                sm:flex-row
                sm:gap-3
              "
            >
              <Link
                href="/produk"
                className="
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-white
                  px-4
                  py-3
                  text-xs
                  font-semibold
                  text-brand-dark
                  shadow-lg
                  transition
                  hover:bg-slate-50
                  sm:w-auto
                  sm:px-5
                  sm:py-3.5
                  sm:text-sm
                "
              >
                Jelajahi Produk
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Link>

              <Link
                href="/umkm"
                className="
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-white/30
                  bg-white/5
                  px-4
                  py-3
                  text-xs
                  font-semibold
                  text-white
                  backdrop-blur-sm
                  transition
                  hover:bg-white/10
                  sm:w-auto
                  sm:px-5
                  sm:py-3.5
                  sm:text-sm
                "
              >
                Kenali UMKM Kami
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Link>
            </div>
          </div>

          <div
            className="
              mt-5
              flex
              flex-wrap
              gap-x-4
              gap-y-2
              text-[9px]
              text-white/70
              sm:mt-7
              sm:gap-x-6
              sm:text-xs
            "
          >
            <span className="inline-flex items-center gap-1.5">
              <Store className="h-3 w-3 text-sky-200 sm:h-3.5 sm:w-3.5" />
              Produk lokal
            </span>

            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3 w-3 text-sky-200 sm:h-3.5 sm:w-3.5" />
              Pilihan warga
            </span>
          </div>
        </div>

        <div
          className="
            pointer-events-none
            absolute
            right-[-6%]
            top-[-2%]
            z-10
            h-[63%]
            w-[58%]
            sm:right-[-4%]
            sm:top-[10%]
            sm:h-[76%]
            sm:w-[52%]
            lg:right-[-2%]
            lg:top-[8%]
            lg:h-[88%]
            lg:w-[50%]
          "
        >
          <Image
            src="/images/hero-product.png"
            alt="Produk UMKM Kelurahan Taman"
            fill
            priority
            sizes="(max-width: 640px) 60vw, (max-width: 1024px) 52vw, 50vw"
            className="
              object-contain
              object-bottom
              drop-shadow-[0_25px_30px_rgba(0,0,0,0.18)]
            "
          />
        </div>

        <div
          className="
            absolute
            right-[8%]
            top-[14%]
            z-20
            hidden
            items-center
            gap-2
            rounded-2xl
            bg-white
            px-3
            py-2.5
            text-brand-dark
            shadow-xl
            sm:flex
            lg:right-[5%]
            lg:top-[17%]
            lg:gap-3
            lg:px-4
            lg:py-3
          "
        >
          <div
            className="
              flex
              h-8 w-8
              items-center
              justify-center
              rounded-xl
              bg-brand/10
              lg:h-10
              lg:w-10
            "
          >
            <ShieldCheck className="h-4 w-4 text-brand lg:h-5 lg:w-5" />
          </div>

          <div>
            <p className="text-[10px] text-slate-500 lg:text-xs">
              Kualitas
            </p>
            <p className="text-xs font-bold lg:text-sm">
              Produk Lokal
            </p>
          </div>
        </div>

        <div
          className="
            absolute
            bottom-[18%]
            right-[31%]
            z-20
            hidden
            items-center
            gap-2
            rounded-2xl
            bg-white
            px-3
            py-2.5
            text-brand-dark
            shadow-xl
            sm:flex
            lg:bottom-[15%]
            lg:right-[32%]
            lg:gap-3
            lg:px-4
            lg:py-3
          "
        >
          <div
            className="
              flex
              h-8 w-8
              items-center
              justify-center
              rounded-xl
              bg-emerald-50
              lg:h-10
              lg:w-10
            "
          >
            <Heart
              className="
                h-4 w-4
                fill-emerald-500
                text-emerald-500
                lg:h-5
                lg:w-5
              "
            />
          </div>

          <div>
            <p className="text-[10px] text-slate-500 lg:text-xs">
              Dukung
            </p>
            <p className="text-xs font-bold lg:text-sm">
              Warga Lokal
            </p>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="
          absolute
          -bottom-1
          left-[-5%]
          h-8
          w-[110%]
          rounded-[50%_50%_0_0]
          bg-[#fffdf8]
          sm:h-10
          lg:h-12
        "
      />
    </section>
  );
}