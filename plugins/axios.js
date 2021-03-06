export default function({ $axios, redirect, store }) {
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    let toastMessage = ''

    switch (code) {
      case 400:
        toastMessage = 'bad request params'
        break
      case 401:
        toastMessage = 'authorisation failed'
        store.dispatch('auth/removeUser')
        redirect('/login')
        break
      case 409:
        toastMessage =
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : 'already taken'
        break
      default:
        toastMessage = 'request failed'
        break
    }

    store.$toast.error(toastMessage)
    return Promise.reject(error)
  })
}
