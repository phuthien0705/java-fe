import Resizer from 'react-image-file-resizer';
import b64toBlob from 'b64-to-blob';
import { getBase64Content, getBase64Type } from '@/common/getBase64Info';
const heicConvert = require('heic-convert');

export const base64ToBlob = (dataUrl: string) => {
  const imageType = getBase64Type(dataUrl) || '';
  const imageBase64Value = getBase64Content(dataUrl) || '';
  return b64toBlob(imageBase64Value, imageType);
};
export const resizeFile = async ({
  file,
  maxWidth = 1024,
  maxHeight = 1024,
  compressFormat = 'PNG',
  quality = 100,
}: {
  file: any;
  maxWidth?: number;
  maxHeight?: number;
  compressFormat?: string;
  quality?: number;
  outputType?: string;
}) => {
  return await new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      compressFormat,
      quality,
      0,
      (uri: any) => {
        resolve(uri);
      },
      'base64'
    );
  });
};
export const heicToBase64 = async (url: any) => {
  try {
    console.log('trigger heic to image');
    const output = await fetch(url).then(async (data) => {
      const buffer = Buffer.from(await data.arrayBuffer());
      return heicConvert({ buffer, format: 'PNG' });
    });

    const imgBase64 =
      typeof window !== 'undefined' &&
      btoa(
        output.reduce(
          (data: any, byte: any) => `${data}${String.fromCharCode(byte)}`,
          ''
        )
      );

    return `data:image/png;base64,${imgBase64}`;
  } catch (err) {
    console.log('CANNOT CONVERT SINCE THIS IS CONVERTED JPEG');
    return url;
  }
};
export const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const detectHEIC = async (imgSrc: string) => {
  if (
    imgSrc.toLowerCase().includes('image/heic') ||
    imgSrc.toLowerCase().includes('image/heif')
  ) {
    return await heicToBase64(imgSrc);
  } else {
    return imgSrc;
  }
};

export const resizeImage = async (
  file: File,
  maxWidth = 1024,
  maxHeight = 1024
): Promise<string> => {
  return new Promise((resolve) => {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', async () => {
      if (reader?.result !== null) {
        let imgFileSrc = reader?.result.toString();
        imgFileSrc = await detectHEIC(imgFileSrc);
        imgFileSrc = (await resizeFile({
          file: base64ToBlob(imgFileSrc),
          maxWidth,
          maxHeight,
          quality: 85,
          compressFormat: 'WEBP',
        })) as string;
        resolve(imgFileSrc);
      }
    });
  });
};
