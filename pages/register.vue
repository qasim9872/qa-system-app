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

          <v-form 
            ref="form" 
            v-model="valid">

            <v-text-field
              v-model="name"
              :rules="nameRules"
              label="Name"
              required
            />

            <v-text-field
              v-model="username"
              :rules="usernameRules"
              label="Username"
              required
            />

            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
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
              @click="submit">submit</v-btn>
            <v-btn @click="clear">clear</v-btn>
          </v-form>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validateEmail, validateUsername } from '../utils/helper'

export default {
  middleware: 'guest',
  data() {
    return {
      valid: false,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 25) || 'Name must be less than 25 characters'
      ],
      username: '',
      usernameRules: [
        v => !!v || 'Username is required',
        v => (v && v.length >= 8) || 'Username must be at least 8 characters',
        v =>
          validateUsername(v) ||
          [
            'The username should start and end with a letter or number, and',
            'only contain letters, numbers, hyphen, dot or underscore'
          ].join(' ')
      ],

      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => validateEmail(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 8) || 'Password must be at least 8 characters'
      ]
    }
  },
  methods: {
    async submit() {
      try {
        await this.$store.dispatch('auth/registerUser', {
          name: this.name,
          username: this.username,
          email: this.email,
          password: this.password
        })

        await this.$store.dispatch('auth/loginUser', {
          email: this.email,
          password: this.password
        })

        this.$router.push('/')
      } catch (err) {
        console.error('Error registering user: ', err)
      }
    },
    clear() {
      this.$refs.form.reset()
    }
  }
}
</script>
