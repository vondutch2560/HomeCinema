const express = require('express')
const mongoose = require('mongoose')
const directorRouter = express.Router()

const directorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
})
const Director = mongoose.model('movie_director', directorSchema)

directorRouter.get('/', (req, res) => {
  Director.find({})
    .select({ name: 1 })
    .exec(function (err, data) {
      if (err) throw err
      res.send(data)
    })
})

directorRouter.post('/', (req, res) => {
  const record = new Director({ name: req.body.dataInsert })
  record.save(function (err) {
    if (err) console.error(err)
    res.end('It worked!')
  })
})

module.exports = directorRouter
