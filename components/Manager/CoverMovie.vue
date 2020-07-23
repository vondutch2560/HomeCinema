<template>
  <div class="cover-movie">
    <div class="img" :style="`background-image:url(${imageCover})`" />
    <div v-if="isLoadingMovie" class="lds-hourglass"></div>
    <p v-if="isNoMovieMatched" class="movie-not-found">Movie Not Found</p>
    <div v-if="moviesMatched.length > 0" class="movies-matched">
      <div
        v-for="(movieMatched, index) in moviesMatched"
        :key="index"
        class="item-movie-matched"
        @click="getInfoByLink(movieMatched.url)"
      >
        <div
          class="thumbnail"
          :style="`
            background-image: url(${
              secureImage
                ? 'http://localhost:3000/tiger.jpg'
                : movieMatched.thumbnail
            });
          `"
        ></div>
        <p class="code">{{ movieMatched.code }}</p>
      </div>
    </div>
    <label
      ><input type="checkbox" :checked="secureImage" @click="toggleSecureImg" />
      Secure Image</label
    >
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('ManagerMovie', [
      'infoMovie',
      'secureImage',
      'moviesMatched',
      'isLoadingMovie',
      'isNoMovieMatched',
    ]),

    imageCover() {
      return this.secureImage && this.infoMovie.imageCover !== ''
        ? 'http://localhost:3000/tiger.jpg'
        : this.infoMovie.imageCover
    },
  },

  methods: {
    toggleSecureImg(event) {
      this.$store.dispatch('ManagerMovie/updateState', {
        secureImage: !this.secureImage,
      })
    },

    getInfoByLink(url) {
      this.$store.dispatch('ManagerMovie/getInfoMovie', {
        ByLink: encodeURIComponent(url),
      })
    },
  },
}
</script>
<style lang="scss">
.cover-movie {
  display: inline-block;
  width: 45%;
  border: 1px solid #666;
  vertical-align: top;
  position: relative;

  .movies-matched {
    position: absolute;
    top: 6%;
    left: 4%;
    right: 4%;
    bottom: 0;
    display: grid;
    grid-template-columns: repeat(3, calc(88% / 3));
    grid-gap: 6%;
    .item-movie-matched {
      cursor: pointer;
      .thumbnail {
        width: 100%;
        padding-bottom: 136%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        border: 1px solid #777;
      }
      p.code {
        color: #ccc;
        text-align: center;
        padding-top: 5px;
      }
    }
  }

  .img {
    width: 100%;
    padding-bottom: 67%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  p.movie-not-found {
    position: absolute;
    text-align: center;
    font-size: 1.8em;
    top: 50%;
    left: 0;
    right: 0;
    margin: auto;
    transform: translateY(-50%);
    color: #ccc;
    font-weight: bold;
  }

  .lds-hourglass {
    display: inline-block;
    position: absolute;
    width: 80px;
    height: 80px;
    margin: auto;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    &::after {
      content: ' ';
      display: block;
      border-radius: 50%;
      width: 0;
      height: 0;
      margin: 8px;
      box-sizing: border-box;
      border: 32px solid #ddd;
      border-color: #ddd transparent #ddd transparent;
      animation: lds-hourglass 1.2s infinite;
    }
  }

  label {
    font-size: 1em;
    position: absolute;
    bottom: -30px;
    color: #ddd;
    user-select: none;
  }
}

@keyframes lds-hourglass {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
}
</style>
