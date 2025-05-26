let images = {};
let currentKey = "screen1";
let textMap = {};

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
    "screen13" : "screen14",
    "screen14" : "screen14-1",
    "screen14-1" : "screen15",
    "screen15" : "screen16",
  };
  

  // 이미지 파일 로드

  let fileNames = [
    "screen1.png",
    "screen2.png",
    "screen3.png",
    "screen3-1.png",
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
    "screen13.png",
    "screen14.png",
    "screen14-1.png",
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
    ],

    "screen7-1-1": [
      {
        x: 356, y: 760,
        w: 225, h: 225,
        img: null,
        imgPath: "visual assets/screen7-1-1icon1.png",
        next: "screen7-1-1-1",
        label: "매주 주말 라이브 재즈 공연 호스팅"
      },
      {
        x: 1156, y: 760,
        w: 225, h: 225,
        img: null,
        imgPath: "visual assets/screen7-1-1icon2.png",
        next: "screen7-1-1-2",
        label: "하이엔드 스피커 구비하여 뮤직바로 운영"
      }
    ],

    "screen7-1-2": [
      {
        x: 356, y: 760,
        w: 225, h: 225,
        img: null,
        imgPath: "visual assets/screen7-1-2icon1.png",
        next: "screen7-1-2-1",
        label: "회화, 디자인, 사진 관련 희귀 예술 서적 구비 (음료 구매 시 무료 열람 가능)"
      },
      {
        x: 1156, y: 760,
        w: 225, h: 225,
        img: null,
        imgPath: "visual assets/screen7-1-2icon2.png",
        next: "screen7-1-2-2",
        label: "인기 만화 시리즈 대여섯 편 전권 구비 (음료 구매 시 무료 열람 가능)"
      }
    ],

    "screen7-2": [
      {
        x: 356, y: 760,
        w: 225, h: 225,
        img: null,
        imgPath: "visual assets/screen7-2icon1.png",
        next: "screen7-2-1",
        label: "매주 주말 작가 초청 북토크 운영"
      },
      {
        x: 1156, y: 760,
        w: 225, h: 225,
        img: null,
        imgPath: "visual assets/screen7-2icon2.png",
        next: "screen7-2-2",
        label: "문구 편집샵으로 동시 운영"
      }
    ],

    "screen7-2-1": [
      {
        x: 356, y: 760,
        w: 225, h: 225,
        img: null,
        imgPath: "visual assets/screen7-2-1icon1.png",
        next: "screen7-2-1-1",
        label: "강연 후 한 달 동안 작가 추천 노트가 담긴 서적 10선 DP, 할인된 가격에 판매"
      },
      {
        x: 1156, y: 760,
        w: 225, h: 225,
        img: null,
        imgPath: "visual assets/screen7-2-1icon2.png",
        next: "screen7-2-1-2",
        label: "신청자를 받아 작가와 함께하는 문예창작 원데이 클래스 운영, 추후 서점에 결과물 전시"
      }
    ],

    "screen7-2-2": [
      {
        x: 356, y: 760,
        w: 225, h: 225,
        img: null,
        imgPath: "visual assets/screen7-2-2icon1.png",
        next: "screen7-2-2-1",
        label: "도서 구매 시, 인근 가죽 공장과 협업하여 책 사이즈에 맞는 가죽 북커버 제작 클래스 참여 가능"
      },
      {
        x: 1156, y: 760,
        w: 225, h: 225,
        img: null,
        imgPath: "visual assets/screen7-2-2icon2.png",
        next: "screen7-2-2-2",
        label: "매달 책과 어울리는 문구 큐레이션 묶음을 새로 런칭 후 판매"
      }
    ],

    "screen7-3": [
      {
        x: 356, y: 760,
        w: 225, h: 225,
        img: null,
        imgPath: "visual assets/screen7-3icon1.png",
        next: "screen7-3-1",
        label: "인근 봉제공장과 협동하여 의류 구매자 대상으로 빈티지 작업복 리폼 클래스 운영"
      },
      {
        x: 1156, y: 760,
        w: 225, h: 225,
        img: null,
        imgPath: "visual assets/screen7-3icon2.png",
        next: "screen7-3-2",
        label: "맞춤형 테일러링 서비스 기반 수제 의류 판매"
      }
    ],

    "screen7-3-1": [
      {
        x: 356, y: 760,
        w: 225, h: 225,
        img: null,
        imgPath: "visual assets/screen7-3-1icon1.png",
        next: "screen7-3-1-1",
        label: "베스트 작업복 리폼작 선정 후 작가 이름 병기하여 정식 라인업 출시"
      },
      {
        x: 1156, y: 760,
        w: 225, h: 225,
        img: null,
        imgPath: "visual assets/screen7-3-1icon2.png",
        next: "screen7-3-1-2",
        label: "매달 작업복 리폼작을 활용하여 모델 런웨이 개최"
      }
    ],

    "screen7-3-2": [
      {
        x: 356, y: 760,
        w: 225, h: 225,
        img: null,
        imgPath: "visual assets/screen7-3-2icon1.png",
        next: "screen7-3-2-1",
        label: "서울 주요 대학가에 이동식 테일러링 부스 설치하여 매장 홍보"
      },
      {
        x: 1156, y: 760,
        w: 225, h: 225,
        img: null,
        imgPath: "visual assets/screen7-3-2icon2.png",
        next: "screen7-3-2-2",
        label: "라디오에서 '사연 기반 테일러링' 응모를 받아 추첨을 통해 10명에게 무료로 의류 제작"
      }
    ],
  };
  
  

  function preload() {
    // 1단계: 배경 이미지 로딩 (로딩 안 된 이미지 체크)
    for (let name of fileNames) {
      let key = name.replace(".png", "");
      images[key] = loadImage("visual assets/" + name,
      () => console.log(`✅ 배경 이미지 로드됨: ${name}`),
      () => console.error(`❌ 배경 이미지 로드 실패: ${name}`));
    }
  
    // 2단계: 선택지 아이콘 이미지 로딩 (로딩 안 된 이미지 체크)
    for (let key in choices) {
      for (let choice of choices[key]) {
        loadImage(choice.imgPath,
          img => {
            choice.img = img;
            console.log(`✅ 아이콘 로드됨: ${choice.imgPath}`);
          },
          () => console.error(`❌ 아이콘 로드 실패: ${choice.imgPath}`)
        );
      }
    }
    }
  

function setup() {
  createCanvas(1512, 982); // 혹은 windowWidth, windowHeight로 바꿔도 돼
  imageMode(CENTER);

    // 화면에 띄울 글 목록

    textMap = {
      "screen1": {
        content: "REFURBISH",
        x: width / 2,
        y: 500,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen2" : {
        content: "이곳은 오래된 마을 입구입니다.",
        x: width / 2,
        y: 100,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      }
  
    };
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


  // 화면에 글자 표시
  if (textMap[currentKey]) {
    let t = textMap[currentKey];

    fill(...(t.color || [255]));
    textSize(t.size || 32);
    if (t.align === "left") {
      textAlign(LEFT, CENTER);
    } else {
      textAlign(CENTER, CENTER);
    }

    text(t.content, t.x, t.y);
  }


  // 선택지 아이콘 표시
  if (choices[currentKey]) {
    for (let c of choices[currentKey]) {
      image(c.img, c.x, c.y, c.w, c.h);

      // 마우스 오버 시 텍스트 박스 표시
      if (mouseX >= c.x - c.w / 2 && mouseX <= c.x + c.w / 2 &&
      mouseY >= c.y - c.h / 2 && mouseY <= c.y + c.h / 2) {

        let paddingX = 10;
        let paddingY = 8;
        let labelWidth = textWidth(c.label);
        let boxW = labelWidth + paddingX * 1.5;
        let boxH = 30 + paddingY;

  // 텍스트 박스 (배경)
  fill(255);
  rectMode(CENTER);
  rect(mouseX, mouseY - 60, boxW, boxH, 5);

  // 텍스트
  fill(0);
  textSize(24);
  textAlign(CENTER, CENTER);
  text(c.label, mouseX, mouseY - 60);
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