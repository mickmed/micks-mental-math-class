class Equation {
  constructor(a, b, operator, game) {
    this.value1 = a
    this.value2 = b
    this.firstNum = null
    this.secondNum = null
    this.operator = operator
    this.answer = 0
  }
  eqRandomize() {
    this.firstNum = randomNum(this.value1, this.value2)
    this.secondNum = randomNum(this.value1, this.value2)
  }
  eqBonusRound() {
    this.firstNum = this.value1
    this.secondNum = this.value2
  }
  makeEq() {
    if (this.operator === "+") {
      this.answer = this.firstNum + this.secondNum
    }
    if (this.operator === "-") {
      this.answer = this.firstNum - this.secondNum
    }
    if (this.operator === "*") {
      this.answer = this.firstNum * this.secondNum
    }
  }
  appendEq() {
    this.makeEq()
    let numboxes = [
      this.firstNum,
      this.operator,
      this.secondNum,
      "=",
      this.answer,
      "check",
    ]
    let screen = new Screen()
    console.log(screen.equation)
    screen.equation.style.animation = "slideEq .25s 1"

    let invisibleVal = screen.setClassnames(numboxes)
    let boxInput = qsa(".invisible")[game.count]
    boxInput.focus()
    let check = qsa(".check")[game.count]
    this.checkAnsClk = () => {
      this.checkAnswer(boxInput, check, invisibleVal)
    }
    this.checkAnsKey = (e) => {
      e.keyCode === 13 && this.checkAnswer(boxInput, check, invisibleVal)
    }
    check.addEventListener("click", this.checkAnsClk)
    boxInput.addEventListener("keydown", this.checkAnsKey)
  }
  checkAnswer(boxInput, check, invisibleVal) {
    qsa(".equation")[game.count].style.background = "rgb(15,15,0)"
    if (game.invisibleCollect.length < 6) {
      if (parseInt(boxInput.value) === invisibleVal) {
        game.invisibleCollect.push(boxInput.value)
        check.innerText = 10
        game.score += 10
        let checkIcon = cecl("div", "check-mark")
        checkIcon.innerHTML = '<i class="far fa-check-square"></i>'
        ac(qsa(".equation")[game.count], checkIcon)
      } else {
        game.invisibleCollect.push(false)
        check.innerText = 0
        let checkIcon = cecl("div", "check-mark")
        checkIcon.innerHTML = '<i class="fas fa-skull-crossbones"></i>'
        ac(qsa(".equation")[game.count], checkIcon)
        game.lives = game.lives - 1

        qs(".lives-total").innerText = game.lives
      }
      if (game.lives <= 0) {
       game.stopTimer('end')
      } else {
        game.firstNumTotal += this.firstNum
        game.secondNumTotal += this.secondNum
        this.checkAnswers(boxInput, check)
      }
    }
  }

  //----CHECK ANSWERS----//
  checkAnswers(boxInput, check) {
    if (game.invisibleCollect.length < 5) {
      this.newEquation()
    }
    if (game.invisibleCollect.length === 5) {
      if (!game.invisibleCollect.includes(false)) {
        const bonusLine = cecl("hr", "bonus-line")
        gameBody.appendChild(bonusLine)
        this.newEquation("bonus")
      } else {
        game.stopTimer('new')
      }
    }
    if (game.invisibleCollect.length > 5) {
      if (!game.invisibleCollect.includes(false)) {
        check.innerText = 50
        game.score += 40
        console.log("bonus")
        game.stopTimer("new")
      }
    }
    game.scoreTotal.innerText = ""
    game.scoreTotal.innerText = game.score
    check.removeEventListener("click", this.checkAnsClk)
    boxInput.removeEventListener("keydown", this.checkAnsKey)
  }
  newEquation(bonus) {
    game.count++
    if (bonus !== "bonus") {
      let eq = new Equation(this.value1, this.value2, "+")
      eq.eqRandomize()
      eq.appendEq()
    } else {
      let a = game.firstNumTotal
      let b = game.secondNumTotal
      let eq = new Equation(a, b, "+", "bonus")
      eq.eqBonusRound()
      eq.appendEq()
    }
  }
  // modalMessage(msg) {
  //   game.stopTimer(msg)
  //   console.log("hew")

  //   // setTimeout(function () {
  //   //   console.log("hereddd")
  //   //   if (msg === "end") {
  //   //     const modalMessage = new ModalMessage()
  //   //     modalMessage.appendGameOverMsg()
  //   //   } else {
  //   //     const modalMessage = new ModalMessage(
  //   //       `score: ${game.score}`,
  //   //       game.level
  //   //     )
  //   //     modalMessage.appendMsg()
  //   //   }
  //   // }, 3000)
  // }
}
const modalMessage = new ModalMessage()
modalMessage.appendMsg("start")
const game = new Game(1, 10)
const equation = new Equation(1, 10, "+", game)
equation.eqRandomize()
equation.appendEq()
