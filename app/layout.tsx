import type { Metadata } from "next";
import { Baloo_2, Inter } from "next/font/google";
import "./globals.css";
import { AuthSessionProvider } from "@/components/shared/session-provider";

const baloo2 = Baloo_2({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://www.umkm-kelurahan-taman.my.id"
  ),

  title: {
    default: "UMKM Kelurahan Taman | Produk Lokal Sidoarjo",
    template: "%s | UMKM Kelurahan Taman",
  },

  description:
    "Temukan produk dan UMKM lokal Kelurahan Taman, Sidoarjo. Jelajahi makanan, minuman, camilan, dan berbagai produk usaha warga sekitar.",

  keywords: [
    "UMKM Kelurahan Taman",
    "UMKM Taman Sidoarjo",
    "UMKM Sidoarjo",
    "produk lokal Kelurahan Taman",
    "produk UMKM Sidoarjo",
    "kuliner Kelurahan Taman",
    "jajanan lokal Sidoarjo",
    "jajanan tradisional Sidoarjo",
    "produk makanan Sidoarjo",
    "produk minuman Sidoarjo",
    "usaha lokal Kelurahan Taman",
    "pelaku UMKM Kelurahan Taman",
  ],

  verification: {
    google:
      "KgBeAW9lYGz5P787qnpmvW4hCX2CJxbDTIrj2BB7Ybc",
  },

  openGraph: {
    title: "UMKM Kelurahan Taman | Produk Lokal Sidoarjo",
    description:
      "Temukan produk dan UMKM lokal Kelurahan Taman, Sidoarjo.",
    siteName: "UMKM Kelurahan Taman",
    locale: "id_ID",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${baloo2.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex w-full flex-col font-(family-name:--font-body)">
        <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  );
}