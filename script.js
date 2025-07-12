// Initialize AOS
AOS.init({
    once: true,
    offset: 100
});

window.addEventListener('scroll', function () {
    const scrollTop = document.getElementById('scrollTop');
    if (window.scrollY > 100) {
        scrollTop.classList.add('show');
    } else {
        scrollTop.classList.remove('show');
    }
});


// Loading Animation
window.addEventListener('load', function () {
    const loadingOverlay = document.getElementById('loadingOverlay');
    setTimeout(() => {
        loadingOverlay.classList.add('hidden');
    }, 1000);
});

// Typing Animation
const typingText = document.getElementById('typingText');
const phrases = [
    'Developer',
    "YouTuber",
    'Tech Enthusiast',
    'Content Creator',
    'Problem Solver',
];

let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentPhrase = phrases[currentPhraseIndex];

    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, currentCharIndex - 1);
        currentCharIndex--;

        if (currentCharIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            setTimeout(typeWriter, 500);
            return;
        }
    } else {
        typingText.textContent = currentPhrase.substring(0, currentCharIndex + 1);
        currentCharIndex++;

        if (currentCharIndex === currentPhrase.length) {
            isDeleting = true;
            setTimeout(typeWriter, 2000);
            return;
        }
    }

    setTimeout(typeWriter, isDeleting ? 50 : 100);
}

// Start typing animation
typeWriter();

// Smooth scrolling for navigation links
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

// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    const scrollTop = document.getElementById('scrollTop');

    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        scrollTop.classList.add('show');
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        scrollTop.classList.remove('show');
    }
});

// Scroll to top functionality
document.getElementById('scrollTop').addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Active navigation link
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
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

document.querySelector('form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = this;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    const formData = new FormData(form);
    const response = await fetch(form.action, {
        method: form.method,
        body: formData
    });

    if (response.ok) {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        form.reset();
    } else {
        submitBtn.innerHTML = '<i class="fas fa-times"></i> Failed!';
    }

    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Parallax effect for hero section
window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-section');
    const speed = scrolled * 0.5;

    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Skill progress animation
const observerOptions = {
    threshold: 0.7,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress-bar');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.transition = 'width 2s ease-in-out';
                    bar.style.width = width;
                }, 500);
            });
        }
    });
}, observerOptions);

// Observe skills section
const skillsSection = document.getElementById('skills');
if (skillsSection) {
    observer.observe(skillsSection);
}

// Add cursor glow effect
document.addEventListener('mousemove', function (e) {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    cursor.style.cssText = `
                position: fixed;
                top: ${e.clientY}px;
                left: ${e.clientX}px;
                width: 20px;
                height: 20px;
                background: radial-gradient(circle, rgba(0, 255, 255, 0.3) 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transform: translate(-50%, -50%);
                animation: cursorFade 0.5s ease-out forwards;
            `;

    document.body.appendChild(cursor);

    setTimeout(() => {
        cursor.remove();
    }, 500);
});

// Add CSS for cursor animation
const style = document.createElement('style');
style.textContent = `
            @keyframes cursorFade {
                0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(1.5); }
            }
            
            .navbar-nav .nav-link.active {
                color: var(--primary-color) !important;
            }
            
            .navbar-nav .nav-link.active::after {
                width: 100%;
            }
        `;
document.head.appendChild(style);

// Add particle effect to hero section
function createParticles() {
    const heroSection = document.querySelector('.hero-section');
    const particlesContainer = document.createElement('div');
    particlesContainer.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 1;
            `;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
                    position: absolute;
                    width: 2px;
                    height: 2px;
                    background: var(--primary-color);
                    border-radius: 50%;
                    top: ${Math.random() * 100}%;
                    left: ${Math.random() * 100}%;
                    animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
                    animation-delay: ${Math.random() * 2}s;
                    opacity: ${0.3 + Math.random() * 0.7};
                `;
        particlesContainer.appendChild(particle);
    }

    heroSection.appendChild(particlesContainer);
}

// Initialize particles
createParticles();

// Mobile menu enhancement
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

navbarToggler.addEventListener('click', function () {
    this.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', function () {
        if (window.innerWidth <= 992) {
            navbarCollapse.classList.remove('show');
            navbarToggler.classList.remove('active');
        }
    });
});

// Add glitch effect to title on hover
const heroTitle = document.querySelector('.hero-content h1');
if (heroTitle) {
    heroTitle.addEventListener('mouseenter', function () {
        this.style.animation = 'glitch 0.5s ease-in-out';
    });

    heroTitle.addEventListener('animationend', function () {
        this.style.animation = '';
    });
}

// Add glitch animation CSS
const glitchStyle = document.createElement('style');
glitchStyle.textContent = `
            @keyframes glitch {
                0%, 100% { transform: translate(0); }
                10% { transform: translate(-2px, 2px); }
                20% { transform: translate(2px, -2px); }
                30% { transform: translate(-2px, -2px); }
                40% { transform: translate(2px, 2px); }
                50% { transform: translate(-2px, 2px); }
                60% { transform: translate(2px, -2px); }
                70% { transform: translate(-2px, -2px); }
                80% { transform: translate(2px, 2px); }
                90% { transform: translate(-2px, 2px); }
            }
        `;
document.head.appendChild(glitchStyle);

// Add success message for contact form
function showSuccessMessage() {
    const successAlert = document.createElement('div');
    successAlert.className = 'alert alert-success mt-3';
    successAlert.innerHTML = `
                <i class="fas fa-check-circle"></i> 
                Thank you! Your message has been sent successfully. I'll get back to you soon.
            `;
    successAlert.style.cssText = `
                background: rgba(0, 255, 136, 0.1);
                border: 1px solid var(--accent-color);
                color: var(--accent-color);
                border-radius: 10px;
            `;

    document.querySelector('.contact-form').appendChild(successAlert);

    setTimeout(() => {
        successAlert.remove();
    }, 5000);
}

console.log('🚀 AI-Inspired Portfolio Loaded Successfully!');
console.log('✨ Made with love by Suraj Arya');



// ========== FORM VALIDATION ==========
function sanitizeInput(value) {
    return value
        .replace(/[^\x00-\x7F]/g, '')
        .replace(/[^a-zA-Z0-9\s,'-]/g, '')
        .replace(/\s{2,}/g, ' ')
        .trimStart();
}

function showError(input, message) {
    let error = input.nextElementSibling;
    if (!error || !error.classList.contains('error-msg')) {
        error = document.createElement('div');
        error.className = 'error-msg text-danger small mt-1';
        input.parentNode.appendChild(error);
    }
    error.textContent = message;
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
}

function clearError(input) {
    let error = input.nextElementSibling;
    if (error && error.classList.contains('error-msg')) {
        error.textContent = '';
    }
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
}

// Name field
const nameInput = document.querySelector('input[name="Name"]');
if (nameInput) {
    nameInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^a-zA-Z\s,'-]/g, '').replace(/\s{2,}/g, ' ').trimStart();
        const words = this.value.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
        this.value = words.join(" ");

        if (this.value.length < 3) {
            showError(this, "Name must be at least 3 characters.");
        } else {
            clearError(this);
        }
    });
}

// Email field
const emailInput = document.querySelector('input[name="Email"]');
if (emailInput) {
    emailInput.addEventListener("input", function () {
        const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!pattern.test(this.value)) {
            showError(this, "Invalid email format.");
        } else {
            clearError(this);
        }
    });
}

// Phone field
// Phone number validation
const phoneInput = document.querySelector('input[name="Phone"]');
if (phoneInput) {
    phoneInput.addEventListener("input", function () {
        let digits = this.value.replace(/\D/g, ''); // remove non-digits

        // Enforce max 10 digits
        if (digits.length > 10) digits = digits.slice(0, 10);
        this.value = digits;

        // Validation
        if (digits.length !== 10) {
            showError(this, "Phone number must be exactly 10 digits.");
        } else if (digits.startsWith("0")) {
            showError(this, "Phone number cannot start with 0.");
        } else {
            clearError(this);
        }
    });
}


// Subject field
const subjectInput = document.querySelector('input[name="Subject"]');
if (subjectInput) {
    subjectInput.addEventListener("input", function () {
        this.value = sanitizeInput(this.value);
        if (this.value.length < 3) {
            showError(this, "Subject must be at least 3 characters.");
        } else {
            clearError(this);
        }
    });
}

// Message field
const messageInput = document.querySelector('textarea[name="Message"]');
if (messageInput) {
    messageInput.addEventListener("input", function () {
        this.value = sanitizeInput(this.value);
        if (this.value.length < 10) {
            showError(this, "Message must be at least 10 characters.");
        } else {
            clearError(this);
        }
    });
}

// Form validation on submit
const contactForm = document.querySelector('form[action*="web3forms"]');
if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        let hasError = false;

        if (nameInput && nameInput.value.length < 3) {
            showError(nameInput, "Name must be at least 3 characters.");
            hasError = true;
        }

        const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (emailInput && !pattern.test(emailInput.value)) {
            showError(emailInput, "Invalid email format.");
            hasError = true;
        }

        if (phoneInput) {
            const digits = phoneInput.value;
            if (digits.length !== 10) {
                showError(phoneInput, "Phone number must be exactly 10 digits.");
                hasError = true;
            } else if (digits.startsWith("0")) {
                showError(phoneInput, "Phone number cannot start with 0.");
                hasError = true;
            } else {
                clearError(phoneInput);
            }
        }


        if (subjectInput && subjectInput.value.length < 3) {
            showError(subjectInput, "Subject must be at least 3 characters.");
            hasError = true;
        }

        if (messageInput && messageInput.value.length < 10) {
            showError(messageInput, "Message must be at least 10 characters.");
            hasError = true;
        }

        if (hasError) {
            e.preventDefault();
            const firstInvalid = contactForm.querySelector(".is-invalid");
            if (firstInvalid) firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    });
}