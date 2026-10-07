import axios from "axios";
import { getCookie } from "@/helpers/cookie";

// The API is served under /api: proxied by Vite in dev and by nginx in production
const API_BASE_URL = "/api";

const backendInstanceForAuth = axios.create({
  baseURL: `${API_BASE_URL}/auth`
});

const backendInstanceForInteractor = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "access-token": getCookie("access_token") || ""
  }
});

const backendInstanceForInteractorWithImages = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    "access-token": getCookie("access_token") || ""
  }
});

export {
  backendInstanceForAuth,
  backendInstanceForInteractor,
  backendInstanceForInteractorWithImages
};
