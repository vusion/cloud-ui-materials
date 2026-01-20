<!-- 导航栏 - 数据源三级目录示例 -->

<template>
  <div>
    <gx-u-navbar-multi
      :has-data-source="true"
      :data-source="navData"
      text-field="text"
      value-field="value"
      icon-field="icon"
      to-field="to"
      parent-field="parent"
      :optionIsSlot="optionIsSlot"
      trigger="click">
      <template #left>
        <u-multi-layout-item align-items="center" style="width: 200px">
          <u-image
            fit="cover"
            src="https://static-vusion.163yun.com/assets/lcap-logo-light.svg"
            style="
              width: 28px;
              height: 28px;
              margin: 16px 14px;
              --custom-start: auto;
              vertical-align: middle;
            "></u-image>
          <u-text
            text="应用名称"
            size="large"
            style="color: white; --custom-start: auto; vertical-align: middle"></u-text>
        </u-multi-layout-item>
      </template>
      <template #right>
        <u-multi-layout-item align-items="center" justify="end">
          <u-dropdown style="margin-right: 10px; color: inherit">
            <template #title>
              <u-linear-layout gap="small">
                <u-image
                  fit="cover"
                  src="https://static-vusion.163yun.com/assets/avatar-default.svg"
                  style="width: 36px; height: 36px; vertical-align: middle"></u-image>
                <span
                  style="
                    display: inline-block;
                    vertical-align: top;
                    margin-left: 10px;
                    margin-right: 10px;
                    color: white;
                  ">
                  <u-text text="张三"></u-text>
                </span>
              </u-linear-layout>
            </template>
            <template #default>
              <u-dropdown-item text="安全退出"></u-dropdown-item>
            </template>
          </u-dropdown>
        </u-multi-layout-item>
      </template>
      <template #navbarNode="current">
       {{ current.item.icon }}  {{ current.item.text + 'navbarNode' }} {{ current.index }}
      </template>
      <template #nonLeafNode="current">
       {{ current.item.icon }}  {{ current.item.text + 'nonLeafNode' }} {{ current.index }}
      </template>
      <template #leafNode="current">
        {{ current.item.icon }}  {{ current.item.text + 'leafNode' }} {{ current.index }}
      </template>
      <u-navbar-item-multi text="Item 1"></u-navbar-item-multi>
    </gx-u-navbar-multi>
    <button @click="optionIsSlot = !optionIsSlot">切换</button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ExamplesDemo3',
  data() {
    return {
      optionIsSlot: true,
      // 三级目录数据源
      navData: [
        // 一级菜单
        {
          text: '首页',
          value: 'home',
          icon: 'home',
          to: '/home',
          disabled: false,
        },
        {
          text: '产品管理',
          value: 'product',
          icon: 'package',
          to: '/product',
          disabled: false,
        },
        {
          text: '系统设置',
          value: 'system',
          icon: 'setting',
          to: '/system',
          disabled: false,
        },
        // 二级菜单 - 产品管理
        {
          text: '产品列表',
          value: 'product-list',
          icon: 'list',
          to: '/product/list',
          parent: 'product',
          disabled: false,
        },
        {
          text: '产品分类',
          value: 'product-category',
          icon: 'folder',
          to: '/product/category',
          parent: 'product',
          disabled: false,
        },
        {
          text: '产品分析',
          value: 'product-analysis',
          icon: 'chart',
          to: '/product/analysis',
          parent: 'product',
          disabled: true, // 禁用项
        },
        // 三级菜单 - 产品分类
        {
          text: '分类管理',
          value: 'category-manage',
          icon: 'folder-open',
          to: '/product/category/manage',
          parent: 'product-category',
          disabled: false,
        },
        {
          text: '分类统计',
          value: 'category-statistics',
          icon: 'statistics',
          to: '/product/category/statistics',
          parent: 'product-category',
          disabled: false,
        },
        {
          text: '分类设置',
          value: 'category-setting',
          icon: 'setting',
          to: '/product/category/setting',
          parent: 'product-category',
          disabled: true, // 禁用项
        },
        // 二级菜单 - 系统设置
        {
          text: '用户管理',
          value: 'user-manage',
          icon: 'user',
          to: '/system/user',
          parent: 'system',
          disabled: false,
        },
        {
          text: '权限管理',
          value: 'permission',
          icon: 'lock',
          to: '/system/permission',
          parent: 'system',
          disabled: false,
        },
        {
          text: '系统配置',
          value: 'system-config',
          icon: 'config',
          to: '/system/config',
          parent: 'system',
          disabled: false,
        },
        // 三级菜单 - 用户管理
        {
          text: '用户列表',
          value: 'user-list',
          icon: 'list',
          to: '/system/user/list',
          parent: 'user-manage',
          disabled: false,
        },
        {
          text: '角色管理',
          value: 'role-manage',
          icon: 'user-group',
          to: '/system/user/role',
          parent: 'user-manage',
          disabled: false,
        },
        {
          text: '用户统计',
          value: 'user-statistics',
          icon: 'chart',
          to: '/system/user/statistics',
          parent: 'user-manage',
          disabled: false,
        },
        // 三级菜单 - 权限管理
        {
          text: '权限配置',
          value: 'permission-config',
          icon: 'config',
          to: '/system/permission/config',
          parent: 'permission',
          disabled: false,
        },
        {
          text: '权限日志',
          value: 'permission-log',
          icon: 'log',
          to: '/system/permission/log',
          parent: 'permission',
          disabled: false,
        },
      ],
    };
  },
};
</script>
