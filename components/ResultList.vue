<template>
  <div>
    <div v-if="showResults">

      <v-expansion-panel 
        dark
        popout 
        focusable>
        <v-expansion-panel-content
          v-for="(question, index) in questionsList"
          :key="question._id"
        >
          <div 
            slot="header" 
            class="header">{{ index+1 }}. {{ question.question }}</div>
          <result 
            :data="question"
            hide-title
            expand 
            route />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </div>


    <div v-else>
      No questions available
    </div>

    <div class="px-3">
      <v-btn 
        v-if="canShowMore"
        class="px-3 white--text pull-xs-right"
        color="#5cb85c"
        @click="$emit('showMore')"
      > Show more </v-btn>
    </div>
  </div>
</template>

<script>
import Result from './Result'

export default {
  components: {
    Result
  },
  props: {
    questionsList: {
      type: Array,
      required: true
    },
    showResults: {
      type: Boolean,
      required: true
    },
    canShowMore: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style>
.header {
  font-size: 1.5em;
}
</style>
