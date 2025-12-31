<template>
  <div class="row">
    <div class="col-8">
      <h3>Nested draggable</h3>
      <dragable-designer :tasks="list" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'nested-example',
  display: 'Nested',
  data() {
    return {
      list: [
        {
          name: 'task 1',
          tasks: [
            // {
            //   name: 'task 2',
            //   tasks: [],
            // },
          ],
        },
        {
          name: 'task 3',
          tasks: [
            {
              name: 'task 4',
              tasks: [
                {
                  name: 'task  6',
                  tasks: [],
                },
              ],
            },
          ],
        },
        {
          name: 'task 5',
          tasks: [],
        },
      ],
    };
  },
};
</script>
<style scoped></style>
