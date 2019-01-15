export const state = () => ({
  question: {
    sparqlQuery: '',
    question: '',
    result: []
  },
  questions: []
})

export const mutations = {
  add(state, question) {
    state.question.sparqlQuery = question.sparqlQuery
    state.question.question = question.question
    state.question.result = question.result
    state.questions.push(question)
  },

  remove(state, { question }) {
    state.questions.splice(state.list.indexOf(question), 1)
  }
}
