const express = require('express')
const mongoose = require('mongoose')
const actressRouter = express.Router()

const actSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
})
const Actresses = mongoose.model('movie_act', actSchema)

actressRouter.get('/', (req, res) => {
  Actresses.find({})
    .select({ name: 1 })
    .exec(function (err, data) {
      if (err) throw err
      res.send(data)
    })
})

actressRouter.post('/', (req, res) => {
  req.body.dataInsert.forEach((item) => {
    const record = new Actresses({ name: item })
    record.save(function (err) {
      if (err) throw err
    })
  })
  res.end('It worked!')
})

module.exports = actressRouter
