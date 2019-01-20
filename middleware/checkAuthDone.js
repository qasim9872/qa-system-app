export default function({ store, redirect }) {
  // If the user is authenticated redirect to home page
  console.log(`checking auth done`)
  if (store.getters['auth/loggedIn']) {
    return redirect('/')
  }
}
