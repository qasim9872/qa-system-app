import createPersistedState from 'vuex-persistedstate'

export const state = () => ({
  questions: []
})

export const plugins = [{ src: createPersistedState, ssr: false }]

export const mutations = {
  add(state, data) {
    console.log(`qs added`)
    state.questions.push(data)
  },

  remove(state, { question }) {
    state.questions.splice(state.list.indexOf(question), 1)
  }
}

export const actions = {
  getQuestionData({ state }, id) {
    const found = state.questions.find(value => value._id == id)
    console.log(`get question ${JSON.stringify(found, null, 2)}`)
    return found
  }
}
