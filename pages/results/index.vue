<template>
  <v-container 
    grid-list-md 
    text-md-center 
    fluid 
    fill-height>
    <v-layout 
      column 
      wrap>
      
      <h1 class="text-xs-center">All questions</h1>

      <div v-if="showResults">

        <div 
          v-for="(question, index) in questions"
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
      
    </v-layout>

  </v-container>
</template>

<script>
import Result from '../../components/Result'

export default {
  components: {
    Result
  },
  async asyncData({ store }) {
    const questions = await store.dispatch('qsHandler/fetchQuestionData')

    return {
      questions
    }
  },
  computed: {
    showResults() {
      return this.questions.length > 0
    }
  }
}
</script>
