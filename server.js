/**
 * Simple Express server for the portfolio website
 * Features: Rate limiting, input validation, secure headers
 *
 * IMPORTANT: All API keys must be stored in .env file
 */

const express = require('express');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ===== Security Middleware =====

// Helmet for secure headers
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"]
        }
    },
    crossOriginEmbedderPolicy: false
}));

// Parse JSON bodies
app.use(express.json({ limit: '10kb' })); // Limit body size

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ===== Rate Limiting =====

// General rate limiter for all requests
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        error: 'Too many requests from this IP, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Stricter rate limiter for contact form
const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // Limit each IP to 5 contact form submissions per hour
    message: {
        error: 'Too many messages sent. Please try again in an hour.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Apply general rate limiter to all requests
app.use(generalLimiter);

// ===== Static Files =====
app.use(express.static(path.join(__dirname), {
    maxAge: '1d',
    etag: true
}));

// ===== Input Validation Rules =====
const contactValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters')
        .escape(), // Sanitize to prevent XSS

    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email address')
        .normalizeEmail()
        .isLength({ max: 254 }).withMessage('Email is too long'),

    body('message')
        .trim()
        .notEmpty().withMessage('Message is required')
        .isLength({ min: 10, max: 2000 }).withMessage('Message must be between 10 and 2000 characters')
        .escape() // Sanitize to prevent XSS
];

// ===== API Routes =====

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Contact form endpoint
app.post('/api/contact', contactLimiter, contactValidation, async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: 'Validation failed',
            details: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        });
    }

    const { name, email, message } = req.body;

    try {
        // Here you would typically:
        // 1. Store the message in a database
        // 2. Send an email notification
        // 3. Log the submission

        // Example: Send email using an email service
        // Uncomment and configure based on your email provider

        /*
        // Using SendGrid (API key from environment variable)
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        await sgMail.send({
            to: process.env.CONTACT_EMAIL,
            from: process.env.FROM_EMAIL,
            subject: `Portfolio Contact: ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `
        });
        */

        // Log the submission (for demo purposes)
        console.log('Contact form submission:', {
            name,
            email,
            messageLength: message.length,
            timestamp: new Date().toISOString(),
            ip: req.ip
        });

        res.json({
            success: true,
            message: 'Thank you for your message! I\'ll get back to you soon.'
        });

    } catch (error) {
        console.error('Contact form error:', error);

        res.status(500).json({
            error: 'Failed to send message. Please try again later.'
        });
    }
});

// ===== Error Handling =====

// 404 handler
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);

    res.status(500).json({
        error: 'An unexpected error occurred. Please try again later.'
    });
});

// ===== Start Server =====
app.listen(PORT, () => {
    console.log(`
========================================
  Portfolio Server Running
========================================
  Local:    http://localhost:${PORT}

  Environment: ${process.env.NODE_ENV || 'development'}

  IMPORTANT: Ensure .env file is configured
  with all required API keys!
========================================
    `);
});

module.exports = app;
