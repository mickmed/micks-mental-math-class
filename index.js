let cecl = (el, className) => {
  let div = document.createElement(el)
  div.className = className
  return div
}
let qs = (el) => {
  return document.querySelector(el)
}
let qsa = (el) => {
  return document.querySelectorAll(el)
}
let ac = (parent, child) => {
  return parent.appendChild(child)
}
let randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

let randomNumEvens = (min, max) => {
  let num = Math.floor(Math.random() * (max - min + 1)) + min

  if (num % 2 === 0) {
    return num
  } else {
    return randomNumEvens(min, max)
  }
}

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
      numbox.innerText = 'check'
    } else {
      numbox = cecl("div", classname)
      numbox.innerText = num
    }
    ac(this.appendEq, numbox)
  }
  // boxInput.addEventLister('keydown', ()=>{
  //   console.log(boxInput.value)

  // })
}

//** GAME  **//
class Game {
  constructor(a, b, operator, equationCount, allCorrect) {
    this.value1 = a
    this.value2 = b
    this.operator = operator
    this.answer = 0
    this.equationCount = equationCount
    this.allCorrect = allCorrect
  }

  eqVals = () => {
    let firstNum = randomNum(this.value1, this.value2)
    let secondNum = randomNum(this.value1, this.value2)

    if (this.operator === "+") {
      this.answer = firstNum + secondNum
    }
    if (this.operator === "-") {
      this.answer = firstNum - secondNum
    }
    if (this.operator === "*") {
      this.answer = firstNum * secondNum
    }

    let numboxes = [
      firstNum,
      this.operator,
      secondNum,
      "=",
      this.answer,
      "check",
    ]
    let screen = new Screen()
    let invisibleBoxIdx = randomNumEvens(0, numboxes.length)
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

      screen.appendNum(num, classname)

      if (!isNaN(num) && i === invisibleBoxIdx) {
        invisibleVal = num
      }
    })
    let boxInput = qsa(".invisible")
    boxInput[this.equationCount].focus()
    let check = qsa('.check')
    check[this.equationCount].addEventListener('click', (e) => {
      this.checkAnswer(boxInput[this.equationCount], invisibleVal)
    })

    console.log(boxInput[this.equationCount], this.equationCount)
    // console.log(invisibleVal)
    boxInput[this.equationCount].addEventListener("keydown", (e) => {
      if (e.keyCode === 13) {
        this.checkAnswer(boxInput[this.equationCount], invisibleVal)
      }
    })


  }

  checkAnswer = (boxInput, invisibleVal) => {
    if (parseInt(boxInput.value) === invisibleVal) {
      console.log(invisibleVal)
      this.allCorrect.push(invisibleVal)
      console.log(this.allCorrect)
    } else {
      this.allCorrect.push(false)
    }
    this.equationCount += 1
    console.log(this.allCorrect.length)
    if (this.allCorrect.length < 5) {
      let game = new Game(1, 3, "-", this.equationCount, this.allCorrect)
      game.eqVals()
    }
  }
}

let game = new Game(0, 6, "+", 0, [])
game.eqVals()
