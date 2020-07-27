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
  Genre.find({})
    .select({ name: 1 })
    .exec(function (err, data) {
      if (err) throw err
      res.send(data)
    })
})

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
      if (err) console.error(err)
    })
  })
  res.end('It worked!')
})

module.exports = genreRouter
