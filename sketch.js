let images = {};
let currentKey = "screen1";
let textMap = {};

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
        content: "이곳은 19XX년의 성수동. \n 한국의 브루클린으로 불리는, 오늘날의 활기찬 성수동과는 사뭇 다르다.. \n 과거의 성수동은 어떤 모습을 하고 있었고, 어떤 역사를 갖고 있을까?",
        x: width / 2,
        y: height / 2,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen2-1" : {
        content: "산업공동화 전후로 가발, 인쇄 등 각종 영세 산업 공장들이 성수동에 모여들었다. \n 특히 1967년 금강제화가 금호동으로 옮겨온 후로부터 성수동은 수제화의 대명사가 되었다.",
        x: width / 2,
        y: height / 2,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen2-2" : {
        content: "그러나 시간이 지나면서 많은 공장들이 문을 닫았고, 성수동은 미국의 러스트 벨트처럼 몰락한 공업지대의 모습을 띠게 되었다. \n\n 당신이 보고 있는 풍경이 바로 그 시점, 19XX년의 성수동이다.",
        x: width / 2,
        y: height / 2,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen2-3" : {
        content: "당신은 낡은 공장들이 흩어져 있는 이 황량한 공간을 어떻게 바꿀 것인가? \n 현재의 성수동을 모방할 필요는 없다. 오로지 당신의 색채로 과거의 성수동을 새롭게 계획해 보자. \n 성수동 재생(Refurbish) 사업, 시작!",
        x: width / 2,
        y: height / 2,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen2-4" : {
        content: "당신은 두 가지 방법으로 성수동 계획 사업을 진행하려고 한다. \n 게임의 각 스테이지는 각 사업에 해당한다. \n\n 첫 번째 스테이지는 인프라 확충. \n 낡은 공장 지대에 새로운 인프라를 도입하여 사람들에게 도움이 되는 장소를 만들어 보자. \n 두 번째 스테이지는 공공예술 도입. \n 비어 있는 공간에 예술을 불어넣어 시민들에게 영감을 주는 장소로 탈바꿈해 보자.",
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
        content: "카페를 도입했더니 지역 주민들이 가끔 오가기는 하지만, 장사가 특별히 잘 되지는 않네. \n 경쟁력이 부족한 것 같아. \n\n 어떤 추가 전략을 사용해야 할까?",
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
        content: "북카페로 운영하니 전보다 사람들이 더 관심을 가져 주는 것 같지만, 근처 주민들은 독서에 큰 관심을 갖지 않는 것 같아. \n 책 장르를 전문화해서 아예 외부인 매니아 독자를 끌어들여야겠어. \n\n 어떤 추가 전략을 사용해야 할까?",
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
        content: "테일러링 서비스를 제공했더니, 본인이 원하는 스타일의 옷을 만들어 입을 수 있어 주민들의 만족도가 커! \n 특히 수제화의 인기가 높네. \n\n 그런데 브랜드에 대한 외부인의 인지도는 여전히 낮네. \n\n 어떤추가 전략을 사용해야 할까?",
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
        content: "통장 출혈이 심하긴 했지만, 음악에 관심 있는 사람들이 많이 찾아왔어. \n 서울 힙스터들이 전부 모여 있으니, 정말 북적거리고 활기차다!",
        x: width / 2,
        y: 850,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-1-2-1": {
        content: "서적을 구하는 게 쉽지는 않았지만, 희귀 서적 소식을 듣고 다양한 사람들 이 모여들었어. \n 예술가와 평론가들이 모여 교류하면서, 이곳은 지역의 예술 프로젝트가 싹트는 공간이 되었어!",
        x: width / 2,
        y: 850,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-1-2-2": {
        content: "만화 매니아 층이 소문을 듣고 많이 찾아왔어! /n 사람들이 삼삼오오 만화를 읽으면서 대화를 나누니, 정말 북적거리고 활기차다!",
        x: width / 2,
        y: 850,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-2-1-1": {
        content: "작가 추천작을 구경하기 위해 서점을 찾는 사람들이 늘었어! 할인된 가격에 판매하니 구매도 크게 증가했는걸? \n 작가와 독자가 장기간 소통하는 특별한 장소가 탄생했어!",
        x: width / 2,
        y: 850,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-2-1-2": {
        content: "참여형 클래스에 더해 결과물 전시까지 운영하니, 자연스럽게 클래스 참여자 지인들의 추가 방문도 증가했어. \n 작가의 이야기에서 독자의 이야기로 나아가는 멋진 문학 공간이 탄생했어!",
        x: width / 2,
        y: 850,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-2-2-1": {
        content: "사람들이 북커버가 탐이 나서 책을 더 많이 구매하네. 게다가 인근 공장과 협업하니, 지역 상생 효과까지 있잖아? \n 서점이 지역 공장과 독자들을 잇는 징검다리가 되었어!",
        x: width / 2,
        y: 850,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-2-2-2": {
        content: "공들여 큐레이션을 했더니 매달 사람들이 구매를 위해 줄을 설 정도야! \n 책 내용을 되새길 수 있는 문구류를 판매하는 특별한 서점이 되었어!",
        x: width / 2,
        y: 850,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-3-1-1": {
        content: "본인이 만든 의류가 직접 출시된다는 사실에 많은 이들이 관심을 보였어. \n 덕분에 무명 브랜드에서 입점 지역 특성을 반영한 친환경 패션 브랜드로 성장했어!",
        x: width / 2,
        y: 850,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-3-1-2": {
        content: "본인이 만든 옷을 입은 모델들의 런웨이 소식에 매장이 폭발적인 인기를 끌었어. \n 19XX년 S/S 시즌 새로운 트렌드는 작업복이래!",
        x: width / 2,
        y: 850,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-3-2-1": {
        content: "부스에서 고객들에게 신체 치수 측정, 옷감 선정, 샘플 수제화 착용 등의 경험을 제공했더니, 큰 인기를 끌었어. \n 소문을 들은 외부인들의 매장 방문이 증가하니, 정말 북적거리고 활기차다!",
        x: width / 2,
        y: 850,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
      "screen7-3-2-2": {
        content: "‘첫 면접용 정장’, ‘돌아가신 아버지의 셔츠 리폼’ 등 감동적인 사연을 바탕으로 옷을 제작했더니, 브랜드가 폭발적인 인기를 얻었어. \n 옷에 자신만의 특별한 추억을 담고자 하는 사람들로 매장이 문전성시를 이루고 있는 걸!",
        x: width / 2,
        y: 850,
        size: 28,
        color: [255, 255, 255],
        align: "center"
      },
    } 
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
        let labelWidth = textWidth(c.label);
        let boxW = labelWidth + paddingX * 2;
        let boxH = 24 + paddingY;


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