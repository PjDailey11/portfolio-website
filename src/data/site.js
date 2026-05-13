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
    brandSubtitle: 'Tutor | AI Consultant | Content Creator',
    locationLabel: 'Remote and local availability',
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
                { href: '/contact', label: 'Contact Form' },
                { href: 'https://github.com/PjDailey11', label: 'GitHub' },
            ],
        },
    ],
    contact: {
        methodLabel: 'Contact form',
        responseLabel: 'Replies after form review',
        availability: 'Remote and local availability',
        bookingHref: '#contact-form',
    },
    githubBrowseVisual: {
        label: 'GitHub',
        src: '/assets/logos/github-logo.jpg',
        alt: 'GitHub logo',
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
                { label: 'Availability', value: 'Remote and local' },
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
        description: 'About PJ Dailey: tutor, AI consultant, and content creator focused on clear teaching, practical systems, and honest technical execution.',
        bio: 'I help students understand difficult math and computer science material through structured, concept-first sessions, and I help small teams build practical AI workflows they can actually use. I also create content around college sports, lifestyle, technical learning, and creator partnerships.',
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
        subjectImages: [
            {
                label: 'PSAT, SAT, and ACT Math',
                src: '/assets/logos/psat-sat-act-logo.png',
                alt: 'PSAT, SAT, and ACT exam logos',
            },
            {
                label: 'Data Structures and Algorithms',
                src: '/assets/logos/dsa-logo.png',
                alt: 'Data structures and algorithms diagram icon',
            },
            {
                label: 'Calculus',
                src: '/assets/logos/calculus-logo.png',
                alt: 'Calculus function graph icon',
            },
        ],
        aiToolImages: [
            {
                label: 'Claude Code',
                src: '/assets/logos/claude-code-logo.png',
                alt: 'Claude Code logo',
            },
            {
                label: 'Cursor',
                src: '/assets/logos/cursor-logo.png',
                alt: 'Cursor IDE logo',
            },
            {
                label: 'OpenClaw',
                src: '/assets/logos/openclaw-logo.png',
                alt: 'OpenClaw logo',
            },
            {
                label: 'Vercel',
                src: '/assets/logos/vercel-logo.jpg',
                alt: 'Vercel logo',
            },
        ],
        pricingIntro: 'Choose the suite that best matches the support you need, from math mastery and test prep to technical project coaching, mentorship, and student AI systems.',
        pricingSuites: [
            {
                title: 'Scholars Suite',
                subtitle: 'High School & AP Math Mastery',
                description: 'Math support for students who need clearer explanations, stronger fundamentals, and better problem-solving habits.',
                bullets: [
                    'Algebra, Geometry, Pre-Calculus, Calculus I/II, AP Calculus, and AP Statistics.',
                    'Homework support, test review, and step-by-step practice that targets the exact concept gap.',
                    'Problem-solving routines that help students show their work, catch mistakes, and build confidence.',
                ],
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
                subtitle: 'PSAT, SAT & ACT Test Prep',
                highlight: 'Also available: PSAT prep',
                description: 'PSAT, SAT, and ACT math prep focused on diagnosing weak areas, improving speed, and building a repeatable test-taking process.',
                bullets: [
                    'Timed practice with review that explains why answers are right or wrong.',
                    'Concept review, calculator strategy, and pacing work for PSAT, SAT, and ACT math sections.',
                    'Mistake analysis and weekly study plans so practice turns into measurable progress.',
                ],
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
                description: 'Computer science tutoring for students learning programming, algorithms, data structures, debugging, and project work.',
                bullets: [
                    'Python, Java, C, web development, databases, data structures, and algorithms.',
                    'Debugging support that teaches students how to reason through errors instead of guessing.',
                    'Project planning, code review, and implementation guidance for coursework or personal builds.',
                ],
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
                description: 'A six-week elite academic and technical accelerator for students who need structured coaching, technical support, and a clear roadmap.',
                bullets: [
                    'Weekly coaching with academic planning, assignment support, and parent progress updates.',
                    'Technical project coaching for coding, research, AI workflows, and portfolio-style work.',
                    'Priority scheduling and a focused roadmap that keeps the student moving between sessions.',
                ],
                sections: [
                    {
                        title: 'Includes',
                        kind: 'bullets',
                        items: [
                            'Weekly 1-on-1 coaching (virtual or in-person)',
                            'Unlimited Q&A + assignment help',
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
                description: 'Student-focused AI tutoring for learners who want to use modern AI tools responsibly for research, coding, studying, and workflow building.',
                bullets: [
                    'AI agents, workflows, research support, coding tools, study systems, and productivity habits.',
                    'Hands-on setup and coaching so students understand how the tools work, not just what to click.',
                    'Academic support that keeps responsible use, learning, and original thinking at the center.',
                ],
                sections: [
                    {
                        title: 'Student AI Tutoring',
                        kind: 'rates',
                        items: [
                            { label: 'Virtual', price: '$200/hr' },
                            { label: 'In-Person', price: '$250/hr' },
                        ],
                    },
                    {
                        title: 'Topics Covered',
                        kind: 'bullets',
                        items: [
                            'AI agent setup for students',
                            'AI workflow building',
                            'AI for data analysis and research',
                            'AI coding tools and builders',
                            'AI for writing, math, and academic support',
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
                ],
            },
        ],
        addOns: [
            { label: 'Homework Review', price: '$40' },
            { label: 'Parent Progress Report', price: '$50' },
            { label: 'Priority Scheduling', price: '$30/month' },
            { label: 'Custom Study Plan', price: '$75' },
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
        tools: [
            {
                label: 'Zapier',
                src: '/assets/logos/zapier-logo.jpg',
                alt: 'Zapier automation platform logo',
            },
            {
                label: 'Make.com',
                src: '/assets/logos/make-logo.png',
                alt: 'Make.com automation platform logo',
            },
            {
                label: 'n8n',
                src: '/assets/logos/n8n-logo.png',
                alt: 'n8n automation platform logo',
            },
        ],
        industries: ['Education', 'Small businesses', 'Creators', 'Startups', 'Students'],
        workflows: [
            {
                title: 'Lead intake and qualification',
                description: 'Route new inquiries from forms, DMs, or email into a structured pipeline with qualification notes and next-step prompts.',
            },
            {
                title: 'Client onboarding automation',
                description: 'Turn signed clients into organized tasks, folders, welcome messages, intake forms, and kickoff reminders.',
            },
            {
                title: 'Invoice and payment follow-up',
                description: 'Track unpaid invoices, draft reminders, and keep payment follow-up consistent without manually checking every account.',
            },
            {
                title: 'CRM cleanup and enrichment',
                description: 'Standardize records, fill missing context, tag priority contacts, and keep sales data easier to search and act on.',
            },
            {
                title: 'Social content production pipeline',
                description: 'Move ideas through scripting, approval, publishing, and repurposing so teams can publish consistently across platforms.',
            },
            {
                title: 'Customer support triage',
                description: 'Summarize tickets, detect urgency, suggest replies, and route issues to the right person faster.',
            },
            {
                title: 'Internal SOP and knowledge-base assistant',
                description: 'Make internal docs searchable so team members can find policies, steps, and repeatable answers quickly.',
            },
            {
                title: 'Sales proposal drafting workflow',
                description: 'Turn discovery notes into scoped proposal drafts, pricing outlines, and follow-up emails with less blank-page friction.',
            },
            {
                title: 'Operations reporting dashboard',
                description: 'Collect updates from recurring tools and summarize pipeline, content, finance, or support metrics in one place.',
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
        buildoutTitle: 'Custom AI System Buildout',
        buildoutIntroBullets: [
            'Scoped automation systems designed around one real business process.',
            'Integrations across forms, CRMs, spreadsheets, content tools, dashboards, and AI assistants.',
            'Deliverables focused on maintainable workflows your team can understand and keep using.',
        ],
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
        description: 'Creator portfolio for NIL, brand deals, affiliate marketing, collaborations, college sports lifestyle, AI education, productivity, and coding content.',
        platforms: ['TikTok', 'Instagram', 'YouTube', 'LinkedIn', 'X'],
        partnershipCategories: ['NIL', 'Brand Deals', 'Affiliate Marketing', 'Collaborations', 'College Sports', 'Lifestyle Content'],
        profileImages: [
            {
                label: 'X profile',
                src: '/assets/profiles/x-profile.png',
                alt: 'PJ Dailey X profile screenshot',
            },
            {
                label: 'LinkedIn profile',
                src: '/assets/profiles/linkedin-profile.png',
                alt: 'PJ Dailey LinkedIn profile screenshot',
            },
            {
                label: 'TikTok profile',
                src: '/assets/profiles/tiktok-profile.png',
                alt: 'PJ Dailey TikTok profile screenshot',
            },
            {
                label: 'YouTube channel',
                src: '/assets/profiles/youtube-profile.png',
                alt: 'PJ Dailey YouTube channel screenshot',
            },
            {
                label: 'Instagram profile',
                src: '/assets/profiles/instagram-profile.png',
                alt: 'PJ Dailey Instagram profile screenshot',
            },
        ],
        contentTypes: [
            {
                title: 'College sports lifestyle',
                description: 'Content around student-athlete life, training, campus routines, and the day-to-day balance of college sports and academics.',
            },
            {
                title: 'NIL and brand partnerships',
                description: 'Partnership-ready content that can connect products, services, and campaigns to a student-athlete and creator audience.',
            },
            {
                title: 'Affiliate marketing',
                description: 'Practical product mentions, demos, and recommendations built around tools, lifestyle, sports, education, and creator workflows.',
            },
            {
                title: 'Collaborations',
                description: 'Flexible creator collaborations for campaigns, platform growth, educational content, and cross-audience storytelling.',
            },
            {
                title: 'AI and productivity education',
                description: 'Breakdowns of AI tools, study systems, productivity workflows, and automation ideas explained in practical language.',
            },
            {
                title: 'Coding and tech tutorials',
                description: 'Beginner-friendly programming and developer-tool content covering coding fundamentals, AI builders, and technical workflows.',
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
