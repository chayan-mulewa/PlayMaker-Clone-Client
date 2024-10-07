// src/utils/Token.js
import { jwtDecode } from "jwt-decode";

export const isAccessTokenPresent = () => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("accessToken="));

  return !!token;
};

export const getAccessToken = () => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("accessToken="));
  return token ? token.split("=")[1] : null;
};

export const setAccessToken = (accessToken) => {
  document.cookie = `accessToken=${accessToken}; path=/;`;
};

export const deleteAccessToken = () => {
  document.cookie = "accessToken=; Max-Age=0; path=/;";
};

export const isRolePresent = () => {
  const token = getAccessToken();
  if (!token) return false;
  try {
    const decodedToken = jwtDecode(token);
    return !!decodedToken.role;
  } catch (error) {
    return false;
  }
};

export const getRole = () => {
  const token = getAccessToken();
  if (!token) return null;
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.role || null;
  } catch (error) {
    return null;
  }
};
