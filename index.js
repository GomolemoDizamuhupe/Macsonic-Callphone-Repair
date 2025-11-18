/* ==================== AUTO-PLAYING CAROUSEL ==================== */
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.product-card:not(.clone)');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dotsContainer = document.querySelector('.carousel-dots');

    if (!track) return;

    
    const slideDuration = 3000;
    const transitionTime = 500;
    let autoPlayTimer = null;
    let currentIndex = 0;

    // ---- BUILD DOTS ----
    const totalSlides = cards.length;
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.className = 'carousel-dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    const dots = document.querySelectorAll('.carousel-dot');

    // ---- CALCULATE CARD WIDTH (including gap) ----
    const cardStyle = getComputedStyle(cards[0]);
    const cardWidth = cards[0].offsetWidth
        + parseFloat(cardStyle.marginLeft)
        + parseFloat(cardStyle.marginRight);

    // ---- MOVE FUNCTION ----
    function moveTo(index) {
        const offset = -index * cardWidth;
        track.style.transition = `transform ${transitionTime}ms ease-in-out`;
        track.style.transform = `translateX(${offset}px)`;
        updateDots(index);
    }

    // ---- GO TO SPECIFIC SLIDE (with infinite loop) ----
    function goToSlide(idx, direction = null) {
        if (autoPlayTimer) clearInterval(autoPlayTimer);
        currentIndex = idx;

        // instant jump when we reach the cloned area
        if (idx >= totalSlides) {
            currentIndex = 0;
            track.style.transition = 'none';
            moveTo(currentIndex);
            // force reflow
            void track.offsetHeight;
            track.style.transition = `transform ${transitionTime}ms ease-in-out`;
        } else if (idx < 0) {
            currentIndex = totalSlides - 1;
            track.style.transition = 'none';
            moveTo(currentIndex + 1); // move to last clone
            void track.offsetHeight;
            track.style.transition = `transform ${transitionTime}ms ease-in-out`;
        }

        requestAnimationFrame(() => moveTo(currentIndex));
        startAutoPlay();
    }

    // ---- NEXT / PREV ----
    function nextSlide() { goToSlide(currentIndex + 1); }
    function prevSlide() { goToSlide(currentIndex - 1); }

    nextBtn?.addEventListener('click', nextSlide);
    prevBtn?.addEventListener('click', prevSlide);

    // ---- DOTS UPDATE ----
    function updateDots(idx) {
        dots.forEach((d, i) => d.classList.toggle('active', i === (idx % totalSlides)));
    }

    // ---- AUTO PLAY ----
    function startAutoPlay() {
        if (autoPlayTimer) clearInterval(autoPlayTimer);
        autoPlayTimer = setInterval(nextSlide, slideDuration);
    }

    // Pause on hover
    const wrapper = document.querySelector('.carousel-wrapper');
    wrapper.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
    wrapper.addEventListener('mouseleave', startAutoPlay);

    // ---- INITIALISE ----
    moveTo(0);
    startAutoPlay();

    // ---- RESPONSIVE RECALC (when window resizes) ----
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // recompute card width and reposition
            const newCardWidth = cards[0].offsetWidth
                + parseFloat(getComputedStyle(cards[0]).marginLeft)
                + parseFloat(getComputedStyle(cards[0]).marginRight);
            cardWidth = newCardWidth;
            moveTo(currentIndex);
        }, 200);
    });
});