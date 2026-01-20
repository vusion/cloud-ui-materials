<template>
  <div :class="isInNavbar ? $style.root : $style.dropdownRoot" ref="root" @click.stop data-nodepath="" data-enable-events="click">
    <div :class="$style.head" :selected="selected" :isInNavbar="isInNavbar" vusion-click-enabled>
      <div
        :class="$style.title"
        :vusion-slot-name-edit="isInNavbar ? 'navbarNode' : 'nonLeafNode'"
        :vusion-slot-name="isInNavbar ? 'navbarNode' : 'nonLeafNode'"
      >
        <!-- 此处只能是导航栏插槽 或 非叶子节点插槽 -->
        <slot v-if="isInNavbar" name="navbarNode" :item="node" :index="index">
          {{ title }}
        </slot>
        <slot v-else name="nonLeafNode" :item="node" :index="index">
          {{ title }}
        </slot>
        <!-- <s-empty v-if="(!$slots.navbarNode || !$slots.nonLeafNode) && !title && $env.VUE_APP_DESIGNER && !!$attrs['vusion-node-path']"></s-empty> -->
      </div>
      <div v-if="!isInNavbar">
        <u-loading v-if="loading" :icon="rootVM.loadingIcon" size="small"></u-loading>
        <i-ico v-else-if="rootVM.popupExpandIcon" :name="rootVM.popupExpandIcon" :class="[$style.expander, $style.popupExpandIcon]"></i-ico>
        <span v-else :class="$style.expander"></span>
      </div>
    </div>
    <m-popper
      ref="popper"
      v-if="!loading"
      :class="$style.popper"
      :trigger="$env.VUE_APP_DESIGNER ? 'click' : trigger || rootVM.trigger"
      :placement="placement"
      :disabled="disabled"
      :reference="$refs.root"
      append-to="reference"
      :opened="$env.VUE_APP_DESIGNER && collapsible === false ? false : currentExpanded"
      @before-open="($event) => collapsible === false && $event.preventDefault()"
      @update:opened="toggle($event)"
      :offset="popperOffset"
    >
      <div :class="$style.body" @click.stop="" vusion-slot-name="default" v-show="currentCollapsible ? currentExpanded : true">
        <template v-for="(childNode, idx) in childrenNodes">
          <u-navbar-dynamic-group
            v-if="hasChildren(childNode)"
            :key="$at2(childNode, rootVM.valueField) || idx"
            :node="childNode"
            :disabled="childNode.disabled"
            :collapsible="$at2(childNode, rootVM.collapsibleField)"
            :title="$at2(childNode, rootVM.textField)"
            :icon="$at2(node, rootVM.iconField)"
            :inner-idx="idx"
            :trigger="childNode.trigger"
            :index="idx"
          >
            <!-- 后续子节点只能是 非叶子节点插槽 或 叶子节点插槽 -->
            <template #nonLeafNode="slotProps">
              <slot name="nonLeafNode" v-bind="slotProps"></slot>
            </template>
            <template #leafNode="slotProps">
              <slot name="leafNode" v-bind="slotProps"></slot>
            </template>
          </u-navbar-dynamic-group>
          <u-navbar-dynamic-item
            v-else
            :key="`${$at2(childNode, rootVM.valueField) || idx}`"
            :text="$at2(childNode, rootVM.textField)"
            :replace="$at2(childNode, rootVM.replaceField)"
            :exact="$at2(childNode, rootVM.exactField)"
            :value="$at2(childNode, rootVM.valueField)"
            :item="childNode"
            :icon="$at2(childNode, rootVM.iconField)"
            :link-type="$at2(childNode, rootVM.linkTypeField)"
            :href-and-to="$at2(childNode, rootVM.hrefAndToField)"
            :to="$at2(childNode, rootVM.toField)"
            :target="$at2(childNode, rootVM.targetField)"
            :disabled="childNode.disabled"
            :node="childNode"
            :index="idx"
          >
            <!-- 后续子节点只能是 叶子节点插槽 -->
            <template #leafNode="slotProps">
              <slot name="leafNode" v-bind="slotProps"></slot>
            </template>
          </u-navbar-dynamic-item>
        </template>
        <slot></slot>
        <div
          v-if="!$slots.default && !hasChildren(node) && $env.VUE_APP_DESIGNER && !!$attrs['vusion-node-path']"
          vusion-empty-background="add-sub"
          style="padding: 20px 0"
        ></div>
      </div>
    </m-popper>
    <template v-if="isInNavbar">
      <i-ico v-if="loading" :class="[$style.icon, $style.iconLoading]" :name="rootVM.loadingIcon"></i-ico>
      <i-ico v-else :class="[$style.icon, { [$style.iconExpanded]: currentExpanded }]" :name="rootVM.expandIcon"></i-ico>
    </template>
  </div>
</template>

<script>
import UNavbarDynamicItem from './dynamic-item.vue';
import UNavbarGroupMulti from './group.vue';

export default {
  name: 'u-navbar-dynamic-group',
  extends: UNavbarGroupMulti,
  components: {
    UNavbarDynamicItem,
  },
  props: {
    index: { type: Number, default: undefined },
  },
};
</script>
