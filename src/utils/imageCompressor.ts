export const compressImage = (file: File, targetSizeKB: number = 200): Promise<Blob> => {
    const targetSizeBytes = targetSizeKB * 1024;
    const img = new Image();
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
        // Log the original size of the file
        console.log(`Original size: ${(file.size / 1024).toFixed(2)} KB`);

        reader.onload = (event) => {
            img.src = event.target!.result as string;
        };

        img.onload = () => {
            let quality = 1.0; // Start with maximum quality

            const compress = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error('Failed to get canvas context'));
                    return;
                }
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                // Convert canvas to Blob with the current quality
                canvas.toBlob((blob) => {
                    if (blob && blob.size <= targetSizeBytes) {
                        // Log the compressed size
                        console.log(`Compressed size: ${(blob.size / 1024).toFixed(2)} KB`);
                        resolve(blob);
                    } else {
                        quality -= 0.1; // Decrease quality
                        if (quality > 0) {
                            // Recursively call compress with new quality
                            canvas.toBlob(compress, 'image/jpeg', quality);
                        } else {
                            reject(new Error("Could not compress the image to the desired size."));
                        }
                    }
                }, 'image/jpeg', quality);
            };

            compress();
        };

        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
}