import { supabase } from './supabase';

const BUCKET_NAME = 'product-images';

/**
 * Upload an image to Supabase Storage
 * @param file - The file to upload
 * @param fileName - The name to give the file in storage
 * @returns The public URL of the uploaded image
 */
export async function uploadProductImage(file: File, fileName: string) {
  const fileExt = file.name.split('.').pop();
  const filePath = `${Date.now()}-${fileName}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file);

  if (error) {
    throw new Error(`Error uploading image: ${error.message}`);
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);

  return publicUrl;
}

/**
 * Delete an image from Supabase Storage
 * @param imageUrl - The public URL of the image to delete
 */
export async function deleteProductImage(imageUrl: string) {
  // Extract the file path from the URL
  const url = new URL(imageUrl);
  const filePath = url.pathname.split(`/${BUCKET_NAME}/`)[1];

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([filePath]);

  if (error) {
    throw new Error(`Error deleting image: ${error.message}`);
  }
}

/**
 * Upload multiple images
 * @param files - Array of files to upload
 * @returns Array of public URLs
 */
export async function uploadProductImages(files: File[]): Promise<string[]> {
  const uploadPromises = files.map((file, index) =>
    uploadProductImage(file, `image-${index}`)
  );

  try {
    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (error) {
    throw new Error('Error uploading images');
  }
}
