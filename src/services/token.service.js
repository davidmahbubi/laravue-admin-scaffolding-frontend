import { TOKEN_DEFAULT_KEY } from '../constants/token';

export const getToken = (key = TOKEN_DEFAULT_KEY) => {
  return window.localStorage.getItem(key);
};

export const setToken = (token, key = TOKEN_DEFAULT_KEY) => {
  window.localStorage.setItem(token);
};

export const revokeToken = (key = TOKEN_DEFAULT_KEY) => {
  window.localStorage.removeItem(key);
};

export const checkToken = (key = TOKEN_DEFAULT_KEY) => {
  return !!window.localStorage.getItem(key);
};
