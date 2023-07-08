"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const qrcode_1 = __importDefault(require("qrcode"));
const crypto_1 = __importDefault(require("crypto"));
async function generateQRCode(text) {
    try {
        const qrCodeData = await qrcode_1.default.toDataURL(text);
        const qrCodeId = generateQRCodeId(text);
        console.log('QR Code ID:', qrCodeId);
        console.log('QR Code Data:', qrCodeData);
        return { qrCodeId, qrCodeData };
    }
    catch (err) {
        console.error(err);
        return null;
    }
}
function generateQRCodeId(text) {
    const hash = crypto_1.default.createHash('sha256');
    hash.update(text);
    const qrCodeId = hash.digest('hex');
    return qrCodeId;
}
//  example
generateQRCode('I am a pony!')
    .then((result) => {
    const qrCodeId = result.qrCodeId;
    const qrCodeData = result.qrCodeData;
    // Handle the generated QR code ID and data
})
    .catch((err) => {
    // Handle any errors that occurred during QR code generation
});
