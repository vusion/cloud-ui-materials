const resizer = {
    bind(el, binding) { 
        binding.arg = binding.arg || 'vertical';
        const createDivider = (el,binding) => {
            el.style.position = 'relative'
            let divider = document.createElement('div')
            divider.setAttribute('class', 'ide-divider ' + binding.arg)
            el.appendChild(divider)
            return divider
        }

        const handleResize = (targetElement, clientX) => {
            const horizontal = binding.arg === 'horizontal' ? true : false;
            const { left, top } = targetElement.getBoundingClientRect();
            const {width} =  targetElement.parentNode.getBoundingClientRect()
            const { offsetWidth, offsetHeight } = targetElement;
            const position = horizontal ? clientX - left : clientY - top;
            const containerSize = horizontal ? offsetWidth : offsetHeight;
            const basis = (position / width)*100+'%'
            return basis
        }
        let target = null
        const handleMouseUp = () => {
            target = null
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }

        const handleMouseMove = (e) => {
            let dx = e.clientX
            let dy = e.clientY
            // let children = getChildren(el)
            console.log(el,"el");
            const _boundingClientRect = el.parentNode.getBoundingClientRect();
            _boundingClientRect.width
            
            // console.log(e.target.parentNode.style.width);
            // e.parentNode.style.width = dx + 'px'
            let weights = []
            let index = 0, nextIndex
            const basis = handleResize(el, dx, dy)
            el.style.flexBasis = basis
            // children.forEach((child, i) => {
            //     let weight = +(child.getAttribute('weight') || (1 / children.length))
            //     weights.push(weight)
            //     if (target && target.parentElement === child) {
            //         index = i
            //         nextIndex = i + 1
            //     }
            // })

            // let newWeights = handleResize(el, dx, dy, index, nextIndex, weights)

            // children.forEach((child, i) => {
            //     let weight = newWeights[i]
            //     child.style.flexGrow = weight
            //     child.setAttribute('weight', weight)
            // })

            // handleResizer(weights)
        }

        const handleMouseDown = (e) => {
            target = e.target
            e.preventDefault()
            document.addEventListener('mousemove', handleMouseMove, false)
            document.addEventListener('mouseup', handleMouseUp, false)
        }

        const init = () => {
            if (!el) {
                return
            }
            // const children = getChildren(el)
            // children.forEach((child, index) => {
            //     let weight = +(child.getAttribute('weight') || (1 / children.length))
            //     child.style.flexGrow = weight

            //     if (index < children.length - 1) {
            //         let divider = createDivider(child, binding)
            //         divider.addEventListener('mousedown', handleMouseDown, false)
            //     }
            // })
            let divider = createDivider(el, binding)
            divider.addEventListener('mousedown', handleMouseDown, false)
        }

        init()
    }
}


resizer.install = Vue.directive('panel-resizer', resizer)

export default resizer