export default {
  namespaced: true,
  
  state: {
    email: ''
  },

  getters: {
    getEmail: state => state.email
  },
  mutations:{
    SET_EMAIL(state, val){
      state.email = val
    }
  },
  actions: {
    setEmail({commit}, val){
      commit('SET_EMAIL', val)
    }
  }
}