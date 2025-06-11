// sculptureFeature.js

// 조각상 기능 관련 모든 변수를 담는 객체
const sculptureModule = {
    video: null,
    poseNet: null,
    poses: [],
    isModelReady: false,
    isGenerating: false,
    generatedSculptureImg: null,
    generatedSculptureText: ""
};

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
        fill(255, 255, 255, 200);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(24);
        text("포즈를 잡고, 스페이스 바를 눌러서 조각을 만들어 보자!", width / 2, height -200);
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
        fill(0, 0, 0, 150);
        noStroke();
        rectMode(CENTER);
        rect(width/2, height - 100, 600, 50, 10);
        
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(24);
        text("당신의 포즈로 조각상을 만들고 있습니다...", width / 2, height - 100);
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