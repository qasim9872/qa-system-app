import * as _ from 'lodash'

export const state = () => ({
  questions: [],
  fetch: 50
})

export const mutations = {
  add(state, data) {
    if (!Array.isArray(data)) {
      data = [data]
    }
    // remove duplicates & merge
    const merged = _.unionBy(state.questions, data, '_id')
    const updated = _.orderBy(merged, ['createdAt'], ['desc'])
    state.questions = updated
  },
  update(state, updatedQuestion) {
    const id = state.questions.findIndex(
      question => question._id == updatedQuestion._id
    )

    // update the liked and disliked props
    state.questions[id].likedBy = updatedQuestion.likedBy
    state.questions[id].dislikedBy = updatedQuestion.dislikedBy
  },

  remove(state, { question }) {
    state.questions.splice(state.list.indexOf(question), 1)
  }
}

export const actions = {
  getQuestionData({ state }, id) {
    const found = state.questions.find(value => value._id == id)
    return found
  },
  async fetchQuestionData({ commit, state }, id) {
    const fetched = await this.$axios.$post('api/v1/question/retrieve', {
      id,
      offset: state.questions.length,
      fetch: state.fetch
    })
    commit('add', fetched)
    return fetched
  },
  async fetchAnswer({ commit }, question) {
    const fetched = await this.$axios.$post('api/v1/question/answer', {
      question
    })
    commit('add', fetched)
    // get the updated user
    await this.$auth.fetchUser

    return fetched
  },
  async likeQuestion({ commit }, questionId) {
    const canLike = this.$auth.loggedIn
    if (canLike) {
      const liked = await this.$axios.$post('api/v1/question/like', {
        question: questionId
      })
      commit('update', liked)
    } else {
      this.$toast.error('Please sign in to like questions')
    }
  },
  async dislikeQuestion({ commit }, questionId) {
    const canDislike = this.$auth.loggedIn
    if (canDislike) {
      const disliked = await this.$axios.$post('api/v1/question/dislike', {
        question: questionId
      })
      commit('update', disliked)
    } else {
      this.$toast.error('Please sign in to dislike questions')
    }
  }
}

export const getters = {
  length(state) {
    return state.questions.length
  },
  questions(state) {
    return state.questions
  },
  fetchLimit(state) {
    return state.fetch
  }
}
