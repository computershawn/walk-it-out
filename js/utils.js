const getColors = async () => {
  const colorsUrl =
    "https://raw.githubusercontent.com/Jam3/nice-color-palettes/master/1000.json";
  const data = await fetch(colorsUrl).then((res) => res.json());
  return data;
};

const initPalette = async () => {
  const allCo = await getColors();  
  document.getElementById("start-btn").disabled = false;

  return allCo;
}

const pickPalette = (allColorsArray) => {
  const temp = pickRandom(allColorsArray);
  
  const swatchDivs = document.querySelectorAll('.swatch');
  swatchDivs.forEach((s, i) => {
    s.style.backgroundColor = temp[i];
  });  

  return temp;
}

const getLength = (dim) => {
  const lim1 = 0.995;
  const lim2 = 0.9;
  const chance = random();

  if (chance >= lim1) {
    return wd;
  }

  if (chance > lim2 && chance < lim1) {
    const n = round(random(2, 6));
    return n * dim;
  }

  return dim;
};

const pickRandom = (arr) => {
  const index = randomIndex(arr);

  return arr[index];
};

const randomIndex = (arr, skip = -1) => {
  let index;
  if (skip === -1) {
    index = floor(random(arr.length));
  } else {
    const tempArray = [];
    arr.forEach((_, i) => {
      if (i !== skip) {
        tempArray.push(i);
      }
    });
    const altIndex = floor(random(tempArray.length));
    index = tempArray[altIndex];
  }

  return index;
}

function easeInQuad(x) {
  return x * x;
}

function createSvgFile(filename, dims, geometryArray, colorsArray) {
  let writer = createWriter(filename);
  writer.write(`<svg viewBox="0 0 ${dims.height} ${dims.width}" width="${dims.width}" height="${dims.height}" xmlns="http://www.w3.org/2000/svg">`);
  writer.write(`<g stroke-linecap="square">`);

  geometryArray.forEach(i => {
    let elem, x1, y1, co, op;
    if (i.isDiagonal) {
      x1 = i.x;
      y1 = i.y;
      const x2 = x1 + i.len * i.direx;
      const y2 = y1 - i.len * i.direx;
      co = i.isWhite ? '#ffffff' : colorsArray[i.colorIndex];
      op = (i.lineAlpha / 255).toFixed(2);
      elem = `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${co}" stroke-opacity="${op}" />`;
    } else if (i.isRect) {
      x1 = i.x;
      y1 = i.y;
      co = colorsArray[i.colorIndex];
      op = (i.fillAlpha / 255).toFixed(2);
      elem = `<rect x="${x1}" y="${y1}" width="${i.rectWidth}" height="${i.rectHeight}" fill="${co}" fill-opacity="${op}" />`;
    } else {
      x1 = i.x;
      y1 = i.y;
      co = i.isWhite ? '#ffffff' : colorsArray[i.colorIndex];
      op = (i.lineAlpha / 255).toFixed(2);
      elem = `<line x1="${x1}" y1="${y1}" x2="${x1 + i.len}" y2="${y1}" stroke="${co}" stroke-opacity="${op}" />`;
    }
    writer.write(elem);
  });

  writer.write(`</g>`);
  writer.write(`</svg>`);
  writer.close();
}
