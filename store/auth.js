import { getSessionItem, setSessionItem } from '../utils/session'

export const state = () => ({
  user: null
})

export const mutations = {
  setUser(state, user) {
    setSessionItem('user', user)
    state.user = user
  }
}

export const actions = {
  loadUser({ commit }) {
    const user = getSessionItem('user')
    commit('setUser', user)
  }
}

export const getters = {
  user(state) {
    return state.user
  }
}
