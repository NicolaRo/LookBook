import heic2any from 'heic2any';

const processImage = async (file) => {
  let processedFile = file;

  // Step 1: Converti HEIC in JPEG se necessario
  if (file.type === 'image/heic' || file.name.toLowerCase().endsWith('.heic')) {
    const convertedBlob = await heic2any({
      blob: file,
      toType: 'image/jpeg',
      quality: 0.8,
    });
    processedFile = new File([convertedBlob], file.name.replace(/\.heic$/i, '.jpg'), {
      type: 'image/jpeg',
    });
  }

  // Step 2: Ridimensiona/comprimi tramite canvas
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target.result;
    };

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const MAX_WIDTH = 1200; // dimensione massima ragionevole per l'analisi LLM
      const scale = Math.min(1, MAX_WIDTH / img.width);

      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          const compressedFile = new File([blob], processedFile.name, {
            type: 'image/jpeg',
          });
          resolve(compressedFile);
        },
        'image/jpeg',
        0.75 // qualità compressione, 0.75 = buon compromesso
      );
    };

    img.onerror = reject;
    reader.onerror = reject;
    reader.readAsDataURL(processedFile);
  });
};

export default processImage;