let square
let result = 0
let hitPosition
let randomId
let timer = 3
let timerId 
const gridDisplay = document.querySelector(".grid")
const scoreDisplay = document.querySelector("#score")
const timerEl = document.querySelector("#time-left")

function createGrid() {
  for (i = 0; i < 9; i++) {
    square = document.createElement("div")
    square.classList.add("square")
    square.setAttribute("id", i)
    gridDisplay.append(square)
  }
}

createGrid()

let squares = document.querySelectorAll(".square")

function randomSquare() {
  squares.forEach((square) => {
    square.classList.remove("mole")
  })

  let randomId = [Math.floor(Math.random() * 9)]
  let randomSquare = squares[randomId]
  randomSquare.classList.add("mole")

  hitPosition = randomId
}

squares.forEach((square) => {
  square.addEventListener("mousedown", () => {
    if (square.id == hitPosition) {
      result++
      scoreDisplay.innerText = result
      hitPosition = null
    }
  })
})

function moveMole() {
  timerId = setInterval(randomSquare, 1000)
}

moveMole()

function checkTimer() {
  timerEl.textContent = timer - 1
  timer--
  console.log(timer)
  if (timer === 0) {
    clearInterval(timerElement)
    clearInterval(timerId)
    timerEl.textContent = "You're out of time"
    alert("Your final score is: " + result)
  }
}

let timerElement = setInterval(function () {
  checkTimer(timer)
}, 1000)
