class Screen {
  constructor(gameBody) {
    this.gameBody = qs(".game-body")
    this.equation = cecl("section", "equation")
    this.appendEq = ac(this.gameBody, this.equation)
  }

  appendNum = (num, classname) => {
    let numbox
    if (classname === "invisible") {
      numbox = cecl("div", "input-wrapper")
      let input = cecl("input", classname)
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