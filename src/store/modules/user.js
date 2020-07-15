const user = {
  state: {
    userInfo: {
      userIdentity: 0
    }
  },
  mutations: {
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },

  actions: {
  },
  getters: {
    userInfo: state => state.userInfo
  }
}

export default user
