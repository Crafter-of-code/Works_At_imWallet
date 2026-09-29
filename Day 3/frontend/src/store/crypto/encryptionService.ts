// import { scrypt } from 'react-native-quick-crypto';
// import { SERVER_PUBLIC_KEY } from '../Config';

// const encoder = new TextEncoder();

// function arrayBufferToBase64(buffer: ArrayBuffer): string {
//   const bytes = new Uint8Array(buffer);

//   let binary = '';

//   for (let i = 0; i < bytes.length; i++) {
//     binary += String.fromCharCode(bytes[i]);
//   }

//   return btoa(binary);
// }

// function pemToArrayBuffer(pem: string): ArrayBuffer {
//   const base64 = pem
//     .replace('-----BEGIN PUBLIC KEY-----', '')
//     .replace('-----END PUBLIC KEY-----', '')
//     .replace(/\s/g, '');

//   const binary = atob(base64);

//   const bytes = new Uint8Array(binary.length);

//   for (let i = 0; i < binary.length; i++) {
//     bytes[i] = binary.charCodeAt(i);
//   }

//   return bytes.buffer;
// }

// export async function encryptPayload(payload: object) {
//   // ------------------------------------------
//   // 1. Convert JSON to bytes
//   // ------------------------------------------

//   const plaintext = encoder.encode(JSON.stringify(payload));

//   // ------------------------------------------
//   // 2. Generate AES-256-GCM key
//   // ------------------------------------------

//   const aesKey = await scrypt.subtle.generateKey(
//     {
//       name: 'AES-GCM',
//       length: 256,
//     },
//     true,
//     ['encrypt', 'decrypt'],
//   );

//   // ------------------------------------------
//   // 3. Generate 12-byte IV
//   // ------------------------------------------

//   const iv = new Uint8Array(12);

//   scrypt.getRandomValues(iv);

//   // ------------------------------------------
//   // 4. Encrypt payload using AES-GCM
//   // ------------------------------------------

//   const encryptedPayload = await scrypt.subtle.encrypt(
//     {
//       name: 'AES-GCM',
//       iv: iv,
//       tagLength: 128,
//     },
//     aesKey,
//     plaintext,
//   );

//   // ------------------------------------------
//   // 5. Convert PEM public key
//   // ------------------------------------------

//   const publicKeyData = pemToArrayBuffer(SERVER_PUBLIC_KEY);

//   // ------------------------------------------
//   // 6. Import RSA public key
//   // ------------------------------------------

//   const publicKey = await scrypt.subtle.importKey(
//     'spki',
//     publicKeyData,
//     {
//       name: 'RSA-OAEP',
//       hash: 'SHA-256',
//     },
//     false,
//     ['encrypt'],
//   );

//   // ------------------------------------------
//   // 7. Export AES key
//   // ------------------------------------------

//   const rawAesKey = await scrypt.subtle.exportKey('raw', aesKey);

//   // ------------------------------------------
//   // 8. RSA-OAEP encrypt AES key
//   // ------------------------------------------

//   const encryptedKey = await scrypt.subtle.encrypt(
//     {
//       name: 'RSA-OAEP',
//     },
//     publicKey,
//     rawAesKey,
//   );

//   // ------------------------------------------
//   // 9. Return encrypted payload
//   // ------------------------------------------

//   return {
//     encryptedKey: arrayBufferToBase64(encryptedKey),

//     iv: arrayBufferToBase64(iv.buffer),

//     ciphertext: arrayBufferToBase64(encryptedPayload),
//   };
// }
