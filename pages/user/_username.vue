<template>
  <profile
    v-if="user"
    :user="user"
    :personal="personal"
  />

</template>


<script>
import Profile from '../../components/Profile'

export default {
  components: {
    Profile
  },
  async asyncData({ store, route, error }) {
    const username = route.params.username

    if (store.getters['auth/isAuthenticated']) {
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
  }
}
</script>
