import { getSessionItem, setSessionItem } from '../utils/session'

export const state = () => ({
  user: null,
  token: null
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  setToken(state, token) {
    setSessionItem('token', token)
    state.token = token
  }
}

export const actions = {
  async loadUser({ commit, dispatch }) {
    const token = getSessionItem('token')
    if (token) {
      commit('setToken', token)
      await dispatch('getUser')
    }
  },
  async registerUser(context, params) {
    await this.$axios.post('/auth/register', { ...params })
  },
  async loginUser({ commit, dispatch }, params) {
    const res = await this.$axios.post('/auth/login', { ...params })
    const token = res.data.token
    commit('setToken', token)
    await dispatch('getUser')
  },
  async getUser({ commit }) {
    const res = await this.$axios.post('/auth/user')
    const user = res.data
    commit('setUser', user)
  }
}

export const getters = {
  user(state) {
    return state.user
  },
  token(state) {
    return state.token
  }
}
