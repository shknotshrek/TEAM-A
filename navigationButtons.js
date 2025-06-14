// navigationButtons.js — drop‑in navigation replacement for keyboard‑driven flow
// Assumes global variables already exist: currentKey, screenHistory, storyMap,
//                                  isFading, isFadedIn, fadeAmount, capturePoseAndGenerateSculpture()
// Add this file to your sketch after the original variable declarations.
// ------------------------------------------------------------

let nextImg, backImg;
const BTN_SIZE = 64;          // px – adjust if your assets differ
const NAV_PADDING = 24;       // distance from screen edges

function preload() {
  // path may differ ‑ place your PNGs in the sketch “assets/” folder
  nextImg = loadImage('assets/next.png');
  backImg = loadImage('assets/back.png');
}

function drawNavigationButtons() {
  if (!shouldShowNav()) return;

  const backPos = {x: NAV_PADDING, y: height - BTN_SIZE - NAV_PADDING};
  const nextPos = {x: width - BTN_SIZE - NAV_PADDING, y: backPos.y};

  imageMode(CORNER);

  // Back button only if history exists
  if (screenHistory.length > 0) {
    image(backImg, backPos.x, backPos.y, BTN_SIZE, BTN_SIZE);
  }

  // Next button only if a next screen is defined
  if (hasNextScreen()) {
    image(nextImg, nextPos.x, nextPos.y, BTN_SIZE, BTN_SIZE);
  }
}

function shouldShowNav() {
  // Hide nav on introductory or kiosk‑style hold screens
  return !['screen1', 'screen13'].includes(currentKey);
}

function hasNextScreen() {
  return storyMap[currentKey] !== undefined;
}

function mousePressed() {
  /* ───────── 1) Special case for screen11‑2 (fade interaction) ───────── */
  if (currentKey === 'screen11-2') {
    if (!isFading && !isFadedIn) {
      fadeAmount = 0;
      isFading = true;
    } else if (isFadedIn) {
      screenHistory.push(currentKey);
      currentKey = 'screen14';
      redraw();
    }
    return;
  }

  if (!shouldShowNav()) return;

  const backPos = {x: NAV_PADDING, y: height - BTN_SIZE - NAV_PADDING};
  const nextPos = {x: width - BTN_SIZE - NAV_PADDING, y: backPos.y};

  // ---------- Back button
  const overBack = screenHistory.length > 0 &&
                   mouseX >= backPos.x && mouseX <= backPos.x + BTN_SIZE &&
                   mouseY >= backPos.y && mouseY <= backPos.y + BTN_SIZE;
  if (overBack) {
    currentKey = screenHistory.pop();
    redraw();
    return;
  }

  // ---------- Next button
  const overNext = hasNextScreen() &&
                   mouseX >= nextPos.x && mouseX <= nextPos.x + BTN_SIZE &&
                   mouseY >= nextPos.y && mouseY <= nextPos.y + BTN_SIZE;
  if (overNext) {
    // screen15‑pose invokes API before moving on
    if (currentKey === 'screen15-pose') {
      screenHistory.push(currentKey);
      currentKey = storyMap[currentKey];
      capturePoseAndGenerateSculpture();
      redraw();
      return;
    }

    let next = storyMap[currentKey];
    if (typeof next === 'string') {
      screenHistory.push(currentKey);
      currentKey = next;
      redraw();
    }
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
    redraw();
  }
}
