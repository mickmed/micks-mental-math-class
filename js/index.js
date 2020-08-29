class Equation {
  constructor(a, b, operator, game) {
    // constructor(a, b, operator, bonus, game) {
    this.value1 = a
    this.value2 = b
    this.firstNum = null
    this.secondNum = null
    this.operator = operator
    this.answer = 0
    
    // this.bonus = bonus
    // this.timeRun = null
  }
  eqRandomize = () => {
    this.firstNum = randomNum(this.value1, this.value2)
    this.secondNum = randomNum(this.value1, this.value2)
    // console.log(this.firstNum, this.secondNum, this.answer, game.level)
  }
  eqBonusRound = () => {
    this.firstNum = this.value1
    this.secondNum = this.value2
  }
  makeEq = () => {
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
  appendEq = () => {
    this.makeEq()
    // console.log(this.firstNum, this.secondNum, this.answer)
    let numboxes = [
      this.firstNum,
      this.operator,
      this.secondNum,
      "=",
      this.answer,
      "check",
    ]
    let screen = new Screen()
    let invisibleVal = screen.setClassnames(numboxes)
    let boxInput = qsa(".invisible")[game.count]
    boxInput.focus()
    let check = qsa(".check")[game.count]
    this.checkAnsClk = () => {
      console.log("here")
      this.checkAnswer(boxInput, check, invisibleVal)
    }
    this.checkAnsKey = (e) => {
      e.keyCode === 13 && this.checkAnswer(boxInput, check, invisibleVal)
    }
    check.addEventListener("click", this.checkAnsClk)
    boxInput.addEventListener("keydown", this.checkAnsKey)
  }
  checkAnswer = (boxInput, check, invisibleVal) => {
    if (game.invisibleCollect.length < 6) {
      if (parseInt(boxInput.value) === invisibleVal) {
        game.invisibleCollect.push(boxInput.value)
        check.innerText = 10
        game.score += 10
        console.log(qs('.equation'))
        let checkIcon = cecl('div', 'check-mark')
        checkIcon.innerHTML = '<i class="far fa-check-square"></i>'
        ac(qsa('.equation')[game.count], checkIcon)

      } else {
        game.invisibleCollect.push(false)
        let checkIcon = cecl('div', 'check-mark')
        checkIcon.innerHTML = '<i class="fas fa-skull-crossbones"></i>'
        ac(qsa('.equation')[game.count], checkIcon)


        
      }
      game.firstNumTotal += this.firstNum
      game.secondNumTotal += this.secondNum
      this.checkAnswers(boxInput, check)
    }
  }
  checkAnswers = (boxInput, check) => {
    if (game.invisibleCollect.length < 5) {
      console.log(game)
      this.newEquation()
    }
    if (game.invisibleCollect.length === 5) {
      if (!game.invisibleCollect.includes(false)) {
        const bonusLine = cecl("hr", "bonus-line")
        gameBody.appendChild(bonusLine)
        this.newEquation("bonus")
      } else {
        this.modalMessage(game.score, game.level)
        clearInterval(this.timeRun)
       
      }
    }
    if (game.invisibleCollect.length > 5) {
      check.innerText = 50
      game.score += 40
      console.log(game.score)
      this.modalMessage(game.score, game.level)
   
    }
  
    game.scoreTotal.innerText = ""
    game.scoreTotal.innerText = game.score
    check.removeEventListener("click", this.checkAnsClk)
    boxInput.removeEventListener("keydown", this.checkAnsKey)
  }
  newEquation = (bonus) => {
    game.count++
    console.log(this.count)
    console.log("here", game.level, "count", this.count)
    if (bonus !== "bonus") {
      let eq = new Equation(1, game.level, "+")
      eq.eqRandomize()
      eq.appendEq()
    } else {
      console.log(game)
      let a = game.firstNumTotal
      let b = game.secondNumTotal
      let eq = new Equation(a, b, "+", "bonus")
      eq.eqBonusRound()
      eq.appendEq()
    }
  }
  modalMessage = () => {
    game.stopTimer()
    const modalMessage = new ModalMessage(`score: ${game.score}`, game.level)
    modalMessage.appendMsg()
    
  }
}
const game = new Game()
game.timer()
const equation = new Equation(1, 2, "+", game)
equation.eqRandomize()
equation.appendEq()
