<template>
  <v-flex xs12>
    <v-card 
      dark
      color="blue" 
      class="white--text">
      <v-card-title primary-title>
        <div 
          class="headline">
          {{ questionText }}
        </div>
      </v-card-title>

      <v-textarea 
        :value="query"
        class="font-weight-bold px-3 white--text"
        label="Sparql query"
        background-color="primary"
        multi-line
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
        
      
      
      <v-card-actions>
        <v-btn 
          flat 
          dark>Listen now</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: {
    data: {
      required: true,
      type: Object
    }
  },
  computed: {
    query() {
      return this.data.query
    },
    questionText() {
      return this.data.question
    },
    hasResults() {
      return this.data.results && this.data.results.length > 0
    },
    results() {
      return this.data.results
    }
  },
  methods: {
    getLabel(result, index) {
      return `${index + 1}. Response from ${
        result.source
      } ${result.lang.toUpperCase()}`
    }
  }
}
</script>
