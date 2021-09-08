const width = 28  //<== width of each square
const grid = document.querySelector(".grid")  //<==grabbing our grid from DOM
const scoreDisplay = document.querySelector("#score")  //<==grabbing our 'scoreboard' from DOM
let squares = []  //<==empty array for our grid squares
let score = 0


//28 * 28 = 784
  // 0 - pac-dots
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power-pellet
  // 4 - empty
const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,2,2,2,2,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 
]

//creating pacman grid layout
const createBoard = () => {
    for (let i = 0; i < layout.length; i++) {
        const square = document.createElement('div')  //<== running for loop to create divs for each square dynamically

        grid.appendChild(square)   //<== adding dynamically made squares to grid on DOM
        
        squares.push(square)   //<== pushing square to empty squares array
        
        //logic for adding squares based on number aligning with their class in CSS
        if (layout[i] === 0) {
            squares[i].classList.add('pac-dot')
        } else if  (layout[i] === 1) {
            squares[i].classList.add('wall')
        } else if  (layout[i] === 2) {
            squares[i].classList.add('ghost-lair')
        } else if  (layout[i] === 3) {
            squares[i].classList.add('power-pellet')
        } 
    }
}
createBoard()  //<== calling function to create pacman grid

//starting position of pacman
let pacmanCurrentIndex = 490
squares[pacmanCurrentIndex].classList.add('pacman')

// function that moves pacman using arrow keys
const control = (e) => {
    squares[pacmanCurrentIndex].classList.remove('pacman')  //<== removing pacman class so you can see him move wherever you click
    switch (e.key) {
        case 'ArrowDown':
            if (
                !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') &&
                !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
                pacmanCurrentIndex + width < width * width
                ) 
                pacmanCurrentIndex += width
            break
        case 'ArrowUp':
            if (
                !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair') &&
                !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
                pacmanCurrentIndex - width >= 0
                ) 
                pacmanCurrentIndex -= width
            break
        case 'ArrowRight':
            if (
                !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair') &&
                !squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
                pacmanCurrentIndex % width < width - 1
                ) 
                pacmanCurrentIndex += 1
                if(pacmanCurrentIndex === 391) {
                    pacmanCurrentIndex = 364
                }     
            break
        case 'ArrowLeft':
            if (
                !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair') &&
                !squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
                pacmanCurrentIndex % width !== 0
                ) 
                pacmanCurrentIndex -= 1
                if(pacmanCurrentIndex === 364) {
                    pacmanCurrentIndex = 391
                }    
            break
    }
    squares[pacmanCurrentIndex].classList.add('pacman')  //<== adding class so you can see pacman move to new position
    eatPacDot()
    eatPowerPellet()
    checkForWin()
    gameOverCheck()
}
document.addEventListener('keydown', control)  //<== eventlistener for arrow keys, and calling control function when clicked

//logic for what happens when pacman eats dots
const eatPacDot = () => {
    //get pacman current location and see if he is over a 'pacdot' div, and if so, removing that class & adding to score
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
        squares[pacmanCurrentIndex].classList.remove('pac-dot')
        score++
        scoreDisplay.innerHTML = score
    }
}

//logic for what happens when pacman eats power-pellet
const eatPowerPellet = () => {
    //check to see if pacman is eating power-pellet and if so, removing that class, adding to score and making ghosts 'scared'
    if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
        squares[pacmanCurrentIndex].classList.remove('power-pellet')
        score += 10
        scoreDisplay.innerHTML = score
        ghosts.forEach(ghost => ghost.isScared = true)
        setTimeout(unScareGhost, 10000);
    }
}

//logic for setting ghosts back to normal after 10 seconds of being 'scared'
let unScareGhost = () => {
    ghosts.forEach(ghost => ghost.isScared = false)
}

//creating a class constructor so we can ghost object
class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.isScared = false
        this.timerId = NaN
    }
}

//declaring our ghosts names, startingIndex and speed
const ghosts = [
    new Ghost("Todd", 348, 250),
    new Ghost("Jerry", 376, 300),
    new Ghost("Hank", 351, 400),
    new Ghost("Reggie", 379, 500)
]

//forEach function to add specific ghost's assigned classname, and, additional class to grab all ghosts
ghosts.forEach(ghost => {
    squares[ghost.startIndex].classList.add(ghost.className)
    squares[ghost.startIndex].classList.add('ghost')
})

//logic for moving ghosts randomly
let moveGhost = (ghost) => {
    const directions = [-1, +1, -width, +width]
    let direction = directions[Math.floor(Math.random() * directions.length)]

    //using setInterval to set time for ghosts to move around until eaten or game over
    ghost.timerId = setInterval(() => {
        if (
            !squares[ghost.currentIndex + direction].classList.contains('wall') &&  //<== stop ghosts from hitting wall and/or eachother
            !squares[ghost.currentIndex + direction].classList.contains('ghost')
            ) {
            squares[ghost.currentIndex].classList.remove(ghost.className)
            squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
            ghost.currentIndex += direction
            squares[ghost.currentIndex].classList.add(ghost.className)
            squares[ghost.currentIndex].classList.add('ghost')
        } else direction = directions[Math.floor(Math.random() * directions.length)]

        //adding class to scared-ghost
        if (ghost.isScared) {
            squares[ghost.currentIndex].classList.add('scared-ghost')
        }

        //if ghost is scared and pacman hits them, then remove classes from ghosts, add 50 to score and send ghost to startingIndex in ghost lair
        if(
            ghost.isScared && 
            squares[ghost.currentIndex].classList.contains('pacman')
        ) {
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
            ghost.currentIndex = ghost.startIndex
            score += 50
            scoreDisplay.innerHTML = score
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
        }
        gameOverCheck()
        
    }, ghost.speed);
    
}

//<== forEach function to get each ghost to move
ghosts.forEach(ghost => moveGhost(ghost))

// end game if ghost gets pacman
const gameOverCheck = () => {

    if (
        squares[pacmanCurrentIndex].classList.contains('ghost') && 
        !squares[pacmanCurrentIndex].classList.contains('scared-ghost')
    ) {
        ghosts.forEach(ghost=> clearInterval(ghost.timerId))  //<== stop ghosts from moving
        document.removeEventListener('keydown', control) //<== stop controls from being active
        scoreDisplay.innerHTML = 'GAME OVER'
    }
}

//check to see if all dots are eaten, and declare winner if so!
const checkForWin = () => {
    if (score === 274) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keydown', control)
        scoreDisplay.innerHTML = 'Winner winner chicken dinner!'
    }
}