<template>
  <div class="sidebar">
    <ul>
      <li
        v-for="(movie, index) in listMovie"
        :id="`movie-${index}`"
        :key="index"
        :class="{ active: selectedMovie == movie }"
        @click="selectMovie"
      >
        {{ movie }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('ManagerMovie', ['selectedMovie', 'listMovie']),
  },

  beforeCreate() {
    this.$store.dispatch('ManagerMovie/setupDataInit')
  },

  methods: {
    selectMovie(event) {
      const fileNameMovie = event.target.innerHTML.trim()
      this.$store.dispatch('ManagerMovie/getInfoMovie', {
        ByName: fileNameMovie,
      })
    },
  },
}
</script>

<style lang="scss">
.sidebar {
  position: fixed;
  bottom: 0;
  left: 0;
  top: 44px;
  width: 320px;
  border-right: 1px solid #555;
  overflow: auto;
  ul {
    padding-left: 5px;
    padding-top: 15px;
    li {
      font-size: 0.97em;
      list-style: none;
      color: #ccc;
      padding: 4px 0 4px 10px;
      cursor: pointer;
      &.active {
        color: #eee;
        background: #888;
      }
    }
  }
}
</style>
