<template>
  <v-flex 
    xs12 
    class="container">
    <v-card 
      dark
      color="blue" 
      class="white--text">
      <v-card-title 
        v-if="!hideTitle"
        primary-title >
        <div 
          class="headline">
          {{ prefixVal }} {{ questionText }}
        </div>
      </v-card-title>
      
      <div >
        <v-textarea 
          :value="query"
          class="font-weight-bold pa-3 white--text"
          label="Sparql query"
          
          flat
          box
          readonly
        />

        <div v-if="hasResults">
          <v-textarea 
            v-for="(result, index) in results"
            :key="result.value"
            :value="result.value"
            :label="getLabel(result, index)"
            class="font-weight-bold px-3 white--text"
            
            auto-grow
            flat
            box
            readonly
          />
        </div>

        <div v-else>
          Unable to find an answer
        </div>

        <v-card-actions>
          <v-list-tile
            v-if="isAskingUser"
            :to="'/user/'+isAskingUser.username"
            class="ma-0"
            align-center
            justify-start>
            <v-list-tile-avatar 
              color="grey darken-3">
              <v-img
                :src="isAskingUser.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'"
                class="elevation-6"
              />
            </v-list-tile-avatar>
  
            <v-list-tile-content>
              <v-list-tile-title>{{ isAskingUser.username }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-layout
            align-center
            justify-end
            class="ma-0"
          >
            <v-btn 
              v-if="route"
              :href="routeLink"
              class="px-3"
              dark>
              View Full
            </v-btn>
            <v-btn @click="$emit('like', data._id)">  <v-icon left>thumb_up</v-icon>{{ likes }}</v-btn>
            <v-btn @click="$emit('dislike', data._id)"> <v-icon left>thumb_down</v-icon>{{ dislikes }} </v-btn>
          </v-layout>
        </v-card-actions>
          
      </div>
    </v-card>
  </v-flex>
</template>

<script>
import stats from './QuestionStats'

export default {
  components: {
    stats
  },
  props: {
    hideTitle: {
      required: false,
      type: Boolean,
      default: false
    },
    prefix: {
      required: false,
      type: Number,
      default: 0
    },
    route: {
      required: false,
      type: Boolean,
      default: false
    },
    data: {
      required: true,
      type: Object
    }
  },
  computed: {
    routeLink() {
      return `/results/${this.data._id}`
    },
    query() {
      return this.data.query
    },
    prefixVal() {
      return this.prefix ? `${this.prefix}.` : ``
    },
    questionText() {
      return this.data.question
    },
    hasResults() {
      return this.data.results && this.data.results.length > 0
    },
    results() {
      return this.data.results
    },
    likes() {
      return this.data.likedBy.length || 0
    },
    dislikes() {
      return this.data.dislikedBy.length || 0
    },
    isAskingUser() {
      return this.data.askedBy
    }
  },
  methods: {
    getLabel(result, index) {
      return `${index + 1}. Response from ${result.source} ${
        result.lang ? result.lang.toUpperCase() : ''
      }`
    }
  }
}
</script>
