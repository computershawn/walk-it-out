const getColors = async () => {
  const colorsUrl =
    "https://raw.githubusercontent.com/Jam3/nice-color-palettes/master/1000.json";
  const data = await fetch(colorsUrl).then((res) => res.json());
  return data;
};

const pickPalette = async () => {
  const allColors = await getColors();
  palette = pickRandom(allColors);
  
  const swatchDivs = document.querySelectorAll('.swatch');
  swatchDivs.forEach((s, i) => {
    s.style.backgroundColor = palette[i];
  });
  
  document.getElementById("start-btn").disabled = false;
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
