// ========================================
// PARTICLES BACKGROUND
// ========================================
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 4 + 1;
        const hue = Math.random() > 0.5 ? 250 : 170;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.background = `hsl(${hue}, 80%, 60%)`;
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        particle.style.animationDelay = (Math.random() * 10) + 's';
        container.appendChild(particle);
    }
}

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ========================================
// FLOATING CTA
// ========================================
function initFloatingCTA() {
    const floatingCta = document.getElementById('floating-cta');
    const bookingSection = document.getElementById('booking');
    if (!floatingCta || !bookingSection) return;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const bookingTop = bookingSection.getBoundingClientRect().top + window.scrollY;

        if (scrollY > 600 && scrollY < bookingTop - 400) {
            floatingCta.classList.add('visible');
        } else {
            floatingCta.classList.remove('visible');
        }
    });
}

// ========================================
// SCROLL ANIMATIONS (Intersection Observer)
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe pain cards
    document.querySelectorAll('.pain-card').forEach(card => observer.observe(card));

    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach(item => observer.observe(item));

    // Observe benefit cards
    document.querySelectorAll('.benefit-card').forEach(card => observer.observe(card));

    // Observe testimonial cards
    document.querySelectorAll('.testimonial-card').forEach(card => observer.observe(card));
}

// ========================================
// ANIMATED COUNTERS
// ========================================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    if (counters.length === 0) return;

    const observerOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element, target) {
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4); // ease-out quartic
        const current = Math.floor(eased * target);

        element.textContent = current.toLocaleString('he-IL');

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// ========================================
// FAQ ACCORDION
// ========================================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all others
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    otherAnswer.style.maxHeight = '0';
                    otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current
            if (isActive) {
                item.classList.remove('active');
                answer.style.maxHeight = '0';
                question.setAttribute('aria-expanded', 'false');
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

// ========================================
// FORM HANDLING
// ========================================
function initForm() {
    const form = document.getElementById('booking-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = document.getElementById('submit-btn');
        const btnText = submitBtn.querySelector('span:first-child');
        const btnLoader = submitBtn.querySelector('.btn-loader');

        // Show loading state
        btnText.textContent = 'שולח...';
        btnLoader.style.display = 'inline-block';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        // Gather form data
        const formData = {
            fullName: document.getElementById('fullName').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            businessType: document.getElementById('businessType').value,
            challenge: document.getElementById('challenge').value
        };

        // Log form data (replace with actual API call)
        console.log('Form submitted:', formData);

        // Simulate API call
        setTimeout(() => {
            window.location.href = 'thank-you.html';
        }, 1500);
    });

    // Add input animations
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });
}

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// PARALLAX EFFECTS
// ========================================
function initParallax() {
    const heroGlow = document.querySelector('.hero-glow');
    if (!heroGlow) return;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        heroGlow.style.transform = `translateX(-50%) translateY(${scrollY * 0.3}px)`;
    });
}

// ========================================
// MOUSE CURSOR GLOW EFFECT ON CARDS
// ========================================
function initCardGlow() {
    const cards = document.querySelectorAll('.pain-card, .benefit-card, .testimonial-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
            card.style.background = `radial-gradient(300px circle at ${x}px ${y}px, rgba(120, 80, 255, 0.06), transparent 80%), var(--gradient-card)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.background = 'var(--gradient-card)';
        });
    });
}

// ========================================
// TYPING EFFECT ON HERO (optional bonus)
// ========================================
function initTypingEffect() {
    const badge = document.querySelector('.hero-badge span:last-child');
    if (!badge) return;
    
    const originalText = badge.textContent;
    badge.textContent = '';
    let i = 0;

    function type() {
        if (i < originalText.length) {
            badge.textContent += originalText.charAt(i);
            i++;
            setTimeout(type, 40);
        }
    }

    setTimeout(type, 1000);
}

// ========================================
// INITIALIZE ALL
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initNavbar();
    initFloatingCTA();
    initScrollAnimations();
    initCounters();
    initFAQ();
    initForm();
    initSmoothScroll();
    initParallax();
    initCardGlow();
    initTypingEffect();
});
