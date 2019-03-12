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


      <ProfileHeader
        :user="userData"
        :personal="personal"
      />

      <v-layout 
        class="pt-2" 
        justify-center>

        <v-tabs
          v-model="currentTab" 
          dark 
          fixed-tabs>
          <v-tab
            v-for="(tab) in tabs"
            :key="tab"
            :to="'#'+tab"
          >
            {{ tab }}
          </v-tab>
        </v-tabs>
      </v-layout>

      <v-tabs-items v-model="currentTab">
        <v-tab-item
          v-for="(tab, index) in tabs"
          :key="index"
          :value="tab"
          class="py-2"
        >

          <result-list
            :questions-list="getQuestions(tab)"
            :show-results="showResults(tab)"
            :can-show-more="false"
            @like="(id) => $emit('like', id)"
            @dislike="(id) => $emit('dislike', id)"
          />
        </v-tab-item>
      </v-tabs-items>

    </v-layout>
  </v-container>
</template>

<script>
import ProfileHeader from './ProfileHeader'
import ResultList from './ResultList'

export default {
  components: {
    ProfileHeader,
    ResultList
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    personal: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      tabs: ['asked', 'liked', 'disliked'],
      currentTab: 'asked',
      currentTabIndex: 0
    }
  },
  computed: {
    userData() {
      return this.user
    },
    askedQuestion() {
      return this.user.asked
    },
    likedQuestion() {
      return this.user.likes
    },
    dislikedQuestion() {
      return this.user.dislikes
    }
  },
  methods: {
    getQuestions(tabName) {
      switch (tabName) {
        case this.tabs[0]:
          return this.askedQuestion
        case this.tabs[1]:
          return this.likedQuestion
        case this.tabs[2]:
          return this.dislikedQuestion
        default:
          return []
      }
    },
    showResults(tabName) {
      switch (tabName) {
        case this.tabs[0]:
          return this.askedQuestion.length > 0
        case this.tabs[1]:
          return this.likedQuestion.length > 0
        case this.tabs[2]:
          return this.dislikedQuestion.length > 0
        default:
          return false
      }
    }
  }
}
</script>
