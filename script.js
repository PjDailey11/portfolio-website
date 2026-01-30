/**
 * PJ Dailey Portfolio - Main JavaScript
 * Features: Custom cursor, smooth scrolling, form validation, animations
 */

// ===== Configuration =====
const CONFIG = {
    // Rate limiting for form submissions
    FORM_SUBMIT_COOLDOWN: 30000, // 30 seconds between submissions
    MAX_SUBMISSIONS_PER_HOUR: 5,

    // Animation settings
    REVEAL_THRESHOLD: 0.15,
    CURSOR_DELAY: 0.08,

    // Validation patterns
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 100,
    MESSAGE_MIN_LENGTH: 10,
    MESSAGE_MAX_LENGTH: 2000,
};

// ===== State =====
let lastSubmissionTime = 0;
let submissionCount = 0;
let submissionHourStart = Date.now();

// ===== Utility Functions =====

/**
 * Sanitize user input to prevent XSS
 * @param {string} str - Input string
 * @returns {string} - Sanitized string
 */
function sanitizeInput(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML.trim();
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean}
 */
function isValidEmail(email) {
    return CONFIG.EMAIL_REGEX.test(email);
}

/**
 * Check if rate limit is exceeded
 * @returns {object} - { allowed: boolean, message: string }
 */
function checkRateLimit() {
    const now = Date.now();

    // Reset hourly counter
    if (now - submissionHourStart > 3600000) {
        submissionCount = 0;
        submissionHourStart = now;
    }

    // Check cooldown
    if (now - lastSubmissionTime < CONFIG.FORM_SUBMIT_COOLDOWN) {
        const waitTime = Math.ceil((CONFIG.FORM_SUBMIT_COOLDOWN - (now - lastSubmissionTime)) / 1000);
        return {
            allowed: false,
            message: `Please wait ${waitTime} seconds before submitting again.`
        };
    }

    // Check hourly limit
    if (submissionCount >= CONFIG.MAX_SUBMISSIONS_PER_HOUR) {
        return {
            allowed: false,
            message: 'Maximum submissions reached. Please try again later.'
        };
    }

    return { allowed: true, message: '' };
}

// ===== Custom Cursor =====
class CustomCursor {
    constructor() {
        this.cursor = document.querySelector('.cursor');
        this.follower = document.querySelector('.cursor-follower');

        if (!this.cursor || !this.follower) return;

        this.cursorX = 0;
        this.cursorY = 0;
        this.followerX = 0;
        this.followerY = 0;

        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.cursorX = e.clientX;
            this.cursorY = e.clientY;
        });

        // Add hover effect to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => this.follower.classList.add('hover'));
            el.addEventListener('mouseleave', () => this.follower.classList.remove('hover'));
        });

        this.animate();
    }

    animate() {
        // Smooth follow effect
        this.followerX += (this.cursorX - this.followerX) * CONFIG.CURSOR_DELAY;
        this.followerY += (this.cursorY - this.followerY) * CONFIG.CURSOR_DELAY;

        this.cursor.style.left = `${this.cursorX}px`;
        this.cursor.style.top = `${this.cursorY}px`;

        this.follower.style.left = `${this.followerX}px`;
        this.follower.style.top = `${this.followerY}px`;

        requestAnimationFrame(() => this.animate());
    }
}

// ===== Navigation =====
class Navigation {
    constructor() {
        this.nav = document.getElementById('nav');
        this.toggle = document.getElementById('navToggle');
        this.mobileMenu = document.getElementById('mobileMenu');
        this.mobileLinks = document.querySelectorAll('.mobile-link');

        if (!this.nav) return;

        this.init();
    }

    init() {
        // Scroll effect
        window.addEventListener('scroll', () => this.handleScroll());

        // Mobile menu toggle
        if (this.toggle) {
            this.toggle.addEventListener('click', () => this.toggleMenu());
        }

        // Close menu on link click
        this.mobileLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Smooth scroll for all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => this.smoothScroll(e));
        });
    }

    handleScroll() {
        if (window.scrollY > 100) {
            this.nav.classList.add('scrolled');
        } else {
            this.nav.classList.remove('scrolled');
        }
    }

    toggleMenu() {
        this.toggle.classList.toggle('active');
        this.mobileMenu.classList.toggle('active');
        document.body.style.overflow = this.mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    closeMenu() {
        this.toggle.classList.remove('active');
        this.mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    smoothScroll(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            const offset = 80; // Account for fixed nav
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
}

// ===== Contact Form =====
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.status = document.getElementById('formStatus');

        if (!this.form) return;

        this.fields = {
            name: {
                input: document.getElementById('name'),
                error: document.getElementById('nameError')
            },
            email: {
                input: document.getElementById('email'),
                error: document.getElementById('emailError')
            },
            message: {
                input: document.getElementById('message'),
                error: document.getElementById('messageError')
            }
        };

        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Real-time validation
        Object.keys(this.fields).forEach(fieldName => {
            const field = this.fields[fieldName];
            field.input.addEventListener('blur', () => this.validateField(fieldName));
            field.input.addEventListener('input', () => this.clearError(fieldName));
        });
    }

    validateField(fieldName) {
        const field = this.fields[fieldName];
        const value = sanitizeInput(field.input.value);

        switch (fieldName) {
            case 'name':
                if (!value) {
                    this.setError(fieldName, 'Name is required');
                    return false;
                }
                if (value.length < CONFIG.NAME_MIN_LENGTH) {
                    this.setError(fieldName, `Name must be at least ${CONFIG.NAME_MIN_LENGTH} characters`);
                    return false;
                }
                if (value.length > CONFIG.NAME_MAX_LENGTH) {
                    this.setError(fieldName, `Name must be less than ${CONFIG.NAME_MAX_LENGTH} characters`);
                    return false;
                }
                break;

            case 'email':
                if (!value) {
                    this.setError(fieldName, 'Email is required');
                    return false;
                }
                if (!isValidEmail(value)) {
                    this.setError(fieldName, 'Please enter a valid email address');
                    return false;
                }
                break;

            case 'message':
                if (!value) {
                    this.setError(fieldName, 'Message is required');
                    return false;
                }
                if (value.length < CONFIG.MESSAGE_MIN_LENGTH) {
                    this.setError(fieldName, `Message must be at least ${CONFIG.MESSAGE_MIN_LENGTH} characters`);
                    return false;
                }
                if (value.length > CONFIG.MESSAGE_MAX_LENGTH) {
                    this.setError(fieldName, `Message must be less than ${CONFIG.MESSAGE_MAX_LENGTH} characters`);
                    return false;
                }
                break;
        }

        this.clearError(fieldName);
        return true;
    }

    setError(fieldName, message) {
        const field = this.fields[fieldName];
        field.error.textContent = message;
        field.input.style.borderColor = 'var(--color-error)';
    }

    clearError(fieldName) {
        const field = this.fields[fieldName];
        field.error.textContent = '';
        field.input.style.borderColor = '';
    }

    validateAll() {
        let isValid = true;
        Object.keys(this.fields).forEach(fieldName => {
            if (!this.validateField(fieldName)) {
                isValid = false;
            }
        });
        return isValid;
    }

    async handleSubmit(e) {
        e.preventDefault();

        // Validate all fields
        if (!this.validateAll()) {
            return;
        }

        // Check rate limit
        const rateCheck = checkRateLimit();
        if (!rateCheck.allowed) {
            this.showStatus(rateCheck.message, 'error');
            return;
        }

        // Prepare sanitized data
        const formData = {
            name: sanitizeInput(this.fields.name.input.value),
            email: sanitizeInput(this.fields.email.input.value),
            message: sanitizeInput(this.fields.message.input.value),
            timestamp: new Date().toISOString()
        };

        // Disable submit button
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending...</span>';

        try {
            // Use FormSubmit.co - a free email forwarding service
            // Sends form data directly to pjdailey13@gmail.com
            const endpoint = 'https://formsubmit.co/ajax/pjdailey13@gmail.com';

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    _subject: `Portfolio Contact: ${formData.name}`,
                    _template: 'table'
                })
            });

            const result = await response.json();

            if (result.success) {
                this.showStatus('Message sent successfully! I\'ll get back to you within 24 hours.', 'success');
                this.form.reset();

                // Update rate limiting
                lastSubmissionTime = Date.now();
                submissionCount++;
            } else {
                throw new Error('Failed to send message');
            }

        } catch (error) {
            console.error('Form submission error:', error);
            // Fallback: open email client
            const mailtoLink = `mailto:pjdailey13@gmail.com?subject=Portfolio Contact: ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
            window.location.href = mailtoLink;
            this.showStatus('Opening your email client...', 'success');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    }

    showStatus(message, type) {
        this.status.textContent = message;
        this.status.className = `form-status ${type}`;

        // Auto-hide after 5 seconds
        setTimeout(() => {
            this.status.className = 'form-status';
        }, 5000);
    }
}

// ===== Scroll Reveal Animations =====
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.section-header, .project-card, .skill-category, .about-content, .about-visual, .contact-content, .contact-form-wrapper');
        this.init();
    }

    init() {
        // Add reveal class to elements
        this.elements.forEach(el => el.classList.add('reveal'));

        // Create intersection observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: CONFIG.REVEAL_THRESHOLD,
            rootMargin: '0px 0px -50px 0px'
        });

        this.elements.forEach(el => observer.observe(el));
    }
}

// ===== Counter Animation =====
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('[data-count]');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        this.counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.count, 10);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const update = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        };

        update();
    }
}

// ===== Initialize Everything =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    new CustomCursor();
    new Navigation();
    new ContactForm();
    new ScrollReveal();
    new CounterAnimation();

    // Log initialization (remove in production)
    console.log('Portfolio initialized successfully');
});

// ===== Handle page visibility for animations =====
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause expensive animations when tab is not visible
        document.body.classList.add('paused');
    } else {
        document.body.classList.remove('paused');
    }
});
