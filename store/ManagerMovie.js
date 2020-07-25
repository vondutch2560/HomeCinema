import axios from 'axios'
const baseUrl = `${process.env.baseUrl}/api/`

export const state = () => ({
  listMovie: [],
  listActresses: [],
  moviegenre: [],
  listSeries: ['abc'],
  listStudio: [],
  selectedMovie: '',
  secureImage: true,
  isLoadingMovie: false,
  infoMovie: {
    fileName: '',
    movieName: '',
    movieCode: '',
    actresses: '',
    movieGenre: [],
    movieStudio: [],
    label: '',
    series: '',
    director: '',
    uncensored: '',
    releaseDate: '',
    imageCover: '',
  },
  moviesMatched: [],
  isNoMovieMatched: false,
})

export const mutations = {
  updateState(state, objMovie) {
    for (const key in objMovie) {
      state[key] = objMovie[key]
    }
    state.infoMovie.fileName = state.selectedMovie
  },
}

export const actions = {
  async getListMovie({ commit }) {
    const dataInit = [{ listMovie: await customAxios('getDataInit') }]
    dataInit.forEach((item) => {
      commit('updateState', item)
    })
  },

  async getInfoMovie({ commit }, objData) {
    clearDataBeforeGetInfo(commit, objData)
    for (const key in objData) {
      const response = await customAxios(`getInfoMovie${key}/${objData[key]}`)
      commit('updateState', { isLoadingMovie: false })
      commit('updateState', response.data)
    }
  },

  async getDataForSelectInput({ commit }, collectionName) {
    const response = await customAxios(collectionName)
    const renameKeyObject = JSON.parse(JSON.stringify(response))
    renameKeyObject.forEach((item) => {
      item.text = item.name
      item.value = item._id
      delete item.name
      delete item._id
      delete item.__v
    })
    response.length = 0
    commit('updateState', { [collectionName]: renameKeyObject })
  },

  updateState({ commit }, objData) {
    commit('updateState', objData)
  },
}

// async function formatObj(state, dispatch, obj) {
//   for (const key in obj) {
//     if (typeof obj[key] === 'string') obj[key] = obj[key].trim()
//     if (key === 'releaseDate') obj[key] = formatDate(obj[key])
//     if (key === 'movieStudio')
//       obj[key] = await checkExistStudio(state, dispatch, obj)
//     if (key === 'movieGenre')
//       obj[key] = await checkExistGenre(state, dispatch, obj)
//   }
//   return obj
// }

// function formatDate(strDate) {
//   const d = new Date(strDate)
//   const year = d.getFullYear()
//   const month = ('0' + (d.getMonth() + 1)).slice(-2)
//   const date = ('0' + d.getDate()).slice(-2)
//   return `${year}-${month}-${date}`
// }

// async function checkExistGenre(state, dispatch, obj) {
//   const genreNotExist = []
//   const genreSelected = []
//   obj.movieGenre.forEach((genre) => {
//     const findGenre = state.listGenre.find((item) => item.name === genre)
//     if (findGenre === undefined) genreNotExist.push([genre])
//   })

//   if (genreNotExist.length !== 0) {
//     const insertGenre = await axios.post(hostApi + '/genre', {
//       genre: genreNotExist
//     })

//     if (insertGenre.status === 200) {
//       const listGenre = await customAxios('/genre')
//       dispatch('modifyList', { listGenre })
//     }
//   }
//   obj.movieGenre.forEach((genre) => {
//     const findGenre = state.listGenre.find((item) => item.name === genre)
//     if (findGenre !== undefined) genreSelected.push(findGenre)
//   })
//   return JSON.parse(JSON.stringify(genreSelected))
// }

// async function checkExistStudio(state, dispatch, obj) {
//   let findStudio = state.listStudio.find(
//     (item) => item.name === obj.movieStudio
//   )
//   if (findStudio === undefined) {
//     const response = await axios.post(hostApi + '/studio', {
//       studio: obj.movieStudio
//     })
//     if (response.status === 200) {
//       findStudio = response.data
//       dispatch('addListStudio', findStudio)
//     }
//   }
//   return JSON.parse(JSON.stringify(findStudio))
// }

async function customAxios(url = '') {
  const response = await axios.get(baseUrl + url)
  return response.data
}

function clearDataBeforeGetInfo(commit, objData) {
  commit('updateState', {
    infoMovie: {
      fileName: '',
      movieName: '',
      movieCode: '',
      actresses: '',
      movieGenre: [],
      movieStudio: { id: '', name: '' },
      label: '',
      series: '',
      director: '',
      uncensored: '',
      releaseDate: '',
      imageCover: '',
    },
  })
  commit('updateState', { moviesMatched: [] })
  commit('updateState', { isLoadingMovie: true })
  commit('updateState', { isNoMovieMatched: false })
  for (const key in objData) {
    if (key === 'ByName') commit('updateState', { selectedMovie: objData[key] })
  }
}
