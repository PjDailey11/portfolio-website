require('dotenv').config();

const crypto = require('crypto');
const fs = require('fs');
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const { router: pageRouter } = require('./routes/pages');
const { shared, pageByKey } = require('./src/data/site');

const app = express();
const PORT = process.env.PORT || 3000;

/**
 * On Vercel, @vercel/node may place this file under api/ while includeFiles
 * extracts views/public next to the function root — __dirname alone can miss views.
 */
function resolveAppRoot() {
    const headMarker = path.join('views', 'partials', 'head.ejs');
    const roots = [...new Set([
        __dirname,
        path.join(__dirname, '..'),
        process.cwd(),
    ])];
    for (const root of roots) {
        if (fs.existsSync(path.join(root, headMarker))) {
            return root;
        }
    }
    return __dirname;
}

const appRoot = resolveAppRoot();

if (process.env.VERCEL) {
    app.set('trust proxy', 1);
}

/**
 * express-rate-limit's default keyGenerator validates request.ip + trust proxy
 * against X-Forwarded-For. On Vercel, req.ip is often unset until trust proxy
 * is correct, and v7's validations can still throw — so we key explicitly from
 * proxy headers and bypass those checks entirely.
 */
function rateLimitClientKey(req) {
    const xff = req.headers['x-forwarded-for'];
    if (typeof xff === 'string' && xff.trim()) {
        return xff.split(',')[0].trim();
    }
    const realIp = req.headers['x-real-ip'];
    if (typeof realIp === 'string' && realIp.trim()) {
        return realIp.trim();
    }
    if (req.ip) {
        return String(req.ip);
    }
    const socketIp = req.socket && req.socket.remoteAddress;
    if (socketIp) {
        return String(socketIp);
    }
    return 'local-unknown';
}

app.set('view engine', 'ejs');
app.set('views', path.join(appRoot, 'views'));

app.use((req, res, next) => {
    res.locals.nonce = crypto.randomBytes(16).toString('base64');
    res.locals.site = shared;
    next();
});

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", 'https://api.fontshare.com'],
            fontSrc: ["'self'", 'https://cdn.fontshare.com'],
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

app.use((req, res, next) => {
    res.locals.currentPath = req.path;
    if (process.env.VERCEL_GIT_COMMIT_SHA) {
        res.setHeader('X-Deployment-Git-SHA', process.env.VERCEL_GIT_COMMIT_SHA.slice(0, 7));
    }
    next();
});

const rateLimitShared = {
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => rateLimitClientKey(req),
    // V7 validations are brittle behind serverless / varying proxy headers; we key manually above.
    validate: false,
};

const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 150,
    message: {
        error: 'Too many requests from this IP, please try again later.',
    },
    ...rateLimitShared,
});

const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: {
        error: 'Too many messages sent. Please try again in an hour.',
    },
    ...rateLimitShared,
});

function buildSitemapXml() {
    const base = (process.env.SITE_URL || 'https://portfolio-website-nu-navy-16.vercel.app').replace(/\/+$/, '');
    const lastmod = new Date().toISOString().slice(0, 10);
    const escapeXml = (value) => String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');

    const urls = [
        { loc: `${base}/`, priority: '1.0' },
        { loc: `${base}/about`, priority: '0.6' },
        { loc: `${base}/tutoring`, priority: '0.8' },
        { loc: `${base}/ai-consulting`, priority: '0.8' },
        { loc: `${base}/projects`, priority: '0.6' },
        { loc: `${base}/social-media`, priority: '0.6' },
        { loc: `${base}/contact`, priority: '0.8' },
    ];

    const urlEntries = urls.map((entry) => (
        `  <url>\n    <loc>${escapeXml(entry.loc)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${entry.priority}</priority>\n  </url>`
    )).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;
}

app.get('/sitemap.xml', (req, res) => {
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300');
    res.send(buildSitemapXml());
});

// Shorter cache for built CSS/JS so deploys are visible without a hard refresh.
app.use('/assets', express.static(path.join(appRoot, 'public', 'assets'), {
    maxAge: '5m',
    etag: true,
}));

app.use(express.static(path.join(appRoot, 'public'), {
    maxAge: '1d',
    etag: true,
}));

// Only rate-limit API traffic — applying the limiter globally broke HTML pages on Vercel.
app.use('/api', generalLimiter);

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
    body('inquiry_type')
        .trim()
        .notEmpty().withMessage('Inquiry type is required')
        .isIn(['tutoring', 'ai-consulting', 'creator', 'other']).withMessage('Please select a valid inquiry type'),
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

    const { name, email, inquiry_type, message } = req.body;

    try {
        console.log('Contact form submission:', {
            name,
            email,
            inquiryType: inquiry_type,
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
    res.setHeader('Cache-Control', 'private, no-cache, must-revalidate');
    res.render('pages/404', {
        site: shared,
        page: pageByKey('contact'),
        year: new Date().getFullYear(),
        notFoundMeta: {
            title: 'Page Not Found | PJ Dailey',
            description: 'The page you requested could not be found.',
            canonical: `${shared.siteUrl}${req.originalUrl}`,
            ogImage: `${shared.siteUrl}/assets/og-image.png`,
            structuredData: [],
        },
    });
});

app.use((err, req, res, next) => {
    console.error('Server error:', err);
    if (res.headersSent) {
        return next(err);
    }
    const wantsJson = req.path.startsWith('/api')
        || (req.headers.accept && String(req.headers.accept).includes('application/json'));
    const payload = {
        error: 'An unexpected error occurred. Please try again later.',
    };
    if (process.env.EXPOSE_SERVER_ERRORS === '1') {
        payload.detail = err && err.message ? String(err.message) : 'unknown';
        if (err && err.code) {
            payload.code = err.code;
        }
    }
    if (wantsJson) {
        return res.status(500).json(payload);
    }
    return res.status(500).type('html').send(
        `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Error</title></head>`
        + `<body><h1>Something went wrong</h1><p>${payload.error}</p></body></html>`,
    );
});

if (require.main === module) {
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
}

module.exports = app;
