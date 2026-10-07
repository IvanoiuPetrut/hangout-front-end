import { Request, Response } from "express";
import {
  validateUserId,
  validateUserCode,
  validateUsername,
} from "../validation/user.js";

import {
  getUserByIdInteractor,
  getUserDetailsInteractor,
  updateUserDetailsInteractor,
  getUsersInteractor,
  updateUserProfilePictureInteractor,
} from "../interactors/userInteractor.js";

import {
  UserDto,
  getUserByIdPersistence,
  getUserDetailsPersistence,
  updateUserDetailsPersistence,
  getUsersPersistence,
  updateUserProfilePicturePersistence,
} from "../persistance/userPersistence.js";

import { getUserId } from "../middleware/verifyUser.js";
import { validateRegisterUsername } from "../validation/auth.js";
import { UploadQuotaError } from "../storage/fileStorage.js";

async function getUserById(req: Request, res: Response): Promise<void> {
  console.log("getUserById");
  const id = Number(req.params.id);

  try {
    // validateUserId(id);

    const user: UserDto = await getUserByIdInteractor(
      { getUserByIdPersistence },
      { id }
    );

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getUserDetails(req: Request, res: Response): Promise<void> {
  const accessToken = req.headers["access-token"];
  const id = req.params.id || (await getUserId(accessToken));

  try {
    validateUserId(id);

    const user = await getUserDetailsInteractor(
      { getUserDetailsPersistence },
      { id }
    );
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function updateUserDetails(req: Request, res: Response): Promise<void> {
  const accessToken = req.headers["access-token"];
  const { username } = req.body;
  const id = await getUserId(accessToken);

  try {
    // Same rules as at registration
    validateRegisterUsername(username);

    const user = await updateUserDetailsInteractor(
      { updateUserDetailsPersistence },
      { id, username }
    );
    res.json(user);
  } catch (error) {
    if (error?.code === "P2002") {
      res.status(409).json({ message: "Username is already taken" });
      return;
    }
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
}

async function getUsers(req: Request, res: Response): Promise<void> {
  const { name } = req.query;
  const accessToken = req.headers["access-token"];
  const id = await getUserId(accessToken);

  try {
    validateUsername(name as string);

    const users = await getUsersInteractor(
      { getUsersPersistence },
      { name, id }
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function createProfilePicture(req: Request, res: Response): Promise<any> {
  const accessToken = req.headers["access-token"];
  const userId = await getUserId(accessToken);
  console.log("profile pic", userId);

  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const file = req.file;

  try {
    const user = await updateUserProfilePictureInteractor(
      { updateUserProfilePicturePersistence },
      { userId, file }
    );
    res.json(user);
  } catch (error) {
    if (error instanceof UploadQuotaError) {
      return res.status(507).json({ error: error.message });
    }
    res.status(400).json({ error: error.message });
  }
}

export {
  getUserById,
  getUserDetails,
  updateUserDetails,
  getUsers,
  createProfilePicture,
};
