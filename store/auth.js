export const state = () => ({
  user: null
})

export const mutations = {
  setUser(state, user) {
    localStorage.setItem('user', JSON.stringify(user))
    state.user = user
  }
}

export const actions = {
  loadUser({ commit }) {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      commit('setUser', user)
    } catch (ex) {
      localStorage.setItem('user', null)
    }
  }
}

export const getters = {
  user(state) {
    return state.user
  }
}
