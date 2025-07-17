const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

drawGrid(16, 16);
drawFood(2, 2);
drawSnake([4, 4], [4, 5], [4, 6], [5, 6], [6, 6]);

function drawGrid(width, height) {
  for (let j = 0, y = 0.5; j < height; j++, y += 32) {
    for (let i = 0, x = 0.5; i < width; i++, x += 32) {
      ctx.strokeRect(x, y, 31, 31);
    }
  }
}

function drawFood(x, y) {
  ctx.fillStyle = 'red';
  ctx.fillRect((x - 1) * 32 + 1, (y - 1) * 32 + 1, 30, 30);
}

function drawSnake(...positions) {
  for (const [x, y] of positions) {
    ctx.fillStyle = 'green';
    ctx.fillRect((x - 1) * 32 + 1, (y - 1) * 32 + 1, 30, 30);
  }
}