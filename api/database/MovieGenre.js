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
const genre = mongoose.model('movie_genre', genreSchema)

// const firstGenre = new genre({ name: 'Humili' })
// firstGenre.save(function (err, sss) {
//   if (err) return console.error(err)
//   console.log(sss)
// })

// const newGenre = new genre({ name: 'test' })
// newGenre.save(function (err) {
//   if (err) return handleError(err)
// })

genreRouter.get('/', (req, res) => {
  genre.find(function (err, genres) {
    if (err) return console.error(err)
    res.send(genres)
  })
})

module.exports = genreRouter
