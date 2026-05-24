// ========================================
// Cursor Glow
// ========================================
const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
}

// ========================================
// Navbar Scroll
// ========================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }
});

// ========================================
// Mobile Menu
// ========================================
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');
if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        mobileMenu.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            mobileMenu.classList.remove('active');
        });
    });
}

// ========================================
// Scroll Reveal
// ========================================
function initReveal() {
    const elements = document.querySelectorAll(
        '.service-card, .project-card, .about-layout, .cta-wrapper'
    );
    elements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ========================================
// Smooth Scroll
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ========================================
// Service Card Mouse Glow
// ========================================
document.querySelectorAll('.service-card, .project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(124, 92, 252, 0.05), transparent 70%), var(--bg-card)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.background = 'var(--bg-card)';
    });
});

// ========================================
// Contact Form
// ========================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = document.getElementById('contactSubmit');
        const btnText = btn.querySelector('span');
        const originalText = btnText.textContent;

        btnText.textContent = 'שולח...';
        btn.disabled = true;
        btn.style.opacity = '0.7';

        const formData = {
            name: document.getElementById('contactName').value,
            phone: document.getElementById('contactPhone').value,
            email: document.getElementById('contactEmail').value,
            message: document.getElementById('contactMessage').value,
        };

        console.log('Contact form submitted:', formData);

        setTimeout(() => {
            btnText.textContent = '✓ נשלח בהצלחה!';
            btn.style.opacity = '1';
            btn.style.background = 'linear-gradient(135deg, #38f9d7, #43e97b)';

            setTimeout(() => {
                btnText.textContent = originalText;
                btn.disabled = false;
                btn.style.background = '';
                contactForm.reset();
            }, 3000);
        }, 1500);
    });
}

// ========================================
// Init
// ========================================
document.addEventListener('DOMContentLoaded', initReveal);
