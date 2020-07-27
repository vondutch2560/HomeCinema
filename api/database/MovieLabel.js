const express = require('express')
const mongoose = require('mongoose')
const labelRouter = express.Router()

const labelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
})
const Label = mongoose.model('movie_label', labelSchema)

labelRouter.get('/', (req, res) => {
  Label.find({})
    .select({ name: 1 })
    .exec(function (err, data) {
      if (err) throw err
      res.send(data)
    })
})

labelRouter.post('/', (req, res) => {
  const record = new Label({ name: req.body.dataInsert })
  record.save(function (err) {
    if (err) console.error(err)
    res.end('It worked!')
  })
})

module.exports = labelRouter
