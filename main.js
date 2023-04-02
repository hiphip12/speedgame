const circles = document.querySelectorAll('.circle')
const startButton = document.querySelector('#onOffButton')
const score = document.querySelector('#score')
const overlay = document.querySelector('.overlay')
const closeButton = document.querySelector('.close')
const modalScore = document.querySelector('#modalScore')
const modalText = document.querySelector('#modalText')

let targetCircle
let lastCircle
let scoreCounter = 0
let RndTime
let pace = 1000
let rounds = 0


function circleTrack() {
    circles.forEach((circle) => {
        circle.addEventListener('click', clickCircle)
    });
}

const clickCircle = (event) => {
    const clickedCircle = event.target.closest('.circle')
    if (clickedCircle.id !== targetCircle) {
        stop()
    }
}


function highlighted() {
    circles.forEach(circle => circle.classList.remove('highlightedBtn'))

    const pickedCircle = circles[Math.floor(Math.random() * circles.length)]
    pickedCircle.classList.add('highlightedBtn')
    targetCircle = pickedCircle.id
    highlightedIndex = Array.from(circles).indexOf(pickedCircle)

    const newCircle = pickedCircle
    if (newCircle === lastCircle) {
        return highlighted()
    }

    lastCircle = newCircle
    return newCircle
}

function playRoar() {
    let roar = new Audio('assets/retro_sound_1_0.wav')
    roar.play()
}

function playBeep() {
    let beep = new Audio('assets/beep.wav')
    beep.play()
}

function result() {
    circles.forEach(circle => circle.addEventListener('click', () => {
        if (circle.id === targetCircle) {
            scoreCounter++
            score.textContent = scoreCounter * 100;
            targetCircle = null
            playRoar()
        }
    }))
}

function startGame() {
    if (rounds >= 10) {
        return stop()
    }

    highlighted()
    circleTrack()
    result()

    RndTime = setTimeout(startGame, pace)
    startButton.classList.add('offButton')
    startButton.textContent = "Stop the game"
    startButton.removeEventListener('click', startGame)
    startButton.addEventListener('click', stop)

    pace -= 50
    rounds++

}


function stop() {
    startButton.classList.remove('offButton')
    startButton.removeEventListener('click', stop)
    startButton.removeEventListener('click', playBeep)
    startButton.addEventListener('click', startGame)
    modalShow()
    clearTimeout(RndTime)

}

function playGameOver() {
    let finish = new Audio('assets/interface4.wav')
    finish.play()
}

const modalShow = () => {
    overlay.classList.toggle('visible')
    modalScore.textContent = scoreCounter * 100
    if (scoreCounter < 2) {
        modalText.textContent = "Your score is low, better luck next time!"
    }
    else if (scoreCounter < 5) {
        modalText.textContent = "Not so bad, you can still improve!"
    }
    else {
        modalText.textContent = "Excellent! You did great!"
    }
    playGameOver()
}

function reset() {
    window.location.reload()
}

closeButton.addEventListener('click', modalShow)
closeButton.addEventListener('click', playGameOver)
closeButton.addEventListener('click', reset)


startButton.addEventListener('click', startGame)
startButton.addEventListener('click', playBeep)

