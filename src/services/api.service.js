import Axios from 'axios';
import { baseUrl } from './../constants/config';
import { makeLog } from './../helpers/logger';

Axios.defaults.baseURL = baseUrl;

// eslint-disable-next-line
export const get = (route = '/', query = '') =>
  Axios.get(`/api${route}`).catch(err => {
    makeLog('API SERVICE', err, true, true);
    throw err;
  });
export const post = (route = '/', options = {}, data = {}) =>
  Axios.post(`/api${route}`, data, options).catch(err => {
    makeLog('API SERVICE', err, true, true);
    throw err;
  });
