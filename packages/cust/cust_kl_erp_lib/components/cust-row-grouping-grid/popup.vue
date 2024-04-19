<template>
  <u-popup trigger="click" :class="$style.content">
    <u-input suffix="search" clearable size="normal" placeholder="搜索" autofocus v-model="searchText"></u-input>
    <u-checkbox-card size="small" :data="filterList" :value="value" @change="changeCheckedList"></u-checkbox-card>
  </u-popup>
</template>
<script>
export default {
  name: "setting-popup",
  props: {
    list: {
      type: Array,
      default: () => []
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      searchText: '',
      filterList: this.list
    }
  },
  watch: {
    searchText(value) {
      this.updateList(value)
    },
    list() {
      this.updateList(this.searchText)
    }
  },
  methods: {
    changeCheckedList({value}) {
      this.$emit('change', value)
    },
    updateList() {
      this.searchText ? this.filterList = this.list.filter(item => item.text.includes(value)) : this.filterList = this.list
    }
  },
}
</script>
<style module>
.content {
  margin: 5px 0;
  [class^=u-checkbox-card] {
    border: none;
  }
  [class^=u-checkbox-card_head] {
    border-bottom: none;
    background-color: transparent;
    height: auto;
  }

  [class^=u-checkbox-card_body] {
    padding: 0 10px;
  }

  [class^=u-checkbox-card__item] {
    padding-right: 0;
  }
}
</style>
