/**
 * has to be a const (not enum) because it is used for @Hostlistener
 */
export const USER_EVENTS = { 
  touchStart: 'touchstart',
  touchEnd: 'touchend',
  touchMove: 'touchmove',
  mouseDown: 'mousedown',
  mouseUp: 'mouseup',
  mouseMove: 'mousemove',
  pointerMove: "window:pointermove"
}