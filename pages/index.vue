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
            <form>
              <fieldset>
                <fieldset class="form-group">
                  <input 
                    v-model="question" 
                    type="text" 
                    class="text-xs-center form-control form-control-lg" 
                    placeholder="Your question here">
                </fieldset>
                <button 
                  class="btn btn-lg btn-primary pull-xs-right" 
                  type="submit" 
                  @click.stop.prevent="askAway">Ask away</button>
              </fieldset>
            </form>
          </div>
        </div>


      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      question: ''
    }
  },
  methods: {
    async askAway() {
      const answer = await this.$store.dispatch(
        'qsHandler/fetchAnswer',
        this.question
      )

      // this.$store.commit('qsHandler/add', {
      //   question: this.question,
      //   ...response.data
      // })
      this.$router.push(`/results/${answer._id}`)
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
