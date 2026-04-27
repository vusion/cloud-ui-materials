<template>
<div v-zone-time="text" style="min-width:100px;display:inline-block">
</div>
</template>
<script>
import {zoneTime} from '../../directives/zone-time';
export default {
  name: 'zone-time-view',
  directives: { 
    "zone-time":zoneTime 
  },
  props: {
    text: {
      type: String,
      default: ''
    },
  }
};
</script>
<style module>
.root {

}
</style>
