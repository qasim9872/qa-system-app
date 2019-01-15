const config = require('../config/dev')

export default function({ $axios, redirect, store }) {
  $axios.defaults.baseURL = config.api_url

  $axios.onRequest(config => {
    const user = store.getters['auth/user']
    if (user && user.token) {
      config.headers['Authorization'] = `Token ${user.token}`
    } else {
      delete config.headers['Authorization']
    }
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      console.log(401)
      store.commit('auth/setUser', null)
      redirect('/login')
    }
  })
}
