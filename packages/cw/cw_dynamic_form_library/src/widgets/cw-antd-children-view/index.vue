<template>
  <draggable  class="dragArea" tag="ul" :list="tasks" group="people">
    <!-- <li style="margin-left:10px" v-for="el in tasks" :key="el.tag">
      <p>{{ el.tag }}</p>
      <nested-draggable :tasks="el.chilren" />
    </li> -->
            <a-col  :data-id="item.uid"  class="cell-room" :span="3 * 8"  v-for="(item,index) in tasks" :key="item.uid"  >
               <a-form-item  v-if="item.belong==='form'" :label="item.label"   >
                  <component :placeholder="item.placeholder" style="pointer-events: none;" :readOnly="true" v-decorator="[
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
                <a-form-item :wrapperCol="{span:24}" v-else-if="item.belong==='table'" :colon="false"   :label="null" >
                 <component style="pointer-events: none;" :readOnly="true" 
                  :is="item.tag" 
                   v-bind="[item.selfProps]"
                  ></component>
                </a-form-item>
                <a-form-item v-else :colon="false"   :label="null" >
                    <component :readOnly="true" 
                      :is="item.tag" 
                      v-bind="[item.selfProps]"
                      >
                      <div style="height: 80px;">
                      <draggable group="people" :list="item.children">
                        <a-col class="cell-room" :span="8" > <div>132</div> </a-col >
                        <a-col class="cell-room" :span="8" > <div>135</div></a-col >
                      </draggable>
                    </div>
                    </component>
                </a-form-item>
                <div class="action-room" > 
                  <div class="rect-view-remove" @click="handleItemRomeve">删除</div>
                  <div class="rect-view-clone" @click="handleItemClone">复制</div>
                </div>
              </a-col>
  </draggable>
</template>
<script>
import draggable from "vuedraggable";

export default {
  props: {
    tasks: {
      required: true,
      type: Array
    }
  },
  components: {
    draggable
  },
  watch: {
    tasks(val) {
      // console.log(val,222);
    }
 },
  name: "nested-draggable",
  methods: {
    handleItemRomeve() {
      this.pageComponentList =   this.pageComponentList.filter(item => item.uid !== this.selectItem.uid)
    },
    handleItemClone() {
      const item = JSON.parse(JSON.stringify(this.selectItem))
      item.uid = (Math.random() * 100000000000).toFixed(0)
      item.name =item.name + 1
      this.pageComponentList.splice(this.pageComponentList.indexOf(this.selectItem)+1, 0, item)
    },
  }
};
</script>
<style scoped>
.dragArea {
  min-height: 50px;
  background: red;
  outline: 1px dashed;
}
</style>