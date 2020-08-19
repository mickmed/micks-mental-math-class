let qsa = (el) => {
  return document.querySelectorAll(el)
}
let qs = (el) => {
  return document.querySelector(el)
}
let cecl = (el, className) => {
  let div = document.createElement(el)
  div.className = className
  return div
}
let ac = (parent, child) => {
  return parent.appendChild(child)
}
let gameBody = qs(".game-body")