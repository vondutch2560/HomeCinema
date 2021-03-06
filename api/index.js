const fs = require('fs')
const axios = require('axios')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')

const movie = require('./database/Movie')
const movieGenre = require('./database/MovieGenre')
const movieActress = require('./database/MovieActress')
const movieStudio = require('./database/MovieStudio')
const movieLabel = require('./database/MovieLabel')
const movieSerie = require('./database/MovieSerie')
const movieDirector = require('./database/MovieDirector')

mongoose.connect(
  'mongodb+srv://vondutch2560:Vonmg931407612@mongocluster-fpyaf.gcp.mongodb.net/jap_vid?retryWrites=true&w=majority',
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err
  }
)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/getDataInit', function (req, res) {
  fs.readdir('../JP/', function (err, data) {
    if (err) throw err
    res.send(data)
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
      message: 'One Movie' + response.moviestudio,
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

  const infoMovie = {
    imageCover: regexInfo(/cover" src="([^"]*)/gm, 'string', response),
    movieName: regexInfo(/name">([\s\S]*)<\/cite>/gm, 'string', response),
    movieCode: regexInfo(/D ID:<\/dt>\s*<dd>\s*([^<]*)/gm, 'string', response),
    movieactress: regexInfo(/ss\/p.*\s*<s.*">([^<]*)</gm, 'array', response),
    moviegenre: regexInfo(/prop="genre">\s*([^<]*)/gm, 'array', response),
    moviestudio: regexInfo(/studio[^>]*>\s*([^<]*)<\/a>/gm, 'string', response),
    movielabel: regexInfo(/bel:[^>]*[^<]*<dd>\s*([^<]*)/gm, 'string', response),
    movieserie: regexInfo(/series\/page[^>]*>\s*([^<]*)/gm, 'string', response),
    moviedirector: regexInfo(
      /itemprop="director">\s*([^<]*)/gm,
      'string',
      response
    ),
    releaseDate: new Date(regexInfo(/reated">\s*(.*)<b/gm, 'string', response)),
    uncen: false,
  }

  return infoMovie
}

function regexInfo(regex, type, source) {
  if (type === 'string') {
    const match = regex.exec(source.data)
    const result = match === null ? '' : match[1]
    return result.trim()
  }
  if (type === 'array') {
    const arr = []
    let m
    while ((m = regex.exec(source.data)) !== null) {
      arr.push(m[1].trim())
    }
    return arr
  }
}

app.use('/movie/', movie)
app.use('/moviegenre/', movieGenre)
app.use('/movieactress/', movieActress)
app.use('/moviestudio/', movieStudio)
app.use('/movielabel/', movieLabel)
app.use('/movieserie/', movieSerie)
app.use('/moviedirector/', movieDirector)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app,
}
