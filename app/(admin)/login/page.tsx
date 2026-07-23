"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Lock, Mail } from "lucide-react";
import { Navbar } from "@/components/shared/navbar";
import { BottomNav } from "@/components/shared/bottom-nav";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Email atau password salah");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar namaWebsite="UMKM RW 06 WONOREJO" />

      <main className="flex-1 pb-20 sm:pb-0">
        <div className="mx-auto max-w-sm px-4 py-10 sm:py-16">

          <div>
            <h2 className="mb-4 border-b border-gray-100 pb-2 text-sm font-bold uppercase tracking-wide text-gray-500">
              Login
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                  Email
                </label>
                <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 focus-within:border-brand focus-within:bg-white">
                  <Mail size={16} className="text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="admin@email.com"
                    className="w-full bg-transparent text-sm text-gray-800 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                  Password
                </label>
                <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 focus-within:border-brand focus-within:bg-white">
                  <Lock size={16} className="text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full bg-transparent text-sm text-gray-800 outline-none"
                  />
                </div>
              </div>

              {error && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-1 rounded-xl bg-brand py-2.5 text-sm font-bold text-white transition hover:bg-brand-dark disabled:opacity-50"
              >
                {loading ? "Memproses..." : "Log in"}
              </button>
            </form>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}