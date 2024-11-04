import { Area } from 'react-easy-crop';

export const getCroppedImg = async (
    imageSrc: string,
    cropArea: Area,
    width: number
  ): Promise<{ url: string; file: Blob }> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    if (!ctx) throw new Error('Failed to get canvas context');
  
    // Set a higher scale factor to improve quality
    const scale = width / cropArea.width;
    const scaleFactor = 7; // Adjust this factor for higher resolution
    canvas.width = width * scaleFactor;
    canvas.height = cropArea.height * scale * scaleFactor;
  
    ctx.scale(scaleFactor, scaleFactor);
  
    ctx.drawImage(
      image,
      cropArea.x,
      cropArea.y,
      cropArea.width,
      cropArea.height,
      0,
      0,
      canvas.width / scaleFactor,
      canvas.height / scaleFactor
    );
  
    return new Promise<{ url: string; file: Blob }>((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
  
            const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
            resolve({ url, file });
          } else {
            resolve({
              url: '',
              file: {
                size: 0,
                type: '',
                arrayBuffer: function (): Promise<ArrayBuffer> {
                  throw new Error('Function not implemented.');
                },
                slice: function (start?: number, end?: number, contentType?: string): Blob {
                  throw new Error('Function not implemented.');
                },
                stream: function (): ReadableStream<Uint8Array> {
                  throw new Error('Function not implemented.');
                },
                text: function (): Promise<string> {
                  throw new Error('Function not implemented.');
                }
              }
            });
          }
        },
        'image/jpeg',
        1 // Set quality to 95%
      );
    });
  };
  

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener('load', () => resolve(img));
    img.addEventListener('error', (error) => reject(error));
    img.src = url;
  });
