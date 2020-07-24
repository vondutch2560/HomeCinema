const express = require('express')
const genreRouter = express.Router()

// const mongoose = require('mongoose')
// const Schema = mongoose.Schema
// const db = require('./db')

genreRouter.get('/', (req, res) => {
  res.send('genre')
})

// const genreSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//     unique: true,
//   },
// })

// const genre = mongoose.model('movie_genre', genreSchema)

module.exports = genreRouter
