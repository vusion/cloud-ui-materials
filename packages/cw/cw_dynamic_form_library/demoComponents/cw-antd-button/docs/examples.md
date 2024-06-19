### 按钮类型 

``` html
<div style="display:flex;">
    <cw-antd-button type="primary">
      Primary
    </cw-antd-button>
    <cw-antd-button>Default</cw-antd-button>
    <cw-antd-button type="dashed">
      Dashed
    </cw-antd-button>
    <cw-antd-button type="danger">
      Danger
    </cw-antd-button>
    <a-config-provider :auto-insert-space-in-button="false">
      <cw-antd-button type="primary">
        按钮
      </cw-antd-button>
    </a-config-provider>
    <cw-antd-button type="primary">
      按钮
    </cw-antd-button>
    <cw-antd-button type="link">
      Link
    </cw-antd-button>
</div>
```

### 按钮组合

``` html
<div style="display:flex;">
<cw-antd-button type="primary" shape="circle" icon="search" />
    <cw-antd-button type="primary" shape="circle">
      A
    </cw-antd-button>
    <cw-antd-button type="primary" icon="search">
      Search
    </cw-antd-button>
    <cw-antd-button shape="circle" icon="search" />
    <cw-antd-button icon="search">
      Search
    </cw-antd-button>
    <cw-antd-button shape="circle" icon="search" />
    <cw-antd-button icon="search">
      Search
    </cw-antd-button>
    <cw-antd-button type="dashed" shape="circle" icon="search" />
    <cw-antd-button type="dashed" icon="search">
      Search
    </cw-antd-button>
</div>
```
### 多个按钮组合

``` html
<div style="display:flex;">
    <cw-antd-button type="primary">
      Primary
    </cw-antd-button>
    <cw-antd-button>secondary</cw-antd-button>
    <a-dropdown>
      <a-menu slot="overlay" @click="handleMenuClick">
        <a-menu-item key="1">
          1st item
        </a-menu-item>
        <a-menu-item key="2">
          2nd item
        </a-menu-item>
        <a-menu-item key="3">
          3rd item
        </a-menu-item>
      </a-menu>
      <cw-antd-button> Actions <a-icon type="down" /> </cw-antd-button>
    </a-dropdown>
  </div>
```

### 多个按钮组合

``` html
    <div style="display:flex;">
    <cw-antd-button type="primary" block>
      Primary
    </cw-antd-button>
    <cw-antd-button block>
      Default
    </cw-antd-button>
    <cw-antd-button type="dashed" block>
      Dashed
    </cw-antd-button>
    <cw-antd-button type="danger" block>
      Danger
    </cw-antd-button>
    <cw-antd-button type="link" block>
      Link
    </cw-antd-button>
  </div>
```

### loading

``` html
    <div style="display:flex;">
    <cw-antd-button type="primary" loading>
      Loading
    </cw-antd-button>
    <cw-antd-button type="primary" size="small" loading>
      Loading
    </cw-antd-button>
    <br />
    <cw-antd-button type="primary" :loading="loading" @mouseenter="enterLoading">
      mouseenter me!
    </cw-antd-button>
    <cw-antd-button type="primary" icon="poweroff" :loading="iconLoading" @click="enterIconLoading">
      延迟1s
    </cw-antd-button>
    <br />
    <cw-antd-button type="primary" loading />
    <cw-antd-button type="primary" shape="circle" loading />
    <cw-antd-button type="danger" shape="round" loading />
  </div>
```