const user = {
  state: {
    toRoute: ''
  },
  mutations: {
    SET_TO_ROUTE: (state, toRoute) => {
      state.toRoute = toRoute
    }
  },

  actions: {
    UpdateRouteToUrl({ commit }, data) {
      commit('SET_TO_ROUTE', data)
    }
  },
  getters: {
    toRoute: state => state.toRoute
  }
}

export default user
