/** 
 */
export default (options)=>{
    // TODO
    if (window.OaInvoker) {
        window.OaInvoker.invoke('GO_BACK')
    } else {
        throw new Error('请先初始化OA SDK')
    }
}