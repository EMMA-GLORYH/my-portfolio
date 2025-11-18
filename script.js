// ======================================
// MOBILE MENU TOGGLE
// ======================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ======================================
// SMOOTH SCROLLING
// ======================================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ======================================
// NAVBAR SCROLL EFFECT
// ======================================

const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }

    lastScroll = currentScroll;
});

// ======================================
// ACTIVE NAV LINK ON SCROLL
// ======================================

const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= (sectionTop - 100)) {
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
// SCROLL ANIMATIONS
// ======================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll(
    '.skill-category, .project-card, .contact-item, .highlight-item'
);

animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.animationDelay = `${index * 0.1}s`;
    observer.observe(el);
});

// ======================================
// CONTACT FORM HANDLING
// ======================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Create mailto link (alternative to backend)
        const mailtoLink = `mailto:your-email@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

        // Open email client
        window.location.href = mailtoLink;

        // Show success message
        showNotification('Opening your email client...', 'success');

        // Reset form
        contactForm.reset();

        // Note: For production, you'd want to use a backend service like:
        // - EmailJS (https://www.emailjs.com/)
        // - Formspree (https://formspree.io/)
        // - Your own backend API
    });
}

// ======================================
// NOTIFICATION SYSTEM
// ======================================

function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Add styles
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

    // Add to page
    document.body.appendChild(notification);

    // Remove after 3 seconds
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
// TYPING EFFECT FOR HERO SECTION
// ======================================

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Optional: Add typing effect to hero title
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        // Uncomment the line below to enable typing effect
        // typeWriter(heroTitle, originalText, 100);
    }
});

// ======================================
// SCROLL TO TOP BUTTON
// ======================================

// Create scroll-to-top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
Object.assign(scrollTopBtn.style, {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    width: '50px',
    height: '50px',
    backgroundColor: '#1e3a8a',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    fontSize: '1.2rem',
    cursor: 'pointer',
    opacity: '0',
    visibility: 'hidden',
    transition: 'all 0.3s ease',
    zIndex: '999',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
});

document.body.appendChild(scrollTopBtn);

// Show/hide scroll-to-top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

// Scroll to top on click
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hover effect for scroll-to-top button
scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.backgroundColor = '#1e40af';
    scrollTopBtn.style.transform = 'translateY(-3px)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.backgroundColor = '#1e3a8a';
    scrollTopBtn.style.transform = 'translateY(0)';
});

// ======================================
// PROJECT LINKS PLACEHOLDER ALERT
// ======================================

// Add event listeners to project demo links
document.querySelectorAll('.project-link').forEach(link => {
    if (link.href === '#' || link.href.endsWith('#')) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('Demo link coming soon! Check back later.', 'info');
        });
    }
});

// ======================================
// LAZY LOADING FOR IMAGES (when you add them)
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

    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ======================================
// CURSOR TRAIL EFFECT (Optional)
// ======================================

// Uncomment to enable cursor trail effect
/*
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll('.circle');

circles.forEach((circle) => {
    circle.x = 0;
    circle.y = 0;
});

window.addEventListener('mousemove', (e) => {
    coords.x = e.clientX;
    coords.y = e.clientY;
});

function animateCircles() {
    let x = coords.x;
    let y = coords.y;
    
    circles.forEach((circle, index) => {
        circle.style.left = x - 12 + 'px';
        circle.style.top = y - 12 + 'px';
        circle.style.transform = `scale(${(circles.length - index) / circles.length})`;
        
        circle.x = x;
        circle.y = y;
        
        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
    });
    
    requestAnimationFrame(animateCircles);
}

animateCircles();
*/

// ======================================
// CONSOLE MESSAGE
// ======================================

console.log('%c👋 Hello Developer!', 'color: #1e3a8a; font-size: 20px; font-weight: bold;');
console.log('%cWelcome to my portfolio! Built with passion by Elijah Hienwo', 'color: #64748b; font-size: 14px;');
console.log('%cInterested in working together? Let\'s connect!', 'color: #059669; font-size: 14px;');
console.log('%cGitHub: https://github.com/EMMA-GLORYH', 'color: #1e40af; font-size: 12px;');

// ======================================
// PERFORMANCE MONITORING (Optional)
// ======================================

window.addEventListener('load', () => {
    // Check page load performance
    if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.domContentLoadedEventEnd -
            window.performance.timing.navigationStart;
        console.log(`%cPage loaded in ${loadTime}ms`, 'color: #10b981; font-weight: bold;');
    }
});

// ======================================
// THEME TOGGLE (Optional - for future enhancement)
// ======================================

// You can add dark mode toggle here in the future
// Example implementation:
/*
const themeToggle = document.createElement('button');
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
// ... rest of the implementation
*/

// ======================================
// FORM AUTO-SAVE (Optional)
// ======================================

// Save form data to localStorage on input
if (contactForm) {
    const formInputs = contactForm.querySelectorAll('input, textarea');

    formInputs.forEach(input => {
        // Load saved data
        const savedValue = localStorage.getItem(input.id);
        if (savedValue) {
            input.value = savedValue;
        }

        // Save on input
        input.addEventListener('input', () => {
            localStorage.setItem(input.id, input.value);
        });
    });

    // Clear saved data on successful submit
    contactForm.addEventListener('submit', () => {
        formInputs.forEach(input => {
            localStorage.removeItem(input.id);
        });
    });
}

// ======================================
// END OF SCRIPT
// ======================================

console.log('%c✅ All scripts loaded successfully!', 'color: #059669; font-weight: bold;');