const ALGORITHM = "AES-GCM";
const IV_LENGTH = 12; // recommended for AES-GCM
const KEY_LENGTH = 16; // AES-128

function strToBuffer(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

function bufferToStr(buffer: ArrayBuffer): string {
  return new TextDecoder().decode(buffer);
}

// 브라우저 & Edge용 base64 encode/decode
function base64(buffer: ArrayBuffer | Uint8Array): string {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function fromBase64(str: string): Uint8Array {
  const binary = atob(str);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}


function getRawKey(): string {
  if (typeof process !== "undefined" && process.env && process.env.VITE_AES_KEY) {
    return process.env.VITE_AES_KEY;
  }
  return "edge-secret-key"; 
}

async function getKey(keyStr: string) {
  const keyBytes = strToBuffer(keyStr.padEnd(KEY_LENGTH, "0").slice(0, KEY_LENGTH));
  return crypto.subtle.importKey("raw", keyBytes, ALGORITHM, false, ["encrypt", "decrypt"]);
}

export async function encrypt(text: string): Promise<string> {
  const keyStr = getRawKey();
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const key = await getKey(keyStr);
  const encrypted = await crypto.subtle.encrypt(
    { name: ALGORITHM, iv },
    key,
    strToBuffer(text)
  );
  return `enc:${base64(iv)}:${base64(encrypted)}`;
}

export async function decrypt(payload: string): Promise<string> {
  const keyStr = getRawKey();
  if (!payload.startsWith("enc:")) throw new Error("Invalid format");
  const [, ivStr, dataStr] = payload.split(":");
  const iv = fromBase64(ivStr);
  const data = fromBase64(dataStr);
  const key = await getKey(keyStr);
  const decrypted = await crypto.subtle.decrypt({ name: ALGORITHM, iv }, key, data);
  return bufferToStr(decrypted);
}
