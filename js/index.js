let count = 0
let answer = 0
let score = 0
let firstNumTotal = 0
let secondNumTotal = 0
const invisibleCollect = []
const scoreDiv = ac(qs("header"), cecl("div", "score"))
scoreDiv.innerText = 'score:'
const scoreTotal = ac(qs("header"), cecl("div", "score-total"))

//** GAME  **//
class Game {
  constructor(a, b, operator) {
    this.value1 = a
    this.value2 = b
    this.firstNum = null
    this.secondNum = null
    this.operator = operator
    
  }
  eqRandomize = () => {
    console.log("rand")
    this.firstNum = randomNum(this.value1, this.value2)
    this.secondNum = randomNum(this.value1, this.value2)
  }
  eqBonusRound = () => {
    this.firstNum = this.value1
    this.secondNum = this.value2
  }
  makeEq = () => {
    if (this.operator === "+") {
      answer = this.firstNum + this.secondNum
    }
    if (this.operator === "-") {
      answer = this.firstNum - this.secondNum
    }
    if (this.operator === "*") {
      answer = this.firstNum * this.secondNum
    }
  }
  appendEq = () => {
    this.makeEq()
    let numboxes = [
      this.firstNum,
      this.operator,
      this.secondNum,
      "=",
      answer,
      "check",
    ]
    let screen = new Screen()
    let invisibleVal = screen.setClassnames(numboxes)
    let boxInput = qsa(".invisible")
    boxInput[count].focus()
    qsa(".check")[count].addEventListener("click", async (e) => {
      this.checkAnswer(boxInput[count], invisibleVal)
    })
    boxInput[count].addEventListener("keydown", async (e) => {
      if (e.keyCode === 13) {
        this.checkAnswer(boxInput[count], invisibleVal)
      }
    })
  }
  checkAnswer = (boxInput, invisibleVal) => {
    console.log(boxInput, invisibleVal)
    if (parseInt(boxInput.value) === invisibleVal) {
      invisibleCollect.push(boxInput.value)

      qsa(".check")[count].innerText = 10
      score += 10

      scoreTotal.innerText = ''
      scoreTotal.innerText = score    
    } else {
      invisibleCollect.push(false)
    }
    firstNumTotal += this.firstNum
    secondNumTotal += this.secondNum

    console.log("ic", invisibleCollect)
    this.checkAnswers()
  }
  checkAnswers = () => {
    if (invisibleCollect.length < 5) {
      count++
      this.newGame()
    } else if (invisibleCollect.length === 5) {
      if (invisibleCollect.includes(false)) {
        console.log("end", firstNum)
        const modalMessage = new ModalMessage()
        modalMessage.appendMsg("")
      } else {
        const bonusLine = cecl("hr", "bonus-line")
        gameBody.appendChild(bonusLine)
        count += 1
        console.log("fri", firstNumCollect)
        this.newGame("bonus")
      }
    } else if (invisibleCollect.length > 5) {
      console.log("bonus answer")
      const modalMessage = new ModalMessage()
      modalMessage.appendMsg()
    }
  }
  newGame = (bonus) => {
    if (bonus !== "bonus") {
      let game = new Game(1, 3, "+", this.allCorrect)
      game.eqRandomize()
      game.appendEq()
    } else {
      let a = firstNum
      let b = sumArray(secondNumCollect)
      console.log(a, b)
      let game = new Game(a, b, "+")
      game.eqBonusRound()
      game.appendEq()
    }
  }
}
let game = new Game(0, 6, "+")
game.eqRandomize()
game.appendEq()
