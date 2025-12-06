import { Component } from "react";
import me from "./images/JeremyStylized.png";

import "./css/App.css";

// Import data from separate files
import workExperience from "./data/workExperience";
import projects from "./data/projects";
import skills from "./data/skills";
import contactLinks from "./data/contactLinks";

class App extends Component {
  constructor(props) {
    super(props);

    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';

    this.state = {
      darkMode: savedTheme === 'dark',
      scrollPosition: 0
    };
  }

  componentDidMount() {
    // Apply theme on mount
    this.applyTheme();

    // Set up scroll listener for animations
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    // Clean up scroll listener
    window.removeEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(_prevProps, prevState) {
    // Apply theme when darkMode state changes
    if (prevState.darkMode !== this.state.darkMode) {
      this.applyTheme();
    }
  }

  applyTheme = () => {
    const theme = this.state.darkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  toggleDarkMode = () => {
    this.setState(prevState => ({
      darkMode: !prevState.darkMode
    }));
  }

  handleScroll = () => {
    this.setState({
      scrollPosition: window.scrollY
    });
  }

  render() {
    const { darkMode } = this.state;

    return (
      <div className="App">
        <button
          className="theme-toggle"
          onClick={this.toggleDarkMode}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
        <section className="hero-section">
          <div className="hero-background"></div>
          <div className="hero-content">
            <img src={me} className="hero-image" alt="Jeremy Troshynski" />
            <div className="hero-intro-card">
              <h1 className="hero-name">Jeremy Troshynski</h1>
              <h2 className="hero-title">Full Stack Developer</h2>
            </div>
          </div>
        </section>
        <div className="content-divider" />
        <section className="about-section">
          <h2 className="section-title">About Me</h2>
          <div className="about-card">
            <p className="about-text">
              I'm a Full Stack Developer with a passion for building scalable, user-focused applications.
              With experience at IMDb and Prime Gaming, I've had the opportunity to work on products that
              reach millions of users worldwide. I love tackling complex technical challenges and creating
              elegant solutions that make a real impact.
            </p>
            <p className="about-text">
              When I'm not coding, you'll find me exploring new technologies, contributing to open source,
              or enjoying the great outdoors. I believe in continuous learning and always strive to stay
              current with the latest industry trends and best practices.
            </p>
          </div>
        </section>
        <div className="content-divider" />
        <section className="work-experience-section">
          <h2 className="section-title">Work Experience</h2>
          <div className="timeline">
            {workExperience.map((experience, index) => (
              <div key={experience.id} className="timeline-item" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="experience-card">
                    <div className="experience-header">
                      <h3 className="experience-role">{experience.role}</h3>
                      <span className="experience-company">{experience.company}</span>
                    </div>
                    <div className="experience-dates">
                      {experience.startDate} - {experience.endDate}
                    </div>
                    <p className="experience-description">{experience.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <div className="content-divider" />
        <div className="skills">
          <div className="section-title">Skills</div>
          <ul>
            <li>Java</li>
            <li>React</li>
            <li>HTML / (S)CSS</li>
            <li>AWS</li>
            <li>C#</li>
            <li>Javascript</li>
          </ul>
        </div>
        {/* <div id="projects" className="projects" />
        <Fade right cascade>
          <div className="content-divider" />
        </Fade>

        <div id="resume" className="resume">
          <Fade right cascade>
            <div className="section-title">Resume</div>
          </Fade>
          <div className="resume-box">
            <iframe
              src="https://docs.google.com/document/d/e/2PACX-1vRnUGNSrpAIKEPNn3w3Rea_r9SLjIQV9RYvxR7vU6LPfdPigQhp7u1jVM6Dt1KgLDB4iWDvmp0FqFy0/pub?embedded=true"
              title="resume-iframe"
              width="700"
              frameBorder="0"
            />
          </div>
          <div className="resume-link">
            <a href="https://drive.google.com/file/d/12yuyt2VIPXkoDz22nnaiemYgBCHK7odr/view?usp=sharing">
              Resume
            </a>
          </div>
        </div> */}
        <div className="content-divider" />

        <div id="contactme" className="contactme">
          <div className="section-title">Get in Touch</div>
          <div className="logo-container">
            {contactLinks.map(link => (
              <a key={link.id} href={link.url} aria-label={link.ariaLabel}>
                <img className="logo" src={link.icon} alt={link.platform} />
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
