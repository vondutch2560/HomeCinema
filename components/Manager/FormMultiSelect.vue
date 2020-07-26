<template>
  <div class="form-input">
    <label :for="getId">{{ fieldLabel }}</label>
    <multi-select
      :id="getId"
      :options="getOptionsDB"
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
    getOptionsDB() {
      const decodeText = this.$store.state.ManagerMovie[this.stateName()].map(
        (item) => {
          return {
            value: item._id,
            text: this.$options.filters.decodeEntities(item.name),
          }
        }
      )
      return decodeText
    },

    getSelected() {
      const selected = []
      this.$store.state.ManagerMovie[this.stateName()].forEach((item) => {
        if (
          this.$store.state.ManagerMovie.infoMovie[this.stateName()].includes(
            item._id
          )
        )
          selected.push({
            value: item._id,
            text: this.$options.filters.decodeEntities(item.name),
          })
      })

      return selected
    },

    getId() {
      return this.fieldLabel.toLowerCase().trim().replace(/\s/g, '-')
    },
  },

  created() {
    this.$store.dispatch('ManagerMovie/getDataForSelectInput', this.stateName())
  },

  methods: {
    stateName() {
      return this.fieldLabel.toLowerCase().trim().replace(/\s/g, '')
    },

    onSelect(items, lastSelectItem, event) {
      this.$store.dispatch('ManagerMovie/onSelectMulti', {
        stateName: this.stateName(),
        value: lastSelectItem.value,
        event,
      })
    },
  },
}
</script>
