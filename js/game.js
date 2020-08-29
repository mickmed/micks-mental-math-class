class Game {
  constructor() {
    this.level = 0
    this.score = 0
    this.invisibleCollect = []
    this.firstNumTotal = 0
    this.secondNumTotal = 0
    this.count = 0
    this.scoreDiv = ac(qs("header"), cecl("div", "score"))
    this.scoreDiv.innerText = "score:"
    this.scoreTotal = ac(qs("header"), cecl("div", "score-total"))
    this.levelDiv = ac(qs("header"), cecl("div", "level"))
    this.levelDiv.innerText = "level:"
    this.levelTotal = ac(qs("header"), cecl("div", "level-total"))
    this.levelTotal.innerText = 1
    this.timeDiv = ac(qs("header"), cecl("div", "time"))
    this.timeDiv.innerText = "time:"
    this.timeTotal = ac(qs("header"), cecl("div", "time-total"))
    this.timeTotal.innerText = 0
    this.timeRun = null
    this.lives = 5
  }
  timer = () => {
    let time = 30
    this.timeRun = setInterval(() => {
      time--
      this.timeTotal.innerText = time
      
      if(time === 0){
        this.lives--
        this.stopTimer()
      }
      
      console.log(this.lives)
      this.timeTotal.style.animation = time === 0 && "blink 1s infinite"
    }, 1000)
  }
  stopTimer = () => {
    clearInterval(this.timeRun)
    
    const modalMessage = new ModalMessage(`score: ${game.score}`, game.level)
    modalMessage.appendMsg()
  }
}
