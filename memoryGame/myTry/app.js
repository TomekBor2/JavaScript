const cardArray = [
  {
    name: "fries",
    img: "images/fries.png",
  },
  {
    name: "fries",
    img: "images/fries.png",
  },
  {
    name: "ice-cream",
    img: "images/ice-cream.png",
  },
  {
    name: "ice-cream",
    img: "images/ice-cream.png",
  },
  // {
  //   name: 'pizza',
  //   img: 'images/pizza.png'
  // },
  // {
  //     name: 'pizza',
  //     img: 'images/pizza.png'
  //   },
  // {
  //   name: 'milkshake',
  //   img: 'images/milkshake.png'
  // },
  // {
  //     name: 'milkshake',
  //     img: 'images/milkshake.png'
  //   },
  // {
  //   name: 'hotdog',
  //   img: 'images/hotdog.png'
  // },
  // {
  //     name: 'hotdog',
  //     img: 'images/hotdog.png'
  //   },
  // {
  //   name: 'cheeseburger',
  //   img: 'images/cheeseburger.png'
  // },
  // {
  //     name: 'cheeseburger',
  //     img: 'images/cheeseburger.png'
  //   }
]

function shuffle(Array) {
  let currentIndex = Array.length,
    randomIndex

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[Array[currentIndex], Array[randomIndex]] = [
      Array[randomIndex],
      Array[currentIndex],
    ]
  }

  return Array
}

shuffle(cardArray)

const gridDisplay = document.querySelector(".grid")
const result = document.querySelector(".result")
const buttonEl = document.querySelector(".button-el")
let cardsChosen = []
let cardsChosenId = []
let cardsWon = []
const button = document.createElement("button")

function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement("img")
    card.setAttribute("src", "images/blank.png")
    card.setAttribute("id", i)
    card.addEventListener("click", flipCard)
    gridDisplay.append(card)
  }
}

createBoard()

function flipCard() {
  const cardId = this.getAttribute("id")
  cardsChosen.push(cardArray[cardId].name)
  cardsChosenId.push(cardId)
  this.setAttribute("src", cardArray[cardId].img)
  if (cardsChosenId.length === 2) {
    setTimeout(checkMatch, 300)
  }
}

function checkMatch() {
  const cards = document.querySelectorAll("img")
  const firstChosen = cardsChosenId[0]
  const secondChosen = cardsChosenId[1]
  if (firstChosen == secondChosen) {
    alert("You clicked the same card!!")
    cards[firstChosen].setAttribute("src", "images/blank.png")
  } else if (cardsChosen[0] == cardsChosen[1]) {
    alert("It's a match!")
    cards[firstChosen].setAttribute("src", "images/white.png")
    cards[secondChosen].setAttribute("src", "images/white.png")
    cards[firstChosen].removeEventListener("click", flipCard)
    cards[secondChosen].removeEventListener("click", flipCard)
    cardsWon.push(cardsChosen)
  } else {
    alert("It's not a match!")
    cards[firstChosen].setAttribute("src", "images/blank.png")
    cards[secondChosen].setAttribute("src", "images/blank.png")
  }
  cardsChosen = []
  cardsChosenId = []

  result.textContent = cardsWon.length
  if (cardsWon.length == cardArray.length / 2) {
    result.innerText = "Want to try again?"

    button.setAttribute("class", "btn")
    button.textContent = "Try again"
    button.addEventListener("click", renderGame)
    buttonEl.append(button)
  }
  console.log(cards[0])
}


function renderGame() {
  const cards = document.querySelectorAll("img")
  for (let j=0; j<4; j++) {
    cards[j].setAttribute("src", "images/blank.png")
    cards[j].addEventListener("click", flipCard)
  }
  result.innerText = ""
  cardsWon.length = ""
  button.remove()
}

