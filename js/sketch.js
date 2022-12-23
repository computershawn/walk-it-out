let yoff = 0.0;
const wd = 960;
const ht = 960;
const numCols = 80;
const w = wd / numCols;
const mar = 32;
let j = 0;
let count = 0;
const items = [];
let palette;
let going = false;
let perRow;
const maxPerRow = 8;
let grafx;

function setup() {
  createCanvas(wd, ht);
  grafx = createGraphics(wd, ht);
  perRow = round(random(1, maxPerRow)) * 40;

  const pickBtn = document.querySelector("#pick-btn");
  pickBtn.addEventListener("click", pickPalette);

  const startBtn = document.querySelector("#start-btn");
  startBtn.addEventListener("click", (e) => {
    if (going) {
      going = false;
      e.target.innerText = "start";
    } else {
      going = true;
      e.target.innerText = "pause";
    }
  });

  const downloadBtn = document.querySelector("#download-btn");
  downloadBtn.addEventListener("click", () => {
    const timestamp = round(Date.now() / 1000);
    const filename = `walk-it-out-${timestamp}`;
    saveCanvas(filename, "png");
  });
}

function draw() {
  background(255);

  updateGraphics();
  renderGraphics();
}

const updateGraphics = () => {
  if (going) {
    yoff = yoff + 0.03;
    let noi = noise(yoff) * ht;

    const item = {
      x: j * w,
      y: noi,
      len: getLength(w),
      colorIndex: randomIndex(palette),
      fillAlpha: random(207, 255),
      lineAlpha: random(127, 207),
      isDiagonal: random() > 0.96,
      isWhite: random() > 0.75,
      isRect: random() > 0.996,
      rectHeight: w * (1 + round(random(1, 3))),
      // colIndex: j,
    };

    items.push(item);

    count++;

    if (count > perRow) {
      j += 1;
      count = 0;
      perRow = round(random(1, maxPerRow)) * 40;
    }

    if (j === numCols) {
      going = false;
      const startBtn = document.querySelector("#start-btn");
      startBtn.innerText = "start";
    }
  }
};

const renderGraphics = () => {
  grafx.strokeCap(SQUARE);
  items.forEach((i) => {
    const co = color(palette[i.colorIndex]);

    if (i.isDiagonal) {
      grafx.noFill();
      grafx.stroke(red(co), green(co), blue(co), i.lineAlpha);
      const x0 = i.x;
      const y0 = i.y;
      const x1 = i.x + i.len;
      const y1 = i.y - i.len;
      if (i.isWhite) {
        grafx.stroke(255);
      }
      grafx.line(x0, y0, x1, y1);
    } else if (i.isRect) {
      grafx.noStroke();
      grafx.fill(red(co), green(co), blue(co), i.fillAlpha);
      grafx.rect(i.x, i.y, w, i.rectHeight);
    } else {
      grafx.noFill();
      grafx.stroke(red(co), green(co), blue(co), i.lineAlpha);
      grafx.line(i.x, i.y, i.x + i.len, i.y);
    }
  });

  image(grafx, mar, mar, wd - 2 * mar, ht - 2 * mar);
};
