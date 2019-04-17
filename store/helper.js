export const actions = {
  async getUserWithUsername(context, username) {
    try {
      const res = await this.$axios.get(`api/v1/users/${username}`)
      const userData = res.data
      return userData
    } catch (err) {
      return null
    }
  },
  async getStats() {
    try {
      const res = await this.$axios.get(`api/v1/stats/overall`)
      const stats = res.data
      return stats
    } catch (err) {
      return null
    }
  }
}
