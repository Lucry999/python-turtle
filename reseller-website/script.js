// Smooth Scrolling
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

// Scroll Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-up, .fade-in-down, .fade-in-left, .fade-in-right').forEach(el => {
    observer.observe(el);
});

// Counter Animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 50);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString('de-DE');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString('de-DE');
        }
    }, 50);
}

const statsSection = document.querySelector('.stats');
let statsAnimated = false;

const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            document.querySelectorAll('.stat-number').forEach(counter => {
                animateCounter(counter);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});

// Product Cards
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
});

// Form Validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const inputs = this.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderBottom = '2px solid #ff4444';
            } else {
                input.style.borderBottom = '2px solid #44ff44';
            }
        });

        if (isValid) {
            alert('✓ Nachricht erfolgreich gesendet! Wir melden uns bald bei Ihnen.');
            this.reset();
            inputs.forEach(input => {
                input.style.borderBottom = '';
            });
        } else {
            alert('⚠ Bitte füllen Sie alle Felder aus!');
        }
    });
}

// CTA Button Effect
document.querySelectorAll('.cta-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.width = ripple.style.height = '10px';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Pricing Cards Interactive
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        document.querySelectorAll('.pricing-card').forEach(c => {
            if (c !== this) {
                c.style.opacity = '0.7';
            }
        });
    });
    
    card.addEventListener('mouseleave', function() {
        document.querySelectorAll('.pricing-card').forEach(c => {
            c.style.opacity = '1';
        });
    });
});

// Login Button
const loginBtn = document.querySelector('.login-btn');
if (loginBtn) {
    loginBtn.addEventListener('click', function() {
        alert('Login-Seite würde hier geladen werden!');
    });
}

// Parallax Effect
window.addEventListener('scroll', function() {
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        const scrolled = window.pageYOffset;
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Feature Icons Animation
document.querySelectorAll('.feature-icon').forEach((icon, index) => {
    icon.style.animationDelay = `${index * 0.1}s`;
});

// Security Items Animation
document.querySelectorAll('.security-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
});

// Responsive Menu
window.addEventListener('resize', function() {
    const navMenu = document.querySelector('.nav-menu');
    if (window.innerWidth <= 768) {
        if (navMenu) {
            navMenu.style.display = 'none';
        }
    } else {
        if (navMenu) {
            navMenu.style.display = 'flex';
        }
    }
});

// Active Navigation
window.addEventListener('scroll', function() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 50 && window.scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.style.color = 'var(--text-primary)');
            const activeLink = document.querySelector(`a[href="#${section.id}"]`);
            if (activeLink) {
                activeLink.style.color = 'var(--primary-color)';
            }
        }
    });
});

// Trust Badge Animation
document.querySelectorAll('.trust-badge').forEach((badge, index) => {
    badge.style.animation = `slideUp 0.8s ease forwards`;
    badge.style.animationDelay = `${index * 0.1}s`;
});

// Keyboard Accessibility
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            this.click();
        }
    });
});

console.log('PremiumResell - Website erfolgreich geladen! ✓');