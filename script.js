/* ============================================
   SKYTOKEN AIRDROP LANDING PAGE
   JavaScript - Interactions
   ============================================ */

// ============================================
// COUNTDOWN TIMER
// ============================================

function initCountdown() {
    const cycleDurationMs = 5 * 24 * 60 * 60 * 1000;
    let targetTimestamp = Date.now() + cycleDurationMs;

    // function updateCountdown() {
    //     const now = new Date().getTime();
    //     const distance = targetDate - now;
    //
    //     const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    //     const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //     const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    //     const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    //
    //     const daysEl = document.getElementById('days');
    //     const hoursEl = document.getElementById('hours');
    //     const minutesEl = document.getElementById('minutes');
    //     const secondsEl = document.getElementById('seconds');
    //
    //     if (daysEl) daysEl.textContent = String(Math.max(days, 0)).padStart(2, '0');
    //     if (hoursEl) hoursEl.textContent = String(Math.max(hours, 0)).padStart(2, '0');
    //     if (minutesEl) minutesEl.textContent = String(Math.max(minutes, 0)).padStart(2, '0');
    //     if (secondsEl) secondsEl.textContent = String(Math.max(seconds, 0)).padStart(2, '0');
    //
    //     const finalDaysEl = document.getElementById('final-days');
    //     const finalHoursEl = document.getElementById('final-hours');
    //     const finalMinutesEl = document.getElementById('final-minutes');
    //     const finalSecondsEl = document.getElementById('final-seconds');
    //
    //     if (finalDaysEl) finalDaysEl.textContent = String(Math.max(days, 0)).padStart(2, '0');
    //     if (finalHoursEl) finalHoursEl.textContent = String(Math.max(hours, 0)).padStart(2, '0');
    //     if (finalMinutesEl) finalMinutesEl.textContent = String(Math.max(minutes, 0)).padStart(2, '0');
    //     if (finalSecondsEl) finalSecondsEl.textContent = String(Math.max(seconds, 0)).padStart(2, '0');
    // }

    function renderCountdown() {
        const now = Date.now();
        if (now >= targetTimestamp) {
            targetTimestamp = now + cycleDurationMs;
        }
        const distance = Math.max(targetTimestamp - now, 0);

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const setValue = (id, value) => {
            const el = document.getElementById(id);
            if (el) {
                el.textContent = String(value).padStart(2, '0');
            }
        };

        setValue('days', days);
        setValue('hours', hours);
        setValue('minutes', minutes);
        setValue('seconds', seconds);
        setValue('final-days', days);
        setValue('final-hours', hours);
        setValue('final-minutes', minutes);
        setValue('final-seconds', seconds);
    }

    renderCountdown();
    setInterval(renderCountdown, 1000);
}

// ============================================
// FAQ ACCORDION
// ============================================

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach((question) => {
        question.addEventListener('click', function () {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const isActive = faqItem.classList.contains('active');

            faqItems.forEach((item) => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    const otherAnswer = item.querySelector('.faq-answer');
                    if (otherAnswer) {
                        otherAnswer.classList.remove('active');
                    }
                }
            });

            if (!isActive) {
                faqItem.classList.add('active');
                if (answer) {
                    answer.classList.add('active');
                }
            } else {
                faqItem.classList.remove('active');
                if (answer) {
                    answer.classList.remove('active');
                }
            }
        });
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach((link) => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href === '#') {
                e.preventDefault();
                return;
            }

            const targetElement = document.querySelector(href);

            if (targetElement) {
                e.preventDefault();
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth',
                });

                closeMobileMenu();
            }
        });
    });
}

// ============================================
// MOBILE MENU
// ============================================

function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener('click', function () {
        navLinks.classList.toggle('active');
    });
}

function closeMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.remove('active');
    }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll(
        '.about-card, .timeline-item, .roadmap-card, .faq-item, .metric'
    );

    animateElements.forEach((element) => {
        observer.observe(element);
    });
}

// ============================================
// ACTIVE NAV HIGHLIGHT
// ============================================

function initActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    function updateActive() {
        let current = '';

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const header = document.querySelector('.header');
            const headerHeight = header ? header.offsetHeight : 0;

            if (window.pageYOffset >= sectionTop - headerHeight - 120) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }

    updateActive();
    window.addEventListener('scroll', updateActive);
}

// ============================================
// REDUCED MOTION
// ============================================

function checkReducedMotion() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
        document.documentElement.style.scrollBehavior = 'auto';
    }
}

// ============================================
// INIT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initFAQ();
    initSmoothScroll();
    initMobileMenu();
    initScrollAnimations();
    initActiveNavigation();
    checkReducedMotion();
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});
