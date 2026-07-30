import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { AuthSessionProvider } from "@/components/shared/session-provider";

const poppins = Poppins({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kampung Jajanan RW 06 Wonorejo",
  description:
    "Katalog digital UMKM jajanan tradisional RW 06 Wonorejo. Temukan dan pesan langsung via WhatsApp.",
  keywords: [
    "jajanan pasar",
    "UMKM RW 06",
    "Wonorejo Surabaya",
    "jajanan tradisional Surabaya",
    "UMKM Wonorejo",
    "kue basah Surabaya",
  ],
  metadataBase: new URL("https://umkm-rw06-wonorejo.vercel.app"),
  verification: {
    google: "KgBeAW9lYGz5P787qnpmvW4hCX2CJxbDTIrj2BB7Ybc",
  },
  openGraph: {
    title: "Jajanan Pasar & UMKM RW 06 Wonorejo Surabaya",
    description: "Katalog digital UMKM jajanan tradisional RW 06 Wonorejo. Pesan langsung via WhatsApp.",
    url: "https://umkm-rw06-wonorejo.vercel.app",
    siteName: "Kampung Jajanan RW 06 Wonorejo",
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
    <html lang="id" className={`${poppins.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-(family-name:--font-body)">
        <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  );
}