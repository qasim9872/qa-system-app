<template>
  <v-flex xs12>

    <v-card 
      color="cyan darken-2" 
      class="white--text user-info">
      <v-layout>

        <v-flex xs5>
          <v-img
            :src="image"
            class="user-img"
            height="200px"
          />
        </v-flex>

        <v-flex xs7>
          <v-card-title primary-title>
            <div>
              <div>Supermodel</div>
              <div>Foster the People</div>
              <div>(2014)</div>
            </div>
          </v-card-title>
        </v-flex>

      </v-layout>   
    </v-card>

  </v-flex>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
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
