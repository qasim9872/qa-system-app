import * as _ from 'lodash'

export const state = () => ({
  questions: []
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
  async fetchQuestionData({ commit }, id) {
    const fetched = await this.$axios.$post('api/v1/questions', {
      id
    })
    commit('add', fetched)
    return fetched
  }
}
