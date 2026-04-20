<template>
  <DemoPreview></DemoPreview>
</template>
<script>
  import createStoriesPreview from '@lcap/builder/input/vue2/stories-preview';
  import * as stories from '../stories/block.stories';
  
  const DemoPreview = createStoriesPreview(stories);
  
  export default {
  components: {
      DemoPreview,
    },
  };
  
  </script>