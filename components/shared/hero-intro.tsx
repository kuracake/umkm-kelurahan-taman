// hero-intro.tsx
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  ShieldCheck,
  Store,
} from "lucide-react";

type HeroIntroProps = {
  namaWebsite: string;
};

/* =========================================================
   BUBBLES
========================================================= */

const bubbles = [
  { size: 14, top: "8%", left: "72%", opacity: 0.18 },
  { size: 8, top: "13%", left: "79%", opacity: 0.28 },
  { size: 22, top: "17%", left: "91%", opacity: 0.1 },
  { size: 12, top: "25%", left: "67%", opacity: 0.18 },
  { size: 28, top: "31%", left: "78%", opacity: 0.08 },
  { size: 10, top: "38%", left: "92%", opacity: 0.22 },
  { size: 17, top: "45%", left: "74%", opacity: 0.14 },
  { size: 8, top: "52%", left: "84%", opacity: 0.26 },
  { size: 24, top: "59%", left: "94%", opacity: 0.08 },
  { size: 13, top: "67%", left: "69%", opacity: 0.18 },
  { size: 19, top: "74%", left: "82%", opacity: 0.1 },
  { size: 10, top: "82%", left: "91%", opacity: 0.22 },
  { size: 31, top: "10%", left: "95%", opacity: 0.07 },
  { size: 14, top: "34%", left: "60%", opacity: 0.15 },
  { size: 21, top: "56%", left: "63%", opacity: 0.08 },
  { size: 11, top: "88%", left: "76%", opacity: 0.15 },
  { size: 16, top: "20%", left: "83%", opacity: 0.12 },
  { size: 9, top: "43%", left: "87%", opacity: 0.2 },
  { size: 25, top: "70%", left: "58%", opacity: 0.07 },
  { size: 12, top: "91%", left: "87%", opacity: 0.14 },
];

/* =========================================================
   OUTLINED BUBBLES
========================================================= */

const outlinedBubbles = [
  "right-[13%] top-[16%] h-40 w-40",
  "right-[19%] top-[22%] h-24 w-24",
  "bottom-[11%] right-[30%] h-20 w-20",
  "right-[34%] top-[36%] h-16 w-16",
];

/* =========================================================
   COMPONENT
========================================================= */

export function HeroIntro({ namaWebsite }: HeroIntroProps) {
  const namaLokasi = namaWebsite.replace(/^UMKM\s+/i, "");

  return (
    <section className="relative isolate overflow-hidden bg-brand-dark text-white">
      {/* =====================================================
          BACKGROUND GLOW
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-32
          -top-32
          -z-20
          h-104
          w-104
          rounded-full
          bg-sky-300/20
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-40
          -left-40
          -z-20
          h-120
          w-120
          rounded-full
          bg-blue-950/30
          blur-3xl
        "
      />

      {/* =====================================================
          SMALL BUBBLES
      ====================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        {bubbles.map((bubble, index) => (
          <span
            key={index}
            className="
              absolute
              rounded-full
              border
              border-white/15
              bg-white
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

      {/* =====================================================
          LARGE OUTLINE BUBBLES
      ====================================================== */}

      {outlinedBubbles.map((position) => (
        <div
          key={position}
          aria-hidden="true"
          className={`
            pointer-events-none
            absolute
            -z-10
            rounded-full
            border
            border-white/10
            ${position}
          `}
        />
      ))}

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div
        className="
          relative
          mx-auto
          min-h-147.5
          max-w-7xl
          px-5
          py-10
          sm:min-h-142.5
          sm:px-8
          sm:py-14
          lg:min-h-140
          lg:px-10
          lg:py-16
        "
      >
        {/* ===================================================
            LEFT CONTENT
        ==================================================== */}

        <div
          className="
            relative
            z-20
            w-[68%]
            max-w-2xl
            sm:w-[58%]
            lg:w-[53%]
          "
        >
          {/* Heading */}

          <h1
            className="
              mt-3
              text-[2.15rem]
              font-bold
              leading-none
              tracking-[-0.035em]
              text-white
              sm:mt-6
              sm:text-5xl
              sm:leading-[1.03]
              lg:text-[4rem]
              xl:text-[4.1rem]
            "
          >
            <span className="block">
              Temukan Produk Lokal dari UMKM
            </span>

            <span className="block text-sky-200">
              {namaLokasi}
            </span>
          </h1>

          {/* Description */}

          <p
            className="
              mt-3
              max-w-xl
              text-xs
              leading-5
              text-white
              sm:mt-6
              sm:text-sm
              sm:leading-7
              lg:text-base
              lg:leading-8
            "
          >
            Temukan berbagai produk berkualitas dari UMKM di Kelurahan Taman. Dukung usaha lokal dan bantu ekonomi warga tumbuh bersama.
          </p>

          {/* CTA */}

          <div
            className="
              mt-4
              flex
              max-w-[320px]
              flex-col
              gap-2
              sm:mt-7
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
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-slate-50
                hover:shadow-xl
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
                transition-all
                duration-200
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

          {/* Trust */}

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

        {/* ===================================================
            PRODUCT PNG
        ==================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            z-10

            /* MOBILE */
            right-[-10%]
            top-[15%]
            h-[80%]
            w-[72%]

            /* SMALL */
            sm:right-[-6%]
            sm:top-[3%]
            sm:h-[78%]
            sm:w-[58%]

            /* DESKTOP */
            lg:right-[0%]
            lg:top-[7%]
            lg:h-[72%]
            lg:w-[41%]

            /* LARGE DESKTOP */
            xl:right-[1%]
            xl:top-[5%]
            xl:h-[74%]
            xl:w-[42%]
          "
        >
          <Image
            src="/images/hero-product1.png"
            alt="Produk UMKM Kelurahan Taman"
            fill
            priority
            sizes="
              (max-width: 640px) 67vw,
              (max-width: 1024px) 58vw,
              42vw
            "
            className="
              object-contain
              object-top
              drop-shadow-[0_22px_28px_rgba(0,0,0,0.14)]
            "
          />
        </div>

        {/* ===================================================
            QUALITY BADGE
        ==================================================== */}

        <div
          className="
            absolute
            right-[5%]
            top-[17%]
            z-20
            hidden
            items-center
            gap-2
            rounded-xl
            bg-white
            px-3
            py-2
            text-brand-dark
            shadow-lg
            sm:flex
            lg:right-[6%]
            lg:top-[17%]
          "
        >
          <div
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              bg-brand/10
            "
          >
            <ShieldCheck className="h-4 w-4 text-brand" />
          </div>

          <div>
            <p className="text-[10px] text-slate-500">
              Kualitas
            </p>

            <p className="text-xs font-bold">
              Produk Lokal
            </p>
          </div>
        </div>

        {/* ===================================================
            LOCAL BADGE
        ==================================================== */}

        <div
          className="
            absolute
            bottom-[13%]
            right-[27%]
            z-20
            hidden
            items-center
            gap-2
            rounded-xl
            bg-white
            px-3
            py-2
            text-brand-dark
            shadow-lg
            sm:flex
            lg:bottom-[13%]
            lg:right-[28%]
          "
        >
          <div
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              bg-emerald-50
            "
          >
            <Heart
              className="
                h-4
                w-4
                fill-emerald-500
                text-emerald-500
              "
            />
          </div>

          <div>
            <p className="text-[10px] text-slate-500">
              Dukung
            </p>

            <p className="text-xs font-bold">
              Warga Lokal
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM CURVE
      ====================================================== */}

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