class ModalMessage {
  constructor() {
    this.modal = cecl("div", "modal-msg")
    this.modal.pointerEvents = "auto"
    this.modal.style.animation = "fadein 2s forwards"
    this.innerModal = cecl("div", "inner-modal")
    this.innerModal.focus()
  }

  appendMsg(msg) {
    this.modal.innerHTML = ""
    ac(this.modal, this.innerModal)
    if (msg === "start") {
      let startGame = cecl("div", "start-game")
      startGame.innerText = "START GAME"
      ac(this.innerModal, startGame)
    } else if (msg === "new") {
      this.newEqMessage(msg)
    } else if (msg === "end") {
      this.innerModal.innerHTML = "<div>GAME OVER</div><div> - restart - </div>"
    }
    ac(gameBody, this.modal)
    this.modal.addEventListener("click", () => {
      if (msg !== "start") {
        this.clickModal(msg)
      } else {
        this.innerModal.innerHTML = ""
        let chooseSymbol = cecl("div", "choose-symbol")

        chooseSymbol.innerHTML = "choose symbol"

        ac(this.innerModal, chooseSymbol)

        let plus = cecl("div", "plus-sign")
        plus.innerText = "+"
        ac(this.innerModal, plus)
        plus.addEventListener("click", () => {
          game.sign = "+"
          this.clickModal(msg)
        })

        let minus = cecl("div", "minus-sign")
        minus.innerText = "-"
        ac(this.innerModal, minus)

        minus.addEventListener("click", () => {
          game.sign = "-"
          this.clickModal(msg)
        })
      }
    })
  }

  newEqMessage(msg) {
    let modalLevel = cecl("div", "modal-level-msg")
    modalLevel.innerText = `goto level ${game.level + 1}`
    ac(this.innerModal, modalLevel)

    let modalLives = cecl("div", "modal-lives-msg")
    modalLives.innerText = `lives: ${game.lives}`
    ac(this.innerModal, modalLives)

    let modalScoreMsg = cecl("div", "modal-score-msg")
    modalScoreMsg.innerText = `score: ${game.score}`
    ac(this.innerModal, modalScoreMsg)

    return this.modal
  }

  clickModal(msg) {
    let eq
    gameBody.style.pointerEvents = "auto"
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
      game.livesTotal.innerText = game.lives
      game.score = 0
      game.scoreTotal.innerText = 0
      eq = new Equation(1, 10, game.sign)
    } else if (msg === "start") {
      game.levelTotal.innerText = game.level + 1
      game.level++
      eq = new Equation(1, 10, game.sign)
    } else {
      game.levelTotal.innerText = game.level + 1
      game.livesTotal.innerText = game.lives
      game.level++
      eq = new Equation(1 * game.level, 10 * game.level, game.sign)
    }
    eq.eqRandomize()
    eq.appendEq()
    game.timer()
  }
}
