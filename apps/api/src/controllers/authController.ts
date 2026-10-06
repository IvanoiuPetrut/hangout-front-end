import { Request, Response } from "express";
import {
  validateRegisterUsername,
  validatePassword,
} from "../validation/auth.js";

import {
  AuthError,
  registerInteractor,
  loginInteractor,
} from "../interactors/authInteractor.js";

import {
  createUserWithCredentialPersistence,
  getUserCredentialByUsernamePersistence,
  isUsernameTakenPersistence,
} from "../persistance/authPersistence.js";

async function register(req: Request, res: Response): Promise<void> {
  const { username, password } = req.body;

  try {
    validateRegisterUsername(username);
    validatePassword(password);
  } catch (error) {
    res.status(400).json({ message: error.message });
    return;
  }

  try {
    const tokens = await registerInteractor(
      { createUserWithCredentialPersistence, isUsernameTakenPersistence },
      { username, password }
    );
    res.status(201).json(tokens);
  } catch (error) {
    if (error instanceof AuthError) {
      res.status(error.status).json({ message: error.message });
      return;
    }
    console.log(error);
    res.status(500).json({ message: "Could not create account" });
  }
}

async function login(req: Request, res: Response): Promise<void> {
  const { username, password } = req.body;

  if (typeof username !== "string" || typeof password !== "string") {
    res.status(400).json({ message: "Username and password are required" });
    return;
  }

  try {
    const tokens = await loginInteractor(
      { getUserCredentialByUsernamePersistence },
      { username, password }
    );
    res.json(tokens);
  } catch (error) {
    if (error instanceof AuthError) {
      res.status(error.status).json({ message: error.message });
      return;
    }
    console.log(error);
    res.status(500).json({ message: "Could not log in" });
  }
}

export { register, login };
