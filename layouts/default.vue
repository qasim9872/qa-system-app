<template>
  <v-app>
    <nav-bar/>
    <nuxt/>
    <website-footer/>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar'
import WebsiteFooter from '@/components/WebsiteFooter'

export default {
  components: {
    NavBar,
    WebsiteFooter
  }
}
</script>

<style>
html {
  padding-bottom: 0;
}
</style>
