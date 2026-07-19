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