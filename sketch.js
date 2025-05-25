let images = {};
let currentKey = "screen1";


  let storyMap = {

    "screen1": "screen2",
    "screen2": "screen3",
    "screen3": "screen4",
    "screen4": "screen5",
    "screen5": "screen6",
    "screen6": "screen7",

    // 1단계: 최초 분기
    "screen7": {
      "A": "screen7-1",
      "B": "screen7-2",
      "C": "screen7-3"
    },
  
    // screen7-1 가지
    "screen7-1": { "A": "screen7-1-1", "B": "screen7-1-2" },
    "screen7-1-1": { "A": "screen7-1-1-1", "B": "screen7-1-1-2" },
    "screen7-1-2": { "A": "screen7-1-2-1", "B": "screen7-1-2-2" },
  
    // screen7-1 마지막 단계 → screen8
    "screen7-1-1-1": "screen8",
    "screen7-1-1-2": "screen8",
    "screen7-1-2-1": "screen8",
    "screen7-1-2-2": "screen8",
  
    // screen7-2 가지
    "screen7-2": { "A": "screen7-2-1", "B": "screen7-2-2" },
    "screen7-2-1": { "A": "screen7-2-1-1", "B": "screen7-2-1-2" },
    "screen7-2-2": { "A": "screen7-2-2-1", "B": "screen7-2-2-2" },
  
    // screen7-2 마지막 단계 → screen8
    "screen7-2-1-1": "screen8",
    "screen7-2-1-2": "screen8",
    "screen7-2-2-1": "screen8",
    "screen7-2-2-2": "screen8",
  
    // screen7-3 가지
    "screen7-3": { "A": "screen7-3-1", "B": "screen7-3-2" },
    "screen7-3-1": { "A": "screen7-3-1-1", "B": "screen7-3-1-2" },
    "screen7-3-2": { "A": "screen7-3-2-1", "B": "screen7-3-2-2" },
  
    // screen7-3 마지막 단계 → screen8
    "screen7-3-1-1": "screen8",
    "screen7-3-1-2": "screen8",
    "screen7-3-2-1": "screen8",
    "screen7-3-2-2": "screen8",

    "screen8" : "screen9",
    "screen9" : "screen9-1",
    "screen9-1" : "screen10",
    "screen10" : "screen11",
    "screen11" : "screen12",

    "screen12" : "screen13",
    "screen13" : "screen13-1",
    "screen13-1" : "screen14",
    "screen14" : "screen15",
    "screen15" : "screen16",
  };
  

let fileNames = [
  "screen1.png",
  "screen7-1.png",
  "screen7-1-2.png",
  "screen7-1-2-1.png",
  "screen7-1-2-2.png"
  // ... 필요한 파일 추가
];

function preload() {
  for (let name of fileNames) {
    let key = name.replace(".png", "");
    images[key] = loadImage("visual assets/" + name);
  }
}

function setup() {
  createCanvas(1512, 982); // 혹은 windowWidth, windowHeight로 바꿔도 돼
  imageMode(CENTER);
  noLoop();
}

function draw() {
  background(0);

  let img = images[currentKey];
  if (!img) return;

  let canvasRatio = width / height;
  let imgRatio = img.width / img.height;

  let newW, newH;
  if (imgRatio < canvasRatio) {
    newW = width;
    newH = width / imgRatio;
  } else {
    newH = height;
    newW = height * imgRatio;
  }

  image(img, width / 2, height / 2, newW, newH);
}

function keyPressed() {
  if (key === ' ') {
    let next = storyMap[currentKey];
    if (typeof next === 'string') {
      currentKey = next;
      redraw();
    }
  }
}

function mousePressed() {
  let next = storyMap[currentKey];

  if (typeof next === 'object') {
    if (mouseX < width / 3) {
      currentKey = next["A"];
    } else if (mouseX < 2 * width / 3) {
      currentKey = next["B"];
    } else {
      currentKey = next["C"];
    }
    redraw();
  }
}