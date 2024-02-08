let dot = { x: Math.random() * 380, y: Math.random() * 380 }; // initialize dot with random coordinates
let snake = [{ x: 200, y: 200 }];
let direction = { x: 1, y: 0 }; // Changed from 20 to 1

function gameLoop() {
    let head = { ...snake[0] }; // copy head
    head.x += direction.x;
    head.y += direction.y;

    if (head.x < 0 || head.y < 0 || head.x > 380 || head.y > 380 || snake.find(dot => dot.x === head.x && dot.y === head.y)) {
        // game over
        snake = [{ x: 200, y: 200 }]; // reset snake
        dot = { x: Math.random() * 380, y: Math.random() * 380 }; // reset dot
        while (gameBoard.firstChild) {
            gameBoard.firstChild.remove(); // clear gameBoard
        }
        return;
    }


    snake.unshift(head); // add new head to snake

    if (head.x < dot.x + 18 && head.x + 18 > dot.x &&
        head.y < dot.y + 18 && head.y + 18 > dot.y) {
        // eat apple
        dot = { x: Math.random() * 380, y: Math.random() * 380 };
    } else {
        snake.pop(); // remove tail
    }

    // clear old dots
    while (gameBoard.firstChild) {
        gameBoard.firstChild.remove();
    }

    // draw new snake
    snake.forEach(part => drawDot(part));
}

function drawDot(dot) {
    let div = document.createElement('div');
    div.style.width = '20px';
    div.style.height = '20px';
    div.style.backgroundColor = 'green';
    div.style.position = 'absolute';
    div.style.left = `${dot.x}px`;
    div.style.top = `${dot.y}px`;
    gameBoard.appendChild(div);
}

function drawApple(dot) {
    let img = document.createElement('img');
    img.src = 'apple_00.png';
    img.style.width = '20px';
    img.style.height = '20px';
    img.style.position = 'absolute';
    img.style.left = `${dot.x - 10}px`; // center horizontally
    img.style.top = `${dot.y - 10}px`; // center vertically
    gameBoard.appendChild(img);
}

let gameBoard = document.getElementById('game-board');
drawApple(dot); // draw the apple once at the start
setInterval(gameLoop, 8);

window.addEventListener('keydown', function(e) {
    switch (e.key) {
        case 'ArrowUp':
            direction = { x: 0, y: -5 }; // Changed from -20 to -1
            break;
        case 'ArrowDown':
            direction = { x: 0, y: 5 }; // Changed from 20 to 1
            break;
        case 'ArrowLeft':
            direction = { x: -5, y: 0 }; // Changed from -20 to -1
            break;
        case 'ArrowRight':
            direction = { x: 5, y: 0 }; // Changed from 20 to 1
            break;
    }
});