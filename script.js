/**
 * Portfolio — navigation, mobile menu, smooth scroll, contact form, reveal animations
 */

const CONFIG = {
    FORM_SUBMIT_COOLDOWN: 30000,
    MAX_SUBMISSIONS_PER_HOUR: 5,
    REVEAL_THRESHOLD: 0.12,
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 100,
    MESSAGE_MIN_LENGTH: 10,
    MESSAGE_MAX_LENGTH: 2000,
};

let lastSubmissionTime = 0;
let submissionCount = 0;
let submissionHourStart = Date.now();

function sanitizeInput(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML.trim();
}

function isValidEmail(email) {
    return CONFIG.EMAIL_REGEX.test(email);
}

function checkRateLimit() {
    const now = Date.now();

    if (now - submissionHourStart > 3600000) {
        submissionCount = 0;
        submissionHourStart = now;
    }

    if (now - lastSubmissionTime < CONFIG.FORM_SUBMIT_COOLDOWN) {
        const waitTime = Math.ceil((CONFIG.FORM_SUBMIT_COOLDOWN - (now - lastSubmissionTime)) / 1000);
        return {
            allowed: false,
            message: `Please wait ${waitTime} seconds before submitting again.`,
        };
    }

    if (submissionCount >= CONFIG.MAX_SUBMISSIONS_PER_HOUR) {
        return {
            allowed: false,
            message: 'Maximum submissions reached. Please try again later.',
        };
    }

    return { allowed: true, message: '' };
}

class Navigation {
    constructor() {
        this.nav = document.getElementById('nav');
        this.toggle = document.getElementById('navToggle');
        this.mobileMenu = document.getElementById('mobileMenu');

        if (!this.nav) return;

        this.mobileLinks = this.mobileMenu ? this.mobileMenu.querySelectorAll('.mobile-link') : [];

        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll());

        if (this.toggle && this.mobileMenu) {
            this.toggle.addEventListener('click', () => this.toggleMenu());
        }

        this.mobileLinks.forEach((link) => {
            link.addEventListener('click', () => this.closeMenu());
        });

        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', (e) => this.smoothScroll(e));
        });
    }

    handleScroll() {
        if (window.scrollY > 24) {
            this.nav.classList.add('scrolled');
        } else {
            this.nav.classList.remove('scrolled');
        }
    }

    toggleMenu() {
        const open = this.mobileMenu.classList.toggle('active');
        this.toggle.classList.toggle('active', open);
        this.toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        this.mobileMenu.hidden = !open;
        document.body.style.overflow = open ? 'hidden' : '';
    }

    closeMenu() {
        this.toggle.classList.remove('active');
        this.mobileMenu.classList.remove('active');
        this.toggle.setAttribute('aria-expanded', 'false');
        this.mobileMenu.hidden = true;
        document.body.style.overflow = '';
    }

    smoothScroll(e) {
        const href = e.currentTarget.getAttribute('href');
        if (!href || href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        const offset = 72;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
        });

        if (this.mobileMenu && this.mobileMenu.classList.contains('active')) {
            this.closeMenu();
        }
    }
}

class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.status = document.getElementById('formStatus');

        if (!this.form) return;

        this.fields = {
            name: {
                input: document.getElementById('name'),
                error: document.getElementById('nameError'),
            },
            email: {
                input: document.getElementById('email'),
                error: document.getElementById('emailError'),
            },
            message: {
                input: document.getElementById('message'),
                error: document.getElementById('messageError'),
            },
        };

        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        Object.keys(this.fields).forEach((fieldName) => {
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
            default:
                break;
        }

        this.clearError(fieldName);
        return true;
    }

    setError(fieldName, message) {
        const field = this.fields[fieldName];
        field.error.textContent = message;
        field.input.style.borderColor = 'var(--error, #ef4444)';
    }

    clearError(fieldName) {
        const field = this.fields[fieldName];
        field.error.textContent = '';
        field.input.style.borderColor = '';
    }

    validateAll() {
        let isValid = true;
        Object.keys(this.fields).forEach((fieldName) => {
            if (!this.validateField(fieldName)) {
                isValid = false;
            }
        });
        return isValid;
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (!this.validateAll()) {
            return;
        }

        const rateCheck = checkRateLimit();
        if (!rateCheck.allowed) {
            this.showStatus(rateCheck.message, 'error');
            return;
        }

        const formData = {
            name: sanitizeInput(this.fields.name.input.value),
            email: sanitizeInput(this.fields.email.input.value),
            message: sanitizeInput(this.fields.message.input.value),
        };

        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending…</span>';

        try {
            const endpoint = 'https://formsubmit.co/ajax/pjdailey13@gmail.com';

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    _subject: `Portfolio contact: ${formData.name}`,
                    _template: 'table',
                }),
            });

            const result = await response.json();

            if (result.success) {
                this.showStatus('Message sent. I will follow up shortly.', 'success');
                this.form.reset();

                lastSubmissionTime = Date.now();
                submissionCount += 1;
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            const mailtoLink = `mailto:pjdailey13@gmail.com?subject=${encodeURIComponent(`Portfolio contact: ${formData.name}`)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
            window.location.href = mailtoLink;
            this.showStatus('Opening your email client…', 'success');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    }

    showStatus(message, type) {
        this.status.textContent = message;
        this.status.className = `form-status ${type}`;

        setTimeout(() => {
            this.status.className = 'form-status';
            this.status.textContent = '';
        }, 6000);
    }
}

class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll(
            '.section-header.reveal, .project-card.reveal, .recent-github.reveal, .skills-grid.reveal, .about-split.reveal, .contact-layout.reveal'
        );
        this.init();
    }

    static markInView(elements) {
        const vh = window.innerHeight || document.documentElement.clientHeight;
        elements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.top < vh * 0.92 && rect.bottom > vh * 0.06) {
                el.classList.add('visible');
            }
        });
    }

    init() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            {
                threshold: CONFIG.REVEAL_THRESHOLD,
                rootMargin: '0px 0px -40px 0px',
            }
        );

        this.elements.forEach((el) => observer.observe(el));
        ScrollReveal.markInView(this.elements);
        window.addEventListener('load', () => ScrollReveal.markInView(this.elements));
        requestAnimationFrame(() => requestAnimationFrame(() => ScrollReveal.markInView(this.elements)));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
    new ContactForm();
    new ScrollReveal();
});
