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
        primary-title 
        class="expandable"
        @click="toggleExpansion">
        <div 
          class="headline">
          {{ prefixVal }} {{ questionText }}
        </div>
      </v-card-title>
      
      <div v-if="expansion">
        <v-textarea 
          :value="query"
          class="font-weight-bold pa-3 white--text"
          label="Sparql query"
          background-color="primary"
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
            background-color="primary"
            auto-grow
            flat
            box
            readonly
          />
        </div>

        <div v-else>
          Unable to find an answer
        </div>

        <v-card-actions class="px-3">
          <v-btn 
            v-if="route"
            class="px-3"
            dark>
            <nuxt-link 
              :to="routeLink" 
              class="nav-link">View Full</nuxt-link>
          </v-btn>
          <v-btn @click="like(data._id)">  <v-icon left>thumb_up</v-icon>{{ likes }}</v-btn>
          <v-btn @click="dislike(data._id)"> <v-icon left>thumb_down</v-icon>{{ dislikes }} </v-btn>
        </v-card-actions>
          
      </div>
    </v-card>
  </v-flex>
</template>

<script>
import stats from './QuestionStats'
import { mapActions } from 'vuex'

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
    expand: {
      required: false,
      type: Boolean,
      default: false
    },
    data: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      expansion: this.expand ? true : false
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
    }
  },
  methods: {
    getLabel(result, index) {
      return `${index + 1}. Response from ${
        result.source
      } ${result.lang.toUpperCase()}`
    },
    toggleExpansion() {
      this.expansion = !this.expansion
    },
    ...mapActions({
      like: 'qsHandler/likeQuestion',
      dislike: 'qsHandler/dislikeQuestion'
    })
  }
}
</script>

<style lang="stylus">
.expandable {
   cursor: pointer
}
</style>
