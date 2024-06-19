import { componentDefaultList } from "@/utils/setting"
export default {
    data() {
        return {
            componentDefaultList,
            componentMapSelfProps:{}
        }
    },
    methods: {
        getComponentMapSelfProps() {
            let objMap = {}
            this.componentDefaultList.forEach(item => {
                objMap[item.name] = item.property.filter(propertyItem => {
                    return propertyItem.type === "self"
                }).map(item => item.name)
            })
            this.customComponentList&&this.customComponentList.forEach(item => {
                objMap[item.name] = item.property.filter(propertyItem => {
                    return propertyItem.type === "self"
                }).map(item => item.name)
            })
            // console.log(objMap,objMap);
            this.componentMapSelfProps = objMap
        },
        
    }
  
}