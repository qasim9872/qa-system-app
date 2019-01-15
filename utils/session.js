export const getKeyName = key => `qa-system.${key}`

export function getSessionItem(key) {
  if (process.client) {
    const keyName = getKeyName(key)
    try {
      return JSON.parse(localStorage.getItem(keyName))
    } catch (err) {
      return null
    }
  }
}

export function setSessionItem(key, value) {
  if (process.client) {
    const keyName = getKeyName(key)
    localStorage.setItem(keyName, JSON.stringify(value))
  }
}
