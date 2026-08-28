import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const KATEGORI_TETAP = [
  { nama: "Camilan Kering", icon: "🍘" },
  { nama: "Gorengan", icon: "🍤" },
  { nama: "Kue Basah", icon: "🧁" },
  { nama: "Makanan Berat", icon: "🍛" },
  { nama: "Minuman", icon: "🥤" },
  { nama: "Lain-lain", icon: "🛒" },
];

async function main() {
  for (const k of KATEGORI_TETAP) {
    await prisma.kategori.upsert({
      where: { nama: k.nama },
      update: { icon: k.icon },
      create: k,
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });