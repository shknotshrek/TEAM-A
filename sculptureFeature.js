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
 * screen15-5에서 실시간 포즈 인식을 처리하고 화면에 그리는 함수.
 */
function drawSculpturePoseScreen() {
    if (sculptureModule.video.elt.readyState >= 2) {
        push();
        translate(width, 0);
        scale(-1, 1);
        image(sculptureModule.video, 0, 0, width, height);
        pop();
    }

    if (sculptureModule.isModelReady) {
        drawPoseSkeleton();
    } else {
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(24);
        text("카메라와 모델을 준비 중입니다...", width / 2, height / 2);
    }
}

/**
 * screen16에서 생성된 조각상 결과를 그리는 함수.
 */
function drawSculptureResultScreen() {
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

    if (sculptureModule.generatedSculptureImg) {
        push();
        imageMode(CENTER);
        image(sculptureModule.generatedSculptureImg, width / 2, height / 2 + 50, 500, 600);
        pop();
    }

    if (sculptureModule.generatedSculptureText) {
        fill(0, 0, 0, 180);
        noStroke();
        rectMode(CENTER);
        const boxWidth = textWidth(sculptureModule.generatedSculptureText) + 60;
        rect(width / 2, height - 50, boxWidth, 50, 10);
        
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(22);
        text(sculptureModule.generatedSculptureText, width / 2, height - 50);
    }
}

/**
 * 포즈를 캡처하고, image-to-image 생성을 위해 Gemini API 요청을 시작합니다.
 */
async function capturePoseAndGenerateSculpture() {
    console.log("📸 포즈 캡처 및 Image-to-Image 생성 시작!");
    sculptureModule.isGenerating = true;
    
    const capturedImageDataURL = get().canvas.toDataURL("image/png");
    const base64WithoutPrefix = capturedImageDataURL.replace(/^data:image\/png;base64,/, "");

    // 튜토리얼에서 성공한 모델 이름과 API 키를 그대로 사용
    const MODEL_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent?key=${window.GEMINI_API_KEY}`;
    
    // 우리가 최종적으로 합의한 프롬프트
    const finalPrompt = `Generate a realistic sculpture that accurately captures the user's body pose from the image. The style should be grounded in realism, using materials like stone, bronze, or polished wood. Finally, provide a creative title for this piece.`;

    // 튜토리얼에서 성공한 payload 구조를 그대로 적용 (responseModalities 포함)
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

        // 튜토리얼의 성공적인 응답 파싱 로직을 그대로 적용
        if (result?.candidates?.[0]?.content?.parts) {
            for (const part of result.candidates[0].content.parts) {
                if (part.inlineData?.mimeType.startsWith('image/')) {
                    generatedBase64Data = part.inlineData.data;
                } else if (part.text) {
                    generatedText = part.text.replace(/Title: /i, "").trim();
                }
            }
        }

        if (generatedBase64Data) {
            sculptureModule.generatedSculptureImg = loadImage('data:image/png;base64,' + generatedBase64Data);
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
    for (let i = 0; i < sculptureModule.poses.length; i++) {
        let skeleton = sculptureModule.poses[i].skeleton;
        for (let j = 0; j < skeleton.length; j++) {
            let partA = skeleton[j][0];
            let partB = skeleton[j][1];
            let flippedX1 = width - partA.position.x;
            let flippedX2 = width - partB.position.x;
            stroke(255, 255, 255, 150);
            strokeWeight(4);
            line(flippedX1, partA.position.y, flippedX2, partB.position.y);
        }
    }
}