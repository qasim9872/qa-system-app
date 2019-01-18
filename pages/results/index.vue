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
      
      <h1 class="text-xs-center">All questions</h1>

      <div v-if="showResults">

        <div 
          v-for="(question, index) in questionsList"
          :key="question._id">
          <result 
            :route="true"
            :prefix="index+1" 
            :data="question" />
        </div>

      </div>

      <div v-else>
        No questions available
      </div>
      <div>
        <v-btn 
          v-if="canShowMore"
          class="px-3 white--text"
          color="#5cb85c"
          @click="showMore"
        > Show more </v-btn>
      </div>
      
    </v-layout>

  </v-container>
</template>

<script>
import Result from '../../components/Result'

export default {
  components: {
    Result
  },
  data() {
    return {
      show: 5,
      increment: 10
    }
  },
  async asyncData({ store }) {
    const questions = await store.dispatch('qsHandler/fetchQuestionData')

    return {
      questions
    }
  },
  computed: {
    canShowMore() {
      return this.$store.getters['qsHandler/length'] > this.show
    },
    questionsList() {
      return this.questions.slice(0, this.show)
    },
    showResults() {
      return this.questions.length > 0
    }
  },
  methods: {
    showMore() {
      this.show += this.increment
    }
  }
}
</script>
<style>
.container {
  max-width: 1500px !important;
}
</style>
