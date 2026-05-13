(function () {
    const root = document.documentElement;
    const menuToggle = document.querySelector('[data-menu-toggle]');
    const mobileMenu = document.getElementById('mobile-menu');
    const themeButtons = document.querySelectorAll('[data-theme-toggle]');

    function getActiveTheme() {
        if (root.classList.contains('light')) return 'light';
        if (root.classList.contains('dark')) return 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function setThemeCookie(theme) {
        document.cookie =
            'pj-theme=' +
            encodeURIComponent(theme) +
            '; Max-Age=31536000; SameSite=Lax; Path=/';
    }

    function setTheme(theme) {
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        try {
            setThemeCookie(theme);
        } catch (error) {
            // Ignore cookie failures in restricted environments.
        }
    }

    themeButtons.forEach((button) => {
        button.addEventListener('click', function () {
            setTheme(getActiveTheme() === 'dark' ? 'light' : 'dark');
        });
    });

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function () {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', String(!isExpanded));
            mobileMenu.classList.toggle('hidden', isExpanded);
        });

        mobileMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', function () {
                menuToggle.setAttribute('aria-expanded', 'false');
                mobileMenu.classList.add('hidden');
            });
        });
    }

    document.querySelectorAll('[data-contact-email]').forEach((anchor) => {
        const u = anchor.getAttribute('data-u');
        const d = anchor.getAttribute('data-d');
        const tld = anchor.getAttribute('data-tld');
        if (!u || !d || !tld) return;
        const addr = u + '@' + d + '.' + tld;
        anchor.setAttribute('href', 'mailto:' + addr);
        anchor.textContent = addr;
        anchor.removeAttribute('aria-label');
    });
})();
