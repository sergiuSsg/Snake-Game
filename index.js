const grid = document.querySelector(".grid")
const startButton = document.getElementById("start")
const scoreDisplay = document.getElementById("score")
const width = 10;

let squares = []
let currentSnake = [2, 1, 0]
let direction = 1
let appleIndex = 0;
let score = 0;
let snakeSpeed = 800 //ms(smaller is faster)
let timerId = 0;

function createGrid() {
    for (let i = 0; i < 100; i++) {
        const square = document.createElement("div")
        grid.appendChild(square)
        square.classList.add("square")
        squares.push(square)
    }
}

function startGame() {
    clearInterval(timerId)
    resetSnake()
    squares[appleIndex].classList.remove("apple")
    generateApples()
    direction = 1
    score = 0;
    scoreDisplay.textContent = score
    timerId = setInterval(move, snakeSpeed)

}

function move() {
    if (
        (currentSnake[0] % width === 9 && direction === 1) ||
        (currentSnake[0] + width >= (width * width) && direction === width) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width < 0 && direction === - width) ||
        squares[currentSnake[0] + direction].classList.contains("snake")
    ) {
        return clearInterval((timerId))
    }

    const snakeTail = currentSnake.pop()
    squares[snakeTail].classList.remove("snake")
    currentSnake.unshift(currentSnake[0] + direction)

    if (squares[currentSnake[0]].classList.contains("apple")) {
        squares[currentSnake[0]].classList.remove("apple")
        squares[snakeTail].classList.add("snake")
        currentSnake.push(snakeTail)
        generateApples()
        score++
        scoreDisplay.textContent = score
        clearInterval(timerId)
        snakeSpeed = snakeSpeed * 0.97
        timerId = setInterval(move, snakeSpeed)
    }
    squares[currentSnake[0]].classList.add("snake")
}

function generateApples() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains("snake"))
    squares[appleIndex].classList.add("apple")
}

function resetSnake() {
    currentSnake.forEach(number => squares[number].classList.remove("snake"))
    currentSnake = [2, 1, 0]
    currentSnake.forEach(number => squares[number].classList.add("snake"))
    snakeSpeed = 800
}

function collision(event) {
    if (event.keyCode === 68) {
        direction = 1
    } else if (event.keyCode === 83) {
        direction = 10
    } else if (event.keyCode === 65) {
        direction = -1
    } else if (event.keyCode === 87) {
        direction = -10
    } else if (event.keyCode === 80) {
        clearInterval((timerId))
    }
}

createGrid()
currentSnake.forEach(number => squares[number].classList.add("snake"))
generateApples()

document.addEventListener("keydown", collision)
startButton.addEventListener("click", startGame)
