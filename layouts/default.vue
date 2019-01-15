<template>
  <div>
    <nav-bar/>
    <nuxt/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
export default {
  components: {
    NavBar
  },
  mounted() {
    this.$store.dispatch('auth/loadUser')
  }
}
</script>
