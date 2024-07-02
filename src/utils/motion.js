// Linear interpolation
export const lerp = (a, b, n) => (1 - n) * a + n * b

// Gets the mouse position
export const getMousePos = (e) => {
  return {
    x: e.clientX,
    y: e.clientY,
  }
}

// Defines a debounce function to limit the rate at which a function can fire.
export const debounce = (func, delay) => {
  let timerId // Holds a reference to the timeout between calls.
  return (...args) => {
    clearTimeout(timerId) // Clears the current timeout, if any, to reset the debounce timer.
    timerId = setTimeout(() => {
      func.apply(this, args) // Calls the passed function after the specified delay with the correct context and arguments.
    }, delay)
  }
}

export const calcWinsize = () => {
  return { width: window.innerWidth, height: window.innerHeight }
}

export const distance = (x1, y1, x2, y2) => {
  var a = x1 - x2
  var b = y1 - y2

  return Math.hypot(a, b)
}
