export default function({ $axios, redirect, store }) {
  $axios.onRequest(config => {
    const token = store.getters['auth/token']
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    } else {
      delete config.headers['Authorization']
    }
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    let toastMessage = ''

    switch (code) {
      case 400:
        toastMessage = 'bad request params'
        break
      case 401:
        toastMessage = 'Authorisation failed'
        store.commit('auth/setUser', null)
        store.commit('auth/setToken', null)
        redirect('/login')
        break
      default:
        toastMessage = 'request failed'
        break
    }

    store.$toast.error(toastMessage).goAway(5000)
    return Promise.reject(error)
  })
}
