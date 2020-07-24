<template>
  <div class="form-input">
    <label :for="getId">{{ fieldLabel }}</label>
    <input :id="getId" :value="value" type="text" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    fieldLabel: { type: String, default: '' },
    // value: { type: [String, Number, Date], default: '' },
  },
  computed: {
    ...mapState('ManagerMovie', ['infoMovie', 'selectedMovie']),
    getId() {
      return this.fieldLabel.toLowerCase().trim().replace(/\s/g, '-')
    },
    value() {
      return this.fieldLabel.toLowerCase().trim().replace(/\s/g, '') !==
        'filename'
        ? this.infoMovie[this.keyObj()]
        : this.selectedMovie
    },
  },

  methods: {
    keyObj() {
      let keyObj = ''
      this.fieldLabel.split(' ').forEach((word, index) => {
        keyObj += index === 0 ? word.toLowerCase() : word
      })
      return keyObj
    },
  },
}
</script>

<style>
.form-input label {
  display: inline-block;
  width: 110px;
  vertical-align: top;
  margin-top: 8px;
  color: #ddd;
}
.form-input input[type='text'],
.form-input input[type='date'] {
  display: inline-block;
  width: calc(100% - 120px);
  max-width: 560px;
  margin-bottom: 25px;
  outline: none;
  border: 1px solid #777;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 1em;
  background: #444;
  color: #ddd;
}
</style>
