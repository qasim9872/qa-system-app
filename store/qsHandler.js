import * as _ from 'lodash'

export const state = () => ({
  questions: [],
  fetch: 50
})

export const mutations = {
  add(state, data) {
    if (Array.isArray(data)) {
      // remove duplicates & merge
      state.questions = _.unionBy(state.questions, data, '_id')
    } else {
      state.questions.push(data)
    }
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
  async fetchAnswer({ commit, dispatch }, question) {
    const fetched = await this.$axios.$post('api/v1/question/answer', {
      question
    })
    commit('add', fetched)
    // get the updated user
    await dispatch('auth/getUser')
    return fetched
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
