import validator from "validator";

const MAX_MESSAGE_LENGTH = 10000;

function validateMessageContent(content: string): void {
  if (validator.isAscii(content) === false) {
    throw new Error("Message content must be ASCII");
  }
}

function validateMessage(content: unknown): content is string {
  return (
    typeof content === "string" &&
    content.trim().length > 0 &&
    content.length <= MAX_MESSAGE_LENGTH
  );
}

export { validateMessageContent, validateMessage };
