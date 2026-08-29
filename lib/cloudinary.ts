import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(file: File, folder: string): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: `kampung-jajanan/${folder}` }, (error, result) => {
        if (error || !result) return reject(error);
        resolve(result);
      })
      .end(buffer);
  });

  return result.secure_url;
}

function extractPublicId(url: string): string | null {
  // Contoh URL: https://res.cloudinary.com/xxx/image/upload/v1234567890/kampung-jajanan/produk/abcde.jpg
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z0-9]+$/);
  return match ? match[1] : null;
}

export async function deleteImage(url: string): Promise<void> {
  const publicId = extractPublicId(url);
  if (!publicId) return;

  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    // Jangan sampai gagal hapus gambar membuat proses hapus data di DB ikut gagal
    console.error("Gagal menghapus gambar di Cloudinary:", publicId, error);
  }
}

export async function deleteImages(urls: string[]): Promise<void> {
  await Promise.all(urls.map((url) => deleteImage(url)));
}