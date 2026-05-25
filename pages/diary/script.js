// Set current date in Hebrew
const dateEl = document.getElementById('currentDate');
if (dateEl) {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateEl.textContent = now.toLocaleDateString('he-IL', options);
}

// Scroll reveal for entries
const entries = document.querySelectorAll('.diary-entry');
const observer = new IntersectionObserver((items) => {
    items.forEach(item => {
        if (item.isIntersecting) {
            item.target.classList.add('visible');
            observer.unobserve(item.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
entries.forEach(entry => observer.observe(entry));

// Navbar
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
