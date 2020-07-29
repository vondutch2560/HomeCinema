const fs = require('fs')
const https = require('https')
const express = require('express')
const mongoose = require('mongoose')
const movieRouter = express.Router()

const movieSchema = new mongoose.Schema({
  imageCover: {
    type: String,
    required: true,
  },
  movieName: String,
  movieCode: {
    type: String,
    required: true,
    unique: true,
  },
  movieactress: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'movie_acts',
    },
  ],
  moviegenre: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'movie_genres',
    },
  ],
  moviestudio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'movie_studios',
  },

  movielabel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'movie_labels',
  },

  movieserie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'movie_series',
  },

  moviedirector: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'movie_directors',
  },
  releaseDate: Date,
  uncen: Boolean,
  fileName: {
    type: String,
    required: true,
  },
})
const Movie = mongoose.model('movie', movieSchema)

movieRouter.get('/', (req, res) => {
  Movie.find({})
    .select({ fileName: 1, _id: 0 })
    .exec(function (err, data) {
      if (err) throw err
      res.send(data)
    })
})

movieRouter.post('/', (req, res) => {
  const record = new Movie(req.body.dataInsert)
  record.save(function (err) {
    if (err) console.error(err)
    saveImageToDisk(
      req.body.dataInsert.imageCover,
      req.body.dataInsert.movieCode,
      res
    )
  })
})

function saveImageToDisk(url, code, res) {
  const file = fs.createWriteStream(`../image/${code}.jpg`)
  https.get(url, function (response) {
    response.pipe(file)
    response.on('end', () => {
      res.send('Movie saved!')
    })
  })
}

module.exports = movieRouter
