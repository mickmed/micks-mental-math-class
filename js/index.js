let count = 0
let answer = 0
let score = 0
let level = 1
let firstNumTotal = 0
let secondNumTotal = 0
const invisibleCollect = []
const scoreDiv = ac(qs("header"), cecl("div", "score"))
scoreDiv.innerText = "score:"
const scoreTotal = ac(qs("header"), cecl("div", "score-total"))
const checkAnsKey = null
const checkAnsClk = null

//** GAME  **//
class Game {
  constructor(a, b, operator, bonus) {
    this.value1 = a
    this.value2 = b
    this.firstNum = null
    this.secondNum = null
    this.operator = operator
    this.bonus = bonus
  }
  eqRandomize = () => {
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
    console.log(count)
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
    let boxInput = qsa(".invisible")[count]
    boxInput.focus()
    let check = qsa('.check')[count]
   

    this.checkAnsClk = () => {
      this.checkAnswer(boxInput, check, invisibleVal)
    }
    this.checkAnsKey = (e) => {
      e.keyCode === 13 && this.checkAnswer(boxInput, check, invisibleVal)
    }
    check.addEventListener("click", this.checkAnsClk)
    boxInput.addEventListener("keydown", this.checkAnsKey)
  }

  checkAnswer = (boxInput, check, invisibleVal) => {
    if (invisibleCollect.length < 6) {
      if (parseInt(boxInput.value) === invisibleVal) {
        invisibleCollect.push(boxInput.value)
        check.innerText = 10
        score += 10
      } else {
        invisibleCollect.push(false)
      }

      firstNumTotal += this.firstNum
      secondNumTotal += this.secondNum

      this.checkAnswers(boxInput, check)
    }
  }

  checkAnswers = (boxInput, check) => {
    if (invisibleCollect.length < 5) {
      this.newGame()
    }
    if (invisibleCollect.length === 5) {
      if (!invisibleCollect.includes(false)) {
        const bonusLine = cecl("hr", "bonus-line")
        gameBody.appendChild(bonusLine)

        this.newGame("bonus")
      } else {
        this.modalMessage(score, level)
      }
    }

    if (invisibleCollect.length > 5) {
      
      check.innerText = 50
      score += 40
      console.log(score)
      this.modalMessage(score, level)
    }
    scoreTotal.innerText = ""
    scoreTotal.innerText = score
    console.log(score)
    check.removeEventListener("click", this.checkAnsClk)
    boxInput.removeEventListener("keydown", this.checkAnsKey)
  }
  newGame = (bonus) => {
    count++
    
    if (bonus !== "bonus") {
      let game = new Game(1, level, "+")
      game.eqRandomize()
      game.appendEq()
    } else {
      let a = firstNumTotal
      let b = secondNumTotal
      console.log(a, b)
      let game = new Game(a, b, "+", "bonus")
      game.eqBonusRound()
      game.appendEq()
    }
  }

  modalMessage = () => {
    const modalMessage = new ModalMessage(`score: ${score}`, level)
  }
}
let game = new Game(1, level, "+")
game.eqRandomize()
game.appendEq()
