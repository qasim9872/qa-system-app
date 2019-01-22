<template>
  <profile
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
  async asyncData({ store, route }) {
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
  }
}
</script>
