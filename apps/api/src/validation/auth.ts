import validator from "validator";

function validateRegisterUsername(username: unknown): void {
  if (typeof username !== "string" || !validator.isAlphanumeric(username)) {
    throw new Error("Username must be alphanumeric");
  }
  if (username.length < 3 || username.length > 20) {
    throw new Error("Username must be between 3 and 20 characters");
  }
}

function validatePassword(password: unknown): void {
  if (typeof password !== "string") {
    throw new Error("Password is required");
  }
  if (password.length < 8 || password.length > 128) {
    throw new Error("Password must be between 8 and 128 characters");
  }
}

export { validateRegisterUsername, validatePassword };
