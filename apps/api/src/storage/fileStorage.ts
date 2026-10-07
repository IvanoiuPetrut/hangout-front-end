import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const UPLOADS_DIR = path.resolve(process.env.UPLOADS_DIR || "uploads");
const UPLOADS_URL_PREFIX = "/uploads/";
// Once the uploads folder reaches this size, new uploads are rejected
const UPLOADS_MAX_BYTES =
  Number(process.env.UPLOADS_MAX_BYTES) || 3 * 1024 * 1024 * 1024;

class UploadQuotaError extends Error {
  constructor() {
    super("Upload storage is full, uploads are disabled for now");
  }
}

function getDirectorySize(dir: string): number {
  let total = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      total += getDirectorySize(entryPath);
    } else if (entry.isFile()) {
      total += fs.statSync(entryPath).size;
    }
  }
  return total;
}

fs.mkdirSync(UPLOADS_DIR, { recursive: true });
// Measured once at startup, then kept up to date as files are saved/deleted
let usedBytes = getDirectorySize(UPLOADS_DIR);

function sanitizeFileName(name: string): string {
  const cleaned = path
    .basename(name)
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .slice(-100);
  return cleaned || "file";
}

async function saveFile({
  buffer,
  originalName,
}: {
  buffer: Buffer;
  originalName: string;
}): Promise<string> {
  if (usedBytes + buffer.length > UPLOADS_MAX_BYTES) {
    throw new UploadQuotaError();
  }
  // Reserve the space before the async write so concurrent uploads can't overshoot
  usedBytes += buffer.length;

  const fileName = `${uuidv4()}-${sanitizeFileName(originalName)}`;
  try {
    await fs.promises.writeFile(path.join(UPLOADS_DIR, fileName), buffer);
  } catch (error) {
    usedBytes -= buffer.length;
    throw error;
  }

  return UPLOADS_URL_PREFIX + fileName;
}

async function deleteFile(url: string | null | undefined): Promise<void> {
  if (!url || !url.startsWith(UPLOADS_URL_PREFIX)) {
    return;
  }
  const filePath = path.join(
    UPLOADS_DIR,
    path.basename(url.slice(UPLOADS_URL_PREFIX.length))
  );
  try {
    const { size } = await fs.promises.stat(filePath);
    await fs.promises.unlink(filePath);
    usedBytes -= size;
  } catch (error) {
    console.log("Could not delete file", filePath, error.message);
  }
}

export { UPLOADS_DIR, UploadQuotaError, saveFile, deleteFile };
