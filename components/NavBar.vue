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

            <template v-if="$store.getters['auth/user']">
              <li class="nav-item">
                <nuxt-link 
                  to="/settings" 
                  class="nav-link"><i class="ion-gear-a"/>&nbsp;Settings</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link 
                  :to="'/profile/' + $store.getters['auth/user'].username" 
                  class="nav-link">
                  <img 
                    :src="$store.getters['auth/user'].image || 'https://static.productionready.io/images/smiley-cyrus.jpg'" 
                    class="user-pic">
                  {{ $store.getters['auth/user'].username }}
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
