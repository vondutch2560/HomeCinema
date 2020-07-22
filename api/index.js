const fs = require('fs')
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  // console.log(__dirname)
  fs.readFile('./assets/jav.txt', 'utf8', function (err, data) {
    if (err) throw err
    const movie = data.split('\n')
    movie.forEach((name) => {
      console.log(name + 'a')
    })
  })

  app.get('/test', function (req, res) {
    setTimeout(function () {
      res.send('hello test')
    }, 1000)
  })
})
// Export the server middleware
module.exports = {
  path: '/api',
  handler: app,
}
// export default {
//   path: '/api',
//   handler: app,
// }
