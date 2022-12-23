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

const getLength = () => {
  const lim1 = 0.995;
  const lim2 = 0.9;
  const chance = random();

  if (chance >= lim1) {
    return ht;
  }

  if (chance > lim2 && chance < lim1) {
    const n = round(random(2, 6));
    return n * h;
  }

  return h;
};

const pickRandom = (arr) => {
  const index = randomIndex(arr);

  return arr[index];
};

const randomIndex = (arr) => {
  return floor(random(arr.length));
};
