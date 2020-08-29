class ModalMessage {
  constructor(msg, level) {
    this.message = msg
    this.staticMsg = `goto level ${level}`
    this.level = level
    this.modal = cecl("div", "modal-msg")
   
  }
  appendMsg = () => {
    this.modal.innerHTML = ''
    let modalScoreMsg = cecl("div", "modal-score-msg")
    let modalScore = cecl('div', 'modal-score')
    
    modalScoreMsg.innerText = this.message
    ac(this.modal, modalScoreMsg)

    modalScore.innerText = this.staticMsg
    ac(this.modal, modalScore)
   
    ac(gameBody, this.modal)
    this.modal.addEventListener('click', ()=>{
     console.log(game)
        gameBody.innerHTML = ""
        game.level++
        game.levelTotal.innerText = ""
        game.levelTotal.innerText = game.level
        game.count = 0
        game.invisibleCollect = []
        game.firstNumTotal = 0
        game.secondNumTotal = 0
        let eq = new Equation(
          game.level,
          game.level,
          "+",
         
        )
        eq.eqRandomize()
        eq.appendEq()
        game.timer()
        
     
    })
    return this.modal
  }
}
