class ModalMessage {
  constructor(msg, level) {
    this.message = msg
    this.staticMsg = `goto level ${level + 1}`
    this.level = level
    this.modal = cecl("div", "modal-msg")
  }
  appendMsg = () => {
    this.modal.innerHTML = ""
    let modalScoreMsg = cecl("div", "modal-score-msg")
    let modalScore = cecl("div", "modal-score")

    modalScoreMsg.innerText = this.message
    ac(this.modal, modalScoreMsg)

    modalScore.innerText = this.staticMsg
    ac(this.modal, modalScore)

    ac(gameBody, this.modal)
    this.modal.addEventListener("click", () => {
      this.clickModal()
    })
    return this.modal
  }
  appendStartMsg = () => {
    this.modal.innerHTML = ""
    let modalStartMsg = cecl("div", "modal-start-msg")
    this.modal.innerHTML = "START GAME"
    ac(gameBody, this.modal)
    this.modal.addEventListener("click", () => {
      this.clickModal("start")
    })
  }
  appendGameOverMsg = () => {
    this.modal.innerHTML = ""
    let modalStartMsg = cecl("div", "modal-end-msg")
    this.modal.innerHTML = "<div>GAME OVER</div><div> - restart - </div>"
    ac(gameBody, this.modal)
    this.modal.addEventListener("click", () => {
      this.clickModal("end")
    })
  }

  clickModal = (msg) => {
    // console.log(game.level)
    let eq
    gameBody.innerHTML = ""

    game.levelTotal.innerText = ""

    game.count = 0
    game.invisibleCollect = []
    game.firstNumTotal = 0
    game.secondNumTotal = 0
    if (msg === "end") {
      console.log("end")
      game.level = 0
      game.lives = 5
      game.levelTotal.innerText = game.level
      game.score = 0
      game.scoreTotal.innerText = 0

      eq = new Equation(1, 10, "+")
    } else if (msg === "start") {
      console.log("start")
      game.levelTotal.innerText = game.level + 1
      game.level++
      eq = new Equation(1, 10, "+")
    } else {
      game.levelTotal.innerText = game.level + 1
      game.level++
      eq = new Equation(1 * game.level, 10 * game.level, "+")
    }
    eq.eqRandomize()
    eq.appendEq()
    game.timer()
  }
}
