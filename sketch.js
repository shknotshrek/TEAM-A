let images = {};
let currentKey = "screen1";
let textMap = {};
let screenHistory = [];
let customFont;

// 벽화 파트 변수

let muralCanvas;
let wallTextureImage;
let initialMuralImage;

let brushes = [];
let selectedBrush;
const BRUSH_COUNT = 4;
let brushButtons = [];
let resetButton;
let completeButton;

const muralCanvasWidth = 1200;
const muralCanvasHeight = 982;
const sidebarWidth = 1512 - muralCanvasWidth; // 312
const buttonHeight = 40;
const buttonMargin = 10;

let showComparison = false;
let currentStage = 1;

let colorButtons = [];
let brushColors;

let brushSize = 1.0; // 0.5~6.0 사이 값, 1.0이 기본
let sliderX, sliderY, sliderW, sliderH, handleX;
let draggingHandle = false;
let currentColor; // <- 추가: 현재 선택된 색상

let musicAssets = {};
let currentMusic = null;
let musicStarted = false;

let introMusic;
let introMusicStarted = false;

let muralMusic;
let muralMusicStarted = false;

let muralImage;          // 벽화 이미지 저장용
let isFading = false;    // 페이드인 중 여부
let isFadedIn = false;   // 페이드인 완료 여부
let fadeAmount = 0;      // 페이드 투명도

  // 스토리 분기 표시

  let storyMap = {

    "screen1": "screen2",
    "screen2": "screen2-1",
    "screen2-1": "screen2-2",
    "screen2-2": "screen2-3",
    "screen2-3": "screen2-4",
    "screen2-4": "screen3",
    "screen3": "screen3-1", // 여기 전환이 안됨 why
    "screen3-1": "screen4",
    "screen4": "screen5",
    "screen5": "screen6",
    "screen6": "screen7-intro",
    "screen7-intro": "screen7",

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
    "screen10" : "screen10-1",
    "screen10-1" : "screen10-2",
    "screen10-2" : "screen11",
    "screen11" : "screen11-1",
    "screen11-1" : "screen12",

    "screen12" : "screen13",
    "screen13" : "screen11-2",
    "screen11-2" : "screen14",
    "screen14" : "screen14-1",
    "screen14-1" : "screen15",
    "screen15" : "screen15-1",
    "screen15-1" : "screen15-2",
    "screen15-2" : "screen15-3",
    "screen15-3" : "screen15-4",
    "screen15-4" : "screen15-5",
    "screen15-5" : "screen16",
  };
  

  // 이미지 파일 로드

  let fileNames = [
    "screen1.png",
    "screen2.png",
    "screen2-1.png",
    "screen2-2.png",
    "screen2-3.png",
    "screen2-4.png",
    "screen3.png",
    "screen3-1.png",
    "screen4.png",
    "screen5.png",
    "screen6.png",
    "screen7-intro.png",
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
    "screen10-1.png",
    "screen10-2.png",
    "screen11.png",
    "screen11-1.png",
    "screen11-2.png",
    "screen12.png",
    "screen13.png",
    "screen14.png",
    "screen14-1.png",
    "screen15.png",
    "screen15-1.png",
    "screen15-2.png",
    "screen15-3.png",
    "screen15-4.png",
    "screen15-5.png",
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
        hoverImg: null,
        hoverImgPath: "visual assets/screen7icon1MO.png",
        next: "screen7-1",
        label: "개방감이 있는 카페"
      },
      {
        x: 756, y: 760,
        w: 225, h: 225,
        img: null,
        imgPath: "visual assets/screen7icon2.png",
        hoverImg: null,
        hoverImgPath: "visual assets/screen7icon2MO.png",
        next: "screen7-2",
        label: "인문학 독립서점"
      },
      {
        x: 1232, y: 760,
        w: 225, h: 225,
        img: null,
        imgPath: "visual assets/screen7icon3.png",
        hoverImg: null,
        hoverImgPath: "visual assets/screen7icon3MO.png",
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
        hoverImg: null,
        hoverImgPath: "visual assets/screen7-1icon1MO.png",
        next: "screen7-1-1",
        label: "낮에는 카페, 밤에는 칵테일 바로 혼합 운영"
      },
      {
        x: 1156, y: 760,
        w: 225, h: 225,
        img: null,
        imgPath: "visual assets/screen7-1icon2.png",
        hoverImg: null,
        hoverImgPath: "visual assets/screen7-1icon2MO.png",
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
        hoverImg: null,
        hoverImgPath: "visual assets/screen7-1-1icon1MO.png",
        next: "screen7-1-1-1",
        label: "매주 주말 라이브 재즈 공연 호스팅"
      },
      {
        x: 1156, y: 760,
        w: 225, h: 225,
        img: null,
        imgPath: "visual assets/screen7-1-1icon2.png",
        hoverImg: null,
        hoverImgPath: "visual assets/screen7-1-1icon2MO.png",
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
        hoverImg: null,
        hoverImgPath: "visual assets/screen7-1-2icon1MO.png",
        next: "screen7-1-2-1",
        label: "회화, 디자인, 사진 관련 희귀 예술 서적 구비 (음료 구매 시 무료 열람 가능)"
      },
      {
        x: 1156, y: 760,
        w: 225, h: 225,
        img: null,
        imgPath: "visual assets/screen7-1-2icon2.png",
        hoverImg: null,
        hoverImgPath: "visual assets/screen7-1-2icon2MO.png",
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
        hoverImg: null,
        hoverImgPath: "visual assets/screen7-2icon1MO.png",
        next: "screen7-2-1",
        label: "매주 주말 작가 초청 북토크 운영"
      },
      {
        x: 1156, y: 760,
        w: 225, h: 225,
        img: null,
        imgPath: "visual assets/screen7-2icon2.png",
        hoverImg: null,
        hoverImgPath: "visual assets/screen7-2icon2MO.png",
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
        hoverImg: null,
        hoverImgPath: "visual assets/screen7-2-1icon1MO.png",
        next: "screen7-2-1-1",
        label: "강연 후 한 달 동안 작가 추천 노트가 담긴 서적 10선 DP, 할인된 가격에 판매"
      },
      {
        x: 1156, y: 760,
        w: 225, h: 225,
        img: null,
        imgPath: "visual assets/screen7-2-1icon2.png",
        hoverImg: null,
        hoverImgPath: "visual assets/screen7-2-1icon2MO.png",
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
        hoverImg: null,
        hoverImgPath: "visual assets/screen7-2-2icon1MO.png",
        next: "screen7-2-2-1",
        label: "도서 구매 시, 인근 가죽 공장과 협업하여 책 사이즈에 맞는 가죽 북커버 제작 클래스 참여 가능"
      },
      {
        x: 1156, y: 760,
        w: 225, h: 225,
        img: null,
        imgPath: "visual assets/screen7-2-2icon2.png",
        hoverImg: null,
        hoverImgPath: "visual assets/screen7-2-2icon2MO.png",
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
        hoverImg: null,
        hoverImgPath: "visual assets/screen7-3icon1MO.png",
        next: "screen7-3-1",
        label: "인근 봉제공장과 협동하여 의류 구매자 대상으로 빈티지 작업복 리폼 클래스 운영"
      },
      {
        x: 1156, y: 760,
        w: 225, h: 225,
        img: null,
        imgPath: "visual assets/screen7-3icon2.png",
        hoverImg: null,
        hoverImgPath: "visual assets/screen7-3icon2MO.png",
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
        hoverImg: null,
        hoverImgPath: "visual assets/screen7-3-1icon1MO.png",
        next: "screen7-3-1-1",
        label: "베스트 작업복 리폼작 선정 후 작가 이름 병기하여 정식 라인업 출시"
      },
      {
        x: 1156, y: 760,
        w: 225, h: 225,
        img: null,
        imgPath: "visual assets/screen7-3-1icon2.png",
        hoverImg: null,
        hoverImgPath: "visual assets/screen7-3-1icon2MO.png",
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
        hoverImg: null,
        hoverImgPath: "visual assets/screen7-3-2icon1MO.png",
        next: "screen7-3-2-1",
        label: "서울 주요 대학가에 이동식 테일러링 부스 설치하여 매장 홍보"
      },
      {
        x: 1156, y: 760,
        w: 225, h: 225,
        img: null,
        imgPath: "visual assets/screen7-3-2icon2.png",
        hoverImg: null,
        hoverImgPath: "visual assets/screen7-3-2icon2MO.png",
        next: "screen7-3-2-2",
        label: "라디오에서 '사연 기반 테일러링' 응모를 받아 추첨을 통해 10명에게 무료로 의류 제작"
      }
    ],
  };
  
  

  function preload() {
    customFont = loadFont('font assets/YES24MyoungjoR.otf');
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
        choice.img = loadImage(choice.imgPath);
        choice.hoverImg = loadImage(choice.hoverImgPath);
      }
    }

    // 벽화 파트

    wallTextureImage = loadImage('visual assets/wall.png');
    musicAssets.basic = loadSound('audio assets/music1.mp3');
    musicAssets.spray = loadSound('audio assets/Dream1.mp3');
    introMusic = loadSound('audio assets/intro.mp3');
    muralMusic = loadSound('audio assets/mural background.mp3');
    // 사운드 로드 예시 (실제 사운드 파일이 있다면 사용)
    // soundFormats('mp3', 'ogg');
    // sounds = [loadSound('brush1.mp3'), loadSound('spray.mp3'), loadSound('paint.mp3'), loadSound('marker.mp3')];
  };
  

function setup() {
  createCanvas(1512, 982); // 혹은 windowWidth, windowHeight로 바꿔도 돼
  textFont(customFont);
  imageMode(CENTER);

  muralCanvas = createGraphics(muralCanvasWidth, muralCanvasHeight);

  // 색상 배열은 setup에서 p5 color()로 초기화
  brushColors = [
    // Top row (8 colors)
    color('#f05454'), color('#f77d4d'), color('#f5c951'), color('#c9ffb3'),
    color('#a4cf38'), color('#57ba5e'), color('#57ba96'), color('#1d6332'),
    // Bottom row (8 colors)
    color('#86ebd5'), color('#57baaf'), color('#86d0eb'), color('#6481ed'),
    color('#575bba'), color('#c1b3ff'), color('#9f64ed'), color('#f5b3ff')
  ];

  currentColor = brushColors[0]; // 기본값으로 첫 번째 색상

  // 슬라이더 위치 및 크기 설정
  const btnSize = 28;
  const gap = 10;
  const colorsPerRow = 8;
  // 2nd button (index 1) left edge
  let sliderStart = muralCanvasWidth + buttonMargin + 1 * (btnSize + gap);
  // 7th button (index 6) right edge (index 6 + 1 = 7, so 8th button left + btnSize)
  let sliderEnd = muralCanvasWidth + buttonMargin + 6 * (btnSize + gap) + btnSize;
  sliderX = sliderStart;
  sliderW = sliderEnd - sliderStart;
  sliderH = 8;
  sliderY = 350;
  handleX = sliderX + sliderW / 2;

  initializeMuralCanvas();

  brushes = [
    {
      name: '기본 붓',
      music: 'basic',
      color: color(255, 100, 100, 200),
      draw: function(x, y, pX, pY, speed) {
        // 기본 붓: 둥근 붓 느낌, 끝이 둥글고 soft
        muralCanvas.strokeWeight(8 * brushSize);
        muralCanvas.stroke(currentColor);
        muralCanvas.line(x, y, pX, pY);
        // 끝에 둥근 붓 느낌
        muralCanvas.noStroke();
        muralCanvas.fill(currentColor);
        muralCanvas.ellipse(x, y, 8 * brushSize, 8 * brushSize);
        muralCanvas.ellipse(pX, pY, 8 * brushSize, 8 * brushSize);
      }
    },
    {
      name: '스프레이',
      music: 'spray',
      color: color(100, 255, 100, 150),
      draw: function(x, y, pX, pY, speed) {
        let spraySize = 20 * brushSize; // 분사 범위만 brushSize에 비례
        muralCanvas.noStroke();
        let dotCount = floor(map(brushSize, 0.5, 6.0, 6, 24));
        for (let i = 0; i < dotCount; i++) {
          let offsetX = random(-spraySize, spraySize);
          let offsetY = random(-spraySize, spraySize);
          let d = dist(0, 0, offsetX, offsetY);
          if (d < spraySize) {
            muralCanvas.fill(red(currentColor), green(currentColor), blue(currentColor), random(50, 120));
            muralCanvas.ellipse(x + offsetX, y + offsetY, random(2, 5), random(2, 5)); // brushSize와 무관하게 고정
          }
        }
      }
    },
    {
      name: '물감붓',
      color: color(100, 100, 255, 180),
      draw: function(x, y, pX, pY, speed) {
        // 물감붓: brushSize가 작을 때도 자연스러운 번짐 효과
        muralCanvas.noStroke();
        let r = red(currentColor);
        let g = green(currentColor);
        let b = blue(currentColor);

        let len = dist(x, y, pX, pY);
        // brushSize가 작을수록 steps를 더 늘림
        let steps = max(3, floor(len / Math.max(1.2, brushSize * 1.5)));
        for (let i = 0; i <= steps; i++) {
          let t = i / steps;
          let ix = lerp(x, pX, t);
          let iy = lerp(y, pY, t);
          let angle = atan2(y - pY, x - pX) + random(-0.5, 0.5);

          // 중심부 진한 타원
          let w1 = Math.max(8, brushSize * random(10, 18));
          let h1 = Math.max(5, brushSize * random(6, 14));
          muralCanvas.push();
          muralCanvas.translate(ix, iy);
          muralCanvas.rotate(angle);
          muralCanvas.fill(r, g, b, 40 * random(0.8, 1.2));
          muralCanvas.ellipse(0, 0, w1, h1);
          muralCanvas.pop();

          // 바깥쪽 연한 번짐(brushSize가 작아도 일정 크기 이상)
          if (random() < 0.5) {
            let w2 = Math.max(18, brushSize * random(22, 38));
            let h2 = Math.max(10, brushSize * random(14, 28));
            muralCanvas.push();
            muralCanvas.translate(ix + random(-8, 8), iy + random(-8, 8));
            muralCanvas.rotate(angle + random(-0.3, 0.3));
            // brushSize가 작을수록 알파값을 더 높임
            let alpha = lerp(18, 10, constrain(brushSize / 2, 0, 1));
            muralCanvas.fill(r, g, b, alpha * random(0.7, 1.2));
            muralCanvas.ellipse(0, 0, w2, h2);
            muralCanvas.pop();
          }
        }
      }
    },
    {
      name: '마커펜',
      color: color(255, 255, 100, 100),
      draw: function(x, y, pX, pY, speed) {
        // 마커펜: 선분 전체에 네모 단면 반복, 잉크 번짐 효과
        let thick = 16 * brushSize;
        let len = dist(x, y, pX, pY);
        let steps = max(1, floor(len / (thick * 0.7)));
        muralCanvas.noStroke();
        muralCanvas.fill(currentColor);
        muralCanvas.rectMode(CENTER);
        for (let i = 0; i <= steps; i++) {
          let t = i / steps;
          let ix = lerp(x, pX, t);
          let iy = lerp(y, pY, t);
          muralCanvas.rect(ix, iy, thick, thick * 0.7, 2);
          // 잉크 번짐 효과
          muralCanvas.fill(red(currentColor), green(currentColor), blue(currentColor), 40);
          muralCanvas.rect(ix, iy, thick * 1.4, thick * 1.1, 4);
          muralCanvas.fill(currentColor);
        }
        muralCanvas.rectMode(CORNER);
      }
    }
  ];

  createBrushButtons();
  createControlButtons();
  createColorButtons(getNextY());

  selectedBrush = brushes[0];
  initialMuralImage = muralCanvas.get();

  console.log("Setup 완료");


    // 화면에 띄울 글 목록

    textMap = {
      "screen1": {
        content: "REFURBISH",
        x: width / 2,
        y: 410,
        size: 200,
        color: [197,191,159,255],
        align: "center"
      },
      "screen2" : {
        content: "이곳은 19XX년의 성수동. \n\n 한국의 브루클린으로 불리는, 오늘날의 활기찬 성수동과는 사뭇 다르다.. \n\n 과거의 성수동은 어떤 모습을 하고 있었고, 어떤 역사를 갖고 있을까?",
        x: width / 2,
        y: height / 2,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen2-1" : {
        content: "산업공동화 전후로 가발, 인쇄 등 각종 영세 산업 공장들이 성수동에 모여들었다. \n\n 특히 1967년 금강제화가 금호동으로 옮겨온 후로부터 성수동은 수제화의 대명사가 되었다.",
        x: width / 2,
        y: height / 2,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen2-2" : {
        content: "그러나 시간이 지나면서 많은 공장들이 문을 닫았고,\n 성수동은 미국의 러스트 벨트처럼 몰락한 공업지대의 모습을 띠게 되었다. \n\n 당신이 보고 있는 풍경이 바로 그 시점, 19XX년의 성수동이다.",
        x: width / 2,
        y: height / 2,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen2-3" : {
        content: "당신은 낡은 공장들이 흩어져 있는 이 황량한 공간을 어떻게 바꿀 것인가? \n\n 현재의 성수동을 모방할 필요는 없다. 오로지 당신의 색채로 과거의 성수동을 새롭게 계획해 보자. \n\n 성수동 재생(Refurbish) 사업, 시작!",
        x: width / 2,
        y: height / 2,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen2-4" : {
        content: "당신은 두 가지 방법으로 성수동 계획 사업을 진행하려고 한다. \n\n 게임의 각 스테이지는 각 사업에 해당한다. \n\n\n 첫 번째 스테이지는 인프라 확충. \n\n 낡은 공장 지대에 새로운 인프라를 도입하여 사람들에게 도움이 되는 장소를 만들어 보자. \n\n 두 번째 스테이지는 공공예술 도입. \n\n 비어 있는 공간에 예술을 불어넣어 시민들에게 영감을 주는 장소로 탈바꿈해 보자.",
        x: width / 2,
        y: height / 2,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen4" : {
        content: "저쪽은 주거 단지인가 보네. 건물이 낡고 협소한 걸 보니, 주로 노동자 1인 가구가 많을 것 같아.",
        x: width / 2,
        y: 850,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen5" : {
        content: "가죽 공장이다. 아직 영업을 하나 보네. 지갑, 노트 커버 같은 작은 소품들을 만들고 계셔.",
        x: width / 2,
        y: 850,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen6" : {
        content: "상점이 모여있는 거리야. 이쪽 상점들은 대부분 폐업한 것 같네.",
        x: width / 2,
        y: 850,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-intro": {
        content: "이 커다란 빌딩은 뭐지? 옛날 공장인가 봐. 벽이 다 벗겨진 걸 보니, 지금은 사용하지 않는 것 같아.",
        x: width / 2,
        y: 850, // 👈 각 텍스트에 대한 y 위치
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7": {
        content: "이 공간을 활용해서 새로운 인프라를 설치할 수 있을 것 같아. \n\n 무엇을 도입하면 좋을까?",
        x: width / 2,
        y: 350, // 👈 각 텍스트에 대한 y 위치
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-1": {
        content: "카페를 도입했더니 지역 주민들이 가끔 오가기는 하지만, 장사가 특별히 잘 되지는 않네. \n\n 경쟁력이 부족한 것 같아. \n\n 어떤 추가 전략을 사용해야 할까?",
        x: width / 2,
        y: 350,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-2": {
        content: "독립서점을 도입했더니 사람들이 가끔 오가기는 하지만, 주민들은 독서에 큰 관심을 갖지 않는 것 같아. \n\n 어떤 추가 전략을 사용해야 할까?",
        x: width / 2,
        y: 350,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-3": {
        content: "들여 놓은 옷들은 너무 예쁜데, 주민들의 연령대가 높은 편이라 이런 옷에 대한 수요가 부족한 것 같아. \n\n 어떤 추가 전략을 사용해야 할까?",
        x: width / 2,
        y: 350,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-1-1": {
        content: "낮과 밤이 다른 이 공간에 여러 사람들이 관심을 가져주고 있어! \n 그런데 칵테일 바도 이미 워낙 많아서, 특색이 있어야 할 것 같아. \n\n 어떤 추가 전략을 사용해야 할까?",
        x: width / 2,
        y: 350,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-1-2": {
        content: "북카페로 운영하니 전보다 사람들이 더 관심을 가져 주는 것 같지만, 근처 주민들은 독서에 큰 관심을 갖지 않는 것 같아. \n\n 책 장르를 전문화해서 아예 외부인 매니아 독자를 끌어들여야겠어. \n\n 어떤 추가 전략을 사용해야 할까?",
        x: width / 2,
        y: 350,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-2-1": {
        content: "유명 작가가 강연을 한다고 하니, 주민들도 관심을 가져주고 있어! \n 하지만 작가와의 만남이 단발적이라 아쉬워하는 분들이 많네. \n\n 어떤 추가 전략을 사용해야 할까?",
        x: width / 2,
        y: 350,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-2-2": {
        content: "예쁜 문구류를 구경하러 오는 주민과 외부인이 증가했어! \n\n 그런데 정작 책에 대한 관심은 오히려 떨어진 것 같네. \n 여기가 책방이에요, 문방구예요?”하고 묻는 분들도 계셨어. \n\n 어떻게 하면 책과 문구류 사이의 연결을 강화할 수 있을까?",
        x: width / 2,
        y: 350,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-3-1": {
        content: "클래스가 주민들을 포함한 여러 방문객들의 큰 호응을 얻었어! \n 게다가 인근 공장과 협업하니, 지역 상생 효과까지 있잖아? \n\n 그런데 클래스는 일회성이다 보니, 투입되는 비용 대비 브랜드 홍보 효과가 크지 않은 것 같아. \n\n 어떤 추가 전략을 사용해야 할까?",
        x: width / 2,
        y: 350,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-3-2": {
        content: "테일러링 서비스를 제공했더니, 본인이 원하는 스타일의 옷을 만들어 입을 수 있어 주민들의 만족도가 커! \n 특히 수제화의 인기가 높네. \n\n 그런데 브랜드에 대한 외부인의 인지도는 여전히 낮네. \n\n 어떤 추가 전략을 사용해야 할까?",
        x: width / 2,
        y: 350,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-1-1-1": {
        content: "재즈 공연을 운영하니, 입소문을 타서 친구나 연인과 오기 좋은 핫플로 유명해졌어! 정말 북적거리고 활기차다!",
        x: width / 2,
        y: 850,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-1-1-2": {
        content: "통장 출혈이 심하긴 했지만, 음악에 관심 있는 사람들이 많이 찾아왔어. \n\n 서울 힙스터들이 전부 모여 있으니, 정말 북적거리고 활기차다!",
        x: width / 2,
        y: 850,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-1-2-1": {
        content: "서적을 구하는 게 쉽지는 않았지만, 희귀 서적 소식을 듣고 다양한 사람들 이 모여들었어. \n\n 예술가와 평론가들이 모여 교류하면서, 이곳은 지역의 예술 프로젝트가 싹트는 공간이 되었어!",
        x: width / 2,
        y: 850,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-1-2-2": {
        content: "만화 매니아 층이 소문을 듣고 많이 찾아왔어! \n\n 사람들이 삼삼오오 만화를 읽으면서 대화를 나누니, 정말 북적거리고 활기차다!",
        x: width / 2,
        y: 850,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-2-1-1": {
        content: "작가 추천작을 구경하기 위해 서점을 찾는 사람들이 늘었어! 할인된 가격에 판매하니 구매도 크게 증가했는걸? \n\n 작가와 독자가 장기간 소통하는 특별한 장소가 탄생했어!",
        x: width / 2,
        y: 850,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-2-1-2": {
        content: "참여형 클래스에 더해 결과물 전시까지 운영하니, 자연스럽게 클래스 참여자 지인들의 추가 방문도 증가했어. \n\n 작가의 이야기에서 독자의 이야기로 나아가는 멋진 문학 공간이 탄생했어!",
        x: width / 2,
        y: 850,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-2-2-1": {
        content: "사람들이 북커버가 탐이 나서 책을 더 많이 구매하네. 게다가 인근 공장과 협업하니, 지역 상생 효과까지 있잖아? \n\n 서점이 지역 공장과 독자들을 잇는 징검다리가 되었어!",
        x: width / 2,
        y: 850,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-2-2-2": {
        content: "공들여 큐레이션을 했더니 매달 사람들이 구매를 위해 줄을 설 정도야! \n\n 책 내용을 되새길 수 있는 문구류를 판매하는 특별한 서점이 되었어!",
        x: width / 2,
        y: 850,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-3-1-1": {
        content: "본인이 만든 의류가 직접 출시된다는 사실에 많은 이들이 관심을 보였어. \n\n 덕분에 무명 브랜드에서 입점 지역 특성을 반영한 친환경 패션 브랜드로 성장했어!",
        x: width / 2,
        y: 850,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-3-1-2": {
        content: "본인이 만든 옷을 입은 모델들의 런웨이 소식에 매장이 폭발적인 인기를 끌었어. \n\n 19XX년 S/S 시즌 새로운 트렌드는 작업복이래!",
        x: width / 2,
        y: 850,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-3-2-1": {
        content: "부스에서 고객들에게 신체 치수 측정, 옷감 선정, 샘플 수제화 착용 등의 경험을 제공했더니, 큰 인기를 끌었어. \n\n 소문을 들은 외부인들의 매장 방문이 증가하니, 정말 북적거리고 활기차다!",
        x: width / 2,
        y: 850,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-3-2-2": {
        content: "‘첫 면접용 정장’, ‘돌아가신 아버지의 셔츠 리폼’ 등 감동적인 사연을 바탕으로 옷을 제작했더니, 브랜드가 폭발적인 인기를 얻었어. \n\n 옷에 자신만의 특별한 추억을 담고자 하는 사람들로 매장이 문전성시를 이루고 있는 걸!",
        x: width / 2,
        y: 850,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen8": {
        content: "첫 번째 스테이지, 인프라 확충 미션을 훌륭하게 완수했어! \n 황량했던 과거와는 비교도 안 되게 멋진 공간이 되었어! \n\n 그럼 다음 스테이지로 넘어가 볼까?",
        x: width / 2,
        y: 850,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      
      "screen10": {
        content: "두 번째 스테이지: 공공예술 도입_벽화",
        x: width / 2,
        y: height / 2,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      
      "screen10-1": {
        content: "두 번째 장소, 뚝섬역 사거리",
        x: width / 2,
        y: 850,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },

      "screen10-2": {
        content: "이곳은 뚝섬역 사거리, 폐공장 벽들이 줄지어 있는 곳이다.",
        x: width / 2,
        y: 850,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },

      "screen11": {
        content: "한때 아이들의 낙서로 가득했지만,\n지금은 모두 지워져 회색 콘크리트 벽만 존재해\n더욱 더 골목길이 우중충해 보인다.",
        x: width / 2,
        y: 850,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },

      "screen11-1": {
        content: "이런 벽들, 왠지 쓸쓸해 보여…\n새롭게 꾸밀 수는 없을까?",
        x: width / 2,
        y: 850,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },

      "screen12": {
        content: "붓을 들어 골목길의 활기를 되찾아 보자!",
        x: width / 2,
        y: 850,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },

      "screen15": {
        content: "세 번째 스테이지: 공공예술 도입_조각",
        x: width / 2,
        y: height / 2,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },

      "screen15-1": {
        content: "세 번째 장소, 중랑천 유역 녹지",
        x: width / 2,
        y: 850,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },

      "screen15-2": {
        content: "이곳은 중랑천 남쪽의 녹지,\n정돈되지 않은 나무들만 무성하다.",
        x: width / 2,
        y: 850,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },

      "screen15-3": {
        content: "이렇게 넓은 곳은 공원으로 쓰기 딱 좋을 텐데,\n아무도 오지 않는 것 같네.",
        x: width / 2,
        y: 850,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },

      "screen15-4": {
        content: "너무 휑해서 그런 것 같아.\n여기 무언가를 놓을 수 있으려나?",
        x: width / 2,
        y: 850,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },

      "screen15-5": {
        content: "일일 모델이 되어 포즈를 잡고,\n포즈 모양대로 조각품을 만들어 보자!",
        x: width / 2,
        y: 850,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
    } 
}

function draw() {

  if (
    ["screen2", "screen2-1", "screen2-2", "screen2-3", "screen2-4", "screen3", "screen3-1", "screen4", "screen5", "screen6"].includes(currentKey)
    && !introMusicStarted
  ) {
    introMusic.loop(); // 반복 재생
    introMusicStarted = true;
  }

  // 👉 다른 화면으로 넘어가면 멈추고 플래그 리셋
  if (
    !["screen2", "screen2-1", "screen2-2", "screen2-3", "screen2-4", "screen3", "screen3-1", "screen4", "screen5", "screen6"].includes(currentKey)
    && introMusicStarted
  ) {
    introMusic.stop();
    introMusicStarted = false;
  }

  // 벽화 파트 음원
  if (
    ["screen10", "screen11", "screen12"].includes(currentKey)
    && !muralMusicStarted
  ) {
    muralMusic.loop(); // 반복 재생
    muralMusicStarted = true;
  }

  // 👉 다른 화면으로 넘어가면 멈추고 플래그 리셋
  if (
    !["screen10", "screen11", "screen12"].includes(currentKey)
    && muralMusicStarted
  ) {
    muralMusic.stop();
    muralMusicStarted = false;
  }

  if (currentKey === "screen13") {
    showBrushUI(true);  // 벽화 모드일 때만 버튼 보이기
    drawMural();
    return;
  } else {
    showBrushUI(false); // 그 외 화면에서는 버튼 숨기기
  }


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

    if (t.align === "left") {
      textAlign(LEFT, CENTER);
    } else {
      textAlign(CENTER, CENTER);
    }

    fill(...(t.color || [255]));
    textSize(t.size || 32);
    text(t.content, t.x, t.y);
  }


  // 선택지 아이콘 표시
  
  if (choices[currentKey]) {
    for (let c of choices[currentKey]) {
      let isHovered = (
        mouseX >= c.x - c.w / 2 && mouseX <= c.x + c.w / 2 &&
        mouseY >= c.y - c.h / 2 && mouseY <= c.y + c.h / 2
      );
  
      let iconToShow = isHovered ? c.hoverImg : c.img;
      image(iconToShow, c.x, c.y, c.w, c.h);
  
      // 🔍 마우스오버 시 텍스트 박스도 같이 표시
      if (isHovered) {
        let paddingX = 10;
        let paddingY = 8;
        textSize(24);
        textAlign(CENTER, CENTER);
  
        let labelWidth = textWidth(c.label);
        let boxW = labelWidth + paddingX * 2;
        let boxH = textAscent() + textDescent() + paddingY * 2;
  
        // 📦 텍스트 박스 배경
        rectMode(CENTER);
        fill(0); // 검정 배경
        noStroke();
        rect(mouseX, mouseY - 60, boxW, boxH, 5);
  
        // 🎨 텍스트 색상
        fill(197, 191, 159, 255); // RGBA 색상
        text(c.label, mouseX, mouseY - 60);
      }
    }
  }




  textSize(30);
  text(`x-coordinate: ${mouseX}`, 100, 318);
  text(`y-coordinate: ${mouseY}`, 100, 390);

  fill(255);
  textSize(20);
  textAlign(RIGHT, TOP);
  text("Press SPACE to proceed", width - 30, 20);

  textAlign(LEFT, TOP);
  text("Press BACKSPACE to go back", 30, 20);
}


function keyPressed() {  

  
  if (key === ' ') {
    let next = storyMap[currentKey];
    if (typeof next === 'string') {
      screenHistory.push(currentKey);
      currentKey = next;
      redraw();
    }
  }

  if (keyCode === BACKSPACE) {
    if (screenHistory.length > 0) {
      currentKey = screenHistory.pop(); 
      redraw();
    }
  }
}

function mousePressed() {

  if (currentKey === "screen13") {
    let d = dist(mouseX, mouseY, handleX, sliderY + sliderH / 2);
    if (d < 18) draggingHandle = true;
    if (!draggingHandle && mouseX > 0 && mouseX < muralCanvas.width && mouseY > 0 && mouseY < muralCanvas.height) {
      selectedBrush.draw(mouseX, mouseY, mouseX, mouseY, 0);
      // 음악 재생
      if (!musicStarted && selectedBrush.music && musicAssets[selectedBrush.music]) {
        currentMusic = musicAssets[selectedBrush.music];
        let v = map(brushSize, 0.5, 6.0, 0.1, 1.0);
        currentMusic.setVolume(v);
        currentMusic.loop();
        musicStarted = true;
      }
    }
    
  }

  if (choices[currentKey]) {
    for (let c of choices[currentKey]) {
      if (mouseX >= c.x - c.w / 2 && mouseX <= c.x + c.w / 2 &&
          mouseY >= c.y - c.h / 2 && mouseY <= c.y + c.h / 2) {
        screenHistory.push(currentKey);
        currentKey = c.next;
        redraw();
        return;
      }
    }
  }

  if (currentKey === "screen1") {
    if (mouseX >= 560 && mouseX <= 930 &&
        mouseY >= 776 && mouseY <= 881) {
      screenHistory.push(currentKey);
      currentKey = "screen2";
      redraw();
      return;
    }
  }

  let next = storyMap[currentKey];

  if (typeof next === 'object') {
    screenHistory.push(currentKey);
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

function mouseDragged(){
  if (currentKey === "screen13") {
    if (!draggingHandle && mouseX > 0 && mouseX < muralCanvas.width && mouseY > 0 && mouseY < muralCanvas.height) {
      let speed = dist(mouseX, mouseY, pmouseX, pmouseY);
      drawLineSmooth(selectedBrush, pmouseX, pmouseY, mouseX, mouseY, speed);
    }
    if (draggingHandle) {
      // 슬라이더 내에서만 이동
      let mx = constrain(mouseX, sliderX, sliderX + sliderW);
      brushSize = map(mx, sliderX, sliderX + sliderW, 0.5, 6.0); // 최대값 6.0으로 증가
      if (currentMusic && currentMusic.isPlaying()) {
      let v = map(brushSize, 0.5, 6.0, 0.1, 1.0);
      currentMusic.setVolume(v);
    }
    }
  }
}

function mouseReleased(){
  if (currentKey === "screen13") {
    draggingHandle = false;
  }
}

function initializeMuralCanvas() {
  if (wallTextureImage) {
    muralCanvas.image(wallTextureImage, 0, 0, muralCanvas.width, muralCanvas.height);
  } else {
    muralCanvas.background(220);
  }
  showComparison = false;
  currentStage = 1;
  initialMuralImage = muralCanvas.get();
}

function drawLineSmooth(brush, x1, y1, x2, y2, speed) {
  // 점 간 간격을 더 촘촘하게 하여 자연스러운 선이 되도록 개선
  const distance = dist(x1, y1, x2, y2);
  const steps = max(2, floor(distance / 0.8)); // 더 촘촘하게
  for (let i = 1; i <= steps; i++) { // i=1부터 시작
    let t = i / steps;
    let x = lerp(x1, x2, t);
    let y = lerp(y1, y2, t);
    let prevT = (i - 1) / steps;
    let px = lerp(x1, x2, prevT);
    let py = lerp(y1, y2, prevT);
    brush.draw(x, y, px, py, speed);
  }
}


function createBrushButtons() {
  for (let btn of brushButtons) {
    btn.remove();
  }
  brushButtons = [];

  let startY = buttonMargin;
  for (let i = 0; i < BRUSH_COUNT; i++) {
    let btn = createButton(brushes[i].name);
    btn.position(muralCanvas.width + buttonMargin, startY);
    btn.size(sidebarWidth - 2 * buttonMargin, buttonHeight);
    btn.mousePressed(() => {
      // 음악 정지
      if (currentMusic && currentMusic.isPlaying()) {
        currentMusic.stop();
      }
      musicStarted = false;
      selectedBrush = brushes[i];
      console.log(`선택된 브러시: ${selectedBrush.name}`);
    });
    brushButtons.push(btn);
    startY += buttonHeight + buttonMargin;
  }
}

function createControlButtons() {
  let startY = buttonMargin + (buttonHeight + buttonMargin) * BRUSH_COUNT;

  resetButton = createButton('다시 그리기 (Reset)');
  resetButton.position(muralCanvas.width + buttonMargin, startY);
  resetButton.size(sidebarWidth - 2 * buttonMargin, buttonHeight);
  resetButton.mousePressed(() => {
    // 음악 정지
    if (currentMusic && currentMusic.isPlaying()) {
      currentMusic.stop();
    }
    musicStarted = false;
    initializeMuralCanvas();
  });

  completeButton = createButton('벽화 완성!');
  completeButton.position(muralCanvas.width + buttonMargin, startY + buttonHeight + buttonMargin);
  completeButton.size(sidebarWidth - 2 * buttonMargin, buttonHeight);
  completeButton.mousePressed(() => {
    // 음악 정지
    if (currentMusic && currentMusic.isPlaying()) {
      currentMusic.stop();
    }
    musicStarted = false;
    showComparison = true;
    currentStage = 2;
    
    muralImage = muralCanvas.get();  // ← 여기서 이미지 저장
    isFading = false;
    isFadedIn = false;
    fadeAmount = 0;
    currentKey = "screen11-2";       // ← 다음 화면으로 이동
  });
}

function createColorButtons(startY) {
  // 기존 색상 버튼 제거
  for (let btn of colorButtons) {
    btn.remove();
  }
  colorButtons = [];

  const btnSize = 28;
  const gap = 10;
  const colorsPerRow = 8;
  for (let i = 0; i < brushColors.length; i++) {
    let row = floor(i / colorsPerRow);
    let col = i % colorsPerRow;
    let btn = createButton('');
    btn.position(
      muralCanvas.width + buttonMargin + col * (btnSize + gap),
      startY + row * (btnSize + gap)
    );
    btn.size(btnSize, btnSize);
    btn.style('border-radius', '50%');
    btn.style('background-color', `rgb(${red(brushColors[i])},${green(brushColors[i])},${blue(brushColors[i])})`);
    btn.style('border', '2px solid #fff');
    btn.mousePressed(() => {
      currentColor = brushColors[i];
    });
    colorButtons.push(btn);
  }
}

function getNextY() {
  let maxY = 0;
  for (let btn of [...brushButtons, resetButton, completeButton]) {
    if (btn) {
      let y = btn.position().y;
      if (y > maxY) maxY = y;
    }
  }
  return maxY + buttonHeight + buttonMargin;
}

function updateButtonPositions() {
  let startY = buttonMargin;
  for (let btn of brushButtons) {
    if (btn) {
      btn.position(muralCanvas.width + buttonMargin, startY);
      startY += buttonHeight + buttonMargin;
    }
  }
  if (resetButton) {
    resetButton.position(muralCanvas.width + buttonMargin, startY);
    startY += buttonHeight + buttonMargin;
  }
  if (completeButton) {
    completeButton.position(muralCanvas.width + buttonMargin, startY);
  }
}

function showBrushUI(show) {
  for (let btn of brushButtons) {
    if (show) btn.show();
    else btn.hide();
  }

  for (let btn of colorButtons) {
    if (show) btn.show();
    else btn.hide();
  }

  if (resetButton) (show ? resetButton.show() : resetButton.hide());
  if (completeButton) (show ? completeButton.show() : completeButton.hide());
}


function drawMural() {

  // 전체 배경 어두운 색
  background(50);

  // --- 벽화 그리기 영역 ---
  push();
  // 좌표 (0,0)이 좌상단이 되도록
  imageMode(CORNER);

  if (showComparison) {
    // Before / After 비교 모드
    image(
      initialMuralImage,
      0, 0,
      muralCanvas.width/2 - 5, height
    );
    image(
      muralCanvas,
      muralCanvas.width/2 + 5, 0,
      muralCanvas.width/2 - 5, height
    );
  } else {
    // 일반 벽화 모드: 왼쪽을 꽉 채워 그림
    image(
      muralCanvas,
      0, 0,
      muralCanvas.width, height
    );
  }
  pop();


  fill(100);
  noStroke();
  // rect(muralCanvas.width, 0, sidebarWidth, height);

  fill(255);
  textSize(14);
  textAlign(LEFT, TOP);
  text(`선택: ${selectedBrush.name}`, muralCanvas.width + buttonMargin, height - 60);
  text("마우스를 드래그하여 그림을 그리세요.", 10, height - 30);

  fill(255, 255, 0);
  textSize(18);
  textAlign(CENTER, CENTER);
  if (currentStage === 1 && !showComparison) {
    text("붓을 들어 골목길의 활기를 되찾아 보자!", muralCanvas.width / 2, 30);
  } else if (currentStage === 2 && !showComparison) {
    text("정말 멋진 벽화야! 거리의 분위기가 밝아졌어!", muralCanvas.width / 2, 30);
  } else if (showComparison) {
    text("과거와 비교해 보니, 몰라보게 달라졌네!", muralCanvas.width / 2, 30);
  }

  // 브러시 크기 슬라이더 그리기 (색상 버튼 아래)
  let sliderTop = getNextY() + 60; // 색상 버튼과 충분히 띄움
  sliderY = sliderTop + 30;        // 텍스트와 핸들이 겹치지 않게 더 아래로

  // 슬라이더 바
  fill(180);
  rect(sliderX, sliderY, sliderW, sliderH, 4);

  // 핸들 위치 계산
  handleX = sliderX + map(brushSize, 0.5, 6.0, 0, sliderW);

  // 핸들(동그라미)
  fill(255);
  ellipse(handleX, sliderY + sliderH / 2, 28, 28);

  // 미리보기 원 (슬라이더 아래, 현재 브러시 크기와 색상 반영)
  let previewY = sliderY + 110;
  let previewMax = min(sliderW, 200);
  fill(red(currentColor), green(currentColor), blue(currentColor), 200);
  noStroke();
  ellipse(sliderX + sliderW / 2, previewY, min(24 * brushSize, previewMax), min(24 * brushSize, previewMax));
  
  stroke(80, 80, 80, 80);
  strokeWeight(1.5);
  noFill();
  ellipse(sliderX + sliderW / 2, previewY, min(24 * brushSize, previewMax), min(24 * brushSize, previewMax));
  
  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(13);

  // 텍스트를 슬라이더 아래로 이동
  text('브러시 크기', sliderX + sliderW / 2, sliderY + 40);
}
