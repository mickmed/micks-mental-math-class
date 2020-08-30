class ModalMessage {
  constructor(msg, level) {
    this.message = msg
    this.staticMsg = `goto level ${level + 1}`
    this.modal = cecl("div", "modal-msg")
    this.modal.pointerEvents = 'auto'
  }
  appendMsg = () => {
    this.modal.innerHTML = ""
    let modalLivesMsg = cecl("div", "modal-lives-msg")
    // let modalLives = cecl("div", "modal-lives")
    let modalScoreMsg = cecl("div", "modal-score-msg")
    let modalLevel = cecl("div", "modal-level-msg")
    modalLevel.innerText = this.staticMsg
    ac(this.modal, modalLevel)
    modalLivesMsg.innerText = `lives: ${game.lives}`
    ac(this.modal, modalLivesMsg)
    modalScoreMsg.innerText = this.message
    ac(this.modal, modalScoreMsg)
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
    let eq
    gameBody.style.pointerEvents = 'auto'
    gameBody.innerHTML = ""
    game.levelTotal.innerText = ""
    game.count = 0
    game.invisibleCollect = []
    game.firstNumTotal = 0
    game.secondNumTotal = 0
    if (msg === "end") {
      game.level = 0
      game.lives = 5
      game.levelTotal.innerText = game.level
      game.score = 0
      game.scoreTotal.innerText = 0
      eq = new Equation(1, 10, "+")
    } else if (msg === "start") {
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
