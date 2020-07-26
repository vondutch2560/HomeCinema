const express = require('express')
const mongoose = require('mongoose')
const studioRouter = express.Router()

const studioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
})
const Studio = mongoose.model('movie_studio', studioSchema)

studioRouter.get('/', (req, res) => {
  Studio.find({})
    .select({ name: 1 })
    .exec(function (err, data) {
      if (err) throw err
      res.send(data)
    })
})

studioRouter.post('/', (req, res) => {
  console.log(req.body.dataInsert)
  // const record = new Studio({ name: req.body.dataInsert })
  // record.save(function (err) {
  //   if (err) throw err
  // })
  res.end('It worked!')
})

module.exports = studioRouter
