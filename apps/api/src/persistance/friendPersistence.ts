import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createFriendRequestPersistence({ senderId, receiverId }) {
  if (senderId === receiverId) {
    throw new Error("You can't send a friend request to yourself");
  }
  const receiver = await prisma.user.findUnique({
    where: { id: receiverId },
    select: { id: true },
  });
  if (!receiver) {
    throw new Error("User not found");
  }
  const friendRequest = await prisma.friendRequests.create({
    data: {
      from: senderId,
      to: receiverId,
    },
  });
  return friendRequest;
}

async function getFriendRequestPersistence({ userId }) {
  const friendRequest = await prisma.friendRequests.findMany({
    where: {
      from: userId,
    },
  });
  return friendRequest;
}

async function getPendingFriendRequestPersistence({ userId }) {
  const friendRequest = await prisma.friendRequests.findMany({
    where: {
      to: userId,
      status: "pending",
    },
  });
  return friendRequest;
}

async function acceptFriendRequestPersistence({ senderId, receiverId }) {
  // Only a pending request sent to this user can be accepted
  const { count } = await prisma.friendRequests.updateMany({
    where: {
      from: senderId,
      to: receiverId,
      status: "pending",
    },
    data: {
      status: "accepted",
    },
  });
  if (count === 0) {
    throw new Error("Friend request not found");
  }
  const receiverFriendRelation = await prisma.friends.create({
    data: {
      User: {
        connect: {
          id: receiverId,
        },
      },
      friendId: senderId,
    },
  });

  await prisma.friends.create({
    data: {
      User: {
        connect: {
          id: senderId,
        },
      },
      friendId: receiverId,
    },
  });
  return receiverFriendRelation;
}

async function declineFriendRequestPersistence({ senderId, receiverId }) {
  await prisma.friendRequests.updateMany({
    where: {
      from: senderId,
      to: receiverId,
    },
    data: {
      status: "declined",
    },
  });
}

async function getFriendsPersistence({ userId }) {
  const friendsIds = await prisma.friends.findMany({
    where: {
      userId,
    },
    include: {
      User: false,
    },
  });
  const friends = [];
  for (const friendId of friendsIds) {
    const friend = await prisma.user.findUnique({
      where: {
        id: friendId.friendId,
      },
    });
    friends.push(friend);
  }
  return friends;
}

async function deleteFriendPersistence(userId, friendId) {
  await prisma.friends.deleteMany({
    where: {
      userId,
      friendId,
    },
  });
  await prisma.friends.deleteMany({
    where: {
      userId: friendId,
      friendId: userId,
    },
  });

  await prisma.friendRequests.deleteMany({
    where: {
      from: userId,
      to: friendId,
    },
  });

  await prisma.friendRequests.deleteMany({
    where: {
      from: friendId,
      to: userId,
    },
  });
}

async function areFriendsPersistence({
  userId,
  friendId,
}: {
  userId: string;
  friendId: string;
}): Promise<boolean> {
  // An undefined value would drop the filter in Prisma, so only accept strings
  if (typeof userId !== "string" || typeof friendId !== "string") {
    return false;
  }
  const friend = await prisma.friends.findFirst({
    where: {
      userId,
      friendId,
    },
    select: { id: true },
  });
  return friend !== null;
}

export {
  areFriendsPersistence,
  createFriendRequestPersistence,
  getFriendRequestPersistence,
  getPendingFriendRequestPersistence,
  acceptFriendRequestPersistence,
  declineFriendRequestPersistence,
  getFriendsPersistence,
  deleteFriendPersistence,
};
