const express = require('express')
const mongoose = require('mongoose')
const genreRouter = express.Router()

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
})
const Genre = mongoose.model('movie_genre', genreSchema)

genreRouter.get('/', (req, res) => {
  Genre.find(function (err, genres) {
    if (err) throw err
    console.log('get all document success')
    res.send(genres)
  })
})

// genreRouter.get('/:test', (req, res) => {
//   Genre.find(
//     {
//       name: ['Ropes &amp; Ties'],
//     },
//     function (err, genres) {
//       if (err) throw err
//       res.send(genres)
//     }
//   )
// })

genreRouter.get('/delete', (req, res) => {
  Genre.deleteMany({}, function (err) {
    if (err) throw err
    res.send('delete all document')
  })
})

genreRouter.post('/', (req, res) => {
  req.body.dataInsert.forEach((item) => {
    const record = new Genre({ name: item })
    record.save(function (err) {
      if (err) throw err
    })
  })
  console.log('save document success')
  res.end('It worked!')
})

module.exports = genreRouter
