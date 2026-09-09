import { auth } from "@/lib/auth";

export class UnauthorizedError extends Error {
  constructor() {
    super("Unauthorized");
    this.name = "UnauthorizedError";
  }
}

/** Panggil di baris pertama tiap Server Action yang mengubah data. */
export async function requireAdmin() {
  const session = await auth();
  if (!session) throw new UnauthorizedError();
  return session;
}