import axios from 'axios'
const baseUrl = `${process.env.baseUrl}/api/`

export const state = () => ({
  listMovie: [],
  listActresses: [],
  listGenre: [],
  listSeries: [],
  listStudio: [],
  selectedMovie: '',
  secureImage: true,
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
  responseError: {
    message: '',
  },
})

export const mutations = {
  updateState(state, objMovie) {
    for (const key in objMovie) {
      state[key] = objMovie[key]
    }
  },

  // changeImageCover(state, str) {
  //   state.imageCover = str
  // },
  // addListStudio(state, newStudio) {
  //   state.listStudio.push(newStudio)
  // }
}

export const actions = {
  async setupDataInit({ commit }) {
    const dataInit = [
      { listMovie: await customAxios('getDataInit') },
      // { listStudio: await customAxios('/studio') },
      // { listGenre: await customAxios('/genre') },
    ]
    dataInit.forEach((item) => {
      commit('updateState', item)
    })
  },

  async getInfoMovieByName({ commit, state, dispatch }, fileNameMovie) {
    commit('updateState', { selectedMovie: fileNameMovie })
    commit('updateState', { infoMovie: { imageCover: 'loading' } })
    const response = await customAxios(`getInfoMovieByName/${fileNameMovie}`)
    if (response.status) commit('updateState', { infoMovie: response.data })
    // if (dataMovie.status === false)
    //   this.$store.dispatch('adminMovie/changeImageCover', dataMovie.imageCover)
    // else {
    //   const movieData = await formatObj(state, dispatch, dataMovie.movieDetail)
    //   commit('updateInfoMovie', movieData)
    //   commit(
    //     'changeImageCover',
    //     'https://res.cloudinary.com/teepublic/image/private/s--c746ptCM--/c_crop,x_10,y_10/c_fit,h_690/c_crop,g_north_west,h_734,w_1004,x_-199,y_-22/l_upload:v1466701074:production:blanks:ibu6swrzxdis4kiazjnn/fl_layer_apply,g_north_west,x_-330,y_-275/b_rgb:ffffff/c_limit,f_jpg,h_630,q_90,w_630/v1547232282/production/designs/3943702_0.jpg'
    //   )
    // }
  },

  updateState({ commit }, objData) {
    commit('updateState', objData)
  },

  // addListStudio({ commit }, newStudio) {
  //   commit('addListStudio', newStudio)
  // },
  // modifyList({ commit }, dataModify) {
  //   commit('updateInfoMovie', dataModify)
  // }
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
