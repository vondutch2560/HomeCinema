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
        <form-basic-select field-label="Movie Studio" />
        <form-basic-select field-label="Movie Label" />
        <form-basic-select field-label="Movie Serie" />
        <form-basic-select field-label="Movie Director" />
        <form-multi-select field-label="Movie Actress" />
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
import FormBasicSelect from '@/components/Manager/FormBasicSelect'
import FormMultiSelect from '@/components/Manager/FormMultiSelect'

export default {
  components: {
    SideBar,
    CoverMovie,
    FormInputText,
    FormBasicSelect,
    FormMultiSelect,
  },
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
    label {
      user-select: none;
    }
    .ui.fluid.search.selection.dropdown,
    .ui.fluid.search.dropdown.selection.multiple {
      display: inline-block;
      width: calc(100% - 120px);
      max-width: 560px;
      margin-bottom: 25px;
      background: #444;
      border: 1px solid #777;
      color: #ddd;
      .ui.label.transition.visible {
        background: #777;
        color: #ddd;
      }
    }
    .ui.fluid.search.selection.dropdown.active.visible .menu.visible {
      background: inherit;
      border: 1px solid #777;
      box-shadow: none;
      .item {
        border-top: 1px solid #676767;
        color: #dedede;
        &.selected {
          background: #333;
        }
      }
    }
  }

  .data-insert {
    margin-top: 30px;
    color: #ddd;
  }
}
</style>
