<template>
  <div>
    <h1>Manager Movie</h1>
    <side-bar />
    <div class="main">
      <cover-movie />
      <div class="properties-movie"></div>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/Manager/SideBar'
import CoverMovie from '@/components/Manager/CoverMovie'

export default {
  components: { SideBar, CoverMovie },
}
</script>

<style lang="scss">
h1 {
  background: #252525;
  color: #eee;
  display: block;
  font-size: 1.7em;
  padding: 6px 15px;
}

.main {
  margin-left: 320px;
  padding: 25px;
}
</style>
