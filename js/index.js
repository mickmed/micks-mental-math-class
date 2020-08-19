let sumArray = (arr) => {
  let sum = 0
  arr.forEach((num) => {
    sum += num
  })
  // console.log(sum)
  return sum
}
randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
randomNumEvens = (min, max) => {
  let num = Math.floor(Math.random() * (max - min + 1)) + min

  if (num % 2 === 0) {
    return num
  } else {
    return this.randomNumEvens(min, max)
  }
}

//** GAME  **//
class Game {
  constructor(
    a,
    b,
    operator,
    equationCount,
    firstNumCollect,
    secondNumCollect,
    answerCollect,
    allCorrect,
    bonus
  ) {
    this.value1 = a
    this.value2 = b
    this.firstNum = null
    this.secondNum = null
    this.operator = operator
    this.answer = 0
    this.equationCount = equationCount
    this.firstNumCollect = firstNumCollect
    this.secondNumCollect = secondNumCollect
    this.answerCollect = answerCollect
    this.allCorrect = allCorrect
    this.bonus = bonus
  }

  eqVals = () => {
    if (this.bonus === "bonus") {
      console.log(this.value1, this.value2)
      this.firstNum = this.value1
      this.secondNum = this.value2
    } else {
      this.firstNum = randomNum(this.value1, this.value2)
      this.secondNum = randomNum(this.value1, this.value2)
    }

    if (this.operator === "+") {
      this.answer = this.firstNum + this.secondNum
    }
    if (this.operator === "-") {
      this.answer = this.firstNum - this.secondNum
    }
    if (this.operator === "*") {
      this.answer = this.firstNum * this.secondNum
    }

    console.log(this.answer)
    let numboxes = [
      this.firstNum,
      this.operator,
      this.secondNum,
      "=",
      this.answer,
      "check",
    ]
    let screen = new Screen()
    let invisibleBoxIdx = randomNumEvens(0, numboxes.length - 1)
    let invisibleVal = null
    console.log(invisibleBoxIdx)
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
    console.log(boxInput)
    // console.log(boxInput, this.equationCount, boxInput[this.equationCount])
    boxInput[this.equationCount].focus()
    // console.trace(boxInput[this.equationCount].focus())
    let check = qsa(".check")
    check[this.equationCount].addEventListener("click", async (e) => {
      this.checkAnswer(boxInput[this.equationCount], invisibleVal)
    })

    // console.log(boxInput[this.equationCount], this.equationCount)
    // console.log(invisibleVal)
    boxInput[this.equationCount].addEventListener("keydown", async (e) => {
      if (e.keyCode === 13) {
        this.checkAnswer(boxInput[this.equationCount], invisibleVal)
      }
    })
  }

  checkAnswer = async (boxInput, invisibleVal) => {
    if (parseInt(boxInput.value) === invisibleVal) {
      console.log(invisibleVal, this.allCorrect)
      if (this.bonus === "bonus") {
        console.log("here")
        gameBody.innerHTML = "potato"
        let game = new Game(0, 6, "+", 0, [], [], [], [])
        return game.eqVals()
      }
      this.allCorrect.push(invisibleVal)
    } else {
      this.allCorrect.push(false)
    }
    this.firstNumCollect.push(this.firstNum)
    this.secondNumCollect.push(this.secondNum)
    this.answerCollect.push(this.answer)
    this.equationCount += 1
    console.log(this.secondNumCollect)
    if (this.answerCollect.length < 5) {
      let game = new Game(
        1,
        3,
        "+",
        this.equationCount,
        this.firstNumCollect,
        this.secondNumCollect,
        this.answerCollect,
        this.allCorrect
      )
      game.eqVals()
    } else {
      if (
        this.answerCollect.length === 5 &&
        !this.answerCollect.includes(false)
      ) {
        console.log("bonus")
        const bonusLine = cecl("hr", "bonus-line")
        gameBody.appendChild(bonusLine)
        console.log(this.firstNumCollect, this.secondNumCollect)
        let firstNumSum = sumArray(this.firstNumCollect)
        let secondNumSum = sumArray(this.secondNumCollect)
        let answerSum = sumArray(this.answerCollect)
        console.log(firstNumSum, secondNumSum, answerSum)
        let bonus = new Game(
          firstNumSum,
          secondNumSum,
          "+",
          this.equationCount,
          [],
          [],
          [],
          [],
          "bonus"
        )
        bonus.eqVals()
      }
    }
  }
}

let game = new Game(0, 6, "+", 0, [], [], [], [], 1)
game.eqVals()
