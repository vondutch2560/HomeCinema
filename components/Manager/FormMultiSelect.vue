<template>
  <div class="form-input">
    <label :for="getId">{{ fieldLabel }}</label>
    <multi-select
      :id="getId"
      :options="movieGenreDB"
      :selected-options="getSelected"
      :placeholder="`Select ${fieldLabel}`"
      @select="onSelect"
    >
    </multi-select>
    {{ movieGenreDB }}
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { MultiSelect } from 'vue-search-select'

export default {
  components: { MultiSelect },

  props: {
    fieldLabel: { type: String, default: '' },
  },

  computed: {
    ...mapState('ManagerMovie', ['infoMovie', 'movieGenreDB']),

    getId() {
      return this.fieldLabel.toLowerCase().trim().replace(/\s/g, '-')
    },

    getSelected() {
      return this.infoMovie.movieGenre
    },
  },

  methods: {
    onSelect(items, lastSelectItem) {
      console.log(items, lastSelectItem)
    },
    cloneObject(obj) {
      return JSON.parse(JSON.stringify(obj))
    },
    renameKeyObj(obj) {
      obj.text = this.$options.filters.decodeEntities(obj.name)
      obj.value = obj.id
      delete obj.name
      delete obj.id
      return obj
    },
  },
}
</script>

<style scope>
.ui.fluid.search.dropdown.selection.multiple {
  display: inline-block;
  width: calc(100% - 120px);
  max-width: 560px;
} /* .info-movie-admin .properties-movie .modify-multiselect {
  display: inline-block;
  width: 400px;
}
.ui.fluid.dropdown {
  display: inline-block;
  width: 400px;
  border: 1px solid #bbb;
  border-radius: 0;
  padding-left: 8px;
  margin-bottom: 25px;
}
.ui.multiple.search.dropdown > .text {
  padding-left: 0 !important;
} */
</style>
