<template>
  <div class="home-page">

    <div class="container page">
      <div class="row">


        <div class="col-md-12">
          <div class="image">
            <img 
              class="resize"
              src="https://source.unsplash.com/collection/789734/800x200">
          </div>

          <div class="pt-3">
            <v-card>
              
              <v-card-text>
               
                <v-combobox
                  v-model="question" 
                  :items="examples"
                  clearable
                  persistent-hint
                  solo
                  hide-details
                  placeholder="Your question here"/>
              </v-card-text>

              <v-card-actions>
                <v-layout
                  align-center
                  justify-center
                  class="ma-0"
                >
                  
                  <v-btn 
                    color="#5cb85c" 
                    @click="askAway">  <v-icon left>search</v-icon>Ask away</v-btn>
                </v-layout>
              </v-card-actions>

            </v-card>
          </div>
        </div>


      </div>
    </div>

  </div>
</template>

<script>
export default {
  async asyncData({ store }) {
    const exampleQuestions = await store.dispatch(
      'qsHandler/fetchExampleQuestionList'
    )

    return {
      exampleQuestions
    }
  },
  data() {
    return {
      question: null
    }
  },
  computed: {
    examples() {
      return this.exampleQuestions
    }
  },
  methods: {
    async askAway() {
      if (!this.question) {
        this.$toast.error('Please provide a question')
        return
      }

      const answerId = await this.$store.dispatch(
        'qsHandler/fetchAnswer',
        this.question
      )

      this.$router.push(`/results/${answerId}`)
    }
  }
}
</script>

<style lang="stylus" scoped>
.image {
  text-align: center;
}
.resize {
  width: 100%
}
</style>
