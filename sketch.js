let images = {};
let currentKey = "screen1";

  // 스토리 분기 표시

  let storyMap = {

    "screen1": "screen2",
    "screen2": "screen3",
    "screen3": "screen3-1", // 여기 전환이 안됨 why
    "screen3-1": "screen4",
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
  

  // 이미지 파일 로드

  let fileNames = [
    "screen1.png",
    "screen2.png",
    "screen3.png",
    "screen4.png",
    "screen5.png",
    "screen6.png",
    "screen7.png",
  
    "screen7-1.png",
    "screen7-1-1.png",
    "screen7-1-1-1.png",
    "screen7-1-1-2.png",
    "screen7-1-2.png",
    "screen7-1-2-1.png",
    "screen7-1-2-2.png",
  
    "screen7-2.png",
    "screen7-2-1.png",
    "screen7-2-1-1.png",
    "screen7-2-1-2.png",
    "screen7-2-2.png",
    "screen7-2-2-1.png",
    "screen7-2-2-2.png",
  
    "screen7-3.png",
    "screen7-3-1.png",
    "screen7-3-1-1.png",
    "screen7-3-1-2.png",
    "screen7-3-2.png",
    "screen7-3-2-1.png",
    "screen7-3-2-2.png",
  
    "screen8.png",
    "screen9.png",
    "screen9-1.png",
    "screen10.png",
    "screen11.png",
    "screen12.png",
    "screen13.png",
    "screen13-1.png",
    "screen14.png",
    "screen15.png",
    "screen16.png"
  ];

  // 아이콘 로드

  let choices = {
    "screen7": [
      {
        x: 280, y: 760,
        w: 225, h: 225,
        img: null,
        imgPath: "visual assets/screen7icon1.png",
        next: "screen7-1",
        label: "개방감이 있는 카페"
      },
      {
        x: 756, y: 760,
        w: 225, h: 225,
        img: null,
        imgPath: "visual assets/screen7icon2.png",
        next: "screen7-2",
        label: "인문학 독립서점"
      },
      {
        x: 1232, y: 760,
        w: 225, h: 225,
        img: null,
        imgPath: "visual assets/screen7icon3.png",
        next: "screen7-3",
        label: "트렌디한 의류 브랜드 매장"
      }
    ],
  
    "screen7-1": [
      {
        x: 356, y: 760,
        w: 225, h: 225,
        img: null,
        imgPath: "visual assets/screen7-1icon1.png",
        next: "screen7-1-1",
        label: "낮에는 카페, 밤에는 칵테일 바로 혼합 운영"
      },
      {
        x: 1156, y: 760,
        w: 225, h: 225,
        img: null,
        imgPath: "visual assets/screen7-1icon2.png",
        next: "screen7-1-2",
        label: "카페에 책 보급을 통해 북카페로 운영"
      }
    ]
  
    // 아이콘 아직덜됨 진행중
  };
  
  

  function preload() {
    // 1단계: 배경 이미지 로딩
    for (let name of fileNames) {
      let key = name.replace(".png", "");
      images[key] = loadImage("visual assets/" + name);
    }
  
    // 2단계: 선택지 아이콘 이미지 로딩
    for (let key in choices) {
      for (let choice of choices[key]) {
        choice.img = loadImage(choice.imgPath);
      }
    }
  }
  

function setup() {
  createCanvas(1512, 982); // 혹은 windowWidth, windowHeight로 바꿔도 돼
  imageMode(CENTER);
}

function draw() {
  background(0);

  let img = images[currentKey];
  if (img) {
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

  // 선택지 아이콘 표시
  if (choices[currentKey]) {
    for (let c of choices[currentKey]) {
      image(c.img, c.x, c.y, c.w, c.h);

      // 마우스 오버 시 텍스트 박스 표시
      if (mouseX >= c.x - c.w / 2 && mouseX <= c.x + c.w / 2 &&
          mouseY >= c.y - c.h / 2 && mouseY <= c.y + c.h / 2) {

        fill(255);
        rect(mouseX, mouseY - 40, textWidth(c.label) + 20, 35, 5);

        fill(0);
        textSize(30);
        text(c.label, mouseX + 10, mouseY - 13);
      }
    }
  }

  textSize(30);
  text(`x-coordinate: ${mouseX}`, 100, 318);
  text(`y-coordinate: ${mouseY}`, 100, 390);
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

  if (choices[currentKey]) {
    for (let c of choices[currentKey]) {
      if (mouseX >= c.x - c.w / 2 && mouseX <= c.x + c.w / 2 &&
          mouseY >= c.y - c.h / 2 && mouseY <= c.y + c.h / 2) {
        currentKey = c.next;
        redraw();
        return;
      }
    }
  }

  if (currentKey === "screen1") {
    if (mouseX >= 560 && mouseX <= 930 &&
        mouseY >= 776 && mouseY <= 881) {
      currentKey = "screen2";
      redraw();
      return;
    }
  }

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