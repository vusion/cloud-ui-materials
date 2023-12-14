

### 基本用法

``` html
<cw-equity-chart :nodeData="{
                    nodes: [
                    {
                        companyBrightness: null,
                        companyCountry: '中国',
                        id: '0',
                        label: 'chen_是控制主体_投资公司1'
                    },
                    {
                        id: '1',
                        label: 'BVI/英属维尔京群岛',
                        companyCountry: 'BVI/英属维尔京群岛'
                    },
                    {
                        id: '2',
                        label: '网易（香港）有限公司',
                        companyCountry: '美国'
                    },
                    {
                        id: '3',
                        label: '香港网易互动娱乐(HK)',
                        companyCountry: '英国'
                    },
                    {
                        id: '4',
                        label: 'Makers Ventures Limited',
                        companyCountry: '加拿大'
                    },
                    {
                        id: '5',
                        label: '澳门宝船软件技术有限公司',
                        companyCountry: '法国'
                    },
                    {
                        id: '7',
                        label: '法国宝船软件技术有限公司',
                        companyCountry: '西班牙',
                    },
                    {
                        id: '8',
                        label: '瑞士宝船软件技术有限公司',
                        companyCountry: '爱尔兰'
                    },
                    {
                        id: '9',
                        label: '大的宝船软件技术有限公司',
                        companyCountry: '新加坡',
                    },
                    {
                        id: '10',
                        label: '方法宝船软件技术有限公司',
                        companyCountry: '日本',
                    },
                    {
                        id: '11',
                        label: '11广告宝船软件技术有限公司',
                        companyCountry: '香港'
                        
                    },
                    {
                        id: '13',
                        label: '13哥哥宝船软件技术有限公司',
                        companyCountry: '澳门'
                    },
                    {
                        id: '14',
                        label: '14得到的宝船软件技术有限公司',
                        companyCountry: '台湾'
                    },
                     {
                        id: '15',
                        label: '152得到的宝船软件技术有限公司',
                        companyCountry: '台湾'
                    }
                    ],
                    edges: [
                        {
                            source: '0',
                            target: '1',
                            label: '100%',
                            companyBrightness: true
                        },
                        {
                            source: '0',
                            target: '2',
                            label: '100%',
                            companyBrightness: true
                        },
                        {
                            source: '0',
                            target: '3',
                             label: '100%'
                        },
                        {
                            source: '0',
                            target: '4',
                             label: '100%',
                        },
                        {
                            source: '0',
                            target: '5',
                             label: '100%',
                        },
                        {
                            source: '0',
                            target: '7',
                             label: '100%',
                        },
                        {
                            source: '0',
                            target: '8',
                            label: '100%',
                            type: 'x-flow-line-tree'
                        },
                        {
                            source: '0',
                            target: '9',
                             label: '100%',
                        },
                        {
                            source: '0',
                            target: '10',
                             label: '100%',
                        },           
                      
                        {
                            source: '2',
                            target: '14', // 目标是不是VIE公司
                            companyAttribute: 'VIE主体',
                            companyBrightness: true,
                            label: '100%',
                        },
                         {
                            source: '14',
                            target: '15', // 目标是不是VIE公司
                            companyBrightness: true,
                            label: '100%',
                        },
                        {
                            source: '7',
                            target: '8',
                            label: '100%',
                        },

                    ]
           }"></cw-equity-chart>
```
