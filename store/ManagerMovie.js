import axios from 'axios'
const baseUrl = `${process.env.baseUrl}/api/`

export const state = () => ({
  listMovie: [],
  movieactress: [],
  moviegenre: [],
  moviestudio: [],
  label: [],
  series: [],
  director: [],
  selectedMovie: '',
  secureImage: true,
  isLoadingMovie: false,
  infoMovie: {
    fileName: '',
    movieName: '',
    movieCode: '',
    movieactress: [],
    moviegenre: [],
    moviestudio: '',
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
    const dataInit = [{ listMovie: await getAxios('getDataInit') }]
    dataInit.forEach((item) => {
      commit('updateState', item)
    })
  },

  async getInfoMovie({ state, commit, dispatch }, objData) {
    clearDataBeforeGetInfo(commit, objData)
    for (const key in objData) {
      const response = await getAxios(`getInfoMovie${key}/${objData[key]}`)
      console.log(response)
      const parseInfoMovie =
        response.statusCode === 1
          ? await checkExistDB(response.data.infoMovie, state, dispatch)
          : response.data
      commit('updateState', { isLoadingMovie: false })
      commit('updateState', parseInfoMovie)
    }
  },

  async getDataForSelectInput({ commit }, collectionName) {
    const response = await getAxios(collectionName)
    commit('updateState', { [collectionName]: response })
    // return renameKeyObject
  },

  updateTextInput({ state, commit }, objData) {
    const infoMovieUpdate = JSON.parse(JSON.stringify(state.infoMovie))
    infoMovieUpdate[objData.stateName] = objData.value
    commit('updateState', { infoMovie: infoMovieUpdate })
  },

  onSelectMulti({ state, commit }, objData) {
    const infoMovieUpdate = JSON.parse(JSON.stringify(state.infoMovie))
    if (objData.event === 'insert')
      infoMovieUpdate[objData.stateName].push(objData.value)
    if (objData.event === 'delete') {
      infoMovieUpdate[objData.stateName].forEach((item, index) => {
        if (item === objData.value)
          infoMovieUpdate[objData.stateName].splice(index, 1)
      })
    }
    commit('updateState', { infoMovie: infoMovieUpdate })
  },

  onSelectBasic({ state, commit }, objData) {
    const infoMovieUpdate = JSON.parse(JSON.stringify(state.infoMovie))
    infoMovieUpdate[objData.stateName] = objData.value
    commit('updateState', { infoMovie: infoMovieUpdate })
  },

  updateState({ commit }, objData) {
    commit('updateState', objData)
  },
}

function clearDataBeforeGetInfo(commit, objData) {
  commit('updateState', {
    infoMovie: {
      fileName: '',
      movieName: '',
      movieCode: '',
      movieactress: [],
      moviegenre: [],
      moviestudio: '',
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

async function checkExistDB(infoMovie, state, dispatch) {
  for (const key in infoMovie) {
    if (typeof infoMovie[key] === 'object') {
      const existValue = []
      const existText = []

      infoMovie[key].forEach((item) => {
        state[key].forEach((itemDB) => {
          if (item === itemDB.name) {
            existValue.push(itemDB._id)
            existText.push(itemDB.name)
          }
        })
      })

      const valueAddDB = infoMovie[key].filter(
        (item) => !existText.includes(item)
      )

      if (valueAddDB.length === 0) infoMovie[key] = existValue

      if (valueAddDB.length > 0) {
        await postAxios(key, { dataInsert: valueAddDB })
        await dispatch('getDataForSelectInput', key)

        const selected = []
        state[key].forEach((item) => {
          if (infoMovie[key].includes(item.name)) selected.push(item._id)
        })

        infoMovie[key] = selected
      }
    }
    if (typeof infoMovie[key] === 'string' && ['moviestudio'].includes(key)) {
      let existValue = ''
      let existText = ''

      // console.log(key,  state[key])
      state[key].forEach((itemDB) => {
        if (infoMovie[key] === itemDB.name) {
          existValue = itemDB._id
          existText = itemDB.name
        }
      })

      if (existValue.length > 0) infoMovie[key] = existValue

      if (existValue.length === 0) {
        await postAxios(key, { dataInsert: existText })
        await dispatch('getDataForSelectInput', key)

        let selected = ''
        state[key].forEach((newItemDB) => {
          if (infoMovie[key] === newItemDB.name) selected = newItemDB._id
        })

        infoMovie[key] = selected
      }
    }
  }
  return { infoMovie }
}

async function getAxios(url = '') {
  const response = await axios.get(baseUrl + url)
  return response.data
}
async function postAxios(url, data) {
  const response = await axios.post(baseUrl + url, data)
  return response
}
