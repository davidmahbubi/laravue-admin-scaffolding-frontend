import { post } from './../api.service';
import { store } from './../../store';
import { GET_TOKEN } from '../../store/store.type';

const authUrl = '/auth';

export const login = credentials => post(`${authUrl}/login`, {}, credentials);
export const verify = () => {
  return post(`${authUrl}/verify`, {
    headers: {
      Authorization: `Bearer ${store.getters[`auth/${GET_TOKEN}`]}`,
    },
  });
};
export const logout = () =>
  post(`${authUrl}/logout`, {
    headers: {
      Authorization: `Bearer ${store.getters[`auth/${GET_TOKEN}`]}`,
    },
  });
