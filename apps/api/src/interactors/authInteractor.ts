import { v4 as uuidv4 } from "uuid";
import { hashPassword, verifyPassword } from "../helpers/password.js";
import { signAccessToken } from "../middleware/verifyUser.js";

class AuthError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

async function registerInteractor(
  { createUserWithCredentialPersistence, isUsernameTakenPersistence },
  { username, password }
): Promise<{ accessToken: string }> {
  if (await isUsernameTakenPersistence({ username })) {
    throw new AuthError("Username is already taken", 409);
  }

  const id = uuidv4();
  const passwordHash = await hashPassword(password);
  try {
    await createUserWithCredentialPersistence({ id, username, passwordHash });
  } catch (error) {
    // Unique constraint hit by a concurrent registration with the same name
    if (error?.code === "P2002") {
      throw new AuthError("Username is already taken", 409);
    }
    throw error;
  }

  return { accessToken: signAccessToken(id) };
}

async function loginInteractor(
  { getUserCredentialByUsernamePersistence },
  { username, password }
): Promise<{ accessToken: string }> {
  const credential = await getUserCredentialByUsernamePersistence({
    username,
  });

  if (
    !credential ||
    !(await verifyPassword(password, credential.passwordHash))
  ) {
    throw new AuthError("Invalid username or password", 401);
  }

  return { accessToken: signAccessToken(credential.id) };
}

export { AuthError, registerInteractor, loginInteractor };
