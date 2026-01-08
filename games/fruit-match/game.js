"use strict";
// Game Data
const FRUITS = ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🥑', '🍆', '🥔', '🥕'];
// State
let state = {
    topFruit: '',
    bottomFruit: '',
    centerFruit: '',
    targetDirection: 'up',
    isDragging: false,
    startY: 0,
    currentY: 0,
    startX: 0,
    currentX: 0,
    locked: false,
    streak: 0
};
// DOM Elements
const els = {
    topZone: document.getElementById('top-zone'),
    bottomZone: document.getElementById('bottom-zone'),
    playZone: document.getElementById('play-zone'),
    draggableWrapper: document.getElementById('draggable-wrapper'),
    draggableFruit: document.getElementById('draggable-fruit'),
    streakCounter: document.getElementById('streak-counter'),
    voiceBtn: document.getElementById('voice-btn'),
    container: document.getElementById('game-container'),
    feedbackOverlay: document.getElementById('feedback-overlay'),
    feedbackIcon: document.getElementById('feedback-icon'),
    tutorialHand: document.getElementById('tutorial-hand'),
};
// Audio (Optional simple synth or placeholders)
const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioCtxClass();
function playTone(freq, type = 'sine', duration = 0.1) {
    if (audioCtx.state === 'suspended')
        audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}
// Initialization
function initGame() {
    nextLevel();
    attachListeners();
    setupVoice();
}
function getRandomFruit(exclude = []) {
    const available = FRUITS.filter(f => !exclude.includes(f));
    return available[Math.floor(Math.random() * available.length)];
}
function nextLevel() {
    state.locked = false;
    // Reset positions
    resetPosition(false);
    // clear zones styles
    clearFeedback();
    // Pick fruits
    const f1 = getRandomFruit();
    const f2 = getRandomFruit([f1]);
    // Assign to top/bottom randomly
    // Actually, let's just assign f1 top, f2 bottom.
    state.topFruit = f1;
    state.bottomFruit = f2;
    // Pick winner
    const isTop = Math.random() < 0.5;
    state.centerFruit = isTop ? f1 : f2;
    state.targetDirection = isTop ? 'up' : 'down';
    render();
    // Show tutorial if beginner
    if (state.streak < 7) {
        showTutorial();
    }
}
function render() {
    // Render Top Zone
    els.topZone.innerHTML = `
        <div class="text-7xl drop-shadow-md select-none">${state.topFruit}</div>
        <div class="text-7xl fruit-shadow select-none">${state.topFruit}</div>
        <div class="text-7xl drop-shadow-md select-none">${state.topFruit}</div>
    `;
    // Render Bottom Zone
    els.bottomZone.innerHTML = `
        <div class="text-7xl drop-shadow-md select-none">${state.bottomFruit}</div>
        <div class="text-7xl fruit-shadow select-none">${state.bottomFruit}</div>
        <div class="text-7xl drop-shadow-md select-none">${state.bottomFruit}</div>
    `;
    // Render Center
    els.draggableFruit.textContent = state.centerFruit;
    // Remove previous animations
    els.draggableFruit.classList.remove('pop-anim', 'shake-anim');
}
// Interaction Logic
function attachListeners() {
    // Pointer Events for Mouse/Touch
    els.draggableWrapper.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    // Key Events for Desktop testing
    window.addEventListener('keydown', (e) => {
        if (state.locked)
            return;
        if (e.key === 'ArrowUp')
            handleCommit('up');
        if (e.key === 'ArrowDown')
            handleCommit('down');
    });
}
function onPointerDown(e) {
    if (state.locked)
        return;
    // Hide Tutorial
    els.tutorialHand.classList.add('hidden');
    els.tutorialHand.style.animation = '';
    state.isDragging = true;
    state.startY = e.clientY;
    state.currentY = e.clientY;
    state.startX = e.clientX;
    state.currentX = e.clientX;
    // Capture pointer to ensure we get up events even if cursor leaves window (mostly for mouse)
    els.draggableWrapper.setPointerCapture(e.pointerId);
    // Visual feedback that we grabbed it
    els.draggableFruit.style.transform = `scale(1.2)`;
}
function onPointerMove(e) {
    if (!state.isDragging || state.locked)
        return;
    e.preventDefault(); // Prevent scrolling
    state.currentY = e.clientY;
    state.currentX = e.clientX;
    const deltaY = state.currentY - state.startY;
    const deltaX = state.currentX - state.startX;
    // determine dominant axis
    // If vertical movement is stronger or equal, we use Y
    // If horizontal is stronger, we use X
    // But we need to support both simultaneously? No, usually one intent.
    // Simple visual update: translate both X and Y
    els.draggableFruit.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.2)`;
    // Check thresholds for feedback
    updateFeedback(deltaX, deltaY);
}
function onPointerUp(e) {
    if (!state.isDragging)
        return;
    state.isDragging = false;
    els.draggableWrapper.releasePointerCapture(e.pointerId);
    const deltaY = state.currentY - state.startY;
    const deltaX = state.currentX - state.startX;
    const threshold = 50;
    // Logic: 
    // Up (Y < -threshold) OR Left (X < -threshold) -> target 'up' (Top Slot / Left Slot)
    // Down (Y > threshold) OR Right (X > threshold) -> target 'down' (Bottom Slot / Right Slot)
    // We prioritize the larger delta to avoid ambiguity?
    // Or just check if any threshold is crossed.
    const isUp = deltaY < -threshold || deltaX < -threshold;
    const isDown = deltaY > threshold || deltaX > threshold;
    // If both are true (diagonal stretch?), prioritize dominant axis
    if (isUp && isDown) {
        // Conflicting signals
        resetPosition(true);
        clearFeedback();
        return;
    }
    if (isUp) {
        handleCommit('up');
    }
    else if (isDown) {
        handleCommit('down');
    }
    else {
        // Snap back
        resetPosition(true);
        clearFeedback();
    }
}
function updateFeedback(deltaX, deltaY) {
    const threshold = 30;
    clearFeedback();
    // Map Horizontal to Vertical Logic
    // Left -> Top (Yellow/Red/Green)
    // Right -> Bottom 
    const isLeftOrUp = deltaY < -threshold || deltaX < -threshold;
    const isRightOrDown = deltaY > threshold || deltaX > threshold;
    if (isLeftOrUp) {
        // Target is Top/Left Zone
        if (state.targetDirection === 'up') {
            els.topZone.classList.add('correct-zone');
        }
        else {
            els.topZone.classList.add('incorrect-zone');
        }
    }
    else if (isRightOrDown) {
        // Target is Bottom/Right Zone
        if (state.targetDirection === 'down') {
            els.bottomZone.classList.add('correct-zone');
        }
        else {
            els.bottomZone.classList.add('incorrect-zone');
        }
    }
}
function clearFeedback() {
    els.topZone.classList.remove('correct-zone', 'incorrect-zone');
    els.bottomZone.classList.remove('correct-zone', 'incorrect-zone');
}
function resetPosition(animate) {
    if (animate) {
        els.draggableFruit.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        els.draggableFruit.style.transform = `translate(0, 0) scale(1)`;
        // Remove transition after it's done so dragging feels instant
        setTimeout(() => {
            els.draggableFruit.style.transition = '';
        }, 300);
    }
    else {
        els.draggableFruit.style.transition = '';
        els.draggableFruit.style.transform = `translate(0, 0) scale(1)`;
    }
}
function handleCommit(direction) {
    state.locked = true;
    clearFeedback();
    const isCorrect = direction === state.targetDirection;
    if (isCorrect) {
        // Success
        playTone(600, 'sine', 0.1);
        setTimeout(() => playTone(800, 'sine', 0.2), 100);
        state.streak++;
        els.streakCounter.textContent = state.streak.toString();
        // Reveal the shadow fruit in the target zone
        const zone = direction === 'up' ? els.topZone : els.bottomZone;
        const shadowFruit = zone.children[1]; // Middle fruit
        if (shadowFruit) {
            shadowFruit.classList.remove('fruit-shadow');
            shadowFruit.classList.add('drop-shadow-md', 'pop-anim');
        }
        // Hide the dragged fruit immediately (it "became" the real fruit)
        els.draggableFruit.style.display = 'none';
        // Show Correct Feedback Zone color
        const zoneClass = 'correct-zone';
        zone.classList.add(zoneClass);
        // Show Center Icon
        showCentralFeedback('correct');
        setTimeout(() => {
            nextLevel();
            // Bring back draggable fruit for next round
            els.draggableFruit.style.display = 'block';
        }, 1200);
    }
    else {
        // Failure
        playTone(200, 'sawtooth', 0.3);
        state.streak = 0;
        els.streakCounter.textContent = state.streak.toString();
        els.draggableFruit.classList.add('shake-anim');
        // Show Incorrect Feedback
        const zoneClass = 'incorrect-zone';
        (direction === 'up' ? els.topZone : els.bottomZone).classList.add(zoneClass);
        // Show Center Icon
        showCentralFeedback('incorrect');
        setTimeout(() => {
            // Reset
            els.draggableFruit.classList.remove('shake-anim');
            resetPosition(true);
            clearFeedback();
            state.locked = false;
        }, 600);
    }
}
// Voice Support
function setupVoice() {
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        els.voiceBtn.style.display = 'none';
        return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    els.voiceBtn.addEventListener('click', () => {
        try {
            recognition.start();
            els.voiceBtn.classList.add('text-indigo-600', 'bg-indigo-100');
        }
        catch (e) {
            console.error(e);
        }
    });
    recognition.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase().trim();
        console.log('Voice command:', command);
        if (state.locked)
            return;
        if (command.includes('top') || command.includes('up')) {
            handleCommit('up');
        }
        else if (command.includes('bottom') || command.includes('down')) {
            handleCommit('down');
        }
    };
    recognition.onend = () => {
        els.voiceBtn.classList.remove('text-indigo-600', 'bg-indigo-100');
    };
}
function showCentralFeedback(type) {
    const icon = type === 'correct' ? '✅' : '❌';
    els.feedbackIcon.textContent = icon;
    // Show overlay
    els.feedbackOverlay.classList.remove('opacity-0');
    // Pop animation
    requestAnimationFrame(() => {
        els.feedbackIcon.classList.remove('scale-0');
        els.feedbackIcon.classList.add('scale-150'); // pop bigger
        setTimeout(() => {
            els.feedbackIcon.classList.remove('scale-150');
            els.feedbackIcon.classList.add('scale-100'); // settle
        }, 200);
    });
    // Hide after delay
    setTimeout(() => {
        els.feedbackIcon.classList.add('scale-0');
        els.feedbackIcon.classList.remove('scale-100');
        els.feedbackOverlay.classList.add('opacity-0');
    }, 1000);
}
function showTutorial() {
    els.tutorialHand.classList.remove('hidden');
    els.tutorialHand.classList.remove('opacity-0');
    // Determine direction and orientation
    // We can't easily detect orientation in JS reliably without listeners, but we can infer or just toggle classes based on window.innerWidth/Height
    const isLandscape = window.innerWidth > window.innerHeight;
    const target = state.targetDirection;
    // Reset animation
    els.tutorialHand.style.animation = 'none';
    els.tutorialHand.offsetHeight; /* trigger reflow */
    els.tutorialHand.offsetHeight; /* trigger reflow */
    if (target === 'up') {
        if (isLandscape) {
            // Left
            els.tutorialHand.textContent = '⬅️';
            els.tutorialHand.style.animation = 'swipe-left 1.5s 3';
        }
        else {
            // Up
            els.tutorialHand.textContent = '⬆️';
            els.tutorialHand.style.animation = 'swipe-up 1.5s 3';
        }
    }
    else {
        if (isLandscape) {
            // Right
            els.tutorialHand.textContent = '➡️';
            els.tutorialHand.style.animation = 'swipe-right 1.5s 3';
        }
        else {
            // Down
            els.tutorialHand.textContent = '⬇️';
            els.tutorialHand.style.animation = 'swipe-down 1.5s 3';
        }
    }
    // Hide after animation
    const onEnd = () => {
        els.tutorialHand.classList.add('hidden');
        els.tutorialHand.removeEventListener('animationend', onEnd);
    };
    els.tutorialHand.addEventListener('animationend', onEnd);
}
// Start
initGame();
