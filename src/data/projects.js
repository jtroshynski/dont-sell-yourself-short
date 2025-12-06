import primeGamingSettings from '../images/PrimeGamingSettings.png';

// Projects Data
const projects = [
    {
        id: 'prime-gaming-settings',
        title: 'Prime Gaming Settings Page',
        company: 'Prime Gaming',
        description: 'Designed and built the Prime Gaming settings page featuring tabbed navigation for Account Settings, Linked Twitch Accounts, and Notifications. Implemented granular notification preferences with toggle controls for game-specific alerts.',
        technologies: ['React', 'TypeScript', 'GraphQL', 'Java', 'AWS'],
        impact: 'Provided users with comprehensive control over their Prime Gaming experience and notification preferences',
        link: null,
        image: primeGamingSettings
    },
    {
        id: 'imdb-badges-modernization',
        title: 'IMDb User Profile Badges Modernization',
        company: 'IMDb',
        description: 'Led the complete redesign of IMDb\'s user profile badges, transforming the visual experience from outdated to modern. Rebuilt both the backend systems and frontend interface while working with visual and UX designers. Added support for custom badge images and streamlined the badge creation process, making it significantly faster for the team to launch new badges. Modernized legacy systems by adding security features and updating outdated infrastructure.',
        technologies: ['React', 'TypeScript', 'GraphQL', 'Java', 'AWS', 'Spring', 'Kiro'],
        impact: 'Delivered a fresh, modern look for millions of IMDb users. Community response: "These new badges look fantastic and have a modern feel" and "What a lovely design."',
        link: null,
        image: require('../images/IMDb/newIMDbUserProfile.png'),
        imageBefore: require('../images/IMDb/oldIMDbUserProfile.png')
    }
];

export default projects;
