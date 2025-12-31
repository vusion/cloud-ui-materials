/** 
 * @param {long} width0 临界宽度0，默认1920
 * @param {long} scale0 临界宽度0对应的缩放比例，默认1
 * @param {long} width1 临界宽度1，默认2560
 * @param {long} scale1 临界宽度1对应的缩放比例，默认1.25
 * @param {long} width2 临界宽度2，默认3840
 * @param {long} scale2 临界宽度2对应的缩放比例，默认1.75
 * @returns {long} result  
 */
export default (
    width0=1920, scale0=1,
    width1=2560, scale1=1.25,
    width2=3840, scale2=1.75,
    )=>{
    const body = document.body;
    let scale = 1;
    const windowWidth = screen.width;
    const getScale = (widthCurrent, widthStart, widthEnd, scaleStart, scaleEnd) =>
        (scaleEnd - scaleStart) * (widthCurrent - widthStart) / (widthEnd - widthStart) + 1;
    if (windowWidth >= width0 && windowWidth < width1) {
        scale = getScale(windowWidth, width0, width1, scale0, scale1);
    } else if (windowWidth >= width1 && windowWidth < width2) {
        scale = getScale(windowWidth, width1, width2, scale1, scale2);
    } else if (windowWidth >= width2) {
        scale = scale2;
    }
    const baseWidth = windowWidth / scale;
    body.style.transform = `scale(${scale})`;
    body.style.transformOrigin = '0 0';
    body.style.width = baseWidth + 'px';
    return scale;
}