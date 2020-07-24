<template>
  <div>
    <h1>Manager Movie</h1>
    <side-bar />
    <div class="main">
      <cover-movie />
      <div class="properties-movie">
        <form-input-text field-label="File Name" />
        <form-input-text field-label="Movie Name" />
        <form-input-text field-label="Movie Code" />
        <form-multi-select field-label="Movie Genre" />
      </div>
      <div class="data-insert">
        <pre>{{ infoMovie }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SideBar from '@/components/Manager/SideBar'
import CoverMovie from '@/components/Manager/CoverMovie'
import FormInputText from '@/components/Manager/FormInputText'
import FormMultiSelect from '@/components/Manager/FormMultiSelect'

export default {
  components: { SideBar, CoverMovie, FormInputText, FormMultiSelect },
  computed: {
    ...mapState('ManagerMovie', ['infoMovie']),
  },
}
</script>

<style src="vue-search-select/dist/VueSearchSelect.css"></style>
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

  .properties-movie {
    display: inline-block;
    width: calc(55% - 10px);
    padding-left: 40px;
  }

  .data-insert {
    margin-top: 30px;
    color: #ddd;
  }
}
</style>
