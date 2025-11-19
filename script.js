// ======================================
// ENHANCED PROFESSIONAL PORTFOLIO JS
// ======================================

'use strict';

// ======================================
// PRELOADER
// ======================================

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hide');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);
});

// ======================================
// SCROLL PROGRESS BAR
// ======================================

const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// ======================================
// SCROLL TO TOP BUTTON
// ======================================

const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ======================================
// DARK MODE TOGGLE
// ======================================

const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
});

// ======================================
// ACTIVE NAVIGATION ON SCROLL
// ======================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ======================================
// TYPING ANIMATION IN HERO
// ======================================

const typingText = document.querySelector('.typing-text');
const texts = [
    'Full-Stack Developer',
    'ICT Educator',
    'Tech Innovator',
    'Problem Solver',
    'Mobile Developer',
    'Web Designer'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150;

function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
}

if (typingText) {
    setTimeout(type, 1000);
}

// ======================================
// CV DOWNLOAD HANDLER
// ======================================

const cvDownloadBtn = document.getElementById('cvDownloadBtn');

if (cvDownloadBtn) {
    cvDownloadBtn.addEventListener('click', function (e) {
        e.preventDefault();

        const cvPath = 'files/Elijah_Hienwo_CV.pdf';

        fetch(cvPath, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    const link = document.createElement('a');
                    link.href = cvPath;
                    link.download = 'Elijah_Hienwo_CV.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    showNotification('CV download started!', 'success');
                } else {
                    showCVModal();
                }
            })
            .catch(error => {
                showCVModal();
            });
    });
}

function showCVModal() {
    const modal = document.createElement('div');
    modal.className = 'cv-modal';
    modal.innerHTML = `
        <div class="cv-modal-content">
            <button class="cv-modal-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
            <div class="cv-modal-icon">
                <i class="fas fa-file-pdf"></i>
            </div>
            <h3>Request My CV</h3>
            <p>I'd love to share my CV with you! Please choose your preferred method:</p>
            
            <div class="cv-options">
                <a href="mailto:elijah.hienwo@example.com?subject=CV%20Request&body=Hello%20Elijah,%0D%0A%0D%0AI%20would%20like%20to%20request%20your%20CV.%0D%0A%0D%0AThank%20you!" 
                   class="cv-option">
                    <i class="fas fa-envelope"></i>
                    <span>Request via Email</span>
                </a>
                
                <a href="https://wa.me/233504579408?text=Hi%20Elijah!%20I%27d%20like%20to%20request%20your%20CV.%20Thank%20you!" 
                   target="_blank" class="cv-option">
                    <i class="fab fa-whatsapp"></i>
                    <span>Request via WhatsApp</span>
                </a>
                
                <a href="https://linkedin.com/in/elijah-hienwo" 
                   target="_blank" class="cv-option">
                    <i class="fab fa-linkedin"></i>
                    <span>Connect on LinkedIn</span>
                </a>
                
                <a href="#contact" 
                   class="cv-option" 
                   onclick="this.parentElement.parentElement.parentElement.parentElement.remove()">
                    <i class="fas fa-paper-plane"></i>
                    <span>Send Message</span>
                </a>
            </div>
            
            <p class="cv-note">
                <i class="fas fa-info-circle"></i>
                I'll respond within 24 hours with my latest CV!
            </p>
        </div>
    `;

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);

    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// ======================================
// ANIMATED STATISTICS COUNTER
// ======================================

const statNumbers = document.querySelectorAll('.stat-number');

const animateStats = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    entry.target.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    entry.target.textContent = target + '+';
                }
            };

            updateCounter();
            observer.unobserve(entry.target);
        }
    });
};

const statsObserver = new IntersectionObserver(animateStats, {
    threshold: 0.5
});

statNumbers.forEach(stat => statsObserver.observe(stat));

// ======================================
// SKILL PROGRESS BARS ANIMATION
// ======================================

const skillBars = document.querySelectorAll('.skill-progress-bar');

const animateSkills = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const progress = progressBar.getAttribute('data-progress');
            progressBar.style.width = progress + '%';
            observer.unobserve(progressBar);
        }
    });
};

const skillsObserver = new IntersectionObserver(animateSkills, {
    threshold: 0.5
});

skillBars.forEach(bar => skillsObserver.observe(bar));

// ======================================
// AOS (ANIMATE ON SCROLL) IMPLEMENTATION
// ======================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// ======================================
// PROJECT FILTER FUNCTIONALITY
// ======================================

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ======================================
// MOBILE MENU TOGGLE
// ======================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ======================================
// FORM VALIDATION & SUBMISSION
// ======================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    const formInputs = contactForm.querySelectorAll('input, textarea');

    // Real-time validation
    formInputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });

        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });

    // Form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate all fields
        let isValid = true;
        formInputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) return;

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;

            // Show success message
            showFormStatus('Message sent successfully! I\'ll get back to you soon.', 'success');

            // Reset form
            contactForm.reset();

            // Clear validation states
            formInputs.forEach(input => {
                input.classList.remove('success', 'error');
                const errorSpan = input.parentElement.querySelector('.form-error');
                if (errorSpan) errorSpan.textContent = '';
            });

            // Show notification
            showNotification('Message sent successfully!', 'success');
        }, 2000);
    });
}

function validateField(field) {
    const errorSpan = field.parentElement.querySelector('.form-error');
    let error = '';

    if (field.hasAttribute('required') && !field.value.trim()) {
        error = 'This field is required';
    } else if (field.type === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            error = 'Please enter a valid email address';
        }
    }

    if (error) {
        field.classList.add('error');
        field.classList.remove('success');
        if (errorSpan) errorSpan.textContent = error;
        return false;
    } else {
        field.classList.remove('error');
        field.classList.add('success');
        if (errorSpan) errorSpan.textContent = '';
        return true;
    }
}

function showFormStatus(message, type) {
    const statusDiv = contactForm.querySelector('.form-status');
    if (statusDiv) {
        statusDiv.textContent = message;
        statusDiv.className = `form-status ${type}`;

        setTimeout(() => {
            statusDiv.classList.remove('success', 'error');
            statusDiv.style.display = 'none';
        }, 5000);
    }
}

// ======================================
// NOTIFICATION SYSTEM
// ======================================

function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    Object.assign(notification.style, {
        position: 'fixed',
        top: '90px',
        right: '20px',
        padding: '1rem 1.5rem',
        backgroundColor: type === 'success' ? '#059669' : type === 'error' ? '#dc2626' : '#1e3a8a',
        color: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        zIndex: '9999',
        animation: 'slideInRight 0.3s ease',
        fontWeight: '500'
    });

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations to CSS dynamically
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// ======================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ======================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ======================================
// NAVBAR BACKGROUND ON SCROLL
// ======================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
});

// ======================================
// PROJECT LINKS PLACEHOLDER ALERT
// ======================================

document.querySelectorAll('.project-link').forEach(link => {
    if (link.href === '#' || link.href.endsWith('#')) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('Demo link coming soon! Check back later.', 'info');
        });
    }
});

// ======================================
// LAZY LOADING FOR IMAGES
// ======================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ======================================
// FORM AUTO-SAVE TO LOCALSTORAGE
// ======================================

if (contactForm) {
    const formInputs = contactForm.querySelectorAll('input, textarea');

    formInputs.forEach(input => {
        const savedValue = localStorage.getItem(`form_${input.id}`);
        if (savedValue) {
            input.value = savedValue;
        }

        input.addEventListener('input', () => {
            localStorage.setItem(`form_${input.id}`, input.value);
        });
    });

    contactForm.addEventListener('submit', () => {
        formInputs.forEach(input => {
            localStorage.removeItem(`form_${input.id}`);
        });
    });
}

// ======================================
// SCROLL REVEAL ANIMATIONS
// ======================================

const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
};

const revealObserver = new IntersectionObserver(revealOnScroll, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ======================================
// PERFORMANCE MONITORING
// ======================================

window.addEventListener('load', () => {
    if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.domContentLoadedEventEnd -
            window.performance.timing.navigationStart;
        console.log(`%c⚡ Page loaded in ${loadTime}ms`, 'color: #10b981; font-weight: bold;');
    }
});

// ======================================
// KEYBOARD NAVIGATION ENHANCEMENT
// ======================================

document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ======================================
// CONSOLE BRANDING
// ======================================

console.log('%c👋 Hello Developer!', 'color: #1e3a8a; font-size: 24px; font-weight: bold;');
console.log('%c🚀 Welcome to my portfolio!', 'color: #00CED1; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with passion by Elijah Hienwo', 'color: #64748b; font-size: 14px;');
console.log('%c💼 Interested in working together? Let\'s connect!', 'color: #059669; font-size: 14px;');
console.log('%c🔗 GitHub: https://github.com/EMMA-GLORYH', 'color: #1e40af; font-size: 12px;');
console.log('%c📧 Contact: See the contact section below', 'color: #d97706; font-size: 12px;');

// ======================================
// PREVENT CONSOLE TAMPERING
// ======================================

(function () {
    const devtools = /./;
    devtools.toString = function () {
        console.log('%c🛡️ Developer tools detected!', 'color: #dc2626; font-size: 16px; font-weight: bold;');
        console.log('%cPlease respect intellectual property. Thanks!', 'color: #64748b; font-size: 12px;');
    }
})();

// ======================================
// END OF SCRIPT
// ======================================

console.log('%c✅ All scripts loaded successfully!', 'color: #059669; font-weight: bold; font-size: 14px;');