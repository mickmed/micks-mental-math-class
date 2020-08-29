class Screen {
  constructor() {
    this.gameBody = qs(".game-body")
    this.equation = cecl("section", "equation")
    this.appendEq = ac(this.gameBody, this.equation)
  }

setClassnames=(numboxes)=>{
  let invisibleBoxIdx = randomNumEvens(0, numboxes.length - 1)
    let invisibleVal = null
    numboxes.forEach((num, i) => {
      let classname =
        !isNaN(num) && i === invisibleBoxIdx
          ? "invisible"
          : !isNaN(num)
          ? "numbox"
          : num === "check"
          ? "check"
          : "operator"
      this.appendNum(num, classname)
      if (!isNaN(num) && i === invisibleBoxIdx) {
        invisibleVal = num
      }
    })
    return invisibleVal
}


  appendNum = (num, classname) => {
    let numbox
    if (classname === "invisible") {
      numbox = cecl("div", "input-wrapper")
      let input = cecl("input", classname)
      input.type = 'number'
      input.inputMode = 'numeric'
      window.innerWidth < 600 && input.pattern="[0-9]*"
      console.log('vw', window.innerWidth)
      numbox.appendChild(input)
    } else if (classname === "check") {
      numbox = cecl("button", classname)
      numbox.innerText = "check"
    } else {
      numbox = cecl("div", classname)
      numbox.innerText = num
    }
    ac(this.appendEq, numbox)
  }
}