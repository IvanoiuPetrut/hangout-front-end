import validator from "validator";

function validateUuid(uuid: string): void {
  if (validator.isUUID(uuid) === false) {
    throw new Error("UUID is not valid");
  }
}

function validateRoomName(roomName: string): void {
  if (roomName.length < 3) {
    throw new Error("Room name is too short");
  }
  if (roomName.length > 20) {
    throw new Error("Room name is too long");
  }
  if (validator.isAlphanumeric(roomName) === false) {
    throw new Error("Room name is not alphanumeric");
  }
}

function validateRoomDescription(description: unknown): void {
  if (typeof description !== "string") {
    throw new Error("Room description is required");
  }
  if (description.length > 500) {
    throw new Error("Room description is too long");
  }
}

export { validateUuid, validateRoomName, validateRoomDescription };
