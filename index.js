const width = 28
const grid = document.querySelector(".grid")
const scoreDisplay = document.querySelector("#score")
let squares = []
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
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
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

//create board
const createBoard = () => {
    for (let i = 0; i < layout.length; i++) {
        const square = document.createElement('div')

        grid.appendChild(square)
        
        squares.push(square)
        
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
createBoard()

//starting position of pacman
let pacmanCurrentIndex = 490
squares[pacmanCurrentIndex].classList.add('pacman')


const control = (e) => {
    squares[pacmanCurrentIndex].classList.remove('pacman')
    switch (e.key) {
        case 'ArrowDown':
            if (!squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') &&
                !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
                pacmanCurrentIndex + width < width * width) pacmanCurrentIndex += width
            break
        case 'ArrowUp':
            if (!squares[pacmanCurrentIndex - width].classList.contains('ghost-lair') &&
                !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
                pacmanCurrentIndex - width >= 0) pacmanCurrentIndex -= width
            break
        case 'ArrowRight':
            if (!squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair') &&
                !squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
                pacmanCurrentIndex % width < width - 1) pacmanCurrentIndex += 1
                if(pacmanCurrentIndex === 391) {
                    pacmanCurrentIndex = 364
                }     
            break
        case 'ArrowLeft':
            if (!squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair') &&
                !squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
                pacmanCurrentIndex % width !== 0) pacmanCurrentIndex -= 1
                if(pacmanCurrentIndex === 364) {
                    pacmanCurrentIndex = 391
                }    
            break
    }
    squares[pacmanCurrentIndex].classList.add('pacman')
    eatPacDot()
    // eatPowerPellet()
}

document.addEventListener('keyup', control)

const eatPacDot = () => {
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
        squares[pacmanCurrentIndex].classList.remove('pac-dot')
        score++
        scoreDisplay.innerHTML = score
    }
}

// const eatPowerPellet = () => {
//     if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
//         squares[pacmanCurrentIndex].classList.remove('power-pellet')
//     }
// }

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

const ghosts = [
    new Ghost("Todd", 348, 250),
    new Ghost("Jerry", 376, 300),
    new Ghost("Hank", 351, 400),
    new Ghost("Reggie", 379, 500)
]

ghosts.forEach(ghost => {
    squares[ghost.startIndex].classList.add(ghost.className)
    squares[ghost.startIndex].classList.add('ghost')
})

let moveGhost = (ghost) => {
    console.log('moved ghost')
    const directions = [-1, +1, -width, +width]
    let direction = directions[Math.floor(Math.random() * directions.length)]
    console.log(direction);

    ghost.timerId = setInterval(() => {
        if (
            !squares[ghost.currentIndex + direction].classList.contains('wall') &&
            !squares[ghost.currentIndex + direction].classList.contains('ghost')
            ) {
            squares[ghost.currentIndex].classList.remove(ghost.className)
            squares[ghost.currentIndex].classList.remove('ghost')
            ghost.currentIndex += direction
            squares[ghost.currentIndex].classList.add(ghost.className)
            squares[ghost.currentIndex].classList.add('ghost')
        } else direction = directions[Math.floor(Math.random() * directions.length)]
    }, ghost.speed);
    
}

ghosts.forEach(ghost => moveGhost(ghost))