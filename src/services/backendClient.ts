import axios from "axios";

const backendInstanceForAuth = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/auth`
});

export { backendInstanceForAuth };
