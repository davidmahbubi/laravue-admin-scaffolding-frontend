import Vue from 'vue';
import Vuex from 'vuex';
// import 'es6-promise/auto';
import layout from './modules/layout.module';
import menu from './modules/menu.module';
import auth from './modules/auth.module';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    layout,
    menu,
    auth
  }
});
