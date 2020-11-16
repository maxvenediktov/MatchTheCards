const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  let randomPos = Math.floor(Math.random()*12);
  card.style.order = randomPos
})

let isFlippedCard = false;

let firstCard, secondCard;

let lockBoard = false;

const attempts = document.querySelector(".attempts");
let score = 0;

const timer = document.querySelector(".timer");
let time = 20;

cards.forEach(card => card.addEventListener('click', flipCard));

function flipCard() {
  let item = event.target.parentElement
  if (lockBoard) {
    return lockBoard;
  }
  if (event.target.parentElement == firstCard) {
    return firstCard;
  }

  item.classList.add('flip');

  if (isFlippedCard == false) {
    isFlippedCard = true;
    firstCard = event.target.parentElement;
    return;
  }
  secondCard = event.target.parentElement;

  if (firstCard.dataset.info === secondCard.dataset.info) {
	disableCards();
} else {
	unflipCards();
	}
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  console.log("does the function work")
  firstCard = null;
  secondCard = null;
  isFlippedCard = false;
  lockBoard = false;
}

function unflipCards() {
  lockBoard = true;
  setTimeout(function(){
    firstCard.classList.remove("flip")
    secondCard.classList.remove("flip")
    firstCard = null;
    secondCard = null;
    isFlippedCard = false
    lockBoard = false
    score++;
    attempts.innerHTML = "Attempts: " + score;
  }, 1000)
}

document.querySelector(".switch").onclick = function () {
  attempts.className = "attemptOp"
  timer.className = "timerOp"
}

document.querySelector(".timeStart").onclick = function () {
  let tt = setInterval(timers, 1000);
  function timers () {
    time = time - 1
    timer.innerHTML = "Time Remaining: " + time + "s"
    if (time < 1) {
      clearInterval(tt)
    }
  }
}
