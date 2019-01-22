export const actions = {
  async updateUser({ dispatch }, params) {
    await this.$axios.put('api/v1/user', { ...params })
    await dispatch('refetchUser')

    this.$toast.success('updated successfully')
  },
  async registerUser(context, params) {
    await this.$axios.post('api/v1/user', { ...params })

    this.$toast.success('registration successful')
  },
  async loginUser(/*{ commit, dispatch }*/ context, params) {
    await this.$auth.loginWith('local', {
      data: params
    })
    this.$toast.success('logged in successfully')
  },
  async refetchUser() {
    await this.$auth.fetchUser()
  },
  async removeUser() {
    await this.$auth.logout()
  },
  async logoutUser() {
    await this.$auth.logout()
    this.$toast.success('logged out successfully')
  }
}

export const getters = {
  isAuthenticated(state) {
    return state.loggedIn
  },

  loggedInUser(state) {
    return state.user
  }
}
