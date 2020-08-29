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
 
      this.clickModal()
    })
  }

  clickModal=()=>{
    // console.log(game.level)
    gameBody.innerHTML = ""

    game.levelTotal.innerText = ""
    game.levelTotal.innerText = game.level + 1
    game.level++
    game.count = 0
    game.invisibleCollect = []
    game.firstNumTotal = 0
    game.secondNumTotal = 0
    let eq = new Equation(1 * game.level, 10 * game.level, "+")
    eq.eqRandomize()
    eq.appendEq()
    game.timer()
  }
}
