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
    this.scoreTotal.innerText = 0


    this.levelDiv = ac(qs("header"), cecl("div", "level"))
    this.levelDiv.innerText = "level:"
    this.levelTotal = ac(qs("header"), cecl("div", "level-total"))
    this.levelTotal.innerText = 1

    this.timeDiv = ac(qs("header"), cecl("div", "time"))
    this.timeDiv.innerText = "time:"
    this.timeTotal = ac(qs("header"), cecl("div", "time-total"))
    this.timeTotal.innerText = 0

    this.livesDiv = ac(qs("header"), cecl("div", "lives"))
    this.livesDiv.innerText = "lives:"
    this.livesTotal = ac(qs("header"), cecl("div", "lives-total"))
    this.livesTotal.innerText = 5

    this.fish = ac(qs("header"), cecl("img", "fish"))
    this.fish.src = "/img/fish.png"
    this.fish.style.position = "absolute"
    this.timeRun = null
    this.lives = 5
    document.addEventListener(
      "touchmove",
      function () {
        e.preventDefault()
      },
      { passive: false }
    )
  }
  timer() {
    let time = 300
    let fishTime = 0
    this.fish.style.display = "block"
    this.timeRun = setInterval(() => {
      time--
      fishTime++
      this.timeTotal.innerText = Math.round(time / 10)
      this.fish.style.animation = "fishAnimate 10s 1s infinite"
      this.fish.style.left = `${fishTime / 3}%`
      if (time === 0) {
        this.lives--
        qs(".lives-total")
        qs(".lives-total").innerText = game.lives
        this.stopTimer()
      }
      this.timeTotal.style.animation = time === 0 && "blink 1s infinite"
    }, 100)
  }
  stopTimer(msg) {
    clearInterval(this.timeRun)

    const modalMessage = new ModalMessage()
    setTimeout(function () {
      modalMessage.appendMsg(msg)
     
    }, 1500)
  }
}
