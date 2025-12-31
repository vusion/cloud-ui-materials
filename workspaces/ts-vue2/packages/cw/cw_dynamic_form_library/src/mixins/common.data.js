import json5 from 'json5'
export default {
    methods: {
          /* 数据源 */
        getDataSourceResult(dataSource) {
            if (dataSource&&["1","2","3"].includes(dataSource.type)) {
                return json5.parse(dataSource.des)
        } else {
        return []
        }
      },
      getJsonResultObj(str) {
        console.log(str);
        try {
          return  str?json5.parse(str):{}
        } catch (error) {
          return {}
        }
      },
    getJsonResultArr(str) {
      try {
        return  str?json5.parse(str):[]
      } catch (error) {
        return []
      }
      },
      json5Parse(str) {
        return json5.parse(str)
      },
    }
}