<template>
  <div class="cover-movie">
    <div class="img" :style="`background-image:url(${imageCover})`" />
    <div v-if="infoMovie.imageCover === 'loading'" class="lds-hourglass"></div>
    <!-- <p class="age-not-found">Không tìm thấy film</p> -->
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
    ...mapState('ManagerMovie', ['infoMovie', 'secureImage']),

    imageCover() {
      if (
        this.infoMovie.imageCover === '' ||
        this.infoMovie.imageCover === 'loading'
      )
        return ''
      return this.secureImage
        ? 'http://localhost:3000/tiger.jpg'
        : this.infoMovie.imageCover
    },
  },

  methods: {
    toggleSecureImg(event) {
      this.$store.dispatch('ManagerMovie/updateState', {
        secureImage: event.target.checked,
      })
    },
  },
}
</script>
<style lang="scss">
.cover-movie {
  display: inline-block;
  width: 40%;
  border: 1px solid #666;
  vertical-align: top;
  position: relative;

  .img {
    width: 100%;
    padding-bottom: 67%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  p.image-not-found {
    position: absolute;
    text-align: center;
    font-size: 16px;
    top: 50%;
    left: 0;
    right: 0;
    margin: auto;
    transform: translateY(-50%);
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
