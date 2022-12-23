let xoff = 0.0;
const wd = 960;
const ht = 960;
const numRows = 40;
const h = ht / numRows;
let j = 0;
let count = 0;
const items = [];
let palette;
let going = false;
const perRow = 320;
let colorsLoaded = false;

function setup() {
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

  createCanvas(wd, ht);
}

function draw() {
  background(255);

  if (going) {
    xoff = xoff + 0.02;
    let noi = noise(xoff) * width;

    const item = {
      x: noi,
      y: j * h,
      len: getLength(),
      colorIndex: randomIndex(palette),
      fillAlpha: random(207, 255),
      lineAlpha: random(127, 207),
      isDiagonal: random() > 0.96,
      isWhite: random() > 0.75,
      isRect: random() > 0.996,
      rectWidth: h * (1 + round(random(1, 3))),
      rowIndex: j,
    };

    items.push(item);

    count++;

    if (count > perRow) {
      j += 1;
      count = 0;
    }

    if (j === numRows) {
      going = false;
      const startBtn = document.querySelector("#start-btn");
      startBtn.innerText = "start";
    }
  }

  items.forEach((i) => {
    const co = color(palette[i.colorIndex]);

    if (i.isDiagonal) {
      noFill();
      stroke(red(co), green(co), blue(co), i.lineAlpha);
      const x0 = i.x;
      const y0 = i.y;
      const x1 = i.x + i.len;
      const y1 = i.y + i.len;
      if (i.isWhite) {
        stroke(255);
      }
      line(x0, y0, x1, y1);
    } else if (i.isRect) {
      noStroke();
      // fill(co);
      fill(red(co), green(co), blue(co), i.fillAlpha);
      rect(i.x, i.y, i.rectWidth, h);
    } else {
      noFill();
      stroke(red(co), green(co), blue(co), i.lineAlpha);
      line(i.x, i.y, i.x, i.y + i.len);
    }
  });
}
