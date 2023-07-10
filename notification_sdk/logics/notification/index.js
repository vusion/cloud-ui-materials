/** 
 * @param {String} type <false> 这是一个描述
 * @param {String} title <false> 这是一个描述
 * @param {String} message <false> 这是一个描述
 * @param {Long} duration <false> 这是一个描述
 * @param {Boolean} showClose <false> 这是一个描述
 */
import  Notification  from 'element-ui/lib/notification';

export default (...options) => {
    // TODO
    const [type,title, message,duration=0,showClose=true] = options
    console.log(title, message,type,Notification);
    Notification({
        type,
        title,
        message,
        duration,
        showClose
    })
}