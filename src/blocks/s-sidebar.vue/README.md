# SSidebar 可嵌套侧边栏

```vue
<template>
<s-sidebar :config="config"></s-sidebar>
</template>
<script>
export default {
    data() {
        return {
            config: [
                {
                    title: '导航 1',
                    to: '/1',
                },
                {
                    title: '导航 2',
                    href: 'https://www.163yun.com/',
                },
                {
                    title: '导航 3',
                    children: [
                        {
                            title: '导航 3-1',
                            to: '/3-1',
                        },
                        {
                            title: '导航 3-2',
                            to: '/3-2',
                        },
                        {
                            subnav: [
                                {
                                    title: '导航 3-3',
                                    children: [
                                        {
                                            title: '导航 3-3-1',
                                            to: '/3-3-1',
                                        },
                                        {
                                            title: '导航 3-3-2',
                                            to: '/3-3-2',
                                        },
                                        {
                                            subnav: [
                                                {
                                                    title: '导航 3-3-3',
                                                    children: [
                                                        {
                                                            title: '导航 3-3-3-1',
                                                            to: '/3-3-3-1',
                                                        },
                                                        {
                                                            title: '导航 3-3-3-2',
                                                            to: '/',
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                '|',
                {
                    title: '导航 4',
                    to: '/4',
                },
            ],
        };
    },
}
</script>
```
