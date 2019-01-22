<template>

  <v-card 
    color="cyan darken-2" 
    class="user-info">
    <v-layout
      row
      
      justify-center
    >
      <v-card-title 
        primary-title 
        align-center>
        <v-avatar
          size="200px"
        >
          <img
            :src="image"
            alt="Avatar"
          >

        </v-avatar>
      </v-card-title>
      <v-layout 
        wrap 
        justify-center>
        <v-card-text align-center>
          <div class="headline font-weight-bold">
            {{ name }}
          </div>
          <div class="headline font-weight-bold">
            {{ bio }}
          </div>
        </v-card-text>

        <v-card-actions v-if="personal">
          <v-layout
            align-center
            justify-end
            class="ma-0"
          >
            <v-btn 
              class="px-3"
              dark
              @click="$router.push('/settings')">
              <i class="ion-gear-a"/>&nbsp;
              Edit profile settings
            </v-btn>
          </v-layout>
        </v-card-actions>
      </v-layout>
    

    </v-layout>   
  </v-card>

</template>

<script>
export default {
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
    name() {
      return this.user.name
    },
    bio() {
      return this.user.bio
    },
    image() {
      return (
        this.user.image ||
        'https://static.productionready.io/images/smiley-cyrus.jpg'
      )
    }
  }
}
</script>
