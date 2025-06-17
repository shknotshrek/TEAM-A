// navigationButtons.js — drop‑in navigation replacement for keyboard‑driven flow
// Assumes global variables already exist: currentKey, screenHistory, storyMap,
//                                  isFading, isFadedIn, fadeAmount, capturePoseAndGenerateSculpture()
// Add this file to your sketch after the original variable declarations.
// ------------------------------------------------------------

let nextImg, backImg;
const BTN_SIZE = 100;          // px – adjust if your assets differ
const NAV_PADDING = 24;       // distance from screen edges


// navigationButtons.js
function drawNavigationButtons() {
  if (!shouldShowNav()) return;

  // — 여기에만 matrix/imageMode 변환을 가두자 —
  push();               
    resetMatrix();         // 네비만 identity matrix
    imageMode(CORNER);     // 네비만 corner 모드

    const backPos = { x: NAV_PADDING, y: height - BTN_SIZE - NAV_PADDING };
    const nextPos = { x: width  - BTN_SIZE - NAV_PADDING, y: backPos.y };

    if (screenHistory.length > 0) {
      image(backImg, backPos.x, backPos.y, BTN_SIZE, BTN_SIZE);
    }
    if (hasNextScreen()) {
      image(nextImg, nextPos.x, nextPos.y, BTN_SIZE, BTN_SIZE);
    }
  pop();                
}

function shouldShowNav() {
  // Hide nav on introductory or kiosk‑style hold screens
  return !['screen1', 'screen7', 'screen7-1', 'screen7-1-1', 'screen7-1-2', 
  'screen7-2', 'screen7-2-1', 'screen7-2-2', 
  'screen7-3', 'screen7-3-1', 'screen7-3-2', 
  'screen15-pose', 'screen21'].includes(currentKey);
}

function hasNextScreen() {
  return storyMap[currentKey] !== undefined;
}

function mousePressed() {

  // ─── 1) screen13 드로잉 처리 ───
  if (currentKey === "screen13") {
    let d = dist(mouseX, mouseY, handleX, sliderY + sliderH / 2);
    if (d < 18) draggingHandle = true;
    if (!draggingHandle &&
        mouseX > 0 && mouseX < muralCanvas.width &&
        mouseY > 0 && mouseY < muralCanvas.height) {
      selectedBrush.draw(mouseX, mouseY, mouseX, mouseY, 0);
      // 음악 재생
      if (!musicStarted &&
          selectedBrush.music &&
          musicAssets[selectedBrush.music]) {
        currentMusic = musicAssets[selectedBrush.music];
        let v = map(brushSize, 0.5, 6.0, 0.1, 1.0);
        currentMusic.setVolume(v);
        currentMusic.loop();
        musicStarted = true;
      }
    }
    // 그렸으면 여기서 리턴하면 네비 로직 안 탑니다
    return;
  }
  
  // if (choices[currentKey]) {
  //   for (let c of choices[currentKey]) {
  //     if (mouseX >= c.x - c.w / 2 && mouseX <= c.x + c.w / 2 &&
  //         mouseY >= c.y - c.h / 2 && mouseY <= c.y + c.h / 2) {
  //       // screenHistory.push(currentKey);
  //       // currentKey = c.next;
  //       // redraw();
  //       // return;
  //       screenHistory.push(currentKey);
  //       currentKey = c.next;
  //       enterNewScreen(c.next);
  //       if (c.next === 'screen15-pose') {
  //         loop();
  //       }
  //       redraw();
  //       return;
  //     }
  //   }
  // }

  if (choices[currentKey]) {
    // 아이콘 중 하나라도 클릭됐는지 검사
    for (let c of choices[currentKey]) {
      if (
        mouseX >= c.x - c.w/2 && mouseX <= c.x + c.w/2 &&
        mouseY >= c.y - c.h/2 && mouseY <= c.y + c.h/2
      ) {
        // 클릭된 아이콘 처리
        screenHistory.push(currentKey);
        currentKey = c.next;
        enterNewScreen(c.next);
        if (c.next === 'screen15-pose') loop();
        redraw();
        return; // 아이콘 클릭 시에만 여기서 종료
      }
    }
    // ※ 아이콘 클릭이 아닌 다른 영역 클릭 시에는 아무 동작도 하지 않도록 바로 종료
    return;
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

  console.log('▶ nav mousePressed fired', mouseX, mouseY, 'currentKey=', currentKey);

  // — 1) 네비용 좌표 계산 —
  const backPos = { x: NAV_PADDING,                     y: height - BTN_SIZE - NAV_PADDING };
  const nextPos = { x: width  - BTN_SIZE - NAV_PADDING, y: backPos.y };
  const overNext = hasNextScreen()
                && mouseX >= nextPos.x && mouseX <= nextPos.x + BTN_SIZE
                && mouseY >= nextPos.y && mouseY <= nextPos.y + BTN_SIZE;

  // — 2) screen11-2 Special case: Next 버튼 클릭 시에만 —
  // mousePressed() 내부에 이미 있음
if (currentKey === 'screen11-2' && overNext) {
  console.log("✔ screen11-2 NEXT 클릭됨", isFadedIn, isFading);
  
  // 1) 첫 클릭이면 페이드 시작
  if (!isFading && !isFadedIn) {
    fadeAmount = 0;
    isFading = true;
    loop();
    return;  // 🔒 반드시 여기서 종료!
  }

  // 2) 페이드 완료 후 클릭 → 다음 화면
  if (isFadedIn) {
    screenHistory.push(currentKey);
    currentKey = 'screen14';   // ✅ 여기서 확정
    isFadedIn = false;         // 다음 흐름 위해 리셋
    redraw();
    return;  // 🔒 다시 한 번 확실하게 종료!
  }

  return; // ✅ 그 외 상황도 여기서 반드시 차단
}

  // — 3) Back 버튼 처리(기존 로직) —
  const overBack = screenHistory.length > 0
                && mouseX >= backPos.x && mouseX <= backPos.x + BTN_SIZE
                && mouseY >= backPos.y && mouseY <= backPos.y + BTN_SIZE;
  if (overBack) {
    currentKey = screenHistory.pop();
    redraw();
    return;
  }

  // — 4) Next 버튼 일반 처리(11-2가 아닐 때) —
  // if (overNext) {
  //   // screen15-pose 특수 처리 등…
  //   screenHistory.push(currentKey);
  //   currentKey = storyMap[currentKey];
  //   redraw();
  // }

  if (overNext) {
    screenHistory.push(currentKey);
    currentKey = storyMap[currentKey];
    if (currentKey === 'screen15-pose') {
      loop();
    }
    redraw();
  }
  
}


// Call this near the end of your draw() routine AFTER you render the current screen
// so buttons sit on top.
// drawNavigationButtons();

// Optionally keep R‑for‑reset if you still want a dev shortcut
function keyPressed() {
  if (key === 'r' || key === 'R') {
    currentKey = 'screen1';
    screenHistory = [];

    //initializeMuralCanvas();
    redraw();
  }

  // [변경] screen15-pose에서만 특별한 동작을 하도록 수정
  if (currentKey==='screen15-pose' && keyCode===32) {
    screenHistory.push(currentKey);
    currentKey = storyMap[currentKey];      // storyMap에 따라 'screen16'으로 전환
    capturePoseAndGenerateSculpture();      // API 호출 시작
    redraw();
    return; // 여기서 종료해야 다른 로직을 타지 않습니다.
  }
}
