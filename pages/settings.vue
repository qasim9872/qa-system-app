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
              v-model="name"
              readonly
              label="Name"
            />

            <v-text-field
              v-model="image"
              label="URL of profile picture"
              clearable
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
              :loading="updating"
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
  middleware: 'auth',
  transition: 'tweakOpacity',
  data() {
    return {
      valid: false,
      updating: false,

      name: '',
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
      const user = this.$store.getters['auth/loggedInUser']
      this.name = user.name
      this.image = user.image
      this.username = user.username
      this.bio = user.bio
      this.email = user.email
      this.password = ''
    },
    async handleUpdateSettings() {
      this.updating = true
      const data = {
        image: this.image || '',
        bio: this.bio || '',
        password: this.password
      }

      await this.$store.dispatch('auth/updateUser', data)

      this.updating = false
    },
    async handleLogout() {
      await this.$store.dispatch('auth/logoutUser')
      this.$router.push('/')
    }
  }
}
</script>
