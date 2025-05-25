let img;

function preload() {
  img = loadImage("your-image-file.png"); // 이미지 파일명에 맞게 수정
}

function setup() {
  createCanvas(1512, 982); // 맥북 14인치 기준 화면
  imageMode(CENTER);
}

function draw() {
  background(0);

  // 이미지 비율 유지하며 화면에 맞게 크기 조절
  let canvasRatio = width / height;
  let imgRatio = img.width / img.height;

  let newW, newH;

  if (imgRatio > canvasRatio) {
    // 이미지가 더 가로로 길면 → 가로를 기준으로 맞추기
    newW = width;
    newH = width / imgRatio;
  } else {
    // 이미지가 더 세로로 길면 → 세로를 기준으로 맞추기
    newH = height;
    newW = height * imgRatio;
  }

  image(img, width / 2, height / 2, newW, newH);
}
