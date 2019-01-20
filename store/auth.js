export const actions = {
  async registerUser(context, params) {
    await this.$axios.post('api/v1/auth/register', { ...params })

    this.$toast.success('registration successfull')
  },
  async loginUser(/*{ commit, dispatch }*/ context, params) {
    await this.$auth.loginWith('local', {
      data: params
    })
    this.$toast.success('logged in successfully')
  },
  async refetchUser() {
    await this.$auth.fetchUser
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
