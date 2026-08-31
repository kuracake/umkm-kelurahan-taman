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
  title: "UMKM Kelurahan Taman",
  description:
    "Katalog digital UMKM Kelurahan Taman. Temukan dan pesan langsung via WhatsApp.",
  keywords: [
    "Kelurahan Taman",
    "UMKM Kelurahan Taman",
    "Taman Surabaya",
    "jajanan tradisional Surabaya",
    "UMKM Taman",
    "kue basah Surabaya",
  ],
  metadataBase: new URL("https://umkm-kelurahan-taman.vercel.app"),
  verification: {
    google: "KgBeAW9lYGz5P787qnpmvW4hCX2CJxbDTIrj2BB7Ybc",
  },
  openGraph: {
    title: "UMKM Kelurahan Taman",
    description: "Katalog digital UMKM Kelurahan Taman. Temukan dan pesan langsung via WhatsApp.",
    url: "https://umkm-kelurahan-taman.vercel.app",
    siteName: "UMKM Kelurahan Taman",
    locale: "id_ID",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${baloo2.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex w-full flex-col font-(family-name:--font-body)">
        <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  );
}