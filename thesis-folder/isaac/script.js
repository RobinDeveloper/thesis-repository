const imageElement = document.getElementById('displayed-image');
const subtitleElement = document.getElementById('image-subtitle');
let refs = document.querySelectorAll('.img_ref');
let isAutoScrolling = true;
const scrollSpeed = 20; // pixels per second
let scrollAnimationId = null;
let manualScrollTimer = null;
let lastTime = 0;
let scrollAccumulator = 0;
let textColumn = null;
let contentHeight = 0;
let topSpacerHeight = 0;
let bottomSpacerHeight = 0;
let totalScrollableHeight = 0;
let isInfiniteScrollSetup = false;

// Alternating images variables
let alternatingRefs = [];
let currentAlternatingIndex = 0;
let lastImageSwitchTime = 0;
let alternatingRafId = null;
const alternatingDuration = 500; // ms

function setupInfiniteScroll() {
    if (isInfiniteScrollSetup) return;

    textColumn = document.querySelector('.text-column');
    if (!textColumn) {
        console.error('Text column not found');
        return;
    }

    contentHeight = textColumn.scrollHeight;
    topSpacerHeight = window.innerHeight;
    bottomSpacerHeight = window.innerHeight;

    const topSpacer = document.createElement('div');
    topSpacer.style.height = topSpacerHeight + 'px';
    topSpacer.className = 'scroll-spacer';
    textColumn.insertBefore(topSpacer, textColumn.firstChild);

    const bottomSpacer = document.createElement('div');
    bottomSpacer.style.height = bottomSpacerHeight + 'px';
    bottomSpacer.className = 'scroll-spacer';
    textColumn.appendChild(bottomSpacer);

    totalScrollableHeight = topSpacerHeight + contentHeight + bottomSpacerHeight;

    // Start at top including spacer
    window.scrollTo(0, 0);

    refs = document.querySelectorAll('.img_ref');
    isInfiniteScrollSetup = true;
}

function loopScrollPosition() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const viewportHeight = window.innerHeight;

    if (scrollTop + viewportHeight >= totalScrollableHeight - 1) {
        // Loop to very top, including spacer
        window.scrollTo(0, 0);
    }
}

function autoScroll(currentTime) {
    if (!isAutoScrolling) return;

    if (lastTime === 0) lastTime = currentTime;
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    scrollAccumulator += (scrollSpeed * deltaTime) / 1000;

    if (scrollAccumulator >= 1) {
        const pixelsToScroll = Math.floor(scrollAccumulator);
        window.scrollBy(0, pixelsToScroll);
        scrollAccumulator -= pixelsToScroll;

        // Loop scroll position if needed on auto-scroll
        loopScrollPosition();
    }

    scrollAnimationId = requestAnimationFrame(autoScroll);
}

function startAutoScroll() {
    if (!scrollAnimationId) {
        isAutoScrolling = true;
        lastTime = 0;
        scrollAccumulator = 0;
        requestAnimationFrame(autoScroll);
    }
}

function stopAutoScroll() {
    isAutoScrolling = false;
    if (scrollAnimationId) {
        cancelAnimationFrame(scrollAnimationId);
        scrollAnimationId = null;
    }
}

function getRefsOnSameLine() {
    const centerY = window.innerHeight / 2;
    let closestRef = null;
    let closestDistance = Infinity;
    let sameLineRefs = [];

    refs.forEach(ref => {
        const rect = ref.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const refCenter = rect.top + rect.height / 2;
            const distance = Math.abs(centerY - refCenter);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestRef = ref;
            }
        }
    });

    if (!closestRef) return [];

    const closestRect = closestRef.getBoundingClientRect();
    const closestTop = closestRect.top;
    const closestBottom = closestRect.bottom;

    refs.forEach(ref => {
        const rect = ref.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            if (Math.abs(rect.top - closestTop) <= 5 && Math.abs(rect.bottom - closestBottom) <= 5) {
                sameLineRefs.push(ref);
            }
        }
    });

    return sameLineRefs;
}

function showImageFromRef(ref) {
    const figId = ref.id;
    const imageName = `fig${figId}`;
    imageElement.src = `imgs/${imageName}.jpg`;
    imageElement.alt = ``;

    const allLabels = document.querySelectorAll('.image-label');
    allLabels.forEach(label => {
        label.style.display = 'none';
    });

    const currentLabel = document.getElementById(`label-${figId}`);
    if (currentLabel) {
        currentLabel.style.display = 'block';
    }
}

function alternatingImageLoop(timestamp) {
    if (!alternatingRefs.length) return;

    if (timestamp - lastImageSwitchTime >= alternatingDuration) {
        currentAlternatingIndex = (currentAlternatingIndex + 1) % alternatingRefs.length;
        showImageFromRef(alternatingRefs[currentAlternatingIndex]);
        lastImageSwitchTime = timestamp;
    }

    alternatingRafId = requestAnimationFrame(alternatingImageLoop);
}

function startAlternating(refs) {
    stopAlternating(); // reset first
    alternatingRefs = refs;
    currentAlternatingIndex = 0;
    lastImageSwitchTime = performance.now();
    showImageFromRef(alternatingRefs[0]);
    alternatingRafId = requestAnimationFrame(alternatingImageLoop);
}

function stopAlternating() {
    if (alternatingRafId) {
        cancelAnimationFrame(alternatingRafId);
        alternatingRafId = null;
    }
    alternatingRefs = [];
}

function updateImage() {
    const sameLineRefs = getRefsOnSameLine();

    if (sameLineRefs.length === 0) {
        stopAlternating();
        return;
    }

    if (sameLineRefs.length === 1) {
        stopAlternating();
        showImageFromRef(sameLineRefs[0]);
    } else {
        const refsChanged = alternatingRefs.length !== sameLineRefs.length ||
            !alternatingRefs.every((ref, index) => ref === sameLineRefs[index]);

        if (refsChanged) {
            startAlternating(sameLineRefs);
        }
    }
}

let userScrollDetected = false;

function handleUserScroll() {
    if (isAutoScrolling && !userScrollDetected) {
        userScrollDetected = true;
        stopAutoScroll();

        if (manualScrollTimer) {
            clearTimeout(manualScrollTimer);
        }

        manualScrollTimer = setTimeout(() => {
            userScrollDetected = false;
            startAutoScroll();
        }, 10000);
    }
}

// Detect scroll via mouse wheel or touch
window.addEventListener('wheel', handleUserScroll);
window.addEventListener('touchmove', handleUserScroll);

// Detect scroll via keyboard
window.addEventListener('keydown', (e) => {
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', ' '].includes(e.key)) {
        handleUserScroll();
    }
});

// Detect click inside text column
document.addEventListener('click', (e) => {
    if (e.target.closest('.text-column')) {
        handleUserScroll();
    }
});

// Detect scrollbar drag (mousedown followed closely by scroll)
let mouseDownTime = 0;
window.addEventListener('mousedown', () => {
    mouseDownTime = Date.now();
});
window.addEventListener('scroll', () => {
    updateImage();
    const now = Date.now();
    if (now - mouseDownTime < 300) {
        handleUserScroll();
    }
    // Always loop scroll position on any scroll event
    loopScrollPosition();
});

window.addEventListener('resize', () => {
    updateImage();
    if (isInfiniteScrollSetup) {
        // Optionally update spacer sizes here if viewport changed
    }
});

window.addEventListener('load', () => {
    setupInfiniteScroll();
    updateImage();
    startAutoScroll();
});
