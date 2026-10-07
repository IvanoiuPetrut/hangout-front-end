import path from "path";
import validator from "validator";

function validateUsername(username: string): void {
  if (validator.isAlphanumeric(username) === false) {
    throw new Error("Username must be alphanumeric");
  }
}

function validateUserId(id: string): void {
  if (validator.isUUID(id) === false) {
    throw new Error("User id must be an UUID");
  }
}

function validateUser(id: string, username: string): void {
  validateUserId(id);
  validateUsername(username);
}

function validateUserCode(code: string): void {
  if (validator.isUUID(code) === false) {
    throw new Error("Code must be a UUID");
  }
}

// Same formats the settings page offers; the extension decides the
// Content-Type the file is later served with
const PROFILE_PICTURE_EXTENSIONS = [
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".bmp",
];

function validateProfilePicture(file: {
  originalname: string;
  mimetype: string;
}): void {
  const extension = path.extname(file.originalname).toLowerCase();
  if (
    !PROFILE_PICTURE_EXTENSIONS.includes(extension) ||
    !file.mimetype.startsWith("image/")
  ) {
    throw new Error("Profile picture must be a PNG, JPG, GIF, WEBP or BMP image");
  }
}

export {
  validateUser,
  validateUserId,
  validateUserCode,
  validateUsername,
  validateProfilePicture,
};
