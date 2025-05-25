let img;

function preload() {
  img = loadImage("visual assets/street.png");
}

function setup() {
  createCanvas(1512, 982); // 혹은 windowWidth, windowHeight로 바꿔도 돼
  imageMode(CENTER);
  noLoop();
}

function draw() {
  background(0);

  let canvasRatio = width / height;
  let imgRatio = img.width / img.height;

  let newW, newH;

  if (imgRatio < canvasRatio) {
    // 캔버스가 더 가로로 긴 경우 → 가로에 맞춰 확대 (세로 일부 잘림)
    newW = width;
    newH = width / imgRatio;
  } else {
    // 캔버스가 더 세로로 긴 경우 → 세로에 맞춰 확대 (가로 일부 잘림)
    newH = height;
    newW = height * imgRatio;
  }

  image(img, width / 2, height / 2, newW, newH);
}