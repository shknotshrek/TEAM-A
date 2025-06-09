// sculptureFeature.js

// 조각상 기능 관련 모든 변수를 담는 객체
const sculptureModule = {
    video: null,
    poseNet: null,
    poses: [],
    isModelReady: false,
    isGenerating: false,
    generatedSculptureImg: null,
    generatedSculptureText: "",
    quizIndex: 0,
    quizAnswered: false
};

const quizQuestions = [
    {
        question: "공업지대였던 성수동은 현재도 그때의 흔적을 품은 건물들이 곳곳에 자리하고 있습니다.\n현재는 갤러리 겸 카페로 쓰이고 있는 성수동의 대표 핫플레이스 '대림창고'도 그러한데요.\n대림창고가 처음 지어졌을 당시 건물의 용도는 무엇이었을까요?",
        options: ["정미소", "자동차 공업사", "구두 공장"],
        correct: 0
    },
    {
        question: "서울시는 뚝섬 개발 사업의 일환으로 중랑천과 한강 사이에 대규모 녹지인 서울숲을 조성했습니다.\n지금 여러분이 조각을 만들고 있는 장소의 모델이 바로 개발 전 서울숲이기도 하죠.\n서울숲이 개발을 마치고 개원된 해는 언제일까요?",
        options: ["2003년", "2005년", "2008년"],
        correct: 1
    },
    {
        question: "성수동은 스페셜티 커피의 성지로도 유명합니다. 국내의 여러 실력 있는 바리스타가 운영하는 카페들에 더해,\n해외의 브랜드가 국내 1호 매점을 내는 곳으로도 종종 선택되는 곳입니다.\n그 중 지난 2019년 미국과 일본에서 선풍적인 인기를 끌었던 한 체인이 성수에 국내 1호점을 낸다는 소식이 들려왔는데요.\n모든 고객에게 시간을 들여 핸드드립 커피를 내려 준다는 철칙과 특징적인 푸른색의 로고로\n커피 마니아들이 사랑하는 브랜드로 자리잡은 이 체인의 이름은 무엇일까요?",
        options: ["스타벅스", "블루 보틀", "팀 홀튼"],
        correct: 1
    },
    {
        question: "현재 성수동의 중심이 되는 지역은 성수동2가 남쪽 2호선 성수역 부근입니다.\n그 중 OOO길은 대림창고나 디올 플래그십 스토어 등 현재 성수동의 분위기를 형성하는 데 일조한 가게들이 모여 있는,\n그야말로 성수동의 핵심과도 같은 곳입니다. 과거 조선 시대 군사들의 훈련 상태를 점검하는 시설이 있었다는 점에서\n현재의 이름을 갖게 된 이 길의 이름은 무엇일까요?",
        options: ["경리단(經理團)길", "서순라(西巡邏)길", "연무장(演武場)길"],
        correct: 2
    }
];


/**
 * 조각상 기능에 필요한 요소(웹캠, ml5 모델)를 초기 설정하는 함수.
 */
function setupSculptureFeature() {
    sculptureModule.video = createCapture(VIDEO, () => {
        console.log("✅ Video capture ready.");
        sculptureModule.video.size(width, height);
        
        sculptureModule.poseNet = ml5.poseNet(sculptureModule.video, () => {
            console.log('✅ PoseNet Model Ready');
            sculptureModule.isModelReady = true;
        });

        sculptureModule.poseNet.on('pose', (results) => {
            sculptureModule.poses = results;
        });
    });
    
    sculptureModule.video.hide();
    console.log("조각상 기능 설정 완료.");
}

/**
 * screen15-pose에서 필요한 모든 그리기를 처리하는 함수.
 * (숨겨진 캔버스에 웹캠 영상을, 메인 캔버스에 스켈레톤을 그림)
 */
function drawSculpturePoseScreen() {
    // --- 1. 숨겨진 캔버스에 AI 제출용 영상 그리기 ---
    if (sculptureModule.video.elt.readyState >= 2) {
        aiVisionCanvas.push();
        // 거울 모드로 좌우 반전하여 숨겨진 캔버스에 그리기
        aiVisionCanvas.translate(width, 0);
        aiVisionCanvas.scale(-1, 1);
        aiVisionCanvas.image(sculptureModule.video, 0, 0, width, height);
        aiVisionCanvas.pop();
    }

    // --- 2. 메인 캔버스에 사용자가 볼 내용 그리기 ---
    if (sculptureModule.isModelReady && sculptureModule.poses.length > 0) {
        // 배경은 sketch.js에서 이미 그렸으므로, 스켈레톤만 그립니다.
        drawPoseSkeleton();
    } else {
        // 모델 로딩 중 텍스트
        fill(255, 255, 255, 200);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(24);
        text("카메라와 모델을 준비 중입니다...", width / 2, height / 2);
    }
}

/**
 * screen16에서 생성된 조각상 결과를 그리는 함수.
 */
/**
 * screen16에서 생성된 조각상 결과를 그리는 함수.
 * (위치 조정 및 '박물관 명패' 스타일 적용)
 */
/**
 * screen16에서 생성된 조각상 결과를 그리는 함수.
 * (텍스트 크기 및 위치 조정)
 */
function drawSculptureResultScreen() {
    // 생성 중일 때 로딩 메시지 표시는 기존과 동일
    if (sculptureModule.isGenerating) {
        drawQuizScreen();
        return;
        
        
        // fill(0, 0, 0, 150);
        // noStroke();
        // rectMode(CENTER);
        // rect(width/2, height - 100, 600, 50, 10);
        
        // fill(255);
        // textAlign(CENTER, CENTER);
        // textSize(24);
        // text("당신의 포즈로 조각상을 만들고 있습니다...", width / 2, height - 100);
    }

    // 조각상 이미지 그리는 부분은 기존과 동일
    if (sculptureModule.generatedSculptureImg) {
        push();
        imageMode(CENTER);
        const imgHeight = 550;
        const imgY = height / 2;
        image(sculptureModule.generatedSculptureImg, width / 2, imgY, 450, imgHeight);
        pop();
    
        // '박물관 명패' 스타일로 작품 제목 표시
        if (sculptureModule.generatedSculptureText) {
            // [변경] 텍스트 크기를 더 작게 설정
            textSize(20); 

            // [변경] 명패 위치를 화면 맨 아래로 이동 (Press R to restart 위에 표시되도록)
            const plaqueY = height - 45; 

            const textW = textWidth(sculptureModule.generatedSculptureText);
            const plaqueW = textW + 40; // 패딩을 살짝 줄임
            const plaqueH = 35;       // 높이를 줄임

            // 명패 배경 그리기
            fill(0, 0, 0, 180);
            noStroke();
            rectMode(CENTER);
            rect(width / 2, plaqueY, plaqueW, plaqueH, 5);

            // 작품 제목 텍스트 그리기
            fill(255);
            textAlign(CENTER, CENTER);
            textStyle(BOLD);
            text(sculptureModule.generatedSculptureText, width / 2, plaqueY);
            textStyle(NORMAL);
        }
    }
}
/**
 * 포즈를 캡처하고, image-to-image 생성을 위해 Gemini API 요청을 시작합니다.
 */
 /**
 * 포즈를 캡처하고, image-to-image 생성을 위해 Gemini API 요청을 시작합니다.
 * (프롬프트 수정: 투명 배경 + 짧은 제목 요청)
 */
async function capturePoseAndGenerateSculpture() {
    console.log("📸 포즈 캡처 및 Image-to-Image 생성 시작!");
    sculptureModule.isGenerating = true;
    
    // [변경] 메인 캔버스 대신 '숨겨진 캔버스'의 이미지를 캡처합니다.
    const capturedImageDataURL = aiVisionCanvas.get().canvas.toDataURL("image/png");
    const base64WithoutPrefix = capturedImageDataURL.replace(/^data:image\/png;base64,/, "");

    const MODEL_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent?key=${window.GEMINI_API_KEY}`;
    
    const finalPrompt = `Generate a realistic sculpture that accurately captures the user's body pose, using materials like stone or bronze. The sculpture should be rendered against a solid black background. For the text response, you must start with a title in the format "Title: [The Title Here]", and then you can add a short description on the next line.`;

    const payload = {
        contents: [{
            parts: [
                { text: finalPrompt },
                { inlineData: { mimeType: "image/png", data: base64WithoutPrefix } }
            ]
        }],
        generationConfig: {
            responseModalities: ["TEXT", "IMAGE"] 
        }
    };

    try {
        const response = await fetch(MODEL_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`HTTP ${response.status}: ${errorData?.error?.message || 'Unknown error'}`);
        }
        
        const result = await response.json();
        console.log("🧪 Full Gemini Response:", result);

        let generatedBase64Data = null;
        let generatedText = "제목 없음";

        if (result?.candidates?.[0]?.content?.parts) {
            for (const part of result.candidates[0].content.parts) {
                if (part.inlineData?.mimeType.startsWith('image/')) {
                    generatedBase64Data = part.inlineData.data;
                } else if (part.text) {
                    const titleMatch = part.text.match(/Title: (.*?)(?:\n|$)/);
                    if (titleMatch && titleMatch[1]) {
                        generatedText = titleMatch[1].trim();
                    } else {
                        generatedText = part.text.split('\n')[0].trim();
                    }
                }
            }
        }

        if (generatedBase64Data) {
            loadImage('data:image/png;base64,' + generatedBase64Data, loadedImg => {
                console.log("✅ 원본 이미지 로드 완료. 배경 제거 시작...");
                const processedImg = removeBlackBackground(loadedImg);
                sculptureModule.generatedSculptureImg = processedImg;
                console.log("✅ 배경 제거 완료. 최종 이미지가 준비되었습니다.");
            });
            
            sculptureModule.generatedSculptureText = generatedText;
        } else {
            throw new Error("API 응답에서 이미지 데이터를 찾을 수 없습니다.");
        }

    } catch (error) {
        console.error("❌ Gemini API 호출 실패:", error);
        sculptureModule.generatedSculptureText = "이미지 생성에 실패했습니다. 콘솔을 확인해주세요.";
    } finally {
        sculptureModule.isGenerating = false;
    }
}

// 감지된 포즈의 골격을 그리는 헬퍼 함수
function drawPoseSkeleton() {
    push(); // 새로운 그리기 스타일을 적용하기 위해 push()로 시작

    // --- 네온 글로우(빛 번짐) 효과 설정 ---
    const neonColor = color(0, 255, 255); // 밝은 청록색 (Cyan)
    drawingContext.shadowBlur = 15;      // 빛 번짐의 정도
    drawingContext.shadowColor = neonColor; // 빛 번짐의 색상

    // --- 뼈대(선) 그리기 ---
    stroke(neonColor);
    strokeWeight(6); // 선 굵기를 굵게

    for (let i = 0; i < sculptureModule.poses.length; i++) {
        let skeleton = sculptureModule.poses[i].skeleton;
        for (let j = 0; j < skeleton.length; j++) {
            let partA = skeleton[j][0].position;
            let partB = skeleton[j][1].position;
            
            // 거울 모드에 맞게 x좌표를 반전
            let flippedX1 = width - partA.x;
            let flippedX2 = width - partB.x;

            line(flippedX1, partA.y, flippedX2, partB.y);
        }
    }

    // --- 관절(점) 그리기 ---
    noStroke(); // 점에는 테두리가 없도록
    for (let i = 0; i < sculptureModule.poses.length; i++) {
        let keypoints = sculptureModule.poses[i].pose.keypoints;
        for (let j = 0; j < keypoints.length; j++) {
            let keypoint = keypoints[j];
            if (keypoint.score > 0.3) { // 인식 점수가 0.3 이상인 점만 표시
                let flippedX = width - keypoint.position.x;
                
                // 1. 바깥쪽의 퍼지는 빛 효과 (반투명)
                fill(0, 255, 255, 100);
                ellipse(flippedX, keypoint.position.y, 24, 24);

                // 2. 안쪽의 선명한 점 (불투명)
                fill(neonColor);
                ellipse(flippedX, keypoint.position.y, 10, 10);
            }
        }
    }

    pop(); // 다른 곳에 영향을 주지 않도록 스타일 초기화
}

/**
 * p5.Image 객체를 입력받아, 검은색에 가까운 픽셀을 투명하게 만드는 함수
 * @param {p5.Image} sourceImg - 배경을 제거할 원본 이미지
 * @returns {p5.Graphics} - 배경이 제거된 새로운 그래픽 객체
 */
function removeBlackBackground(sourceImg) {
    // 1. 원본 이미지와 같은 크기의 '투명한 유리판'(새 캔버스)을 만듭니다.
    const transparentCanvas = createGraphics(sourceImg.width, sourceImg.height);
    
    // 2. 원본 이미지의 모든 픽셀 정보를 불러옵니다.
    sourceImg.loadPixels();

    // 3. 새로 만든 투명 캔버스의 픽셀 정보도 준비합니다.
    transparentCanvas.loadPixels();

    // 4. for 반복문으로 모든 픽셀을 하나씩 확인합니다.
    for (let i = 0; i < sourceImg.pixels.length; i += 4) {
        const r = sourceImg.pixels[i];
        const g = sourceImg.pixels[i + 1];
        const b = sourceImg.pixels[i + 2];
        // alpha 값은 sourceImg.pixels[i + 3] 입니다.

        // 5. 만약 픽셀이 '어두운 색'이면 (완전한 검은색이 아닐 수도 있으므로)
        // R, G, B 값이 모두 50보다 작으면 어두운 색으로 간주합니다. (이 값은 조절 가능)
        if (r < 50 && g < 50 && b < 50) {
            // 새 캔버스의 해당 픽셀을 완전히 투명하게 만듭니다.
            transparentCanvas.pixels[i + 3] = 0; // Alpha(투명도) 값을 0으로 설정
        } else {
            // 6. 어두운 색이 아니면(조각상 부분), 원본 픽셀을 그대로 복사합니다.
            transparentCanvas.pixels[i] = r;
            transparentCanvas.pixels[i + 1] = g;
            transparentCanvas.pixels[i + 2] = b;
            transparentCanvas.pixels[i + 3] = 255; // 불투명하게
        }
    }

    // 7. 픽셀 변경 작업을 완료하고, 배경이 제거된 새 캔버스를 반환합니다.
    transparentCanvas.updatePixels();
    return transparentCanvas;
}


function drawQuizScreen() {
    sculptureModule.currentScreen = "quiz";
    background(0, 0, 0, 150); // 반투명 배경
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(28);
    text("퀴즈 타임!", width / 2, 100);

    const currentQuiz = quizQuestions[sculptureModule.quizIndex];
    textSize(20);
    text(currentQuiz.question, width / 2, 180);
    rectMode(CENTER)

    for (let i = 0; i < currentQuiz.options.length; i++) {
        const y = 280 + i * 50;
        fill(50);
        rect(width / 2, y, 300, 40, 10);

        fill(255);
        text(currentQuiz.options[i], width / 2, y);
    }

    if (sculptureModule.quizAnswered) {
        fill(255);
        textSize(40);
        text("정답을 맞혔어요! 조각상 생성이 완료되면 결과가 표시됩니다.", width / 2, height - 100);
    }
}

function mousePressed() {
    if (sculptureModule.currentScreen === "quiz" && !sculptureModule.quizAnswered) {
        const currentQuiz = quizQuestions[sculptureModule.quizIndex];
        for (let i = 0; i < currentQuiz.options.length; i++) {
            const y = 280 + i * 50;
            if (mouseY > y - 20 && mouseY < y + 20 &&
                mouseX > width / 2 - 150 && mouseX < width / 2 + 150) {
                if (i === currentQuiz.correct) {
                    sculptureModule.quizAnswered = true;
                } else {
                    // 오답일 경우 다음 퀴즈로
                    sculptureModule.quizIndex = (sculptureModule.quizIndex + 1) % quizQuestions.length;
                }
            }
        }
    }
}
