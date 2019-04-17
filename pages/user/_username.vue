<template>
  <profile
    v-if="user"
    :user="user"
    :personal="personal"
    @like="handleLike"
    @dislike="handleDislike"
  />

</template>

<script>
import Profile from '../../components/Profile'

export default {
  transition: 'tweakOpacity',
  components: {
    Profile
  },
  async asyncData({ store, route, error }) {
    const username = route.params.username

    if (store.getters['auth/isAuthenticated']) {
      await store.dispatch('auth/refetchUser')
      const authenticatedUser = store.getters['auth/loggedInUser']
      if (authenticatedUser.username === username) {
        return {
          user: authenticatedUser,
          personal: true
        }
      }
    }

    // fetch user details
    const user = await store.dispatch(`helper/getUserWithUsername`, username)

    if (user) {
      return {
        user: user,
        personal: false
      }
    } else {
      // user not found
      return error({ message: `No user with username: ${username}` })
    }
  },
  methods: {
    async refetch() {
      if (this.personal) {
        // refetch the user with the updated likes and dislikes
        await this.$store.dispatch('auth/refetchUser')
        this.user = this.$store.getters['auth/loggedInUser']
      } else {
        this.user = await this.$store.dispatch(
          `helper/getUserWithUsername`,
          this.user.username
        )
      }
    },
    async handleLike(id) {
      await this.$store.dispatch('qsHandler/likeQuestion', id)
      await this.refetch()
    },
    async handleDislike(id) {
      await this.$store.dispatch('qsHandler/dislikeQuestion', id)
      await this.refetch()
    }
  }
}
</script>
