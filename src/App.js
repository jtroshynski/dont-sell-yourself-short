import React, { Component } from "react";
import me from "./images/JeremyStylized.png";
import github from "./images/GitHub-Mark/PNG/GitHub-Mark-120px-plus.png";
import linkedin from "./images/LinkedIn-Logos/In/Digital/Blue/2x/In-Blue-40@2x.png";
import email from "./images/envelope-solid.svg";
import Fade from "react-reveal/Fade";

import "./css/App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={me} className="picture-of-me" alt="Jeremy" />
          <div className="App-intro">
            <h1 className="name">Jeremy Troshynski</h1>
            <h1 className="title">Full Stack Developer</h1>
          </div>
        </header>
        <Fade right cascade>
          <div className="content-divider" />
        </Fade>
        <div className="skills">
          <Fade right cascade>
            <div className="section-title">Skills</div>
          </Fade>
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
        <Fade right cascade>
          <div className="content-divider" />
        </Fade>

        <div id="contactme" className="contactme">
          <Fade right cascade>
            <div className="section-title">Get in Touch</div>
          </Fade>
          <div className="logo-container">
            <a href="https://github.com/jtroshynski">
              <img className="logo" src={github} alt="Github" />
            </a>
            <a href="https://www.linkedin.com/in/jeremytroshynski/">
              <img className="logo" src={linkedin} alt="LinkedIn" />
            </a>
            <a href="mailto:jtroshynski@gmail.com">
              <img className="logo" src={email} alt="LinkedIn" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
