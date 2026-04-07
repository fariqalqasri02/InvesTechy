const DEFAULT_BASE_URL = "https://unvicarious-camelia-porky.ngrok-free.dev/api";
const API_BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/+$/, "") || DEFAULT_BASE_URL;

const TOKEN_KEY = "investechy_token";
const USER_KEY = "investechy_user";

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setSession = ({ token, user }) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

export const clearSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const getStoredUser = () => {
  try {
    const rawUser = localStorage.getItem(USER_KEY);
    return rawUser ? JSON.parse(rawUser) : null;
  } catch {
    return null;
  }
};

const buildHeaders = (headers = {}) => {
  const finalHeaders = {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
    ...headers,
  };

  const token = getToken();
  if (token) {
    finalHeaders.Authorization = `Bearer ${token}`;
  }

  return finalHeaders;
};

const request = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: buildHeaders(options.headers),
  });

  const contentType = response.headers.get("content-type") || "";
  const body = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const error = new Error(
      body?.message || body?.error || "Request failed.",
    );
    error.status = response.status;
    error.data = body;
    throw error;
  }

  return body;
};

const api = {
  get: (endpoint, options = {}) =>
    request(endpoint, {
      ...options,
      method: "GET",
    }),

  post: (endpoint, body, options = {}) =>
    request(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: (endpoint, body, options = {}) =>
    request(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    }),

  delete: (endpoint, options = {}) =>
    request(endpoint, {
      ...options,
      method: "DELETE",
    }),
};

export default api;
