import { post } from './../api.service';

const authUrl = '/auth';

export const login = credentials => post(`${authUrl}/login`, credentials);
export const logout = () => post(`${authUrl}/logout`);
