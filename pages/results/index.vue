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
    >
      
      <h1 class="text-xs-center">All questions</h1>

      <result-list
        :questions-list="questionsList"
        :show-results="showResults"
        :can-show-more="canShowMore"
        @showMore="showMore"
        @like="like"
        @dislike="dislike"
      />

    </v-layout>

  </v-container>
</template>

<script>
import ResultList from '../../components/ResultList'
import { mapActions } from 'vuex'

export default {
  transition: 'tweakOpacity',
  components: {
    ResultList
  },
  data() {
    return {
      show: 5,
      increment: 10
    }
  },
  async asyncData({ store }) {
    await store.dispatch('qsHandler/fetchQuestionData')
  },
  computed: {
    canShowMore() {
      return this.$store.getters['qsHandler/length'] > this.show
    },
    questionsList() {
      return this.$store.getters['qsHandler/questions'].slice(0, this.show)
    },
    showResults() {
      return this.$store.getters['qsHandler/length'] > 0
    }
  },
  methods: {
    async showMore() {
      const totalLoadedQuestions = this.$store.getters['qsHandler/length']

      if (this.show + this.increment - totalLoadedQuestions >= 0) {
        // only fetch more if required
        await this.$store.dispatch('qsHandler/fetchQuestionData')
      }

      this.show += this.increment
    },
    ...mapActions({
      like: 'qsHandler/likeQuestion',
      dislike: 'qsHandler/dislikeQuestion'
    })
  }
}
</script>
<style>
.container {
  max-width: 1500px !important;
}
</style>
