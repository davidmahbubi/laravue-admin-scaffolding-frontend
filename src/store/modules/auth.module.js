import { getToken } from './../../services/token.service';
import { GET_TOKEN } from './../store.types';

const state = {
  token: getToken()
};

const getters = {
  [GET_TOKEN]: ({ token }) => token
};

const mutations = {};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
