import user from './modules/user';
import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex)
const modules = {
  user
}
const store = new Vuex.Store({})
for (const key in modules) {
  if (modules.hasOwnProperty(key)) {
    store.registerModule(key, modules[key])
  }
}

export default store;
