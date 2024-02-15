import axios from "axios";
import { getCookie } from "@/helpers/cookie";

const backendInstanceForAuth = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/auth`
});

const backendInstanceForInteractor = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
  headers: {
    "Content-Type": "application/json",
    "access-token": getCookie("access_token") || ""
  }
});

export { backendInstanceForAuth, backendInstanceForInteractor };
