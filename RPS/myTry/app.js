const options = ["rock", "paper", "scissors"]
const possibleChoices = document.querySelectorAll("button")

const computerChoiceDisplay = document.querySelector("#c-choice")
const userChoiceDisplay = document.querySelector("#p-choice")
const result = document.querySelector("#result")

let userChoice
let computerChoice

// function computerChoice() {
//   const randomizeComputerChoice = Math.floor(Math.random() * options.length)
//   computersChoice = options[randomizeComputerChoice]
//   computerChoiceDisplay.innerText = computersChoice
// }

function generateComputerChoice() {
  const randomNum = Math.floor(Math.random() * options.length) + 1
  if (randomNum === 1) {
    computerChoice = "rock"
  }
  if (randomNum === 2) {
    computerChoice = "paper"
  }
  if (randomNum === 3) {
    computerChoice = "scissors"
  }
  computerChoiceDisplay.innerText = computerChoice
}

possibleChoices.forEach((possibleChoice) =>
  possibleChoice.addEventListener("click", (e) => {
    userChoice = e.target.id
    userChoiceDisplay.innerHTML = userChoice
    generateComputerChoice()
    checkMatch()
  })
)

function checkMatch() {
  if (computerChoice == userChoice) {
    result.innerText = "It's a draw!"
  }
}
