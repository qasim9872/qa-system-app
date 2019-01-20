export function validateUsername(username) {
  return (
    new RegExp('^[A-Za-z0-9._-]+$', 'i').test(username) &&
    username &&
    !username.startsWith('.') &&
    !username.startsWith('_') &&
    !username.startsWith('-') &&
    !username.endsWith('.') &&
    !username.endsWith('-') &&
    !username.endsWith('_') &&
    !username.includes('..') &&
    !username.includes('__') &&
    !username.includes('._') &&
    !username.includes('_.')
  )
}

export function validateEmail(email) {
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(String(email).toLowerCase())
}
