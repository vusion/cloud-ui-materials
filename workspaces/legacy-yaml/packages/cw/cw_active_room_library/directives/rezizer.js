const hasClass = (el, className) => { 
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
}
const resizer = {
    bind(el, binding) {
        binding.arg = binding.arg || 'vertical';
        const handleResizer = typeof binding.value === 'function' ? binding.value : () => {}

        const getChildren = (el) => {
            let childs = el.childNodes || []
            let children = []
            childs.forEach(child => {
                if (child.nodeType === 1 && !hasClass(child, 'ide-divider') && child.hasAttribute('weight')) {
                    children.push(child)
                }
            })
            return children
        }

        const createDivider = (el,binding) => {
            el.style.position = 'relative'
            let divider = document.createElement('div')
            divider.setAttribute('class', 'ide-divider ' + binding.arg)
            el.appendChild(divider)
            return divider
        }

        const handleResize = (targetElement, clientX, clientY, index, nextIndex, weights) => {
            const horizontal = binding.arg === 'horizontal' ? true : false;
            const { left, top } = targetElement.getBoundingClientRect();
            const { offsetWidth, offsetHeight } = targetElement;
            const position = horizontal ? clientX - left : clientY - top;
            const containerSize = horizontal ? offsetWidth : offsetHeight;
            console.log(index,weights,nextIndex);
            /**
             * 1.计算总共的比重
             * 2.计算resize前，当前容器它之前的容器比重之和
             */
            let totalWeight = 0;
            let subtotalWeight = 0;

            weights.forEach((weight, i) => {
                totalWeight += weight;

                if (i < nextIndex) subtotalWeight += weight;
            });

            // console.log('totalWeight', totalWeight, subtotalWeight, index)

            /**
             * 计算resize后的新比重
             *
             *   newWeight        position
             * ———————————— = ————————————————
             *  totalWeight     containerSize
             */

            const newWeight = (position / containerSize) * totalWeight;
            let deltaWeight = newWeight - subtotalWeight;

            /**
             * 能调整的最大最小的比重
             */
            deltaWeight = Math.max(deltaWeight, -weights[index]);
            deltaWeight = Math.min(deltaWeight, weights[nextIndex]);

            /**
             * 前一个容器  +=
             * 当前容器    -=
             */
            weights[index] += deltaWeight;
            weights[nextIndex] -= deltaWeight;

            return weights
        }

        

        let target

        const handleMouseDown = (e) => {
            target = e.target
            e.preventDefault()
            document.addEventListener('mousemove', handleMouseMove, false)
            document.addEventListener('mouseup', handleMouseUp, false)
        }
        const handleMouseMove = (e) => {
            let dx = e.clientX
            let dy = e.clientY
            let children = getChildren(el)
            let weights = []
            let index = 0, nextIndex

            children.forEach((child, i) => {
                let weight = +(child.getAttribute('weight') || (1 / children.length))
                weights.push(weight)
                if (target && target.parentElement === child) {
                    index = i
                    nextIndex = i + 1
                }
            })

            let newWeights = handleResize(el, dx, dy, index, nextIndex, weights)

            children.forEach((child, i) => {
                let weight = newWeights[i]
                child.style.flexGrow = weight
                child.setAttribute('weight', weight)
            })

            handleResizer(weights)
        }

        const handleMouseUp = () => {
            target = null
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }


        const init = () => {
            if (!el) {
                return
            }
            const children = getChildren(el)

            // console.log('children', children)

            children.forEach((child, index) => {
                let weight = +(child.getAttribute('weight') || (1 / children.length))
                child.style.flexGrow = weight

                if (index < children.length - 1) {
                    let divider = createDivider(child, binding)
                    divider.addEventListener('mousedown', handleMouseDown, false)
                }
            })
        }

        init()

    }
}   


resizer.install = Vue.directive('panel-resizer', resizer)

export default resizer