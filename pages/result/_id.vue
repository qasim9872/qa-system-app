<template>
  <v-container 
    grid-list-md 
    text-md-center 
    fluid 
    fill-height>
    <v-layout 
      column 
      wrap>
      <div v-if="showResult">
        <result 
          :data="question"/>
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
  async asyncData({ store, route, error }) {
    const qsId = route.params.id
    const question = await store.dispatch('qsHandler/getQuestionData', qsId)

    console.log(`question in _id.vue: ${question}`)

    if (!question) {
      // call api
    }

    if (!question) {
      return error({ message: `No question with id: ${qsId}` })
    }

    // Error empty question
    if (!Object.keys(question).length > 0) {
      return error({ message: `No question with id: ${qsId}` })
    }

    return {
      question,
      qsId
    }
  },
  computed: {
    showResult() {
      return Object.keys(this.question).length > 0
    }
  }
}
</script>
