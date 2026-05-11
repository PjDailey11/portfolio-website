const express = require('express');
const { shared, projects, pageByKey } = require('../src/data/site');

const router = express.Router();

function renderPage(res, view, pageKey, extra = {}) {
    res.render(`pages/${view}`, {
        site: shared,
        page: pageByKey(pageKey),
        projects,
        currentPath: pageByKey(pageKey).path,
        year: new Date().getFullYear(),
        extraScripts: [],
        ...extra,
    });
}

router.get('/', (req, res) => {
    renderPage(res, 'home', 'home');
});

router.get('/about', (req, res) => {
    renderPage(res, 'about', 'about');
});

router.get('/tutoring', (req, res) => {
    renderPage(res, 'tutoring', 'tutoring');
});

router.get('/ai-consulting', (req, res) => {
    renderPage(res, 'ai-consulting', 'aiConsulting');
});

router.get('/projects', (req, res) => {
    renderPage(res, 'projects', 'projectsPage');
});

router.get('/social-media', (req, res) => {
    renderPage(res, 'social-media', 'socialMedia');
});

router.get('/contact', (req, res) => {
    renderPage(res, 'contact', 'contact', {
        extraScripts: ['/js/contact.js'],
    });
});

module.exports = {
    router,
    renderPage,
};
