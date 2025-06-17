let images = {};
let currentKey = "screen1";
let textMap = {};
let transitionSpeed = 5;
let screenHistory = [];
let customFont;
let brushCursors = {};
let aiVisionCanvas; // <<< AI에게 보낼 이미지를 그릴 숨겨진 캔버스 변수 추가
const hintScreens = [
  "screen7-1", "screen7-1-1", "screen7-1-2",
  "screen7-2", "screen7-2-1", "screen7-2-2",
  "screen7-3", "screen7-3-1", "screen7-3-2"
];

// 벽화 파트 변수

let muralCanvas;
let wallTextureImage;
let initialMuralImage;

let brushes = [];
let selectedBrush;
const BRUSH_COUNT = 3;
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

// 음원 변수
let introMusic, muralMusic, forestMusic,
choice1Music, cafeMusic, cockbarMusic, jazzbarMusic, musicbarMusic, chatMusic, animeMusic,
bookstoreMusic, bookcafeMusic,artMusic, bookturnMusic, stationeryMusic,statchatMusic, leatherMusic,
authorMusic,exhibitMusic, discountMusic, fashionMusic, reformMusic, runwayMusic, diyMusic,
storytaylorMusic,taylorMusic,
stage1endMusic;

let introMusicStarted, muralMusicStarted, forestMusicStarted, choice1MusicStarted, cafeMusicStarted,
cockbarMusicStarted, jazzbarMusicStarted, musicbarMusicStarted, chatMusicStarted, animeMusicStarted,
bookstoreMusicStarted, bookcafeMusicStarted, artMusicStarted, bookturnMusicStarted, stage1endMusicStarted,
stationeryMusicStarted, statchatMusicStarted, leatherMusicStarted, authorMusicStarted,
exhibitMusicStarted, discountMusicStarted,fashionMusicStarted, runwayMusicStarted, diyMusicStarted,
storytaylorMusicStarted,taylorMusicStarted,
reformMusicStarted
= false;


let muralImage;          // 벽화 이미지 저장용
let isFading = false;    // 페이드인 중 여부
let isFadedIn = false;   // 페이드인 완료 여부
let fadeAmount = 0;      // 페이드 투명도


// 페이드 효과를 줄 화면들
  const fadeScreens = [
    "screen2", "screen2-1", "screen2-2", "screen2-3", "screen2-4", "screen4", "screen4-1", "screen4-2", "screen5", "screen6", "screen7",
    "screen8", "screen10", "screen10-1", "screen10-2",
    "screen11", "screen11-1", "screen11-2",
    "screen15", "screen15-1", "screen15-2", "screen15-3", "screen15-4", "screen15-5"
  ];

// 페이드 상태 관리 변수
  let fadeMode = "";       // "", "fadingOut", "fadingIn"
  let fadeFrame = 0;       // 현재 페이드가 진행된 프레임 수
  let pendingKey = "";     // 페이드 아웃이 끝난 뒤 실제로 넘어갈 next 화면
  const FADE_DURATION = 60 * 2; // 60FPS 기준 3초 동안 진행

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
    "screen4": "screen4-1",
    "screen4-1": "screen4-2",
    "screen4-2": "screen5",
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
    "screen7-2-1" : { "A": "screen7-2-1-1", "B": "screen7-2-1-2" },
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
    "screen7-3-2-1": "screen7-3-2-1+",
    "screen7-3-2-1+": "screen8",
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
    "screen15-5": "screen15-pose", // screen15-5 다음은 새로운 포즈 화면으로
   "screen15-pose": "screen16",  // 포즈 화면 다음이 결과 화면이 됩니다.
   "screen16" : "screen17",
    "screen17" : "screen18",
    "screen18" : "screen19",
    "screen19" : "screen20",
    "screen20" : "screen21",
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
    "screen4-1.png",
    "screen4-2.png",
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
    "screen7-3-2-1+.png",
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
    "screen11-3.png",
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
    "screen16.png",
    "screen17.png",
    "screen18.png",
    "screen19.png",
    "screen20.png",
    "screen21.png"
  ];

  // 아이콘 로드

  let choices = {
    "screen1": [
      {
        x: 745, y: 828,
        w: 300,
        h: 230,  // ← 직접 이미지 비율에 맞춰 수정
        img: null,
        imgPath: "visual assets/screen1-optionBeige.png",
        hoverImg: null,
        hoverImgPath: "visual assets/screen1-optionYellow.png",
        next: "screen2"
      }
    ],

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
        x: 1364, y: 638,
        w: 100, h: 140,
        img: null,
        imgPath: "visual assets/screen7-1icon1.png",
        hoverImg: null,
        hoverImgPath: "visual assets/screen7-1icon1MO.png",
        next: "screen7-1-1",
        label: "낮에는 카페, 밤에는 \n칵테일 바로 혼합 운영"
      },
      {
        x: 904, y: 238,
        w: 100, h: 140,
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
        x: 753, y: 670,
        w: 200, h: 220,
        img: null,
        imgPath: "visual assets/screen7-1-1icon1.png",
        hoverImg: null,
        hoverImgPath: "visual assets/screen7-1-1icon1MO.png",
        next: "screen7-1-1-1",
        label: "매주 주말 라이브 재즈 공연 호스팅"
      },
      {
        x: 859, y: 227,
        w: 180, h: 270,
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
        x: 900, y: 358,
        w: 190, h: 230,
        img: null,
        imgPath: "visual assets/screen7-1-2icon1.png",
        hoverImg: null,
        hoverImgPath: "visual assets/screen7-1-2icon1MO.png",
        next: "screen7-1-2-1",
        label: "회화, 디자인, 사진 관련 희귀 예술 서적 구비 \n (음료 구매 시 무료 열람 가능)"
      },
      {
        x: 1009, y: 835,
        w: 185, h: 225,
        img: null,
        imgPath: "visual assets/screen7-1-2icon2.png",
        hoverImg: null,
        hoverImgPath: "visual assets/screen7-1-2icon2MO.png",
        next: "screen7-1-2-2",
        label: "인기 만화 시리즈 대여섯 편 전권 구비 \n(음료 구매 시 무료 열람 가능)"
      }
    ],

    "screen7-2": [
      {
        x: 1062, y: 310,
        w: 155, h: 230,
        img: null,
        imgPath: "visual assets/screen7-2icon1.png",
        hoverImg: null,
        hoverImgPath: "visual assets/screen7-2icon1MO.png",
        next: "screen7-2-1",
        label: "매주 주말 작가 초청 북토크 운영"
      },
      {
        x: 884, y: 900,
        w: 120, h: 150,
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
        x: 895, y: 776,
        w: 130, h: 150,
        img: null,
        imgPath: "visual assets/screen7-2-1icon1.png",
        hoverImg: null,
        hoverImgPath: "visual assets/screen7-2-1icon1MO.png",
        next: "screen7-2-1-1",
        label: "강연 후 한 달 동안 작가 추천 노트가 담긴 서적 10선 DP, \n할인된 가격에 판매"
      },
      {
        x: 1208, y: 735,
        w: 150, h: 120,
        img: null,
        imgPath: "visual assets/screen7-2-1icon2.png",
        hoverImg: null,
        hoverImgPath: "visual assets/screen7-2-1icon2MO.png",
        next: "screen7-2-1-2",
        label: "신청자를 받아 작가와 함께하는 문예창작 원데이 클래스 운영, \n추후 서점에 결과물 전시"
      }
    ],

    "screen7-2-2": [
      {
        x: 387, y: 745,
        w: 180, h: 200,
        img: null,
        imgPath: "visual assets/screen7-2-2icon1.png",
        hoverImg: null,
        hoverImgPath: "visual assets/screen7-2-2icon1MO.png",
        next: "screen7-2-2-1",
        label: "도서 구매 시, 인근 가죽 공장과 협업하여 \n책 사이즈에 맞는 가죽 북커버 제작 클래스 참여 가능"
      },
      {
        x: 1219, y: 735,
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
        x: 654, y: 895,
        w: 200, h: 200,
        img: null,
        imgPath: "visual assets/screen7-3icon1.png",
        hoverImg: null,
        hoverImgPath: "visual assets/screen7-3icon1MO.png",
        next: "screen7-3-1",
        label: "인근 봉제공장과 협동하여 \n의류 구매자 대상으로 빈티지 작업복 리폼 클래스 운영"
      },
      {
        x: 939, y: 840,
        w: 170, h: 170,
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
        x: 926, y: 191,
        w: 70, h: 100,
        img: null,
        imgPath: "visual assets/screen7-3-1icon1.png",
        hoverImg: null,
        hoverImgPath: "visual assets/screen7-3-1icon1MO.png",
        next: "screen7-3-1-1",
        label: "베스트 작업복 리폼작 선정 후 \n작가 이름 병기하여 정식 라인업 출시"
      },
      {
        x: 1280, y: 152,
        w: 150, h: 230,
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
        x: 716, y: 871,
        w: 110, h:110,
        img: null,
        imgPath: "visual assets/screen7-3-2icon1.png",
        hoverImg: null,
        hoverImgPath: "visual assets/screen7-3-2icon1MO.png",
        next: "screen7-3-2-1",
        label: "서울 주요 대학가에 이동식 테일러링 부스 설치하여 매장 홍보"
      },
      {
        x: 1410, y: 480,
        w: 300, h: 260,
        img: null,
        imgPath: "visual assets/screen7-3-2icon2.png",
        hoverImg: null,
        hoverImgPath: "visual assets/screen7-3-2icon2MO.png",
        next: "screen7-3-2-2",
        label: "라디오에서 사연 응모를 받아 \n사연 기반 의류 제작"
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
    musicAssets.spray = loadSound('audio assets/music2.mp3');
    musicAssets.paint = loadSound('audio assets/music3.mp3');
    musicAssets.marker = loadSound('audio assets/music4.mp3');
    introMusic = loadSound('audio assets/intro.mp3');
    muralMusic = loadSound('audio assets/mural.mp3');
    forestMusic = loadSound('audio assets/forest.mp3');
    choice1Music = loadSound('audio assets/choice1.mp3');
    cafeMusic = loadSound('audio assets/cafe.mp3');
    jazzbarMusic = loadSound('audio assets/jazzbar.mp3');
    stage1endMusic = loadSound('audio assets/stage1end.mp3');
    musicbarMusic = loadSound('audio assets/musicbar.mp3');
    chatMusic = loadSound('audio assets/chat.mp3');
    cockbarMusic = loadSound('audio assets/cockbar.mp3');
    animeMusic = loadSound('audio assets/anime.mp3');
    bookstoreMusic = loadSound('audio assets/bookstore.mp3');
    bookcafeMusic = loadSound('audio assets/bookcafe.mp3');
    artMusic = loadSound('audio assets/art.mp3');
    bookturnMusic = loadSound('audio assets/bookturn.mp3');
    stationeryMusic = loadSound('audio assets/stationery.mp3');
    statchatMusic = loadSound('audio assets/statchat.mp3');
    leatherMusic = loadSound('audio assets/leather.mp3');
    authorMusic = loadSound('audio assets/author.mp3');
    exhibitMusic = loadSound('audio assets/exhibit.mp3');
    discountMusic = loadSound('audio assets/discount.mp3');
    fashionMusic = loadSound('audio assets/fashion.mp3');
    reformMusic = loadSound('audio assets/reform.mp3');
    runwayMusic = loadSound('audio assets/runway.mp3');
    diyMusic = loadSound('audio assets/diy.mp3');
    storytaylorMusic = loadSound('audio assets/storytaylor.mp3');
    taylorMusic = loadSound('audio assets/taylor.mp3');


    // 사운드 로드 예시 (실제 사운드 파일이 있다면 사용)
    // soundFormats('mp3', 'ogg');
    // sounds = [loadSound('brush1.mp3'), loadSound('spray.mp3'), loadSound('paint.mp3'), loadSound('marker.mp3')];

    brushCursors['물감붓'] = loadImage('visual assets/screen13icon4.png');
    brushCursors['마커펜'] = loadImage('visual assets/screen13icon2.png');
    brushCursors['스프레이'] = loadImage('visual assets/screen13icon3.png');

  };
  

function setup() {
  createCanvas(1512, 982); // 혹은 windowWidth, windowHeight로 바꿔도 돼
  aiVisionCanvas = createGraphics(1512, 982); // <<< 숨겨진 캔버스 생성
  textFont(customFont);
  imageMode(CENTER);

  muralCanvas = createGraphics(muralCanvasWidth, muralCanvasHeight);

  // 색상 배열은 setup에서 p5 color()로 초기화
  brushColors = [
    // Top row (8 colors)
    color('#f05454'), color('#f77d4d'), color('#f5c951'), color('#c9ffb3'),
    color('#a4cf38'), color('#57ba5e'), color('#57ba96'), color('#1d6332'),
    // Bottom row (8 colors)
    color('#86ebd5'), color('#86d0eb'), color('#575bba'), color('#c1b3ff'), 
    color('#9f64ed'), color('#f5b3ff'), color('#000000'), color('#ffffff')
  ];

  currentColor = brushColors[0]; // 기본값으로 첫 번째 색상
  
  // 슬라이더 위치 및 크기 설정 (색상 버튼과 정렬)
  const btnSize = 28;
  const gap = 10;
  const colorsPerRow = 8;
  // 슬라이더 트랙의 시작점: 왼쪽에서 두 번째 색상 버튼의 왼쪽 끝
  sliderX = muralCanvasWidth + buttonMargin + 1 * (btnSize + gap);
  // 슬라이더 트랙의 끝점: 오른쪽에서 두 번째 색상 버튼의 오른쪽 끝
  let rightBtnIdx = colorsPerRow - 2; // 오른쪽에서 두 번째(6번 인덱스)
  let sliderEnd = muralCanvasWidth + buttonMargin + rightBtnIdx * (btnSize + gap) + btnSize;
  sliderW = sliderEnd - sliderX;
  sliderH = 8;
  sliderY = 350;
  handleX = sliderX + sliderW / 2;
  
  initializeMuralCanvas();

  brushes = [
    {
      name: '물감붓',
      music: 'paint',
      // '물감붓'의 초기 알파값을 180에서 90으로 절반으로 낮춤
      color: color(100, 100, 255, 90),
      draw: function(x, y, pX, pY, speed) {
        // 물감붓: brushSize가 작을 때도 자연스러운 번짐 효과
        muralCanvas.noStroke();
        let r = red(currentColor);
        let g = green(currentColor);
        let b = blue(currentColor);
        // currentColor의 현재 알파값(페이드 중인 값)을 가져옴
        let currentAlpha = alpha(currentColor);

        let len = dist(x, y, pX, pY);
        // brushSize가 작을수록 steps를 더 늘림
        let steps = max(3, floor(len / Math.max(1.2, brushSize * 1.5)));
        for (let i = 0; i <= steps; i++) {
          let t = i / steps;
          let ix = lerp(x, pX, t);
          let iy = lerp(y, pY, t);
          let angle = atan2(y - pY, x - pX) + random(-0.5, 0.5);

          // 중심부 진한 타원: 기존 알파 40을 현재 알파에 비례하여 조정
          let w1 = Math.max(8, brushSize * random(10, 18));
          let h1 = Math.max(5, brushSize * random(6, 14));
          muralCanvas.push();
          muralCanvas.translate(ix, iy);
          muralCanvas.rotate(angle);
          // (40 / 180)은 물감붓의 원래 기본 알파 180에 대한 40의 비율
          muralCanvas.fill(r, g, b, currentAlpha * (40 / 180) * random(0.8, 1.2));
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
            let alphaFactor = lerp(18, 10, constrain(brushSize / 2, 0, 1));
            // 기존 알파값에 대한 비율을 현재 알파에 곱함
            muralCanvas.fill(r, g, b, currentAlpha * (alphaFactor / 180) * random(0.7, 1.2));
            muralCanvas.ellipse(0, 0, w2, h2);
            muralCanvas.pop();
          }
        }
      }
    },
    {
      name: '스프레이',
      music: 'spray',
      // 스프레이는 투명도를 변경하지 않음 (기존 150 유지)
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
            // 스프레이의 알파는 랜덤값을 유지 (50~120)
            muralCanvas.fill(red(currentColor), green(currentColor), blue(currentColor), random(50, 120));
            muralCanvas.ellipse(x + offsetX, y + offsetY, random(2, 5), random(2, 5)); // brushSize와 무관하게 고정
          }
        }
      }
    },
    {
      name: '마커펜',
      music: 'marker',
      // '마커펜'의 초기 알파값을 100에서 50으로 절반으로 낮춤
      color: color(255, 255, 100, 50),
      draw: function(x, y, pX, pY, speed) {
        // 마커펜: 선분 전체에 네모 단면 반복, 잉크 번짐 효과
        let thick = 16 * brushSize;
        let len = dist(x, y, pX, pY);
        let steps = max(1, floor(len / (thick * 0.7)));
        muralCanvas.noStroke();
        // currentColor에 이미 페이드된 알파값이 적용되어 있으므로 그대로 사용
        muralCanvas.fill(currentColor);
        muralCanvas.rectMode(CENTER);
        for (let i = 0; i <= steps; i++) {
          let t = i / steps;
          let ix = lerp(x, pX, t);
          let iy = lerp(y, pY, t);
          muralCanvas.rect(ix, iy, thick, thick * 0.7, 2);
          // 잉크 번짐 효과: 기존 알파 40을 현재 알파에 비례하여 조정
          // (40 / 100)은 마커펜의 원래 기본 알파 100에 대한 40의 비율
          muralCanvas.fill(red(currentColor), green(currentColor), blue(currentColor), alpha(currentColor) * (40 / 100));
          muralCanvas.rect(ix, iy, thick * 1.4, thick * 1.1, 4);
          // currentColor에 이미 페이드된 알파값이 적용되어 있으므로 그대로 사용
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
        content: "이곳은 19XX년의 성수동. \n\n 한국의 브루클린으로 불리는, 오늘날의 활기찬 성수동과는 사뭇 다르다. \n\n 과거의 성수동은 어떤 모습을 하고 있었고, 어떤 역사를 갖고 있을까?",
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
        content: "첫 번째 스테이지: 인프라 도입",
        x: width / 2,
        y: 800,
        size: 40,
        color: [255, 255, 255],
        align: "center"
      },
      "screen4-1" : {
        content: "첫 번째 장소: 연무장길",
        x: width / 2,
        y: 800,
        size: 40,
        color: [255, 255, 255],
        align: "center"
      },
      "screen4-2" : {
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
        content: "이 커다란 빌딩은 뭐지? 옛날 공장인가 봐. \n벽이 다 벗겨진 걸 보니, 지금은 사용하지 않는 것 같아.",
        x: width / 2,
        y: 850, // 👈 각 텍스트에 대한 y 위치
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7": {
        content: "이 공간을 활용해서 새로운 인프라를 설치할 수 있을 것 같아. \n\n 무엇을 도입하면 좋을까?",
        x: width / 2,
        y: height/2, // 👈 각 텍스트에 대한 y 위치
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-1": {
        content: "카페를 도입했더니 지역 주민들이 가끔 오가기는 하지만, 장사가 특별히 잘 되지는 않네. \n\n 경쟁력이 부족한 것 같아. \n\n 어떤 추가 전략을 사용해야 할까?",
        x: width / 2,
        y: height/2,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-2": {
        content: "독립서점을 도입했더니 사람들이 가끔 오가기는 하지만, 주민들은 독서에 큰 관심을 갖지 않는 것 같아. \n\n 어떤 추가 전략을 사용해야 할까?",
        x: width / 2,
        y: height/2,
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
        y: height/2-60,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-1-2": {
        content: "북카페로 운영하니 전보다 방문객이 늘었지만, \n근처 주민들은 독서에 큰 관심을 갖지 않는 것 같아. \n\n 책 장르를 전문화해서 아예 외부인 매니아 독자를 끌어들여야겠어. \n\n 어떤 추가 전략을 사용해야 할까?",
        x: 451,
        y: 596,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-2-1": {
        content: "유명 작가가 강연을 한다고 하니, 주민들도 관심을 가져주고 있어! \n 하지만 작가와의 만남이 단발적이라 아쉬워하는 분들이 많네. \n\n 어떤 추가 전략을 사용해야 할까?",
        x: width / 2,
        y: 180,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-2-2": {
        content: "예쁜 문구류를 구경하러 오는 주민과 외부인이 증가했어! \n\n 그런데 정작 책에 대한 관심은 오히려 떨어진 것 같네. \n 여기가 책방이에요, 문방구예요?”하고 묻는 분들도 계셨어. \n\n 어떻게 하면 책과 문구류 사이의 연결을 강화할 수 있을까?",
        x: width / 2,
        y: 200,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-3-1": {
        content: "클래스가 주민들을 포함한 여러 방문객들의 큰 호응을 얻었어! \n 게다가 인근 공장과 협업하니, 지역 상생 효과까지 있잖아? \n\n 그런데 클래스는 일회성이다 보니, 투입되는 비용 대비 브랜드 홍보 효과가 크지 않은 것 같아. \n\n 어떤 추가 전략을 사용해야 할까?",
        x: width / 2,
        y: height/2,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-3-2": {
        content: "테일러링 서비스를 제공했더니, 본인이 원하는 스타일의 옷을 만들어 입을 수 있어 주민들의 만족도가 커! \n 특히 수제화의 인기가 높네. \n\n 그런데 브랜드에 대한 외부인의 인지도는 여전히 낮아. \n\n 어떤 추가 전략을 사용해야 할까?",
        x: width / 2,
        y: 350,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-1-1-1": {
        content: "재즈 공연을 운영하니, 입소문을 타서 친구나 연인과 오기 좋은 핫플로 유명해졌어! \n 정말 북적거리고 활기차다!",
        x: width / 2,
        y: 850,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-1-1-2": {
        content: "통장 출혈이 심하긴 했지만, 음악에 관심 있는 사람들이 많이 찾아왔어. \n\n 서울 힙스터들이 전부 모여 있으니, 정말 멋진 걸!",
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
        y: 200,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-2-1-2": {
        content: "참여형 클래스에 더해 결과물 전시까지 운영하니, 자연스럽게 클래스 참여자 지인들의 추가 방문도 증가했어. \n\n 작가의 이야기에서 독자의 이야기로 나아가는 멋진 문학 공간이 탄생했어!",
        x: width / 2,
        y: 200,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-2-2-1": {
        content: "사람들이 북커버가 탐이 나서 책을 더 많이 구매하네. \n게다가 인근 공장과 협업하니, 지역 상생 효과까지 있잖아? \n\n 서점이 지역 공장과 독자들을 잇는 징검다리가 되었어!",
        x: width/2,
        y: 200,
        size: 28,
        color: [255,255,255],
        align: "center"
      },
      "screen7-2-2-2": {
        content: "공들여 큐레이션을 했더니 매달 사람들이 구매를 위해 줄을 설 정도야! \n\n 책 내용을 되새길 수 있는 문구류를 판매하는 특별한 서점이 되었어!",
        x: width / 2,
        y: 200,
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
        content: "부스에서 고객들에게 신체 치수 측정, 옷감 선정, 샘플 수제화 착용 등의 경험을 제공했더니, 큰 인기를 끌었어.",
        x: width / 2,
        y: 850,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-3-2-1+": {
        content: "소문을 들은 외부인들의 매장 방문이 증가하니, 정말 북적거리고 활기차다!",
        x: width / 2,
        y: 850,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-3-2-2": {
        content: "‘첫 면접용 정장’, ‘돌아가신 아버지의 셔츠 리폼’ 등 감동적인 사연을 바탕으로 옷을 제작했더니, \n 브랜드가 폭발적인 인기를 얻었어. \n\n 옷에 자신만의 특별한 추억을 담고자 하는 사람들로 매장이 문전성시를 이루고 있는 걸!",
        x: width / 2,
        y: 850,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen8": {
        content: "첫 번째 스테이지, 인프라 확충 미션을 훌륭하게 완수했어! \n\n 황량했던 과거와는 비교도 안 되게 멋진 공간이 되었어! \n\n\n 그럼 다음 스테이지로 넘어가 볼까?",
        x: width / 2,
        y: height/2,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      
      "screen10": {
        content: "두 번째 스테이지: 공공예술 도입_벽화",
        x: width / 2,
        y: 800,
        size: 40,
        color: [255, 255, 255],
        align: "center"
      },
      
      "screen10-1": {
        content: "두 번째 장소, 뚝섬역 사거리",
        x: width / 2,
        y: 800,
        size: 40,
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
        y: 800,
        size: 40,
        color: [255, 255, 255],
        align: "center"
      },

      "screen15-1": {
        content: "세 번째 장소, 중랑천 유역 녹지",
        x: width / 2,
        y: 800,
        size: 40,
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

      "screen17": {
        content: "세 번째 스테이지, 조각품 만들기 미션을 훌륭하게 완수했어. \n\n 텅 비어 있었던 과거와 달리 조각들 덕분에 숲에 생기가 도네!",
        x: width / 2,
        y: height/2,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },

      "screen18": {
        content: "이렇게 성수동 재생(Refurbish) 사업의 모든 단계가 마무리되었다. \n\n 낡은 공간을 새롭게 재해석하고, 빈 공간에 창의적인 숨결을 불어넣으면서 \n\n당신은 무엇을 느꼈는가?",
        x: width / 2,
        y: height/2,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },

      "screen19": {
        content: "수도권 과밀화 및 지방소멸이 사회문제로 대두하고 있는 현재, \n\n 낙후된 공간에 대한 재평가와, 재생을 위한 창의적인 아이디어가 더욱 절실해졌다.",
        x: width / 2,
        y: height/2,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },

      "screen20": {
        content: "성수동이 오늘의 모습을 갖추기까지 거쳤던 긴 여정을 체험하면서, \n\n 성수동뿐만 아니라 다양한 익명적인 낙후 공간이 가진 \n\n색다른 가능성을 상상해 보는 기회가 되었기를 바라며,",
        x: width / 2,
        y: height/2,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },

      "screen21": {
        content: "THE END",
        x: width-300,
        y: height/2,
        size: 100,
        color: [255, 255, 255],
        align: "center"
      },
    } 
    setupSculptureFeature(); // 조각상 기능 초기화
}

function draw() {

  // 제목 인트로 음원
  if (
    ["screen2", "screen2-1", "screen2-2", "screen2-3", "screen2-4", "screen3", "screen3-1", "screen4", "screen4-1", "screen4-2", "screen5", "screen6"].includes(currentKey)
    && !introMusicStarted
  ) {
    introMusic.loop(); // 반복 재생
    introMusicStarted = true;
  }

  // 👉 다른 화면으로 넘어가면 멈추고 플래그 리셋
  if (
    !["screen2", "screen2-1", "screen2-2", "screen2-3", "screen2-4", "screen3", "screen3-1", "screen4", "screen4-1", "screen4-2", "screen5", "screen6"].includes(currentKey)
    && introMusicStarted
  ) {
    introMusic.stop();
    introMusicStarted = false;
  }

  // 첫 번째 분기 음원
  if (
    ["screen7-intro", "screen7"].includes(currentKey)
    && !choice1MusicStarted
  ) {
    choice1Music.loop(); // 반복 재생
    choice1MusicStarted = true;
  }

  // 👉 다른 화면으로 넘어가면 멈추고 플래그 리셋
  if (
    !["screen7-intro", "screen7"].includes(currentKey)
    && choice1MusicStarted
  ) {
    choice1Music.stop();
    choice1MusicStarted = false;
  }

  // 카페 음원
  if (
    ["screen7-1"].includes(currentKey)
    && !cafeMusicStarted
  ) {
    cafeMusic.loop(); // 반복 재생
    cockbarMusic.setVolume(0.7);
    cafeMusicStarted = true;
  }

  // 👉 다른 화면으로 넘어가면 멈추고 플래그 리셋
  if (
    !["screen7-1"].includes(currentKey)
    && cafeMusicStarted
  ) {
    cafeMusic.stop();
    cafeMusicStarted = false;
  }

  // 칵테일바 음원
  if (
    ["screen7-1-1","screen7-3-1-2","screen7-3-1-1", "screen7-3-2-1+"].includes(currentKey)
    && !cockbarMusicStarted
  ) {
    cockbarMusic.loop(); // 반복 재생
    cockbarMusic.setVolume(0.7);
    cockbarMusicStarted = true;
  }

  // 👉 다른 화면으로 넘어가면 멈추고 플래그 리셋
  if (
    !["screen7-1-1","screen7-3-1-2", "screen7-3-1-1", "screen7-3-2-1+"].includes(currentKey)
    && cockbarMusicStarted
  ) {
    cockbarMusic.stop();
    cockbarMusicStarted = false;
  }

  // 재즈바 음원
  if (
    ["screen7-1-1-1"].includes(currentKey)
    && !jazzbarMusicStarted
  ) {
    jazzbarMusic.loop(); // 반복 재생
    jazzbarMusicStarted = true;
  }

  // 👉 다른 화면으로 넘어가면 멈추고 플래그 리셋
  if (
    !["screen7-1-1-1"].includes(currentKey)
    && jazzbarMusicStarted
  ) {
    jazzbarMusic.stop();
    jazzbarMusicStarted = false;
  }

  // 뮤직바 음원
  if (
    ["screen7-1-1-2"].includes(currentKey)
    && !musicbarMusicStarted
  ) {
    musicbarMusic.loop(); // 반복 재생
    musicbarMusicStarted = true;
  }

  // 👉 다른 화면으로 넘어가면 멈추고 플래그 리셋
  if (
    !["screen7-1-1-2"].includes(currentKey)
    && musicbarMusicStarted
  ) {
    musicbarMusic.stop();
    musicbarMusicStarted = false;
  }

  // 사람 소음
  if (
    ["screen7-1-1-2", "screen7-1-2-2", "screen7-1-2-1"].includes(currentKey)
    && !chatMusicStarted
  ) {
    chatMusic.loop(); // 반복 재생
    chatMusic.setVolume(0.6);
    chatMusicStarted = true;
  }

  // 👉 다른 화면으로 넘어가면 멈추고 플래그 리셋
  if (
    !["screen7-1-1-2", "screen7-1-2-2", "screen7-1-2-1"].includes(currentKey)
    && chatMusicStarted
  ) {
    chatMusic.stop();
    chatMusicStarted = false;
  }

  // 만화책 음원
  if (
    ["screen7-1-2-2"].includes(currentKey)
    && !animeMusicStarted
  ) {
    animeMusic.loop(); // 반복 재생
    animeMusic.setVolume(0.2);
    animeMusicStarted = true;
  }

  // 👉 다른 화면으로 넘어가면 멈추고 플래그 리셋
  if (
    !["screen7-1-2-2"].includes(currentKey)
    && animeMusicStarted
  ) {
    animeMusic.stop();
    animeMusicStarted = false;
  }

  // 북카페 음원
  if (
    ["screen7-1-2", "screen7-3-2-1", "screen7-3-2-1+"].includes(currentKey)
    && !bookcafeMusicStarted
  ) {
    bookcafeMusic.loop(); // 반복 재생
    bookcafeMusic.setVolume(0.3);
    bookcafeMusicStarted = true;
  }

  // 👉 다른 화면으로 넘어가면 멈추고 플래그 리셋
  if (
    !["screen7-1-2", "screen7-3-2-1", "screen7-3-2-1+"].includes(currentKey)
    && bookcafeMusicStarted
  ) {
    bookcafeMusic.stop();
    bookcafeMusicStarted = false;
  }

  // 예술서적 음원
  if (
    ["screen7-1-2-1", "screen7-2-2-2"].includes(currentKey)
    && !artMusicStarted
  ) {
    artMusic.loop(); // 반복 재생
    artMusic.setVolume(0.5);
    artMusicStarted = true;
  }

  // 👉 다른 화면으로 넘어가면 멈추고 플래그 리셋
  if (
    !["screen7-1-2-1", "screen7-2-2-2"].includes(currentKey)
    && artMusicStarted
  ) {
    artMusic.stop();
    artMusicStarted = false;
  }

  // 서점 음원
  if (
    ["screen7-1-2", "screen7-2"].includes(currentKey)
    && !bookstoreMusicStarted
  ) {
    bookstoreMusic.loop(); // 반복 재생
    bookstoreMusicStarted = true;
  }

  // 👉 다른 화면으로 넘어가면 멈추고 플래그 리셋
  if (
    !["screen7-1-2", "screen7-2"].includes(currentKey)
    && bookstoreMusicStarted
  ) {
    bookstoreMusic.stop();
    bookstoreMusicStarted = false;
  }

  // 서점 책 소리
  if (
    ["screen7-2"].includes(currentKey)
    && !bookturnMusicStarted
  ) {
    bookturnMusic.loop(); // 반복 재생
    bookturnMusic.setVolume(0.8);
    bookturnMusicStarted = true;
  }

  // 👉 다른 화면으로 넘어가면 멈추고 플래그 리셋
  if (
    !["screen7-2"].includes(currentKey)
    && bookturnMusicStarted
  ) {
    bookturnMusic.stop();
    bookturnMusicStarted = false;
  }

  // 문방구 음원
  if (
    ["screen7-2-2"].includes(currentKey)
    && !stationeryMusicStarted
  ) {
    stationeryMusic.loop(); // 반복 재생
    stationeryMusic.setVolume(0.3);
    stationeryMusicStarted = true;
  }

  // 👉 다른 화면으로 넘어가면 멈추고 플래그 리셋
  if (
    !["screen7-2-2"].includes(currentKey)
    && stationeryMusicStarted
  ) {
    stationeryMusic.stop();
    stationeryMusicStarted = false;
  }

  // 북커버 음원
  if (
    ["screen7-2-2-1"].includes(currentKey)
    && !leatherMusicStarted
  ) {
    leatherMusic.loop(); // 반복 재생
    leatherMusic.setVolume(0.5);
    leatherMusicStarted = true;
  }

  // 👉 다른 화면으로 넘어가면 멈추고 플래그 리셋
  if (
    !["screen7-2-2-1"].includes(currentKey)
    && leatherMusicStarted
  ) {
    leatherMusic.stop();
    leatherMusicStarted = false;
  }

  // 문방구 소음
  if (
    ["screen7-2-2", "screen7-2-2-1", "screen7-2-2-2", "screen7-2-1-1", "screen7-2-1-2", "screen7-3-1", "screen7-3-2-1", "screen7-3-2-2"].includes(currentKey)
    && !statchatMusicStarted
  ) {
    statchatMusic.loop(); // 반복 재생
    statchatMusic.setVolume(0.4);
    statchatMusicStarted = true;
  }

  // 👉 다른 화면으로 넘어가면 멈추고 플래그 리셋
  if (
    !["screen7-2-2", "screen7-2-2-1", "screen7-2-2-2", "screen7-2-1-1", "screen7-2-1-2", "screen7-3-1", "screen7-3-2-1", "screen7-3-2-2"].includes(currentKey)
    && statchatMusicStarted
  ) {
    statchatMusic.stop();
    statchatMusicStarted = false;
  }

  // 작가 음원
  if (
    ["screen7-2-1"].includes(currentKey)
    && !authorMusicStarted
  ) {
    authorMusic.loop(); // 반복 재생
    authorMusicStarted = true;
  }

  // 👉 다른 화면으로 넘어가면 멈추고 플래그 리셋
  if (
    !["screen7-2-1"].includes(currentKey)
    && authorMusicStarted
  ) {
    authorMusic.stop();
    authorMusicStarted = false;
  }

  // 작가 노트 할인
  if (
    ["screen7-2-1-1"].includes(currentKey)
    && !discountMusicStarted
  ) {
    discountMusic.loop(); // 반복 재생
    discountMusic.setVolume(0.3);
    discountMusicStarted = true;
  }

  // 👉 다른 화면으로 넘어가면 멈추고 플래그 리셋
  if (
    !["screen7-2-1-1"].includes(currentKey)
    && discountMusicStarted
  ) {
    discountMusic.stop();
    discountMusicStarted = false;
  }

  // 작가 전시
  if (
    ["screen7-2-1-2"].includes(currentKey)
    && !exhibitMusicStarted
  ) {
    exhibitMusic.loop(); // 반복 재생
    exhibitMusic.setVolume(0.3);
    exhibitMusicStarted = true;
  }

  // 👉 다른 화면으로 넘어가면 멈추고 플래그 리셋
  if (
    !["screen7-2-1-2"].includes(currentKey)
    && exhibitMusicStarted
  ) {
    exhibitMusic.stop();
    exhibitMusicStarted = false;
  }

  // 작가 전시
  if (
    ["screen7-3"].includes(currentKey)
    && !fashionMusicStarted
  ) {
    fashionMusic.loop(); // 반복 재생
    fashionMusic.setVolume(0.2);
    fashionMusicStarted = true;
  }

  // 👉 다른 화면으로 넘어가면 멈추고 플래그 리셋
  if (
    !["screen7-3"].includes(currentKey)
    && fashionMusicStarted
  ) {
    fashionMusic.stop();
    fashionMusicStarted = false;
  }

  // 리폼 음원
  if (
    ["screen7-3-1"].includes(currentKey)
    && !reformMusicStarted
  ) {
    reformMusic.loop(); // 반복 재생
    reformMusic.setVolume(0.3);
    reformMusicStarted = true;
  }

  // 👉 다른 화면으로 넘어가면 멈추고 플래그 리셋
  if (
    !["screen7-3-1"].includes(currentKey)
    && reformMusicStarted
  ) {
    reformMusic.stop();
    reformMusicStarted = false;
  }

  // 런웨이 음원
  if (
    ["screen7-3-1-2"].includes(currentKey)
    && !runwayMusicStarted
  ) {
    runwayMusic.loop(); // 반복 재생
    runwayMusic.setVolume(0.4);
    runwayMusicStarted = true;
  }

  // 👉 다른 화면으로 넘어가면 멈추고 플래그 리셋
  if (
    !["screen7-3-1-2"].includes(currentKey)
    && runwayMusicStarted
  ) {
    runwayMusic.stop();
    runwayMusicStarted = false;
  }

  // 라인업 음원
  if (
    ["screen7-3-1-1"].includes(currentKey)
    && !diyMusicStarted
  ) {
    diyMusic.loop(); // 반복 재생
    diyMusic.setVolume(0.3);
    diyMusicStarted = true;
  }

  // 👉 다른 화면으로 넘어가면 멈추고 플래그 리셋
  if (
    !["screen7-3-1-1"].includes(currentKey)
    && diyMusicStarted
  ) {
    diyMusic.stop();
    diyMusicStarted = false;
  }

  // 테일러링 음원
  if (
    ["screen7-3-2"].includes(currentKey)
    && !taylorMusicStarted
  ) {
    taylorMusic.loop(); // 반복 재생
    taylorMusicStarted = true;
  }

  // 👉 다른 화면으로 넘어가면 멈추고 플래그 리셋
  if (
    !["screen7-3-2"].includes(currentKey)
    && taylorMusicStarted
  ) {
    taylorMusic.stop();
    taylorMusicStarted = false;
  }

  // 사연 테일러링 음원
  if (
    ["screen7-3-2-2"].includes(currentKey)
    && !storytaylorMusicStarted
  ) {
    storytaylorMusic.loop(); // 반복 재생
    storytaylorMusic.setVolume(0.6);
    storytaylorMusicStarted = true;
  }

  // 👉 다른 화면으로 넘어가면 멈추고 플래그 리셋
  if (
    !["screen7-3-2-2"].includes(currentKey)
    && storytaylorMusicStarted
  ) {
    storytaylorMusic.stop();
    storytaylorMusicStarted = false;
  }

  // 엔딩 음원
  if (
    ["screen8", "screen11-2", "screen17","screen18","screen19","screen20", "screen21"].includes(currentKey)
    && !stage1endMusicStarted
  ) {
    stage1endMusic.loop(); // 반복 재생
    stage1endMusicStarted = true;
  }

  // 👉 다른 화면으로 넘어가면 멈추고 플래그 리셋
  if (
    !["screen8", "screen11-2", "screen17","screen18","screen19","screen20", "screen21"].includes(currentKey)
    && stage1endMusicStarted
  ) {
    stage1endMusic.stop();
    stage1endMusicStarted = false;
  }

  // 벽화 파트 음원
  if (
    ["screen10", "screen10-1", "screen10-2", "screen11", "screen11-1", "screen12"].includes(currentKey)
    && !muralMusicStarted
  ) {
    muralMusic.loop(); // 반복 재생
    muralMusicStarted = true;
  }

  // 👉 다른 화면으로 넘어가면 멈추고 플래그 리셋
  if (
    !["screen10", "screen10-1", "screen10-2", "screen11", "screen11-1", "screen12"].includes(currentKey)
    && muralMusicStarted
  ) {
    muralMusic.stop();
    muralMusicStarted = false;
  }

  // 서울숲 파트 음원
  if (
    ["screen15", "screen15-1", "screen15-2", "screen15-3", "screen15-4", "screen15-5"].includes(currentKey)
    && !forestMusicStarted
  ) {
    forestMusic.loop(); // 반복 재생
    forestMusicStarted = true;
  }

  // 👉 다른 화면으로 넘어가면 멈추고 플래그 리셋
  if (
    !["screen15", "screen15-1", "screen15-2", "screen15-3", "screen15-4", "screen15-5"].includes(currentKey)
    && forestMusicStarted
  ) {
    forestMusic.stop();
    forestMusicStarted = false;
  }

  if (currentKey === "screen13") {
    showBrushUI(true);  // 벽화 모드일 때만 버튼 보이기
    drawMural();
    return;
  } else {
    showBrushUI(false); // 그 외 화면에서는 버튼 숨기기
  } 
   // ─────── 바로 이 부분입니다. 기존 background(0)와 let img... 부분을 아래 코드로 교체하세요. ───────
  if (currentKey === 'screen15-5') {
    // screen15-5는 배경과 텍스트만 그립니다. (웹캠 호출 없음)
    let img = images[currentKey];
    if (img) {
        image(img, width / 2, height / 2, width, height);
    }

} else if (currentKey === 'screen15-pose') {
    // 'screen15' 이미지를 배경으로 사용하고, 그 위에 웹캠을 그립니다.
    image(images['screen15'], width / 2, height / 2, width, height);
    drawSculpturePoseScreen();

} else if (currentKey === 'screen16') {
    // screen16은 결과물을 그립니다.
    image(images[currentKey], width / 2, height / 2, width, height);
    drawSculptureResultScreen();

} else {
    // 그 외 모든 일반 화면은 원래의 비율 계산 로직을 사용해 그립니다.
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
    } else {
        // 이미지가 없는 경우를 대비한 검은색 배경
        background(0);
    }
}

  // ─── 2) 페이드 상태에 따른 프레임 증가 및 전환 처리 ─────────────────────────────
  if (fadeMode === "fadingOut") {
    fadeFrame++;
    if (fadeFrame >= FADE_DURATION) {
      // 3초(180프레임) 페이드 아웃 끝 → 실제 화면 전환 & 페이드 인 시작
      currentKey = pendingKey;
      pendingKey = "";
      fadeMode = "fadingIn";
      fadeFrame = 0;
      redraw();
      return;
    }
  }
  else if (fadeMode === "fadingIn") {
    fadeFrame++;
    if (fadeFrame >= FADE_DURATION) {
      // 3초 페이드 인 끝 → 일반 상태로 복귀
      fadeMode = "";
      fadeFrame = 0;
    }
  }

  // ─── 3) 텍스트 그리기 (기존 color + 알파값 적용) ───────────────────────────────
  if (textMap[currentKey]) {
    let t = textMap[currentKey];
    let base = t.color || [255, 255, 255];
    let alpha = 255;
    if (fadeMode === "fadingOut") {
      alpha = 255 - floor((fadeFrame / FADE_DURATION) * 255);
    } else if (fadeMode === "fadingIn") {
      alpha = floor((fadeFrame / FADE_DURATION) * 255);
    }
    fill(base[0], base[1], base[2], alpha);

    if (t.align === "left") {
      textAlign(LEFT, CENTER);
    } else {
      textAlign(CENTER, CENTER);
    }
    textSize(t.size || 32);
    text(t.content, t.x, t.y);
  }

  // Hint 문구 그리기 (선택된 screen에서만)
  if (hintScreens.includes(currentKey)) {
    fill(173, 216, 230); // 연파랑 (light blue)
    textSize(25);
    textAlign(CENTER, TOP);
    text("Hint: 방 안에 사용할 만한 도구는 없을까? 물체들에 마우스를 올려보자.", width / 2, 30);
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
      /*
      if (isHovered) {
        let paddingX = 5;
        let paddingY = 10;
        textSize(24);
        textAlign(CENTER, CENTER);
  
        let labelWidth = textWidth(c.label);
        let boxW = labelWidth + paddingX * 2;
        let boxH = textAscent() + textDescent() + paddingY * 3.7;
  
        // 📦 텍스트 박스 배경
        rectMode(CENTER);
        fill(0); // 검정 배경
        noStroke();
        rect(mouseX, mouseY - 60, boxW, boxH, 5);
  
        // 🎨 텍스트 색상
        fill(197, 191, 159, 255); // RGBA 색상
        text(c.label, mouseX, mouseY - 60);
        */

        if (isHovered && currentKey !== "screen1" && c.label) {
          let paddingX = 5;
          let paddingY = 10;
          textSize(24);
          textAlign(CENTER, CENTER);
        
          let labelWidth = textWidth(c.label);
          let boxW = labelWidth + paddingX * 2;
          let boxH = textAscent() + textDescent() + paddingY * 3.7;
        
          rectMode(CENTER);
          fill(0, 150);
          noStroke();
          rect(mouseX, mouseY - 60, boxW, boxH, 5);
        
          fill(197, 191, 159, 255);
          text(c.label, mouseX, mouseY - 60);
      }
    }
  }

  if (currentKey === "screen11-2") {               // 완성된 벽화 표시
    cursor()
    background(0); // 화면 초기화
    image(images["screen11-2"], width / 2, height / 2, width, height);

    if (isFading) {
      tint(255, fadeAmount);
      image(muralImage, width / 2, height / 2, width, height);
      fadeAmount += 3.5;
      if (fadeAmount >= 255) {
        fadeAmount = 255;
        isFading = false;
        isFadedIn = true;
    }
      tint(255); // 초기화
      fill(255);
      textAlign(CENTER);
      textSize(28);
      text("두 번째 스테이지의 첫 번째 미션,", width / 2, 850);
    } else if (isFadedIn) {
      image(muralImage, width / 2, height / 2, width, height);
      image(images["screen11-3"], images["screen11-3"].width / 2 / 2, height - images["screen11-3"].height / 2 / 2, images["screen11-3"].width / 2, images["screen11-3"].height / 2);
      fill(255);
      textAlign(CENTER);
      textSize(28);
      text("벽화 그리기 미션을 훌륭하게 완수했어!\n어딘가 으스스했던 과거와 비교해 보니, 몰라보게 달라졌다!", width / 2, 850);
    }
  }


  // textSize(30);
  // text(`x-coordinate: ${mouseX}`, 100, 318);
  // text(`y-coordinate: ${mouseY}`, 100, 390);

  if ( // 지도 부분 흰 글씨 안보여서 파란색으로 표시
    currentKey === "screen3"   ||
    currentKey === "screen3-1" ||
    currentKey === "screen9"   ||
    currentKey === "screen9-1" ||
    currentKey === "screen14"  ||
    currentKey === "screen14-1"
  ) {
    fill(18, 99, 230);
  } else {
    fill(255);
  }
  
  textSize(20);
  textAlign(RIGHT, TOP);
  textStyle(BOLD);
  text("Press SPACE to proceed", width - 30, 10);
  
  textAlign(LEFT, TOP);
  text("Press BACKSPACE to go back", 30, 10);

  textAlign(LEFT, BOTTOM);
  text("Press R to restart", 30,972);
  
}


function keyPressed() {

    /* ───────── 1) BACKSPACE : 언제 눌러도 먼저 처리 ───────── */
    if (keyCode === BACKSPACE) {
        if (screenHistory.length > 0) {
            currentKey = screenHistory.pop();
            redraw();
        }
        return; // ← 더 내려가지 않고 종료
    }

    /* ───────── 2) R 키로 처음으로 ───────── */
    if (key === 'r' || key === 'R') {
        currentKey = "screen1";
        screenHistory = [];
        redraw();
        return;
    }

    /* ───────── 3) screen11-2 특수 처리 ───────── */
    if (currentKey === "screen11-2") {
        if (!isFading && !isFadedIn) {
            fadeAmount = 0;
            isFading = true;
        } else if (isFadedIn) {
            screenHistory.push(currentKey);
            currentKey = "screen14";
            redraw();
        }
        return; // ← 공통 키 처리로 내려가지 않음
    }

    /* ───────── 4) 스페이스바 처리 ───────── */
    if (key === ' ') {
        // screen13과 screen1에서는 스페이스바 무시
        if (currentKey === 'screen13' || currentKey === 'screen1') {
            return;
        }

        // [변경] screen15-pose에서만 특별한 동작을 하도록 수정
        if (currentKey === 'screen15-pose') {
            screenHistory.push(currentKey);
            currentKey = storyMap[currentKey];      // storyMap에 따라 'screen16'으로 전환
            capturePoseAndGenerateSculpture();      // API 호출 시작
            redraw();
            return; // 여기서 종료해야 다른 로직을 타지 않습니다.
        }

        // [변경 없음] screen15-5를 포함한 나머지 모든 일반 화면은 이 로직을 따름
        let next = storyMap[currentKey];
        if (typeof next === 'string') {
            screenHistory.push(currentKey);
            currentKey = next;
            redraw();
        }
    }
}
  // // 텍스트 페이드인 효과 유
  // if (key === ' ') {
  //   let next = storyMap[currentKey];
  //   // next가 문자열일 때만 처리 (객체 분기일 때는 마우스 클릭으로 넘어가므로)
  //   if (typeof next === 'string') {
  //     // 3-1) 현재 화면이 fade 대상이면 → 페이드 아웃 모드로 진입
  //     if (fadeScreens.includes(currentKey)) {
  //       screenHistory.push(currentKey);
  //       pendingKey = next;         // 실제 넘어갈 화면을 잠시 보관
  //       fadeMode = "fadingOut";    // 페이드 아웃 상태로 변경
  //       fadeFrame = 0;             // 프레임 카운트 리셋
  //     }
  //     // 3-2) fade 대상이 아니면 → 즉시 넘어감
  //     else {
  //       screenHistory.push(currentKey);
  //       currentKey = next;
  //       redraw();
  //     }
  //   }
  // }



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
  let steps;
  if (selectedBrush.name === '물감붓') {
    steps = max(2, floor(distance / 10)); // 스프레이일 때
  } else {
    steps = max(2, floor(distance / 0.8)); // 다른 붓일 때
  }
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
  // 기존 브러시 버튼 제거
  for (let btn of brushButtons) {
    if (btn) btn.remove();
  }
  brushButtons = [];

  let startY = buttonMargin;
  for (let brush of brushes) {
    let btn = createButton(brush.name);
    btn.position(muralCanvas.width + buttonMargin, startY);
    btn.size(sidebarWidth - 2 * buttonMargin, buttonHeight);
    btn.mousePressed(() => {
      // 음악 정지
      if (currentMusic && currentMusic.isPlaying()) {
        currentMusic.stop();
      }
      musicStarted = false;
      selectedBrush = brush;
      // 모든 브러시 버튼의 스타일 초기화
      for (let b of brushButtons) {
        if (b) {
          b.style('background-color', '');
          b.style('color', '');
        }
      }
      // 선택된 브러시 버튼의 스타일 변경
      btn.style('background-color', '#000000');
      btn.style('color', '#FFFFFF');
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
  completeButton.position(muralCanvas.width + buttonMargin, height - 100);
  completeButton.size(sidebarWidth - 2 * buttonMargin, buttonHeight * 2); // 버튼 높이를 두 배로 증가
  completeButton.style('background-color', '#4A90E2');
  completeButton.style('color', 'white');
  completeButton.style('font-size', '20px'); // 텍스트 크기도 키워서 가독성 향상
  completeButton.mousePressed(() => {
    // 음악 정지
    if (currentMusic && currentMusic.isPlaying()) {
      currentMusic.stop();
    }
    musicStarted = false;
    muralImage = muralCanvas.get();
    currentKey = "screen11-2";
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
      let baseColor = brushColors[i];
      currentColor = color(red(baseColor), green(baseColor), blue(baseColor), 150);
    });
    colorButtons.push(btn);
  }
}

function getNextY() {
  let maxY = 0;
  for (let btn of [...brushButtons, resetButton]) {
    if (btn) {
      let y = btn.position().y;
      if (y > maxY) maxY = y;
    }
  }
  return maxY + buttonHeight + 8;
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
  textSize(24);
  textAlign(LEFT, TOP);
  text(`선택: ${selectedBrush.name}`, muralCanvas.width + buttonMargin, height - 60);
  text("마우스를 드래그하여 그림을 그려 보자. \n (붓의 굵기와 종류를 바꿔 보자!)", 10, height - 70);

  fill(255, 255, 0);
  textSize(24);
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
  sliderbar_x= sliderX;

  // 슬라이더 바
  fill(180);
  rect(sliderbar_x, sliderY, sliderW, sliderH, 4);

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

  noCursor();  // 기본 커서 숨김

  if (selectedBrush && brushCursors[selectedBrush.name]) {
    imageMode(CENTER);
    image(brushCursors[selectedBrush.name], mouseX, mouseY, 64, 64);
  }
}