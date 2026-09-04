import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

import { produkService } from "@/features/produk/services/produk.service";
import { OrderSection } from "@/features/produk/components/order-section";
import { ProdukGallery } from "@/features/produk/components/produk-gallery";
import { ProductCard } from "@/components/shared/product-card";

const BASE_URL = "https://umkm-kelurahan-taman.vercel.app";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const produk = await produkService.getBySlug(slug);

  if (!produk) {
    return {
      title: "Produk tidak ditemukan",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const title = `${produk.namaProduk} | ${produk.umkm.namaUmkm}`;

  const description =
    produk.deskripsi ??
    `Temukan ${produk.namaProduk} dari ${produk.umkm.namaUmkm} di UMKM Kelurahan Taman. Harga Rp${produk.harga.toLocaleString(
      "id-ID",
    )}.`;

  const canonicalUrl = `/produk/${produk.slug}`;

  return {
    title,
    description,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title,
      description,
      type: "website",
      url: canonicalUrl,
      siteName: "UMKM Kelurahan Taman",
      locale: "id_ID",
      images: produk.foto
        ? [
            {
              url: produk.foto,
              alt: produk.namaProduk,
            },
          ]
        : [],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ProdukDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const produk = await produkService.getBySlug(slug);

  if (!produk || !produk.isActive) {
    notFound();
  }

  const semuaProduk = await produkService.getActive();

  const related = semuaProduk
    .filter(
      (p) =>
        p.id !== produk.id &&
        p.kategoriId === produk.kategoriId,
    )
    .slice(0, 4);

  const productUrl = `${BASE_URL}/produk/${produk.slug}`;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",

    name: produk.namaProduk,

    description:
      produk.deskripsi ??
      `Produk ${produk.namaProduk} dari ${produk.umkm.namaUmkm}.`,

    image: produk.foto ? [produk.foto] : [],

    category: produk.kategori.nama,

    url: productUrl,

    brand: {
      "@type": "Brand",
      name: produk.umkm.namaUmkm,
    },

    seller: {
      "@type": "Organization",
      name: produk.umkm.namaUmkm,
    },

    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "IDR",
      price: produk.harga,
      availability: produk.isActive
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition:
        "https://schema.org/NewCondition",
    },
  };

  return (
    <>
      {/* =====================================================
          STRUCTURED DATA
      ====================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="mx-auto max-w-4xl px-4 py-10 sm:py-12">
        {/* Back */}

        <Link
          href="/produk"
          className="
            mb-6
            inline-flex
            items-center
            gap-1.5
            text-sm
            font-medium
            text-slate-500
            transition-colors
            duration-200
            hover:text-brand
          "
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Produk
        </Link>

        {/* ===================================================
            PRODUCT DETAIL
        ==================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-8
            md:grid-cols-2
            md:gap-10
          "
        >
          {/* Product image */}

          <ProdukGallery
            namaProduk={produk.namaProduk}
            foto={produk.foto}
            fotoTambahan={produk.fotoTambahan}
          />

          {/* Product information */}

          <div>
            {/* Best seller */}

            {produk.bestSeller && (
              <span
                className="
                  inline-flex
                  rounded-full
                  bg-brand
                  px-3
                  py-1
                  text-xs
                  font-bold
                  uppercase
                  tracking-wide
                  text-white
                "
              >
                Favorit
              </span>
            )}

            {/* Product name */}

            <h1
              className="
                mt-2
                text-2xl
                font-bold
                leading-tight
                tracking-tight
                text-slate-900
                sm:text-3xl
              "
            >
              {produk.namaProduk}
            </h1>

            {/* Seller + category */}

            <p className="mt-2 text-sm text-slate-500">
              Dijual oleh{" "}
              <Link
                href="/umkm"
                className="
                  font-medium
                  text-brand
                  transition-colors
                  hover:underline
                "
              >
                {produk.umkm.namaUmkm}
              </Link>
              {" · "}
              {produk.kategori.nama}
            </p>

            {/* Price */}

            <p
              className="
                mt-5
                text-3xl
                font-bold
                tracking-tight
                text-brand
              "
            >
              Rp{produk.harga.toLocaleString("id-ID")}
            </p>

            {/* Description */}

            {produk.deskripsi && (
              <div className="mt-5">
                <h2 className="text-sm font-semibold text-slate-900">
                  Deskripsi Produk
                </h2>

                <p
                  className="
                    mt-2
                    text-sm
                    leading-7
                    text-slate-600
                  "
                >
                  {produk.deskripsi}
                </p>
              </div>
            )}

            {/* Order */}

            <div className="mt-6">
              <OrderSection produk={produk} />
            </div>
          </div>
        </div>

        {/* ===================================================
            RELATED PRODUCTS
        ==================================================== */}

        {related.length > 0 && (
          <section className="mt-14 sm:mt-16">
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand">
                Mungkin Anda Suka
              </p>

              <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900">
                Produk Terkait
              </h2>
            </div>

            <div
              className="
                grid
                grid-cols-2
                gap-3
                sm:grid-cols-4
                sm:gap-4
              "
            >
              {related.map((p) => (
                <ProductCard
                  key={p.id}
                  produk={p}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}