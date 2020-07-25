<template>
  <div class="form-input">
    <label :for="getId">{{ fieldLabel }}</label>
    <multi-select
      :id="getId"
      :options="vuexStateData"
      :selected-options="getSelected"
      :placeholder="`Select ${fieldLabel}`"
      @select="onSelect"
    >
    </multi-select>
  </div>
</template>

<script>
import { MultiSelect } from 'vue-search-select'

export default {
  components: { MultiSelect },

  props: {
    fieldLabel: { type: String, default: '' },
  },

  computed: {
    vuexStateData() {
      return this.$store.state.ManagerMovie[this.vuexStateName()]
    },

    getSelected() {
      const selected = []
      this.$store.state.ManagerMovie[this.vuexStateName()].forEach((item) => {
        if (
          this.$store.state.ManagerMovie.infoMovie[
            this.vuexStateName()
          ].includes(item.value)
        )
          selected.push({ value: item.value, text: item.text })
      })

      return selected
    },

    getId() {
      return this.fieldLabel.toLowerCase().trim().replace(/\s/g, '-')
    },
  },

  created() {
    this.$store.dispatch(
      'ManagerMovie/getDataForSelectInput',
      this.vuexStateName()
    )
  },

  methods: {
    vuexStateName() {
      return this.fieldLabel.toLowerCase().trim().replace(/\s/g, '')
    },

    onSelect(items, lastSelectItem) {},

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
