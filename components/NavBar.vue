<template>
  <v-flex >
    <v-card 
      dark 
      color="primary">
      <nav class="navbar navbar-dark">
        <div class="container">
          <nuxt-link 
            to="/" 
            class="navbar-brand">QA-system</nuxt-link>

          <ul class="nav navbar-nav pull-xs-right">
            <li class="nav-item">
              <nuxt-link 
                to="/" 
                class="nav-link">Home</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link 
                to="/results" 
                class="nav-link"><i class="ion-search"/>&nbsp;History</nuxt-link>
            </li>

            <template v-if="isAuthenticated">
              <li class="nav-item">
                <nuxt-link 
                  to="/settings" 
                  class="nav-link"><i class="ion-gear-a"/>&nbsp;Settings</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link 
                  :to="'/user'" 
                  class="nav-link">
                  <img 
                    :src="user.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'" 
                    class="user-pic">
                  {{ user.username }}
                </nuxt-link>
              </li>
            </template>

            <template v-else>
              <li class="nav-item">
                <nuxt-link 
                  to="/login" 
                  class="nav-link">Sign in</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link 
                  to="/register" 
                  class="nav-link">Sign up</nuxt-link>
              </li>
            </template>
          </ul>
        </div>
      </nav>
    </v-card >

  </v-flex >

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      user: 'auth/loggedInUser',
      isAuthenticated: 'auth/isAuthenticated'
    })
  }
}
</script>
