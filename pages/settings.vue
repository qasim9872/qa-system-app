<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <v-form 
            ref="form" 
            v-model="valid">

            <v-text-field
              v-model="image"
              label="URL of profile picture"
            />

            <v-text-field
              v-model="username"
              readonly
              label="Username"
            />

            <v-textarea
              v-model="bio"
              label="Bio"
              placeholder="A few lines about yourself"
              flat  
              box
              no-resize
              clearable
            />

            <v-text-field
              v-model="email"
              readonly
              label="E-mail"
            />

            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Password"                        
              type="password"
              required
            />

            <v-btn 
              :class="{ red: !valid, green: valid }"
              :disabled="!valid"
              class="pull-xs-right" 
              @click="handleUpdateSettings">Update</v-btn>
          </v-form>

          <v-btn 
            flat
            class="btn btn-outline-danger" 
            @click="handleLogout">Or click here to logout.</v-btn>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'authRequired',
  data() {
    return {
      valid: false,

      image: '',

      username: '',

      bio: '',

      email: '',
      password: '',
      passwordRules: [
        v =>
          v ? v.length >= 8 || 'Password must be at least 8 characters' : true
      ]
    }
  },
  mounted() {
    this.getSettings()
  },
  methods: {
    getSettings() {
      const user = this.$store.getters['auth/user']
      this.image = user.image
      this.username = user.username
      this.bio = user.bio
      this.email = user.email
      this.password = ''
    },
    handleUpdateSettings() {
      const data = {
        user: {
          image: this.image,
          username: this.username,
          bio: this.bio,
          email: this.email
        }
      }
      if (this.password) {
        data.user.password = this.password
      }
      this.$axios.put(`/user`, data).then(res => {
        this.$store.commit('setUser', res.data.user)
        this.$router.push(`/profile/${res.data.user.username}`)
      })
    },
    handleLogout() {
      this.$store.dispatch('auth/logoutUser')
      this.$router.push('/')
      this.$toast.success('logged out successfully')
    }
  }
}
</script>
