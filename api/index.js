const fs = require('fs')
const axios = require('axios')
const express = require('express')
const app = express()
const mongoose = require('mongoose')

const movieGenre = require('./database/MovieGenre')

mongoose.connect(
  'mongodb+srv://vondutch2560:Vonmg931407612@mongocluster-fpyaf.gcp.mongodb.net/jap_vid?retryWrites=true&w=majority',
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) console.err(err)
    console.log('Connected Atlas MongoDB successfully')
  }
)

app.get('/getDataInit', function (req, res) {
  fs.readFile('./assets/jav.txt', 'utf8', function (err, data) {
    if (err) throw err
    res.send(data.split('\n'))
  })
})

app.get('/getInfoMovieByName/:fileNameMovie', async (req, res) => {
  const regex = /(.*)\s-\s(.*)\.[^.]+$/g
  const parseMovie = regex.exec(req.params.fileNameMovie)
  const response = await axios.get(
    `https://www.r18.com/common/search/searchword=${parseMovie[2]}/` // parseMovie[2] is code movie
  )
  const regexMovies = /<a href="(https:\/\/www\.r18\.com\/videos\/vod\/movies\/detail\/-\/id=.*)">\s*<p>\s*<img alt="(.*)"\s*.*data-original="(http.*\.jpg)"/gm
  const movie = []
  let m
  while ((m = regexMovies.exec(response.data)) !== null) {
    movie.push({
      url: m[1],
      code: m[2],
      thumbnail: m[3],
    })
  }
  if (movie.length === 0)
    res.send({
      statusCode: 0,
      message: 'No Movie',
      data: { isNoMovieMatched: true },
    })

  if (movie.length > 1)
    res.send({
      statusCode: 2,
      message: 'Many Movie',
      data: { moviesMatched: movie },
    })

  if (movie.length === 1) {
    const response = await getInfoMovie(movie[0].url)
    res.send({
      statusCode: 1,
      message: 'One Movie',
      data: { infoMovie: response },
    })
  }
})

app.get('/getInfoMovieByLink/:link', async (req, res) => {
  const response = await getInfoMovie(req.params.link)
  res.send({
    statusCode: 1,
    message: 'One Movie',
    data: { infoMovie: response },
  })
})

async function getInfoMovie(url) {
  const response = await axios.get(url)

  const movieGenre = []
  let m
  const regexGenre = /itemprop="genre">\s*([^<]*)/gm
  while ((m = regexGenre.exec(response.data)) !== null) {
    movieGenre.push(m[1])
  }

  const infoMovie = {
    imageCover: regexInfoMovie(/cover" src="([^"]*)/gm, response.data),
    movieName: regexInfoMovie(/name">([\s\S]*)<\/cite>/gm, response.data),
    movieCode: regexInfoMovie(/VD ID:<\/dt>\s*<dd>\s*([^<]*)/gm, response.data),
    actresses: regexInfoMovie(
      /actress\/page[^>]*[^<]*<span[^>]*>\s*([^<]*)/gm,
      response.data
    ),
    movieGenre,
    movieStudio: regexInfoMovie(/studio[^>]*>\s*([^<]*)/gm, response.data),
    label: regexInfoMovie(/Label:[^>]*[^<]*<dd>\s*([^<]*)/gm, response.data),
    series: regexInfoMovie(/series\/page[^>]*>\s*([^<]*)/gm, response.data),
    director: regexInfoMovie(/itemprop="director">\s*([^<]*)/gm, response.data),
    releaseDate: new Date(
      regexInfoMovie(/dateCreated">\s*(.*)<br>/gm, response.data)
    ),
  }

  return infoMovie
}

function regexInfoMovie(regex, str) {
  const match = regex.exec(str)
  const result = match === null ? '' : match[1]
  return result.trim()
}

app.use('/moviegenre/', movieGenre)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app,
}
