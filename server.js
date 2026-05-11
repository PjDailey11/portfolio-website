const crypto = require('crypto');
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const { router: pageRouter } = require('./routes/pages');
const { shared, pageByKey } = require('./src/data/site');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use((req, res, next) => {
    res.locals.nonce = crypto.randomBytes(16).toString('base64');
    res.locals.site = shared;
    next();
});

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", 'https://fonts.googleapis.com'],
            fontSrc: ["'self'", 'https://fonts.gstatic.com'],
            scriptSrc: [
                "'self'",
                (req, res) => `'nonce-${res.locals.nonce}'`,
            ],
            imgSrc: ["'self'", 'data:', 'https:'],
            connectSrc: ["'self'"],
            baseUri: ["'self'"],
            formAction: ["'self'"],
            objectSrc: ["'none'"],
            frameAncestors: ["'none'"],
            upgradeInsecureRequests: process.env.NODE_ENV === 'production' ? [] : null,
        },
    },
    crossOriginEmbedderPolicy: false,
}));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 150,
    message: {
        error: 'Too many requests from this IP, please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});

const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: {
        error: 'Too many messages sent. Please try again in an hour.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(generalLimiter);

app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: '1d',
    etag: true,
}));

const contactValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters')
        .escape(),
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
        .escape(),
];

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/contact', contactLimiter, contactValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: 'Validation failed',
            details: errors.array().map((err) => ({
                field: err.path,
                message: err.msg,
            })),
        });
    }

    const { name, email, message } = req.body;

    try {
        console.log('Contact form submission:', {
            name,
            email,
            messageLength: message.length,
            timestamp: new Date().toISOString(),
            ip: req.ip,
        });

        res.json({
            success: true,
            message: 'Thank you for your message. I will get back to you soon.',
        });
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            error: 'Failed to send message. Please try again later.',
        });
    }
});

app.use(pageRouter);

app.use((req, res) => {
    res.status(404);
    res.render('pages/404', {
        site: shared,
        page: pageByKey('contact'),
        currentPath: req.path,
        year: new Date().getFullYear(),
        notFoundMeta: {
            title: 'Page Not Found | PJ Dailey',
            description: 'The page you requested could not be found.',
            canonical: `${shared.siteUrl}${req.originalUrl}`,
            ogImage: `${shared.siteUrl}/assets/og-placeholder.svg`,
            structuredData: [],
        },
    });
});

app.use((err, req, res, next) => {
    console.error('Server error:', err);
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({
        error: 'An unexpected error occurred. Please try again later.',
    });
});

app.listen(PORT, () => {
    console.log(`
========================================
  Portfolio Server Running
========================================
  Local:    http://localhost:${PORT}
  Env:      ${process.env.NODE_ENV || 'development'}
========================================
    `);
});

module.exports = app;
