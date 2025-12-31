### 基本用法

``` html
<cw-equity-chart :nodeData="{
                    nodes: [
                     {
                        id: '0',
                        label: '网易（香港）有限公司',
                        companyCountry: '美国',
                        position:'center',
                        x: 300,
                        y:100
                    },
                    {
                        id: '1',
                        label: '股东一',
                        companyCountry: '开曼'
                    },
                    {
                        id: '2',
                        label: 'BVI (维尔京群岛)的相关相关公司',
                        companyCountry: 'BVI (维尔京群岛)'
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
                        label: 'Makers Ventures Limited',
                        companyCountry: '加拿大'
                    },
                      {
                        id: '6',
                        label: 'Makers Ventures Limited',
                        companyCountry: '加拿大'
                    }
                    ],
                    edges: [
                        {
                            source: '1',
                            target: '0',
                            label: '100%',
                            companyBrightness: true
                        },
                        {
                            source: '2',
                            target: '0',
                            label: '100%',
                        },
                        {
                            source: '0',
                            target: '3',
                        },
                        {
                            source: '0',
                            target: '4',
                        },
                         {
                            source: '5',
                            target: '0',
                        },
                        {
                            source: '6',
                            target: '0',
                        }
                    ]
           }"></cw-equity-chart>
```
