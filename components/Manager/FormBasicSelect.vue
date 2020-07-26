<template>
  <div class="form-input">
    <label :for="getId">{{ fieldLabel }}</label>
    <basic-select
      :id="getId"
      :options="getOptionsDB"
      :selected-option="{ value: 1, text: 'tast' }"
      :placeholder="`Select ${fieldLabel}`"
      @select="onSelect"
    >
    </basic-select>
  </div>
</template>

<script>
import { BasicSelect } from 'vue-search-select'

export default {
  components: { BasicSelect },

  props: {
    fieldLabel: { type: String, default: '' },
  },

  computed: {
    getOptionsDB() {
      // const decodeText = this.$store.state.ManagerMovie[this.stateName()].map(
      //   (item) => {
      //     return {
      //       value: item._id,
      //       text: this.$options.filters.decodeEntities(item.name),
      //     }
      //   }
      // )

      return []
    },

    // getSelected() {
    //   let selected = {}
    //   this.$store.state.ManagerMovie[this.stateName()].forEach((item) => {
    //     if (
    //       this.$store.state.ManagerMovie.infoMovie[this.stateName()].includes(
    //         item._id
    //       )
    //     )
    //       selected = {
    //         value: item._id,
    //         text: this.$options.filters.decodeEntities(item.name),
    //       }
    //   })
    //   return selected
    // },

    getId() {
      return this.fieldLabel.toLowerCase().trim().replace(/\s/g, '-')
    },
  },

  created() {
    // this.$store.dispatch('ManagerMovie/getDataForSelectInput', this.stateName())
  },

  methods: {
    stateName() {
      return this.fieldLabel.toLowerCase().trim().replace(/\s/g, '')
    },

    onSelect(item) {
      this.$store.dispatch('ManagerMovie/onSelectBasic', {
        stateName: this.stateName(),
        value: item.value,
      })
    },
  },
}
</script>
