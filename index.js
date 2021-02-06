const grid = document.querySelector(".grid")
const startButton = document.getElementById("start")
const scoreDisplay = document.getElementById("score")
let squares = []
let currentSnake = [2, 1, 0]
let direction = 1
let appleIndex = 0;
let score = 0;
let snakeSpeed = 150 //ms(smaller is faster)
let timerId = 0;
//const width = 20; //work on width needs to be done

function createGrid() {
    for (let i = 0; i < 100; i++) {
        const square = document.createElement("div")
        grid.appendChild(square)
        square.classList.add("square")
        squares.push(square)
    }

}
createGrid()
currentSnake.forEach(number => squares[number].classList.add("snake"))

function startGame() {
    clearInterval(timerId)
    currentSnake.forEach(number => squares[number].classList.remove("snake"))
    squares[appleIndex].classList.remove("apple")
    currentSnake = [2, 1, 0]
    currentSnake.forEach(number => squares[number].classList.add("snake"))
    direction = 1
    score = 0;
    scoreDisplay.textContent = score
    snakeSpeed = 150
    generateApples()
    timerId = setInterval(move, snakeSpeed)

}

function move() {
    //check the 4 walls , if they are hit
    if ( // width instead of 10
        (currentSnake[0] % 10 === 9 && direction === 1) ||
        (currentSnake[0] + 10 >= 100 && direction === 10) ||
        (currentSnake[0] % 10 === 0 && direction === -1) ||
        (currentSnake[0] - 10 < 0 && direction === -10) ||
        squares[currentSnake[0] + direction].classList.contains("snake")

    ) return clearInterval((timerId))

    const snakeTail = currentSnake.pop()
    squares[snakeTail].classList.remove("snake")
    currentSnake.unshift(currentSnake[0] + direction)
    if (squares[currentSnake[0]].classList.contains("apple")) {
        squares[currentSnake[0]].classList.remove("apple")

        squares[snakeTail].classList.add("snake")
        console.log(snakeTail)
        currentSnake.push(snakeTail)
        generateApples()
        score++
        scoreDisplay.textContent = score
        clearInterval(timerId)
        snakeSpeed = snakeSpeed * 0.9
        timerId = setInterval(move, snakeSpeed)
        console.log("snake speed here")
        console.log(snakeSpeed)
    }

    squares[currentSnake[0]].classList.add("snake")
}

function generateApples() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
        console.log(appleIndex)
    } while (squares[appleIndex].classList.contains("snake"))
    squares[appleIndex].classList.add("apple")
}
generateApples()

function control(event) {
    if (event.keyCode === 68) {
        console.log('d')
        direction = 1
    } else if (event.keyCode === 83) {
        console.log('s')
        direction = 10
    } else if (event.keyCode === 65) {
        console.log('a')
        direction = -1
    } else if (event.keyCode === 87) {
        console.log('w')
        direction = -10
    } else if (event.keyCode === 80) {
        console.log('p')
        clearInterval((timerId))
    }
}
document.addEventListener("keydown", control)
startButton.addEventListener("click", startGame)
