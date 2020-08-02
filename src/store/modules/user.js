const user = {
  state: {
    userAccount: ''
  },
  mutations: {
    SET_USER_ACCOUNT: (state, userAccount) => {
      state.userAccount = userAccount
    }
  },

  actions: {
    UpdateUserAccount({ commit }, userAccount) {
      commit('SET_USER_ACCOUNT', userAccount)
    }
  },
  getters: {
    userAccount: state => state.userAccount
  }
}

export default user
