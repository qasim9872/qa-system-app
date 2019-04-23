<template>
  <footer class="set-height">
    <v-layout 
      dark
      
      align-center
      justify-center
      class="pa-0"
      fill-height
      min-heigh="100px"
    >

      <v-icon
        color="blue"
        size="20px"
        class="text-xs-center">code</v-icon>  &nbsp; 
      <a 
        target="_blank" 
        href="https://github.com/qasim9872/question-answering-system"> by Muhammad Qasim</a>
      

    </v-layout>
  </footer>
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

<style >
.set-height {
  height: '10vh';
}
</style>
