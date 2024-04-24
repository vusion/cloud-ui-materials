const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function fetchData() {
    return new Promise(async (resolve, reject) => {
        if (!window.annotationAllData) {
            console.log('正在请求');
            sleep(500).then(res => {
                console.log('等待结束');
                resolve(fetchData())
            })
        }else if (window.annotationAllData) {
            let {entityAll,logicAll} = window.annotationAllData
            let mylogicAnno = logicAll.find(it=>it.annotationName==="DataPermissionLogicAnnotation")
            let myEntityAnno = entityAll.find(it=>it.annotationName==="EntityPermissionAnnotation")
            let data = {
                entityAll:myEntityAnno&&myEntityAnno.entityList||[],
                logicAll: mylogicAnno&&mylogicAnno.logicList || [],
            }
            resolve(data);
        }
    });
}
/**
 * @param {string} el <false> 这是一个描述
 * @param {string} binding <false> 这是一个描述
 * @param {string} vnode <false> 这是一个描述
 * @param {string} oldVnode <false> 这是一个描述
 * @returns {string} result
 */
// 一个注解对应一个逻辑 一个yaml
// '["true","`默认值22`"]' 函数入参是按 anno.prop 的声明顺序
export default function (el, binding, vnode, oldVnode) {
    // api +  实体和ViewEle 的映射关系
    fetchData()
        .then(data => {
            console.log('Data:', data);
            // data.entityAll.map(entity => {
            //     let entityName = Object.keys(entity)[0]
            //     console.log('entityName: ', entityName);
            //     let entityProps = entity[entityName]
            //     let noneList = entityProps
            //         .filter(p => p.columnRuleType === 'none')
            //         .map(p => p.propertyName)
            //     console.log('noneList: ', noneList);
            // })
            let annotationAllData = JSON.parse(binding.value.replace(/'/g, '"'));
            let visible = true
            annotationAllData && annotationAllData.dataRefList && annotationAllData.dataRefList.map(ref => {
                console.log('ref: ', ref);
                // propName
                // "name"
                // typeName
                // "Entity1"
                // typeNamespace
                // "app.dataSources.defaultDS.entities"
                let enKey
                let list
                if (ref.typeNamespace.includes('app.dataSources')) {
                    let ds = ref.typeNamespace.split('.')[2]
                    enKey = `${ds}.${ref.typeName}`
                    list = data && data.entityAll
                }
                if (ref.typeNamespace.includes('app.logics')) {
                    // let ds = ref.typeNamespace.split('.')[2]
                    // todo
                    enKey = `${ref.typeName}`
                    list = data && data.logicAll
                }
                // let entityItem = list.find(entity => {
                //     let entityName = Object.keys(entity)[0]
                //     return entityName === enKey
                // })
                let enProps = list[enKey]
                if (enProps) {
                    // let enProps = entityItem[enKey]
                    if (enProps) {
                        // 此处假定逻辑返回的数据结构为多叉树 组件只能绑定叶子节点： 否则要比较 a.b.c a.b 的关系
                        let enProp = enProps.find(p => p.propertyName === ref.propName)
                        if (enProp) {
                            visible = enProp.columnRuleType !== 'none'

                        }
                    }
                }
                //   propName: entityPropName
            })
            if (el.__vue__ && el.__vue__.$options.name === 'u-table-view-column') {
                el.__vue__.currentHidden = !visible;
            }
            else {
                el && (el.style.display = visible ? '' : 'none');
            }
            console.log('前端注解 执行: ', annotationAllData, binding, vnode, oldVnode);
        })
        .catch(error => {
            console.error('Error:', error);
        });

}




