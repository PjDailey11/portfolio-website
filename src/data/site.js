const siteUrl = process.env.SITE_URL || 'https://portfolio-website-nu-navy-16.vercel.app';

const socialLinks = [
    {
        label: 'TikTok',
        href: 'https://www.tiktok.com/@simplydailey',
        icon: 'tiktok',
    },
    {
        label: 'Instagram',
        href: 'https://www.instagram.com/simplydailey',
        icon: 'instagram',
    },
    {
        label: 'YouTube',
        href: 'https://www.youtube.com/@simplydailey',
        icon: 'youtube',
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/pjdailey/',
        icon: 'linkedin',
    },
    {
        label: 'GitHub',
        href: 'https://github.com/PjDailey11',
        icon: 'github',
    },
];

const navLinks = [
    { href: '/about', label: 'About Me' },
    { href: '/tutoring', label: 'Tutoring' },
    { href: '/ai-consulting', label: 'AI Consulting' },
    { href: '/projects', label: 'Projects' },
    { href: '/social-media', label: 'Social Media' },
    { href: '/contact', label: 'Contact' },
];

const shared = {
    siteUrl,
    brandName: 'PJ Dailey',
    brandStatement: 'PJ Dailey - Tutor, AI Consultant, Full-Stack Developer, and Content Creator.',
    locationLabel: 'Pearland, TX',
    navLinks,
    socialLinks,
    footerLinks: [
        {
            title: 'Explore',
            links: navLinks,
        },
        {
            title: 'Connect',
            links: [
                { href: '/contact', label: 'Book a Call' },
                { href: 'https://github.com/PjDailey11', label: 'GitHub' },
                { href: 'mailto:pjdailey13@gmail.com', label: 'pjdailey13@gmail.com' },
            ],
        },
    ],
    contact: {
        phoneLabel: '281-961-9051',
        phoneHref: 'tel:2819619051',
        emailLabel: 'pjdailey13@gmail.com',
        emailHref: 'mailto:pjdailey13@gmail.com',
        location: 'Pearland, TX',
        bookingLabel: 'Booking link coming soon',
        bookingHref: '#booking-placeholder',
    },
};

const projects = [
    {
        title: 'RFID Security Toolkit',
        repoUrl: 'https://github.com/PjDailey11/rfid-security-toolkit',
        type: 'Educational security tooling',
        summary: 'Authorized-lab tooling for studying legacy physical-access weaknesses, with Wiegand decoding, MIFARE Classic analysis, and safety-bounded lab guidance.',
        stack: ['Python', 'CLI tooling', 'Raspberry Pi GPIO', 'RFID / access control'],
        highlights: [
            'Decodes 26-bit Wiegand frames with parity checks and optional Raspberry Pi GPIO capture.',
            'Parses MIFARE Classic dumps, validates access bytes, and flags default trailer keys from a dictionary.',
            'Pairs code with lab-safe scenario docs and mitigation guidance for defenders and instructors.',
        ],
    },
    {
        title: 'Face Security Pipeline',
        repoUrl: 'https://github.com/PjDailey11/face-security-pipeline',
        type: 'Privacy-conscious computer vision',
        summary: 'On-device identity verification pipeline with YOLOv8 face detection, embeddings, optional anti-spoofing, and FastAPI delivery.',
        stack: ['Python', 'FastAPI', 'YOLOv8', 'facenet-pytorch', 'ChromaDB'],
        highlights: [
            'Keeps biometric embeddings local and exposes metadata only, not raw vectors, to clients.',
            'Supports alignment, cosine-similarity identity verification, optional anti-spoof scoring, and MJPEG/WebSocket streaming.',
            'Includes optional PostgreSQL attendance logging while preserving a privacy-first default posture.',
        ],
    },
    {
        title: 'Neural Style Transfer Toolkit',
        repoUrl: 'https://github.com/PjDailey11/neural-style-transfer',
        liveUrl: 'https://web-six-delta-90.vercel.app',
        type: 'PyTorch vision toolkit',
        summary: 'Production-oriented neural style transfer toolkit spanning classical Gatys optimization, fast AdaIN, and temporally stabilized video stylization.',
        stack: ['Python', 'PyTorch', 'Streamlit', 'Docker', 'Next.js project hub'],
        highlights: [
            'Implements multiple stylization modes including Gatys, AdaIN, and video pipelines with temporal smoothing.',
            'Ships CLI entrypoints, a Streamlit demo, and Docker support for reproducible experimentation.',
            'Separates the heavy vision toolkit from a lightweight Next.js project hub used for docs and presentation.',
        ],
    },
    {
        title: 'bitcoin-node-pure',
        repoUrl: 'https://github.com/PjDailey11/bitcoin-node-pure',
        type: 'Protocol engineering demo',
        summary: 'Learning-oriented Bitcoin codebase that keeps core cryptography and transaction logic stdlib-only while layering a friendlier CLI on top.',
        stack: ['Python', 'secp256k1 primitives', 'P2P networking', 'SQLite cache'],
        highlights: [
            'Covers ECC, hashes, legacy transactions, and P2P framing under a clean package structure.',
            'Adds a richer CLI with environment checks, key generation, tx encoding flows, and peer diagnostics.',
            'Positions scope honestly as an engineering demonstration rather than a full consensus node.',
        ],
    },
];

const pageContent = {
    home: {
        path: '/',
        title: 'PJ Dailey | Tutor, AI Consultant, Full-Stack Developer',
        description: 'PJ Dailey helps students master math and computer science while helping businesses design AI workflows that save time and increase output.',
        hero: {
            kicker: 'Tutor, consultant, builder',
            title: 'PJ Dailey - Tutor, AI Consultant, Full-Stack Developer, and Content Creator.',
            description: 'I help students master hard subjects, help businesses implement practical AI systems, and build web products that turn ideas into repeatable workflows.',
            primaryCta: { label: 'Book a Call', href: '/contact' },
            secondaryCta: { label: 'Explore Services', href: '/tutoring' },
            tertiaryCta: { label: 'See Projects', href: '/projects' },
            stats: [
                { label: 'Focus Areas', value: 'Tutoring + AI systems' },
                { label: 'Location', value: 'Pearland, TX' },
                { label: 'Audience', value: 'Students, creators, small businesses' },
            ],
        },
        serviceCards: [
            {
                title: 'About Me',
                description: 'Learn about the academic, technical, and creator background behind the business.',
                href: '/about',
            },
            {
                title: 'Tutoring',
                description: 'Math, CS, test prep, AI workflows, and problem-solving support for grades 9-12 and college-level topics.',
                href: '/tutoring',
            },
            {
                title: 'AI Consulting',
                description: 'Workflow design, automation setup, agentic systems, and AI-enabled productivity for modern businesses.',
                href: '/ai-consulting',
            },
            {
                title: 'Social Media',
                description: 'AI education, tech tutorials, productivity systems, and coding content across short-form platforms.',
                href: '/social-media',
            },
        ],
    },
    about: {
        path: '/about',
        title: 'About Me | PJ Dailey',
        description: 'About PJ Dailey: undergraduate student, tutor, AI consultant, full-stack developer, and content creator.',
        bio: 'Hi, I am PJ Dailey - an undergraduate student, tutor, AI consultant, and full-stack developer. I help students master math, computer science, and standardized tests, and I help businesses integrate AI workflows that save time, reduce costs, and increase output. I am also a content creator focused on AI education, productivity, and tech.',
        accomplishments: [
            'Runs a tutoring business for grades 9-12.',
            'Tutors advanced subjects: AI workflows, SAT/ACT, Algebra through Calculus II, Linear Algebra, Data Structures, Algorithms, and LeetCode.',
            'Built multiple full-stack Express / EJS / SQLite apps.',
            'Experienced in AJAX, DOM manipulation, deployment, and C programming.',
            'Strong academic problem-solving in linear algebra, logic proofs, and number theory.',
            'Growing social media presence across TikTok, Instagram, and YouTube.',
        ],
        accolades: [
            'Trusted by dozens of students and parents.',
            'Known for clear, step-by-step explanations.',
            'Recognized for building efficient AI workflows for students and small businesses.',
        ],
        education: [
            'Undergraduate student at St. Edward\'s University.',
            'Coursework includes COSC-2329, algorithms, data structures, systems, and AI tools.',
        ],
        athletics: 'Former college baseball athlete.',
    },
    tutoring: {
        path: '/tutoring',
        title: 'Tutoring | PJ Dailey',
        description: 'Tutoring services for math, computer science, test prep, and AI workflows for students.',
        subjects: [
            'Algebra I & II',
            'Geometry',
            'Pre-Calculus',
            'Calculus I & II',
            'Linear Algebra',
            'SAT Math',
            'ACT Math',
            'Computer Science (Python, JavaScript, C)',
            'Data Structures & Algorithms',
            'LeetCode prep',
            'AI workflows for students',
        ],
        pricing: [
            { title: 'Standard tutoring', price: '$60/hr', description: 'Core high-school and college-prep support with structured walkthroughs and homework help.' },
            { title: 'Advanced CS / AI / college math', price: '$75/hr', description: 'Deeper support for technical coursework, algorithm prep, and AI workflow instruction.' },
            { title: 'Intensive exam prep', price: '$90/hr', description: 'Focused SAT / ACT prep sessions with higher-intensity pacing and target-area review.' },
        ],
    },
    aiConsulting: {
        path: '/ai-consulting',
        title: 'AI Consulting | PJ Dailey',
        description: 'AI consulting services for education, creators, startups, and small businesses.',
        services: [
            'AI workflow design',
            'Automation setup',
            'Agentic workflows',
            'AI tools for business operations',
            'AI for content creation',
            'AI for tutoring businesses',
            'AI for productivity systems',
        ],
        industries: ['Education', 'Small businesses', 'Creators', 'Startups', 'Students'],
        workflows: [
            {
                title: 'Automated study set generation',
                description: 'Turn notes, lecture recordings, and textbook sections into organized practice sets, flashcards, and review guides so students can study from cleaner material faster.',
            },
            {
                title: 'Social media content pipelines',
                description: 'Build repeatable systems for idea capture, script drafting, clip selection, and repurposing so creators spend less time juggling tools and more time publishing.',
            },
            {
                title: 'Lead-gen automation',
                description: 'Connect forms, CRM intake, qualification rules, and follow-up messaging so new leads are sorted quickly and handoffs stop depending on manual copy-paste.',
            },
            {
                title: 'AI-powered tutoring systems',
                description: 'Design support flows for lesson planning, homework breakdowns, practice generation, and student follow-up that keep the teaching process personal while removing admin drag.',
            },
            {
                title: 'Research automation',
                description: 'Set up workflows that gather sources, summarize findings, extract action items, and package outputs into decision-ready briefs for faster analysis.',
            },
        ],
        pricing: [
            { title: 'Hourly consulting', price: '$100/hr', description: 'For strategy, audits, and live workflow design sessions.' },
            { title: 'Workflow buildout', price: '$350', description: 'For a scoped workflow delivered as a practical repeatable system.' },
            { title: 'Full system setup', price: '$750', description: 'For end-to-end implementation of a broader AI operations stack.' },
        ],
    },
    projectsPage: {
        path: '/projects',
        title: 'Projects | PJ Dailey',
        description: 'Recent public GitHub projects by PJ Dailey spanning security tooling, privacy-conscious computer vision, neural style transfer, and Bitcoin systems learning.',
    },
    socialMedia: {
        path: '/social-media',
        title: 'Social Media | PJ Dailey',
        description: 'Social media portfolio for AI education, productivity workflows, coding content, and tech tutorials.',
        platforms: ['TikTok', 'Instagram', 'YouTube'],
        contentTypes: [
            'AI education',
            'Tech tutorials',
            'Productivity workflows',
            'Coding content',
            'Study systems',
        ],
    },
    contact: {
        path: '/contact',
        title: 'Contact | PJ Dailey',
        description: 'Contact PJ Dailey for tutoring, AI consulting, creator collaborations, and project discussions.',
    },
};

function buildStructuredData(pageKey) {
    const base = [
        {
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: shared.brandName,
            description: shared.brandStatement,
            address: {
                '@type': 'PostalAddress',
                addressLocality: 'Pearland',
                addressRegion: 'TX',
            },
            sameAs: socialLinks.map((item) => item.href),
        },
        {
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: 'PJ Dailey Tutoring & AI Consulting',
            areaServed: ['Texas', 'Remote'],
            serviceType: ['Tutoring', 'AI consulting', 'Content creation'],
            url: siteUrl + pageContent[pageKey].path,
        },
        {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: shared.brandName,
            url: siteUrl,
        },
    ];

    return base;
}

function pageByKey(pageKey) {
    const page = pageContent[pageKey];
    return {
        ...page,
        canonical: siteUrl + page.path,
        ogImage: `${siteUrl}/assets/og-placeholder.svg`,
        structuredData: buildStructuredData(pageKey),
    };
}

module.exports = {
    shared,
    projects,
    pageContent,
    pageByKey,
};
