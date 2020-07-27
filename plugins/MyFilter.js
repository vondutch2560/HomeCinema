import Vue from 'vue'

Vue.filter('decodeEntities', (str) => {
  if (typeof document !== 'undefined') {
    const text = document.createElement('textarea')
    text.innerHTML = str
    return text.value
  }
  return str
})

Vue.filter('encodeEntities', (str) => {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
})
