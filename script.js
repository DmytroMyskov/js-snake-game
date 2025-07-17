const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
const boardSize = 20;
const cellSize = width / boardSize;
const food = [2, 2];
const snake = [[4, 4], [4, 5], [4, 6], [5, 6], [6, 6]];

drawGrid(boardSize, boardSize);
drawFood(...food);
drawSnake(...snake);

food[0] = Math.floor(Math.random() * boardSize) + 1;
food[1] = Math.floor(Math.random() * boardSize) + 1;

drawGrid(boardSize, boardSize);
drawFood(...food);
drawSnake(...snake);

function drawGrid(columnCount, rowCount) {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, width, height);

  for (let j = 0, y = 0.5; j < rowCount; j++, y += cellSize) {
    for (let i = 0, x = 0.5; i < columnCount; i++, x += cellSize) {
      ctx.strokeRect(x, y, cellSize - 1, cellSize - 1);
    }
  }
}

function drawFood(x, y) {
  ctx.fillStyle = 'red';
  ctx.fillRect((x - 1) * cellSize + 1, (y - 1) * cellSize + 1, cellSize - 2, cellSize - 2);
}

function drawSnake(...positions) {
  for (const [x, y] of positions) {
    ctx.fillStyle = 'green';
    ctx.fillRect((x - 1) * cellSize + 1, (y - 1) * cellSize + 1, cellSize - 2, cellSize - 2);
  }
}