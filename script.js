let dot = { x: 0, y: 0 };
let snake = [{ x: 200, y: 200 }];
let direction = { x: 20, y: 0 };
var applecount = 0;
let speedcount = document.getElementById('speedcount');
let speed = 13;
 // store interval ID
function gameLoop() {
    let head = { ...snake[0] }; // copy head
    head.x += direction.x;
    head.y += direction.y;

    if (head.x < 0 || head.y < 0 || head.x >= 400 || head.y >= 400 || snake.find(dot => dot.x === head.x && dot.y === head.y)) {
        // game over
        return;
    }

    snake.unshift(head); // add new head to snake

    if (dot.x === head.x && dot.y === head.y) {
        // eat dot
        applecount++;
        speed = 8*applecount;
        dot = { x: Math.floor(Math.random() * 20) * 20, y: Math.floor(Math.random() * 20) * 20 };


    } else {
        snake.pop(); // remove tail
    }

    // clear old dots
    while (gameBoard.firstChild) {
        gameBoard.firstChild.remove();
    }

    // draw new dot
    drawDot(dot, 'apple');

    // draw new snake
    snake.forEach(part => drawDot(part, 'snake'));

    
}

function drawDot(dot, className) {
    let div = document.createElement('div');
    div.style.left = `${dot.x}px`;
    div.style.top = `${dot.y}px`;
    div.className = className;
    gameBoard.appendChild(div);
}

speedcount.innerHTML = speed;
let gameBoard = document.getElementById('game-board');
setInterval(gameLoop, speed);

window.addEventListener('keydown', function(e) {
    switch (e.key) {
        case 'ArrowUp':
            if (direction.y !== 20) direction = { x: 0, y: -20 };
            break;
        case 'ArrowDown':
            if (direction.y !== -20) direction = { x: 0, y: 20 };
            break;
        case 'ArrowLeft':
            if (direction.x !== 20) direction = { x: -20, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x !== -20) direction = { x: 20, y: 0 };
            break;
    }
});