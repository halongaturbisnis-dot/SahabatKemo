/**
 * Service to handle Google Apps Script integrations
 */

export async function uploadImageToGAS(file: File): Promise<string> {
  const gasUrl = import.meta.env.VITE_GAS_URL;
  if (!gasUrl) {
    throw new Error('VITE_GAS_URL is not configured');
  }

  const reader = new FileReader();
  const base64Promise = new Promise<string>((resolve, reject) => {
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
  });
  
  reader.readAsDataURL(file);
  const base64 = await base64Promise;

  const response = await fetch(gasUrl, {
    method: 'POST',
    body: JSON.stringify({
      filename: file.name,
      mimeType: file.type,
      data: base64
    })
  });

  if (!response.ok) {
    throw new Error('Failed to upload image to Google Drive');
  }

  const result = await response.json();
  if (!result.fileId) {
    throw new Error('No fileId returned from Google Apps Script');
  }

  return result.fileId;
}

export function getGoogleDriveImageUrl(fileId: string): string {
  return `https://lh3.googleusercontent.com/d/${fileId}`;
}
