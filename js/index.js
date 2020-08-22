let count = 0
let answer = 0
const invisibleCollect = []
const firstNumCollect = []
const secondNumCollect = []
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
    console.log('rand')
    this.firstNum = randomNum(this.value1, this.value2)
    this.secondNum = randomNum(this.value1, this.value2)
  }
  eqBonusRound = () => {
    this.firstNum = this.value1
    this.secondNum = this.value2
    console.log(this.firstNum, this.value1, this.value2)
    console.log(this.secondNum)
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
      screen.appendNum(num, classname)
      if (!isNaN(num) && i === invisibleBoxIdx) {
        invisibleVal = num
      }
    })
    let boxInput = qsa(".invisible")
    boxInput[count].focus()
    let check = qsa(".check")
    check[count].addEventListener("click", async (e) => {
      this.checkAnswer(boxInput[count], invisibleVal)
    })
    boxInput[count].addEventListener("keydown", async (e) => {
      // console.log("here", boxInput[count], 0, invisibleVal)
      if (e.keyCode === 13) {
        this.checkAnswer(boxInput[count], invisibleVal)
      }
    })
  }
  checkAnswer = (boxInput, invisibleVal) => {
    if (parseInt(boxInput.value) === invisibleVal) {
      invisibleCollect.push(boxInput.value)
    } else {
      invisibleCollect.push(false)
    }
    firstNumCollect.push(this.firstNum)
    secondNumCollect.push(this.secondNum)
    console.log("ic", invisibleCollect)
    if (invisibleCollect.length < 5) {
      count++
      console.log(count)
      this.newGame()
    } else if(invisibleCollect.length === 5) {
      if (invisibleCollect.includes(false)) {
        console.log("end")
      } else {
        const bonusLine = cecl("hr", "bonus-line")
        gameBody.appendChild(bonusLine)
        count += 1
        console.log(firstNumCollect)
        this.newGame("bonus")
      }
    }else if(invisibleCollect.length > 5){
      console.log('bonus answer')
    }
  }
  newGame = (bonus) => {
    if (bonus !== "bonus") {
      let game = new Game(1, 3, "+", this.allCorrect)
      game.eqRandomize()
      game.appendEq()
    } else {
      let a = sumArray(firstNumCollect)
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
