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
    brandStatement: 'PJ Dailey - Math and CS tutor, AI consultant, and builder for students and small businesses.',
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
            kicker: 'TUTOR | AI CONSULTANT | BUILDER',
            title: 'Better results for students and simpler AI systems for small businesses.',
            description: 'High school and college students get structured math and computer science support that builds confidence, understanding, and stronger academic performance. Small business owners get practical AI systems that reduce repetitive work, save time, and make day-to-day operations easier to run.',
            primaryCta: { label: 'Explore Tutoring', href: '/tutoring' },
            secondaryCta: { label: 'Explore AI Systems', href: '/ai-consulting' },
            stats: [
                { label: 'Focus Areas', value: 'Math & CS tutoring + AI systems' },
                { label: 'Location', value: 'Pearland, TX' },
                { label: 'Audience', value: 'High school/college students + small business owners' },
            ],
        },
        serviceCards: [
            {
                title: 'Tutoring',
                description: 'Structured support for math, computer science, test prep, and study workflows that helps students understand the material and perform better under pressure.',
                bullets: [
                    'Algebra through Calculus II, Linear Algebra, SAT/ACT Math, and core computer science topics.',
                    'Sessions built around diagnosis, concept gaps, and repeatable problem-solving habits.',
                    'Best for students who want stronger grades, better confidence, and a clearer plan.',
                ],
                href: '/tutoring',
            },
            {
                title: 'AI Consulting',
                description: 'Practical AI systems for small teams that want to reduce manual work, speed up routine tasks, and make operations easier to manage.',
                bullets: [
                    'Workflow design, automation setup, and agent-style systems for recurring business tasks.',
                    'Projects start with one real process so the result is useful immediately, not theoretical.',
                    'Best for owners who want leverage without hiring a large technical team.',
                ],
                href: '/ai-consulting',
            },
            {
                title: 'Social Media',
                description: 'Educational content that explains AI tools, coding, and productivity systems in plain language for people who want to learn and apply them.',
                bullets: [
                    'AI education, tech tutorials, workflow breakdowns, and beginner-friendly coding content.',
                    'Built to make technical ideas practical instead of abstract or overhyped.',
                    'Best for audiences who want useful examples they can try right away.',
                ],
                href: '/social-media',
            },
        ],
    },
    about: {
        path: '/about',
        title: 'About Me | PJ Dailey',
        description: 'About PJ Dailey: Pearland, TX tutor and AI consultant focused on clear teaching, practical systems, and honest technical execution.',
        bio: 'I am PJ Dailey, a tutor and AI consultant based in Pearland, TX. I help students understand difficult math and computer science material through structured, concept-first sessions, and I help small teams build practical AI workflows they can actually use. The common thread is simple: explain things clearly, build around real needs, and keep the work grounded.',
        education: [
            'Undergraduate at St. Edward\'s University.',
            'Relevant study includes computer science foundations such as data structures, algorithms, systems, and applied AI tooling.',
        ],
        athletics: 'I was also a Division II baseball athlete at St. Edward\'s University. That background still shapes how I work: prepared, direct, coachable, and consistent over time.',
    },
    tutoring: {
        path: '/tutoring',
        title: 'Tutoring | PJ Dailey',
        description: 'Suite-based tutoring and coaching for math, computer science, test prep, AI workflows, and long-term mentorship.',
        subjects: [
            'Algebra I & II',
            'Geometry',
            'Pre-Calculus',
            'Calculus I & II',
            'AP Calculus AB/BC',
            'AP Statistics',
            'SAT / ACT prep',
            'Python',
            'Java',
            'C',
            'Data Structures & Algorithms',
            'Web development',
            'Databases',
            'Project help',
            'AI study systems',
            'Agentic workflows',
        ],
        pricingIntro: 'Choose the suite that best matches the support you need, from math mastery and test prep to technical project coaching, mentorship, and student AI systems.',
        pricingSuites: [
            {
                title: 'Scholars Suite',
                subtitle: 'High School & AP Math Mastery',
                sections: [
                    {
                        title: '1-on-1 Sessions',
                        kind: 'rates',
                        items: [
                            { label: 'Virtual', price: '$80/hr' },
                            { label: 'In-Person', price: '$100/hr' },
                        ],
                    },
                    {
                        title: 'Small Group (2-4 students)',
                        kind: 'rates',
                        items: [
                            { label: 'Virtual', price: '$50/student/hr' },
                            { label: 'In-Person', price: '$60/student/hr' },
                        ],
                    },
                ],
            },
            {
                title: 'Performance Suite',
                subtitle: 'SAT/ACT Test Prep',
                sections: [
                    {
                        title: '1-on-1 Coaching',
                        kind: 'rates',
                        items: [
                            { label: 'Virtual', price: '$120/hr' },
                            { label: 'In-Person', price: '$140/hr' },
                        ],
                    },
                    {
                        title: 'Small Group (2-4 students)',
                        kind: 'rates',
                        items: [
                            { label: 'Virtual', price: '$70/student/hr' },
                            { label: 'In-Person', price: '$80/student/hr' },
                        ],
                    },
                    {
                        title: 'Packages',
                        kind: 'rates',
                        items: [
                            { label: '10-Hour Virtual Group Package', price: '$600/student' },
                            { label: '10-Hour In-Person Group Package', price: '$700/student' },
                            { label: '10-Hour 1-on-1 Package', price: '$1,100' },
                            { label: '20-Hour 1-on-1 Package', price: '$2,000' },
                        ],
                    },
                ],
            },
            {
                title: 'Engineering Suite',
                subtitle: 'Computer Science, Coding, Algorithms, Projects',
                sections: [
                    {
                        title: '1-on-1 Sessions',
                        kind: 'rates',
                        items: [
                            { label: 'Virtual', price: '$100-$150/hr' },
                            { label: 'In-Person', price: '$120-$150/hr' },
                        ],
                    },
                    {
                        title: 'Small Group (2-4 students)',
                        kind: 'rates',
                        items: [
                            { label: 'Virtual', price: '$60/student/hr' },
                            { label: 'In-Person', price: '$75/student/hr' },
                        ],
                    },
                    {
                        title: 'Project-Based Support',
                        kind: 'rates',
                        items: [
                            { label: 'Debugging', price: '$150/hr' },
                            { label: 'Full Project Guidance', price: '$300-$600/project' },
                        ],
                    },
                ],
            },
            {
                title: 'Executive Mentorship Suite',
                subtitle: 'A 6-Week Elite Academic + Technical Accelerator',
                sections: [
                    {
                        title: 'Includes',
                        kind: 'bullets',
                        items: [
                            'Weekly 1-on-1 coaching (virtual or in-person)',
                            'Unlimited Q&A + assignment help',
                            'AI-powered study system (custom-built)',
                            'Personalized academic + career roadmap',
                            'College prep + essay guidance',
                            'Project coaching (coding, research, AI workflows)',
                            'Parent progress reports',
                            'Priority scheduling',
                            'Access to your private resource library',
                        ],
                    },
                    {
                        title: 'Flat Rate (Updated)',
                        kind: 'rates',
                        items: [
                            { label: 'Program', price: '$3,000 for 6 weeks' },
                            { label: 'Format', price: 'Virtual or in-person - same price' },
                            { label: 'Positioning', price: 'No ranges, no variability, clean and premium' },
                        ],
                    },
                ],
            },
            {
                title: 'AI Scholars Suite',
                subtitle: 'Student AI Tutoring — published rates',
                sections: [
                    {
                        title: 'Student AI Tutoring',
                        kind: 'comparison',
                        columns: ['Virtual', 'In-Person'],
                        rows: [
                            { label: 'AI Agent Setup (Student Version)', values: ['$200/hr', '$250/hr'] },
                            { label: 'AI Workflow Building (Student Version)', values: ['$200/hr', '$250/hr'] },
                            { label: 'AI for Data Extrapolation & Analysis', values: ['$200/hr', '$250/hr'] },
                            { label: 'AI Coding Tools & AI Builders', values: ['$200/hr', '$250/hr'] },
                            { label: 'AI for Research, Writing, Math, and Academics', values: ['$200/hr', '$250/hr'] },
                        ],
                    },
                    {
                        title: 'Small Group AI Tutoring (2-4 students)',
                        kind: 'rates',
                        items: [
                            { label: 'Virtual Group', price: '$100/student/hr' },
                            { label: 'In-Person Group', price: '$125/student/hr' },
                        ],
                    },
                    {
                        title: 'AI Accelerator (4 Weeks)',
                        kind: 'bullets',
                        items: [
                            'Weekly 1-on-1 AI tutoring',
                            'Personalized AI Learning Roadmap',
                            'Unlimited Q&A',
                        ],
                        footer: { label: 'Price', price: '$1,000 flat (virtual or in-person)' },
                    },
                    {
                        title: 'Student AI Project Coaching',
                        kind: 'rates',
                        items: [
                            { label: 'Virtual or In-Person', price: '$400/hr' },
                        ],
                    },
                ],
            },
        ],
        addOns: [
            { label: 'Homework Review', price: '$40' },
            { label: 'Parent Progress Report', price: '$50' },
            { label: 'Priority Scheduling', price: '$30/month' },
            { label: 'Custom Study Plan', price: '$75' },
            { label: 'AI-Powered Study System', price: '$150' },
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
        pricingTitle: 'AI Innovation Suite',
        pricingIntro: 'Consulting-level AI services for strategy, agentic workflows, and custom automation systems.',
        consultingRates: [
            {
                title: 'AI Coaching (Consulting)',
                rates: [
                    { label: 'Virtual', price: '$200/hr' },
                    { label: 'In-Person', price: '$250/hr' },
                ],
            },
            {
                title: 'Agentic Workflow Design',
                rates: [
                    { label: 'Virtual', price: '$500/hr' },
                    { label: 'In-Person', price: '$600/hr' },
                ],
            },
            {
                title: 'Claw Agent Setup',
                rates: [
                    { label: 'Virtual', price: '$1,000/hr' },
                    { label: 'In-Person', price: '$1,200/hr' },
                ],
            },
        ],
        buildoutTitle: 'Custom AI System Buildout (Consulting)',
        buildoutTiers: [
            {
                title: 'Starter Automation System',
                price: '$1,500-$2,500',
                bullets: [
                    'Single-agent or simple workflow',
                ],
                examples: 'study system, note pipeline, simple retrieval agent',
            },
            {
                title: 'Professional Automation System',
                price: '$3,000-$5,000',
                bullets: [
                    'Multi-step workflows or multi-tool integrations',
                ],
                examples: 'multi-agent workflow, data pipelines, dashboards',
            },
            {
                title: 'Enterprise Automation System',
                price: '$7,500-$12,000+',
                bullets: [
                    'Advanced, multi-agent, business-grade systems',
                ],
                examples: 'full automation suite, RAG systems, multi-agent orchestration',
            },
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
            {
                title: 'AI education',
                description: 'Breakdowns of AI tools, prompting strategies, and automation systems explained for people who want to use them practically — not just understand them theoretically.',
            },
            {
                title: 'Tech tutorials',
                description: 'Step-by-step walkthroughs of developer tools, VS Code setups, terminal basics, and productivity software aimed at students and early-career builders.',
            },
            {
                title: 'Productivity workflows',
                description: 'Systems for managing tasks, reducing context-switching, and building a structure for deep work using tools like Notion, calendar blocking, and AI assistants.',
            },
            {
                title: 'Coding content',
                description: 'Beginner-friendly programming explanations covering Python, JavaScript, data structures, and problem-solving patterns — built from first principles.',
            },
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
