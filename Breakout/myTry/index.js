const userStartPosition = [220, 40]
const ballStartPosition = [260, 50]
let ballPosition = ballStartPosition
let userPosition = userStartPosition
const grid = document.querySelector(".grid")
let moveByX = 5
let moveByY = 5
const userWidth = 100
const userHeight = 10
const gridWidth = 560
const gridHeight = 300
const ballDiameter = 20

//drawing user
function drawUser() {
  user.style.left = userPosition[0] + "px"
  user.style.bottom = userPosition[1] + "px"
}

const user = document.createElement("div")
user.classList.add("user")
drawUser()
grid.appendChild(user)

function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (userPosition[0] > 0) {
        userPosition[0] -= 10
        drawUser()
      }
      break
    case "ArrowRight":
      if (userPosition[0] < gridWidth - userWidth) {
        userPosition[0] += 10
        drawUser()
      }
      break
  }
}
document.addEventListener("keydown", moveUser)

//drawing ball
const ball = document.createElement("div")
ball.classList.add("ball")
drawBall()
grid.appendChild(ball)

function drawBall() {
  ball.style.left = ballPosition[0] + "px"
  ball.style.bottom = ballPosition[1] + "px"
}

function moveBall() {
  ballPosition[0] += moveByX
  ballPosition[1] += moveByY
  drawBall()
  checkForCollisions()
}

timerId = setInterval(moveBall, 50)

//create block

class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis]
    this.bottomRight = [xAxis + userWidth, yAxis]
    this.upperLeft = [xAxis, yAxis + userWidth]
    this.upperRight = [xAxis + userWidth, yAxis + userHeight]
  }
}

const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),
  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
]

function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div")
    block.classList.add("block")
    block.style.left = blocks[i].bottomLeft[0] + "px"
    block.style.bottom = blocks[i].bottomLeft[1] + "px"
    grid.appendChild(block)
  }
}

addBlocks()

function changeDirection() {
  if (moveByX == 5 && moveByY == 5) {
    moveByX = -5
    return
  }
  if (moveByX == 5 && moveByY == -5 && ballPosition[1] > 50) {
    moveByX = -5
    return
  }
  if (moveByX == -5 && moveByY == 5) {
    moveByY = -5
    return
  }
  if (moveByX == -5 && moveByY == -5 && ballPosition[1] > 50) {
    moveByX = 5
    return
  }
  if (moveByX == -5 && moveByY == -5 && ballPosition[1] <= 50) {
    moveByY = 5
    return
  }
  if (moveByX == 5 && moveByY == -5 && ballPosition[1] <= 50) {
    moveByY = 5
    return
  }
}

//check for collisions
function checkForCollisions() {
  //check for wall collisions
  if (
    ballPosition[0] >= gridWidth - ballDiameter ||
    ballPosition[1] >= gridHeight - ballDiameter ||
    ballPosition[0] == 0
  ) {
    changeDirection()
  }

  //check for loss
  if (ballPosition[1] == 0) {
    clearInterval(timerId)
    alert("You lost")
  }

  //check for user collision

  if (
    ballPosition[0] > userPosition[0] &&
    ballPosition[0] < userPosition[0] + userWidth &&
    ballPosition[1] == userPosition[1] + userHeight
  ) {
    changeDirection()
  }

  //check for block collisions
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballPosition[0] > blocks[i].bottomLeft[0] &&
      ballPosition[0] < blocks[i].bottomRight[0] &&
      ballPosition[1] + ballDiameter > blocks[i].bottomLeft[1]
    ) {
      const allBlocks = Array.from(document.querySelectorAll('.block'))
      allBlocks[i].classList.remove('block')
      blocks.splice(i, 1)
      changeDirection()
    }
  }
}
