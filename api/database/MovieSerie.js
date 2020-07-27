const express = require('express')
const mongoose = require('mongoose')
const serieRouter = express.Router()

const serieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
})
const Serie = mongoose.model('movie_serie', serieSchema)

serieRouter.get('/', (req, res) => {
  Serie.find({})
    .select({ name: 1 })
    .exec(function (err, data) {
      if (err) throw err
      res.send(data)
    })
})

serieRouter.post('/', (req, res) => {
  const record = new Serie({ name: req.body.dataInsert })
  record.save(function (err) {
    if (err) console.error(err)
    res.end('It worked!')
  })
})

module.exports = serieRouter
