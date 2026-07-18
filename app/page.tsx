import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const totalUmkm = await prisma.umkm.count();

  return (
    <main className="flex min-h-screen items-center justify-center">
      <p>Total UMKM di database: {totalUmkm}</p>
    </main>
  );
}