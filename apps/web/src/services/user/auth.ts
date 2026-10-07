import { backendInstanceForAuth } from "@/services/backendClient";

async function login(username: string, password: string): Promise<string> {
  const response = await backendInstanceForAuth.post("/login", { username, password });
  return response.data.accessToken;
}

async function register(username: string, password: string): Promise<string> {
  const response = await backendInstanceForAuth.post("/register", { username, password });
  return response.data.accessToken;
}

export { login, register };
