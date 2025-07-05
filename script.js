// script.js

// ========== BACK TO TOP BUTTON ==========
document.addEventListener("DOMContentLoaded", function () {
    const backToTopButton = document.getElementById("button");

    window.addEventListener("scroll", function () {
        backToTopButton.classList.toggle("show", window.scrollY > 300);
    });

    backToTopButton.addEventListener("click", function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

// ========== CIRCLES SKILL PROGRESS ==========
document.addEventListener("DOMContentLoaded", function () {
    const circles = document.querySelectorAll('.circle');
    let animated = false;

    function createCircles() {
        circles.forEach(elem => {
            const dots = +elem.getAttribute("data-dots") || 0;
            const marked = +elem.getAttribute("data-percent") || 0;
            const percent = Math.floor(dots * marked / 100);
            const rotate = 360 / dots;
            let points = "";

            for (let i = 0; i < dots; i++) {
                points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
            }
            elem.innerHTML = points;

            const pointsMarked = elem.querySelectorAll('.points');
            for (let i = 0; i < percent; i++) {
                pointsMarked[i].classList.add('marked');
            }
        });
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                createCircles();
                animated = true;
                observer.disconnect();
            }
        });
    }, { threshold: 0.3 });

    const skillSection = document.querySelector('#skills');
    if (skillSection) observer.observe(skillSection);
});

// ========== NAVBAR TOGGLE ==========
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

// ========== NAVBAR ACTIVE ON SCROLL ==========
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav a');

    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`header nav a[href*=${id}]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });

    document.querySelector('header').classList.toggle('sticky', window.scrollY > 100);

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
});

// ========== SWIPER ==========
const swiper = new Swiper('.mySwiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        640: { slidesPerView: 1 },
        768: { slidesPerView: 1 },
        1024: { slidesPerView: 2 },
    },
    grabCursor: true,
});

document.querySelector('.mySwiper').addEventListener('mouseenter', () => swiper.autoplay.stop());
document.querySelector('.mySwiper').addEventListener('mouseleave', () => swiper.autoplay.start());

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') swiper.slidePrev();
    else if (e.key === 'ArrowRight') swiper.slideNext();
});

// ========== FORM VALIDATION ==========

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const nameInput = form.querySelector("input[name='Name']");
    const emailInput = form.querySelector("input[name='Email']");
    const phoneInput = form.querySelector("input[name='Phone Number']");
    const subjectInput = form.querySelector("input[name='Subject']");
    const messageInput = form.querySelector("textarea[name='Message']");

    // Capitalize and sanitize full name
    nameInput.addEventListener("input", function () {
        this.value = this.value
            .replace(/[^a-zA-Z\s'-]/g, "")
            .replace(/\s{2,}/g, " ")
            .trimStart();

        this.value = this.value
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
    });

    // Validate email format
    emailInput.addEventListener("input", function () {
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,6}$/i;
        this.setCustomValidity(emailPattern.test(this.value) ? "" : "Invalid email format.");
    });

    // Phone: only digits, max 10, not starting with 0
    phoneInput.addEventListener("input", function () {
        let digits = this.value.replace(/\D/g, '');
        if (digits.startsWith("0")) digits = digits.slice(1);
        if (digits.length > 10) digits = digits.slice(0, 10);
        this.value = digits;
        this.setCustomValidity(digits.length === 10 ? "" : "Enter 10-digit valid phone number (not starting with 0).");
    });

    // Subject sanitization
    subjectInput.addEventListener("input", function () {
        this.value = this.value
            .replace(/[^\x00-\x7F]/g, "")
            .replace(/[^a-zA-Z0-9\s,'-]/g, "")
            .replace(/\s{2,}/g, " ")
            .trimStart();
        this.setCustomValidity(this.value.length < 3 ? "Subject must be at least 3 characters." : "");
    });

    // Message required
    messageInput.addEventListener("input", function () {
        this.setCustomValidity(this.value.trim().length > 0 ? "" : "Message cannot be empty.");
    });

    // Final check before form submission
    form.addEventListener("submit", function (e) {
        if (!form.checkValidity()) {
            e.preventDefault();
            form.reportValidity();
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    const fields = [
        { name: "Name", validate: validateName, message: "Please enter a valid name." },
        { name: "Email", validate: validateEmail, message: "Please enter a valid email." },
        { name: "Phone Number", validate: validatePhone, message: "Enter 10-digit phone number (not starting with 0)." },
        { name: "Subject", validate: value => value.trim().length >= 3, message: "Subject must be at least 3 characters." },
        { name: "Message", validate: value => value.trim().length > 0, message: "Message cannot be empty." }
    ];

    // Add event listeners for all inputs
    fields.forEach(({ name, validate, message }) => {
        const input = form.querySelector(`[name="${name}"]`);
        if (!input) return;

        const errorSpan = createOrGetErrorSpan(input);

        input.addEventListener("input", function () {
            const isValid = validate(input.value);
            toggleError(input, errorSpan, isValid, message);
        });
    });

    // On form submit, validate all
    form.addEventListener("submit", function (e) {
        let hasError = false;

        fields.forEach(({ name, validate, message }) => {
            const input = form.querySelector(`[name="${name}"]`);
            if (!input) return;

            const errorSpan = createOrGetErrorSpan(input);
            const isValid = validate(input.value);

            toggleError(input, errorSpan, isValid, message);

            if (!isValid) hasError = true;
        });

        if (hasError) e.preventDefault();
    });

    // Utility Functions
    function toggleError(input, errorSpan, isValid, message) {
        if (isValid) {
            input.style.borderColor = "var(--main-color)";
            errorSpan.textContent = "";
            errorSpan.style.display = "none";
        } else {
            input.style.borderColor = "red";
            errorSpan.textContent = message;
            errorSpan.style.display = "block";
        }
    }

    function createOrGetErrorSpan(input) {
        let next = input.nextElementSibling;
        if (!next || !next.classList.contains("error-message")) {
            next = document.createElement("span");
            next.className = "error-message";
            input.insertAdjacentElement("afterend", next);
        }
        return next;
    }

    function validateName(value) {
        return /^[a-zA-Z\s'-]{2,}$/.test(value.trim());
    }

    function validateEmail(value) {
        return /^[^ ]+@[^ ]+\.[a-z]{2,6}$/i.test(value.trim());
    }

    function validatePhone(value) {
        const digits = value.replace(/\D/g, '');
        return digits.length === 10 && !digits.startsWith("0");
    }
});
