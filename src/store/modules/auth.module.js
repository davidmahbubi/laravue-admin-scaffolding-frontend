import { login, logout } from './../../services/apis/auth.service';
import {
  getToken,
  setToken,
  revokeToken
} from './../../services/token.service';
import {
  GET_TOKEN,
  SET_TOKEN,
  SET_TOKEN_DETAIL,
  SET_USER,
  PURGE_TOKEN,
  PURGE_TOKEN_DETAIL,
  PURGE_USER,
  LOGIN,
  LOGOUT
} from '../store.type';

const state = {
  token: getToken(),
  tokenDetail: {},
  user: {}
};

const getters = {
  [GET_TOKEN]: ({ token }) => token
};

const mutations = {
  [SET_TOKEN](state, token) {
    state.token = token;
  },
  [SET_TOKEN_DETAIL](state, tokenDetail) {
    state.tokenDetail = tokenDetail;
  },
  [SET_USER](state, user) {
    state.user = user;
  },
  [PURGE_TOKEN](state) {
    state.token = null;
  },
  [PURGE_TOKEN_DETAIL](state) {
    state.tokenDetail = {};
  },
  [PURGE_USER](state) {
    state.user = {};
  }
};

const actions = {
  [LOGIN]({ commit }, credentials) {
    return new Promise((resolve, reject) => {
      login(credentials)
        .then(({ data }) => {
          commit(SET_TOKEN, data.data.token.plainTextToken);
          commit(SET_TOKEN_DETAIL, data.data.token.accessToken);
          commit(SET_TOKEN_DETAIL, data.data.user);
          setToken(data.data.token.plainTextToken);
          resolve();
        })
        .catch(reject);
    });
  },
  [LOGOUT]({ commit }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          commit(PURGE_TOKEN);
          commit(PURGE_TOKEN_DETAIL);
          commit(PURGE_USER);
          revokeToken();
          resolve();
        })
        .catch(reject);
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
