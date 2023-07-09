import QRCode from 'qrcode';
import crypto from 'crypto';

async function generateQRCode(text:string) {
  try {
    const qrCodeData = await QRCode.toDataURL(text);
    const qrCodeId = generateQRCodeId(text);
    console.log('QR Code ID:', qrCodeId);
    console.log('QR Code Data:', qrCodeData);
    return { qrCodeId, qrCodeData };
  } catch (err) {
    console.error(err);
    return null;
  }
}

function generateQRCodeId(text:string) {
  const hash = crypto.createHash('sha256');
  hash.update(text);
  const qrCodeId = hash.digest('hex');
  return qrCodeId;
}

//  example
generateQRCode('I am a pony!')
  .then((result:any) => {
    const qrCodeId = result.qrCodeId;
    const qrCodeData = result.qrCodeData;
    // Handle the generated QR code ID and data
  })
  .catch((err) => {
    // Handle any errors that occurred during QR code generation
  });
