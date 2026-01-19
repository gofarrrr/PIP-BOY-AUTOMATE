module.exports = {
    // Site basics
    siteTitle: 'Automation Decision Frameworks',
    srcDir: 'docs',
    outputDir: 'site',

    // Theme - dark mode by default, will add custom PIP-BOY CSS
    theme: {
        name: 'default',
        defaultMode: 'dark',
        enableModeToggle: true
    },

    // Multi-framework navigation structure
    navigation: [
        {
            title: 'Home',
            path: '/',
            icon: 'home'
        },

        // FRAMEWORKS TAB GROUP
        {
            title: 'Frameworks',
            icon: 'git-branch',
            path: './frameworks/',
            collapsible: true,
            children: [
                {
                    title: 'Frequency Analysis',
                    path: './frameworks/frequency-analysis/',
                    icon: 'clock',
                    // This is the current PIP-BOY flowchart
                },
                // Future frameworks can be added here:
                // { title: 'ARC Method', path: './frameworks/arc/', icon: 'check-circle' },
                // { title: 'Vandra 6-Step', path: './frameworks/vandra/', icon: 'list-ordered' },
                // { title: 'Ripla Spectrum', path: './frameworks/ripla/', icon: 'layers' },
            ],
        },

        // DECISION NODES - for deep-dive reference
        {
            title: 'Decision Nodes',
            icon: 'help-circle',
            path: './nodes/',
            collapsible: true,
            children: [
                { title: 'Do I do this often?', path: './nodes/often', icon: 'repeat' },
                { title: 'Do I enjoy it?', path: './nodes/enjoy', icon: 'heart' },
                { title: 'Worth Augmenting?', path: './nodes/augmenting', icon: 'zap' },
                { title: 'Is it complex?', path: './nodes/complex', icon: 'puzzle' },
                { title: 'Know the steps?', path: './nodes/steps', icon: 'list' },
                { title: 'Clear success criteria?', path: './nodes/success', icon: 'target' },
                { title: 'Needs judgment?', path: './nodes/judgment', icon: 'brain' },
                { title: 'Risk?', path: './nodes/risk', icon: 'alert-triangle' },
            ],
        },

        // OUTCOMES
        {
            title: 'Outcomes',
            icon: 'flag',
            path: './outcomes/',
            collapsible: true,
            children: [
                { title: 'AUTOMATE', path: './outcomes/automate', icon: 'cpu' },
                { title: 'AUGMENT', path: './outcomes/augment', icon: 'users' },
                { title: 'DO IT YOURSELF', path: './outcomes/diy', icon: 'hand' },
            ],
        },

        // External links
        {
            title: 'GitHub',
            path: 'https://github.com/mgks/docmd',
            icon: 'github',
            external: true
        },
    ],

    // Footer
    footer: '© ' + new Date().getFullYear() + ' Automation Decision Frameworks',
};
