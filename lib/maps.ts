/**
 * Mengubah URL Google Maps panjang (place/search/@lat,lng) menjadi URL embed.
 * Kalau sudah format embed, dikembalikan apa adanya.
 */
function toEmbedUrl(rawUrl: string): string | null {
  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return null;
  }

  const isGoogleMaps =
    parsed.hostname.includes("google.com") || parsed.hostname.includes("google.co.id");
  if (!isGoogleMaps || !parsed.pathname.includes("/maps")) return null;

  if (parsed.pathname.includes("/maps/embed")) {
    return rawUrl;
  }

  parsed.searchParams.set("output", "embed");
  return parsed.toString();
}

/**
 * Deteksi awal: apakah input berupa kode <iframe>, link pendek, atau link panjang.
 */
function parseMapsInput(input: string): {
  rawUrl: string | null;
  isShortLink: boolean;
} {
  const trimmed = input.trim();
  const iframeSrcMatch = trimmed.match(/src=["']([^"']+)["']/);
  const raw = iframeSrcMatch ? iframeSrcMatch[1] : trimmed;

  try {
    const parsed = new URL(raw);
    const isShortLink = parsed.hostname.includes("maps.app.goo.gl");
    return { rawUrl: raw, isShortLink };
  } catch {
    return { rawUrl: null, isShortLink: false };
  }
}

/**
 * Versi ASYNC — dipakai di Server Component.
 * Otomatis resolve link pendek (maps.app.goo.gl) dengan mengikuti redirect-nya
 * di server, lalu convert ke format embed. Hasil di-cache 1 jam supaya tidak
 * fetch ke Google setiap kali halaman /kontak dibuka.
 */
export async function resolveMapsEmbedUrl(
  input: string | null | undefined
): Promise<{ url: string | null; error: "invalid" | "unreachable" | null }> {
  if (!input) return { url: null, error: null };

  const { rawUrl, isShortLink } = parseMapsInput(input);
  if (!rawUrl) return { url: null, error: "invalid" };

  if (!isShortLink) {
    const embedUrl = toEmbedUrl(rawUrl);
    return { url: embedUrl, error: embedUrl ? null : "invalid" };
  }

  // Link pendek: minta server mengikuti redirect untuk dapat URL aslinya
    try {
        const res = await fetch(rawUrl, {
        redirect: "follow",
        headers: {
            "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
        next: { revalidate: 3600 },
        });
        const finalUrl = res.url;
        console.log("[maps debug] rawUrl:", rawUrl);
        console.log("[maps debug] finalUrl setelah redirect:", finalUrl);
        const embedUrl = toEmbedUrl(finalUrl);
        console.log("[maps debug] embedUrl hasil convert:", embedUrl);
        return { url: embedUrl, error: embedUrl ? null : "invalid" };
    } catch (err) {
        console.log("[maps debug] fetch gagal:", err);
        return { url: null, error: "unreachable" };
    }
}