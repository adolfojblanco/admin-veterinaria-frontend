import axios from "axios";

export const clienteAxios = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
});

const token = localStorage.getItem("token") || null;

export const clienteAxiosToken = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
