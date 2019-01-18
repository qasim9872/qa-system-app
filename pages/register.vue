<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign Up</h1>
          <p class="text-xs-center">
            <nuxt-link 
              class="" 
              to="/login">Have an account?</nuxt-link>
          </p>
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input 
                  v-model="username" 
                  type="text" 
                  class="form-control form-control-lg" 
                  placeholder="Username">
              </fieldset>
              <fieldset class="form-group">
                <input 
                  v-model="email" 
                  type="email" 
                  class="form-control form-control-lg" 
                  placeholder="Email">
              </fieldset>
              <fieldset class="form-group">
                <input 
                  v-model="password" 
                  type="password" 
                  class="form-control form-control-lg" 
                  placeholder="Password">
              </fieldset>
              <button 
                class="btn btn-lg btn-primary pull-xs-right" 
                type="submit" 
                @click.stop.prevent="handleSignup">Sign up</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    handleSignup() {
      this.$axios
        .post('/auth/register', {
          user: {
            username: this.username,
            email: this.email,
            password: this.password
          }
        })
        .then(res => {
          this.$store.commit('auth/setUser', res.data.user)
          this.$router.push('/')
        })
    }
  }
}
</script>
