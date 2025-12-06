import github from "../images/GitHub-Mark/PNG/GitHub-Mark-120px-plus.png";
import linkedin from "../images/LinkedIn-Logos/In/Digital/Blue/2x/In-Blue-40@2x.png";
import email from "../images/envelope-solid.svg";

// Contact Links Data
const contactLinks = [
    {
        id: 'github',
        platform: 'GitHub',
        url: 'https://github.com/jtroshynski',
        icon: github,
        ariaLabel: 'Visit Jeremy\'s GitHub profile'
    },
    {
        id: 'linkedin',
        platform: 'LinkedIn',
        url: 'https://www.linkedin.com/in/jeremytroshynski/',
        icon: linkedin,
        ariaLabel: 'Visit Jeremy\'s LinkedIn profile'
    },
    {
        id: 'email',
        platform: 'Email',
        url: 'mailto:jtroshynski@gmail.com',
        icon: email,
        ariaLabel: 'Send an email to Jeremy'
    }
];

export default contactLinks;
