const fs = require('fs')
const axios = require('axios')
const express = require('express')
const app = express()

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
  const regexMovies = /<a href="(https:\/\/www\.r18\.com\/videos\/vod\/movies\/detail\/-\/id=.*)">/gm
  const movie = []
  let m
  while ((m = regexMovies.exec(response.data)) !== null) {
    movie.push(m[1])
  }
  if (movie.length === 0)
    res.send({ status: false, message: 'movie not found', imageCover: '404' })
  if (movie.length > 1)
    res.send({ status: false, message: 'many movie', imageCover: '404' })
  if (movie.length === 1) {
    const response = await getInfoMovie(movie[0])
    res.send({ status: true, data: response })
  }

  // const movieDetail = await parseInfoMovie(movie[0])
})

app.get('getInfoMovieByLink/:link', async (req, res) => {
  const response = await getInfoMovie(req.params.link)
  res.send(response)

  // const movieName = regexInfoMovie(/name">([\s\S]*)<\/cite>/gm, response.data);
  // const releaseDate = regexInfoMovie(
  //   /dateCreated">\s*([^<]*)/gm,
  //   response.data
  // );
  // const director = regexInfoMovie(
  //   /itemprop="director">\s*([^<]*)/gm,
  //   response.data
  // );
  // const movieStudio = regexInfoMovie(/studio[^>]*>\s*([^<]*)/gm, response.data);
  // const label = regexInfoMovie(
  //   /Label:[^>]*[^<]*<dd>\s*([^<]*)/gm,
  //   response.data
  // );
  // const series = regexInfoMovie(
  //   /series\/page[^>]*>\s*([^<]*)/gm,
  //   response.data
  // );

  // const actresses = regexInfoMovie(
  //   /actress\/page[^>]*[^<]*<span[^>]*>\s*([^<]*)/gm,
  //   response.data
  // );

  // let movieGenre = [];
  // let m;
  // const regexGenre = /itemprop="genre">\s*([^<]*)/gm;
  // while ((m = regexGenre.exec(response.data)) !== null) {
  //   movieGenre.push(m[1]);
  // }

  // return {
  //   imageCover,
  //   movieName,
  //   releaseDate,
  //   director,
  //   movieStudio,
  //   label,
  //   series,
  //   actresses,
  //   movieGenre,
  // };
})

async function getInfoMovie(url) {
  const response = await axios.get(url)

  const infoMovie = {
    imageCover: regexInfoMovie(/cover" src="([^"]*)/gm, response.data),
  }

  return infoMovie
}

function regexInfoMovie(regex, str) {
  const match = regex.exec(str)
  const result = match === null ? '' : match[1]
  return result
}

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app,
}
// export default {
//   path: '/api',
//   handler: app,
// }
