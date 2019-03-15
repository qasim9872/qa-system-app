<template>
  <v-app>
    <nav-bar/>
    <nuxt/>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar'
export default {
  components: {
    NavBar
  }
}
</script>

<style>
html {
  padding-bottom: 0;
}
</style>
