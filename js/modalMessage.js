class ModalMessage {
  constructor(msg, level) {
    this.message = msg
    this.staticMsg = `goto level ${level}`
    this.level = level
    this.modal = cecl("div", "modal-msg")
    this.appendMsg()
  }
  appendMsg = () => {
    this.modal.innerHTML = ''
    let modalScoreMsg = cecl("div", "modal-score-msg")
    let modalScore = cecl('div', 'modal-score')
    
    modalScoreMsg.innerText = this.message
    ac(this.modal, modalScoreMsg)

    modalScore.innerText = this.staticMsg
    ac(this.modal, modalScore)
    this.modal.addEventListener('click', ()=>{
      game = newGame()
    })
    ac(gameBody, this.modal)
  }
}
