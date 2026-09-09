import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const currentEmail = process.env.CURRENT_ADMIN_EMAIL;
  const newEmail = process.env.NEW_ADMIN_EMAIL;
  const newPassword = process.env.NEW_ADMIN_PASSWORD;

  if (!newEmail || !newPassword) {
    throw new Error(
      "NEW_ADMIN_EMAIL dan NEW_ADMIN_PASSWORD wajib diisi sebagai environment variable."
    );
  }

  if (newPassword.length < 8) {
    throw new Error("Password baru minimal 8 karakter.");
  }

  // Cari admin: kalau CURRENT_ADMIN_EMAIL diisi, cari berdasarkan itu.
  // Kalau tidak, ambil admin pertama (asumsi cuma ada 1 admin).
  const target = currentEmail
    ? await prisma.admin.findUnique({ where: { email: currentEmail } })
    : await prisma.admin.findFirst();

  if (!target) {
    throw new Error(
      currentEmail
        ? `Admin dengan email "${currentEmail}" tidak ditemukan.`
        : "Tidak ada admin ditemukan di database."
    );
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const updated = await prisma.admin.update({
    where: { id: target.id },
    data: {
      email: newEmail,
      password: hashedPassword,
    },
  });

  console.log("Berhasil update admin:");
  console.log("  ID   :", updated.id);
  console.log("  Nama :", updated.name);
  console.log("  Email lama:", target.email);
  console.log("  Email baru:", updated.email);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e.message ?? e);
    await prisma.$disconnect();
    process.exit(1);
  });