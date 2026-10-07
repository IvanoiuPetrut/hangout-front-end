import { PrismaClient } from "@prisma/client";
import { saveFile, deleteFile } from "../storage/fileStorage.js";

const prisma = new PrismaClient();

export type UserDto = {
  id: string;
  username: string;
  photo: string;
};

type UserPersistence = {
  id: number;
  username: string;
  password: string;
};

type CreateUserPersistenceArgs = {
  username: string;
  password: string;
};

type GetUserByIdPersistenceArgs = {
  id: number;
};

async function createUserPersistence({ id, username }) {
  console.log(id);
  console.log(username);
  const user = await prisma.user.create({
    data: {
      id,
      username,
    },
  });
  return user;
}

async function getUserByIdPersistence({ id }: GetUserByIdPersistenceArgs) {
  // const user = await prisma.user.findUnique({
  //   where: {
  //     id,
  //   },
  // });
  // const userDto = mapUserPersistenceToUserDto(user);
  // return userDto;
}

async function getUserDetailsPersistence({ id }) {
  // Accounts are only created by /auth/register, never as a side effect here
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

async function updateUserDetailsPersistence({ id, username }) {
  console.log(id);
  console.log(username);
  prisma.message.updateMany({
    where: {
      senderId: id,
    },
    data: {
      senderName: username,
    },
  });

  // await prisma.message.updateMany({
  //   where: {
  //     senderId: userId,
  //   },
  //   data: {
  //     senderPhoto: fileName,
  //   },
  // });

  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      username,
    },
  });

  return user;
}

async function getUsersPersistence({ name, id }) {
  const users = await prisma.user.findMany({
    where: {
      username: {
        contains: name,
      },
      NOT: {
        id: id,
      },
    },
  });
  return users;
}

async function updateUserProfilePicturePersistence({ userId, file }) {
  const previous = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: { photo: true },
  });

  const fileName = await saveFile({
    buffer: file.buffer,
    originalName: file.originalname,
  });

  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      photo: fileName,
    },
  });

  await prisma.message.updateMany({
    where: {
      senderId: userId,
    },
    data: {
      senderPhoto: fileName,
    },
  });

  await deleteFile(previous?.photo);

  return user;
}

export {
  createUserPersistence,
  getUserByIdPersistence,
  getUserDetailsPersistence,
  updateUserDetailsPersistence,
  getUsersPersistence,
  updateUserProfilePicturePersistence,
};
