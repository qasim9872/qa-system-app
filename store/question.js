export const state = () => ({
  questions: []
})

export const mutations = {
  add(state, question) {
    state.questions.push(question)
  },

  remove(state, { question }) {
    state.questions.splice(state.list.indexOf(question), 1)
  }
}
