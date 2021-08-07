
export const dabounce = (fn, timeout) => {
  let timer = null
  return function(){
    if(timer){
      clearTimeout(timer)
      return
    }
    const args = arguments
    timer = setTimeout(() => {      
      fn.apply(this, args)
      timer = null
    }, timeout)
  }
}

