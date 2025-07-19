const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
let speed = 2; //cells per second
let stepInterval = 1000 / speed;
const boardSize = 20;
const cellSize = width / boardSize;
const food = [2, 2];
const snake = [[4, 4], [4, 5], [4, 6], [5, 6], [6, 6]];
let direction = 'right';
const movements = {
  right: [1, 0],
  down: [0, 1],
  left: [-1, 0],
  up: [0, -1]
}

render();
requestAnimationFrame(animate);

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

function render() {
  drawGrid(boardSize, boardSize);
  drawFood(...food);
  drawSnake(...snake);
}

function animate(now) {
  animate.previous ||= now
  const dt = now - animate.previous
  animate.previous = now
  update(dt)
  render()
  requestAnimationFrame(animate)
}

function update(dt) {
  update.leftover ||= {}
  {
    update.leftover.food ||= 0
    const time = dt + update.leftover.food
    const shift = Math.floor(time / stepInterval)
    update.leftover.food = time % stepInterval
    food[1] += shift
  }
  {
    update.leftover.snake ||= 0
    const time = dt + update.leftover.snake
    const shift = Math.floor(time / stepInterval)
    update.leftover.snake = time % stepInterval
    for (let i = 0; i < shift; i++) {
      const [x, y] = snake.at(-1)
      const movement = movements[direction]
      const [dx, dy] = movement
      snake.push([x + dx, y + dy])
      snake.shift()
    }
  }
}