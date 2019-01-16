<template>
  <v-container 
    grid-list-md 
    text-md-center 
    fluid 
    fill-height>
    <v-layout 
      column 
      wrap>
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
        No question with id {{ qsId }}
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

    if (!questions) {
      // call api
    }

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
