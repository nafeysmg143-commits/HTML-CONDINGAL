// 1. Reference the canvas and the 2D drawing tool
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 2. Define the Player entity
const player = {
    x: 375,      // Starting horizontal position
    y: 275,      // Starting vertical position
    size: 50,    // Square size in pixels
    speed: 5     // How many pixels to move per frame
};

// 3. Keep track of pressed keys
const keys = {};

window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// 4. Update game variables (Movement & Collisions)
function update() {
    if (keys['ArrowUp'] || keys['w']) player.y -= player.speed;
    if (keys['ArrowDown'] || keys['s']) player.y += player.speed;
    if (keys['ArrowLeft'] || keys['a']) player.x -= player.speed;
    if (keys['ArrowRight'] || keys['d']) player.x += player.speed;

    // Boundary constraints (Keep player inside the canvas box)
    if (player.x < 0) player.x = 0;
    if (player.y < 0) player.y = 0;
    if (player.x > canvas.width - player.size) player.x = canvas.width - player.size;
    if (player.y > canvas.height - player.size) player.y = canvas.height - player.size;
}
// 5. Draw the game elements onto the screen
function draw() {
    // Clear the previous frame so old movements don't leave streaks
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the player (A neon green square)
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(player.x, player.y, player.size, player.size);
}

// 6. The main Game Loop running at 60 FPS
function gameLoop() {
    update();
    draw();
    // Tells the browser to run gameLoop again before the next screen repaint
    requestAnimationFrame(gameLoop);
}

// Start the game!
gameLoop();
