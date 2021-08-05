import { login, logout, verify } from './../../services/apis/auth.service';
import {
  getToken,
  setToken,
  revokeToken,
  checkToken,
} from './../../services/token.service';
import {
  GET_TOKEN,
  SET_TOKEN,
  SET_USER,
  PURGE_TOKEN,
  SET_TOKEN_ABILITIES,
  PURGE_TOKEN_ABILITIES,
  PURGE_USER,
  SET_VERIFIED,
  GET_VERIFIED,
  LOGIN,
  LOGOUT,
  VERIFY_TOKEN,
} from '../store.type';

const state = {
  token: getToken(),
  tokenAbilities: [],
  user: {},
  verified: false,
};

const getters = {
  [GET_TOKEN]: ({ token }) => token,
  [GET_VERIFIED]: ({ verified }) => verified,
};

const mutations = {
  [SET_TOKEN](state, token) {
    state.token = token;
  },
  [SET_TOKEN_ABILITIES](state, tokenAbilities) {
    state.tokenAbilities = tokenAbilities;
  },
  [SET_USER](state, user) {
    state.user = user;
  },
  [SET_VERIFIED](state, verified) {
    state.verified = verified;
  },
  [PURGE_TOKEN](state) {
    state.token = null;
  },
  [PURGE_TOKEN_ABILITIES](state) {
    state.tokenAbilities = [];
  },
  [PURGE_USER](state) {
    state.user = {};
  },
};

const actions = {
  [LOGIN]({ commit }, credentials) {
    return new Promise((resolve, reject) => {
      login(credentials)
        .then(({ data }) => {
          const tokenSplitted = data.data.token.plainTextToken.split('|')[1];
          commit(SET_TOKEN, tokenSplitted);
          commit(SET_TOKEN_ABILITIES, data.data.token.accessToken.abilities);
          commit(SET_USER, data.data.user);
          commit(SET_VERIFIED, true);
          setToken(tokenSplitted);
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
          commit(PURGE_TOKEN_ABILITIES);
          commit(PURGE_USER);
          commit(SET_VERIFIED, false);
          revokeToken();
          resolve();
        })
        .catch(reject);
    });
  },
  [VERIFY_TOKEN]({ commit }) {
    return new Promise((resolve, reject) => {
      if (checkToken()) {
        verify()
          .then(({ data }) => {
            commit(SET_TOKEN, data.data.token);
            commit(SET_TOKEN_ABILITIES, data.data.tokenAbilities);
            commit(SET_USER, data.data.user);
            commit(SET_VERIFIED, true);
            resolve();
          })
          .catch(err => {
            commit(PURGE_TOKEN);
            commit(PURGE_TOKEN_ABILITIES);
            commit(PURGE_USER);
            commit(SET_VERIFIED, false);
            revokeToken();
            reject(err);
          });
      } else {
        reject('Unauthenticated');
      }
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
