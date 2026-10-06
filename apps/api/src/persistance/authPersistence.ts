import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createUserWithCredentialPersistence({
  id,
  username,
  passwordHash,
}) {
  const user = await prisma.user.create({
    data: {
      id,
      username,
      credential: {
        create: { passwordHash },
      },
    },
  });
  return user;
}

async function getUserCredentialByUsernamePersistence({ username }) {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      credential: {
        select: { passwordHash: true },
      },
    },
  });
  if (!user || !user.credential) {
    return null;
  }
  return { id: user.id, passwordHash: user.credential.passwordHash };
}

async function isUsernameTakenPersistence({ username }) {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    select: { id: true },
  });
  return user !== null;
}

export {
  createUserWithCredentialPersistence,
  getUserCredentialByUsernamePersistence,
  isUsernameTakenPersistence,
};
