export const  generateRandomNumber = (n) =>{
    var min = Math.pow(10, n - 1);
   var max = Math.pow(10, n) - 1;
   return Math.floor(Math.random() * (max - min + 1)) + min;
}
 
import includes from "lodash/includes"
import isEmpty from "lodash/isEmpty"

export const isSame = (b, d) => {
  if (isEmpty(b)) {
    b = false
  }
  if (isEmpty(d)||d==='undefined') {
    d = false
  }
  return b == d
}
window.isSame = isSame
export const isUnSame = (b, d) => { 
  return !isSame(b,d)
}

window.isUnSame = isUnSame
export const includesFun = (b,d) => {
  return includes(b,d)
}
window.includesFun = includesFun
export const unIncludesFun = (b,d) => {
  return !includes(b,d)
}
window.unIncludesFun = unIncludesFun

