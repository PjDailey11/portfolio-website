const express = require('express');
const { shared, projects, pageByKey } = require('../src/data/site');

const router = express.Router();

function renderPage(req, res, view, pageKey, extra = {}) {
    res.setHeader('Cache-Control', 'private, no-cache, must-revalidate');
    res.render(`pages/${view}`, {
        site: shared,
        page: pageByKey(pageKey),
        projects,
        year: new Date().getFullYear(),
        extraScripts: [],
        ...extra,
    });
}

router.get('/', (req, res) => {
    renderPage(req, res, 'home', 'home');
});

router.get('/about', (req, res) => {
    renderPage(req, res, 'about', 'about');
});

router.get('/tutoring', (req, res) => {
    renderPage(req, res, 'tutoring', 'tutoring');
});

router.get('/ai-consulting', (req, res) => {
    renderPage(req, res, 'ai-consulting', 'aiConsulting');
});

router.get('/projects', (req, res) => {
    renderPage(req, res, 'projects', 'projectsPage');
});

router.get('/social-media', (req, res) => {
    renderPage(req, res, 'social-media', 'socialMedia');
});

router.get('/contact', (req, res) => {
    renderPage(req, res, 'contact', 'contact', {
        extraScripts: ['/js/contact.js'],
    });
});

module.exports = {
    router,
    renderPage,
};
