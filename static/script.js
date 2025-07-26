const canvas = document.getElementById('sortCanvas');
const ctx = canvas.getContext('2d');

const range = 83;
const spacing = 12;
let heights = [];
let positions = [];

function createBars() {
  heights = [];
  positions = [];
  for (let i = 0; i < range; i++) {
    heights.push(Math.floor(Math.random() * 350) + 50);
    positions.push(i * spacing);
  }
}

function drawBars(activeIndex = -1, minIndex = -1) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < range; i++) {
    if (i === activeIndex) ctx.fillStyle = 'red';
    else if (i === minIndex) ctx.fillStyle = 'green';
    else ctx.fillStyle = 'white';

    ctx.fillRect(positions[i], canvas.height - heights[i], 10, heights[i]);
  }
}

function randomize() {
  createBars();
  drawBars();
}

async function selectionSort() {
  for (let i = 0; i < range; i++) {
    let minIdx = i;
    for (let j = i + 1; j < range; j++) {
      if (heights[j] < heights[minIdx]) {
        minIdx = j;
      }
    }

    // Swap
    [heights[i], heights[minIdx]] = [heights[minIdx], heights[i]];

    drawBars(i, minIdx);
    await new Promise(resolve => setTimeout(resolve, 50));
  }
}

window.onload = randomize;
