<template>
  <div>
    <a-form-item v-if="item.belong === 'form'" :label="formInfo.serial ? item.idx + item.label : item.label">
      <component
        v-bind="[item.selfProps]"
        :placeholder="item.placeholder"
        style="pointer-events: none"
        :readOnly="true"
        v-decorator="[
          `${item.name}`,
          {
            rules: item.rules,
            initialValue: item.defaultValue,
          },
        ]"
        :is="item.tag"
      >
      </component>
    </a-form-item>
    <a-form-item :wrapperCol="{ span: 24 }" v-else-if="item.belong === 'table'" :colon="false" :label="null">
      <component style="pointer-events: none" :readOnly="true" :is="item.tag" v-bind="[item.selfProps]"></component>
    </a-form-item>
    <a-form-item class="form-view" :wrapperCol="{ span: 24 }" v-else :colon="false" :label="null">
      <component :readOnly="true" style="pointer-events: none" :is="item.tag" v-bind="[item.selfProps]">
        <draggable group="people" :list="item.children">
          <a-col class="cell-room" :span="8" v-for="it in item.children" :key="it.uid">
            <component style="pointer-events: none" :readOnly="true" :is="it.tag" v-bind="[it.selfProps]"></component>
          </a-col>
        </draggable>
      </component>
    </a-form-item>
  </div>
</template>
<script>
import draggable from 'vuedraggable';

export default {
  name: 'form-item-render',
  components: {
    draggable,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    formInfo: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
