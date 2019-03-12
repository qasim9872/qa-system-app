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
          :expand="true"
          :data="question"
          @like="like"
          @dislike="dislike"/>
      </div>
      <div v-else>
        No question with id {{ qsId }}
      </div>
      
    </v-layout>

  </v-container>
</template>

<script>
import Result from '../../components/Result'
import { mapActions } from 'vuex'

export default {
  components: {
    Result
  },
  async asyncData({ store, route, error }) {
    const qsId = route.params.id
    let question = await store.dispatch('qsHandler/getQuestionData', qsId)

    if (!question) {
      // call api
      const fetched = await store.dispatch('qsHandler/fetchQuestionData', qsId)
      // fetched will be an array
      if (fetched && fetched.length > 0) {
        question = fetched[0]
      }
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
  },
  methods: {
    ...mapActions({
      like: 'qsHandler/likeQuestion',
      dislike: 'qsHandler/dislikeQuestion'
    })
  }
}
</script>
