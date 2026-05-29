<!-- 间距 -->

<template>
  <div><u-linear-layout direction="vertical">
    <u-linear-layout>
        <u-linear-layout display="inline" gap="small">
            <u-button>Button</u-button>
            <u-button>Button</u-button>
            <u-button>Button</u-button>
        </u-linear-layout>
        <u-linear-layout display="inline" gap="none">
            <u-button>Button</u-button>
            <u-button>Button</u-button>
            <u-button>Button</u-button>
        </u-linear-layout>
        <u-linear-layout display="inline" gap="shrink">
            <u-button>Button</u-button>
            <u-button>Button</u-button>
            <u-button>Button</u-button>
        </u-linear-layout>
    </u-linear-layout>
    <u-linear-layout direction="vertical" gap="large">
        <u-linear-layout gap="normal">
            <u-button>Button</u-button>
            <u-button>Button</u-button>
            <u-button>Button</u-button>
        </u-linear-layout>
        <u-linear-layout gap="large">
            <u-button>Button</u-button>
            <u-button>Button</u-button>
            <u-button>Button</u-button>
        </u-linear-layout>
    </u-linear-layout>
</u-linear-layout></div>
</template>