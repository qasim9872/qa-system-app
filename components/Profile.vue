<template>
  <v-container 
    grid-list-md 
    text-md-center 
    fluid 
    fill-height 
    justify-center>
    <v-layout 
      class="container" 
      column 
      wrap>
      <ProfileHeader
        :user="userData"
        :personal="personal"
      />
    </v-layout>
  </v-container>
</template>

<script>
import ProfileHeader from './ProfileHeader'

export default {
  components: {
    ProfileHeader
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    personal: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    userData() {
      return this.user
    }
  }
}
</script>
