import { Component } from "react";
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
      scrollPosition: 0,
      profileImageLoaded: false,
      lightboxImage: null,
      lightboxAlt: null
    };

    // Preload critical image for better perceived performance
    this.profileImage = new Image();
    this.profileImage.src = require('./images/JeremyStylized.png');
    this.profileImage.onload = () => {
      this.setState({ profileImageLoaded: true });
    };
  }

  componentDidMount() {
    // Apply theme on mount
    this.applyTheme();

    // Set up scroll listener for animations
    window.addEventListener('scroll', this.handleScroll, { passive: true });

    // Set up Intersection Observer for scroll-based animations
    this.setupIntersectionObserver();
  }

  componentWillUnmount() {
    // Clean up scroll listener
    window.removeEventListener('scroll', this.handleScroll);

    // Clean up Intersection Observer
    if (this.observer) {
      this.observer.disconnect();
    }

    // Cancel any pending animation frames
    if (this.scrollRAF) {
      cancelAnimationFrame(this.scrollRAF);
    }
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

  openLightbox = (imageSrc, imageAlt) => {
    this.setState({
      lightboxImage: imageSrc,
      lightboxAlt: imageAlt
    });
  }

  closeLightbox = () => {
    this.setState({
      lightboxImage: null,
      lightboxAlt: null
    });
  }

  handleScroll = () => {
    // Use requestAnimationFrame for better performance (60fps)
    if (this.scrollRAF) {
      cancelAnimationFrame(this.scrollRAF);
    }

    this.scrollRAF = requestAnimationFrame(() => {
      this.setState({
        scrollPosition: window.scrollY
      });
    });
  }

  setupIntersectionObserver = () => {
    // Check if IntersectionObserver is available (not available in test environments)
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    // Create Intersection Observer for scroll-triggered animations
    const options = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.1 // Trigger when 10% of element is visible
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add animation class when element enters viewport
          entry.target.classList.add('animate-in');
          // Unobserve after animation to improve performance
          this.observer.unobserve(entry.target);
        }
      });
    }, options);

    // Observe all sections that should animate on scroll
    const animatedSections = document.querySelectorAll(
      '.about-section, .work-experience-section, .projects-section, .skills-section, .contact-section'
    );

    animatedSections.forEach((section) => {
      this.observer.observe(section);
    });
  }

  render() {
    const { darkMode, profileImageLoaded, lightboxImage, lightboxAlt } = this.state;

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
            {profileImageLoaded ? (
              <img
                src={this.profileImage.src}
                className="hero-image"
                alt="Jeremy Troshynski"
                loading="eager"
                decoding="async"
              />
            ) : (
              <div className="hero-image-placeholder" aria-label="Loading profile image" />
            )}
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
        <section className="projects-section">
          <h2 className="section-title">Projects</h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={project.id} className="project-card" style={{ animationDelay: `${index * 100}ms` }}>
                {project.imageBefore && project.image ? (
                  <div className="project-images-comparison">
                    <div
                      className="project-image-container clickable"
                      onClick={() => this.openLightbox(project.imageBefore, `${project.title} - Before`)}
                      role="button"
                      tabIndex={0}
                      onKeyPress={(e) => e.key === 'Enter' && this.openLightbox(project.imageBefore, `${project.title} - Before`)}
                    >
                      <span className="image-label">Before</span>
                      <img
                        src={project.imageBefore}
                        alt={`${project.title} - Before`}
                        className="project-image"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div
                      className="project-image-container clickable"
                      onClick={() => this.openLightbox(project.image, `${project.title} - After`)}
                      role="button"
                      tabIndex={0}
                      onKeyPress={(e) => e.key === 'Enter' && this.openLightbox(project.image, `${project.title} - After`)}
                    >
                      <span className="image-label">After</span>
                      <img
                        src={project.image}
                        alt={`${project.title} - After`}
                        className="project-image"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                ) : project.image ? (
                  <div
                    className="project-image-container clickable"
                    onClick={() => this.openLightbox(project.image, project.title)}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => e.key === 'Enter' && this.openLightbox(project.image, project.title)}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-image"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ) : null}
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <span className="project-company">{project.company}</span>
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-badge">{tech}</span>
                  ))}
                </div>
                <div className="project-impact">
                  <strong>Impact:</strong> {project.impact}
                </div>
                {project.link && (
                  <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
                    View Project →
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
        <div className="content-divider" />
        <section className="skills-section">
          <h2 className="section-title">Skills</h2>
          <div className="skills-grid">
            {skills.map((category, index) => (
              <div key={category.category} className="skill-category" style={{ animationDelay: `${index * 100}ms` }}>
                <h3 className="category-title">{category.category}</h3>
                <div className="skills-list">
                  {category.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="skill-badge">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
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

        <section id="contactme" className="contact-section">
          <h2 className="section-title">Get in Touch</h2>
          <p className="contact-intro">
            Let's connect! Feel free to reach out through any of these platforms.
          </p>
          <div className="contact-links-container">
            {contactLinks.map(link => (
              <a
                key={link.id}
                href={link.url}
                className="contact-link"
                data-platform={link.id}
                aria-label={link.ariaLabel}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="contact-icon-wrapper">
                  <img
                    className="contact-icon"
                    src={link.icon}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <span className="contact-label">{link.platform}</span>
              </a>
            ))}
          </div>
        </section>

        {lightboxImage && (
          <div
            className="lightbox-overlay"
            onClick={this.closeLightbox}
            role="dialog"
            aria-label="Image preview"
          >
            <button
              className="lightbox-close"
              onClick={this.closeLightbox}
              aria-label="Close image preview"
            >
              ✕
            </button>
            <img
              src={lightboxImage}
              alt={lightboxAlt}
              className="lightbox-image"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
