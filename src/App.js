import React, { Component } from 'react';
import me from './images/hexJeremy2.png'
import github from './images/GitHub-Mark/PNG/GitHub-Mark-64px.png'
import linkedin from './images/LinkedIn-Logos/In/Digital/Blue/2x/In-Blue-40@2x.png'
import Fade from 'react-reveal/Fade';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={me} className="picture-of-me" alt="Jeremy" />
          <div className='App-intro'>
            <h1 className='intro1'>
            Jeremy Troshynski
            </h1>
            <h1 className='intro2'>
            Journeyman full stack developer
            </h1>
          </div>
        </header>
        <Fade right cascade>
        <div className='navigation-container'>
            <a href='#technologies' className='navigation-link'>Technologies</a>
            {/* <a href='#projects' className='navigation-link'>Projects</a> */}
            <a href='#resume' className='navigation-link'>Resume</a>
          </div>
          </Fade>
        <div id='technologies' className='technologies'>
          <div className='technology-card-row'>
            <div className='technology-card'>
              <i className="fab fa-react fa-3x"></i>
              <div>React</div>
            </div>
            <div className='technology-card'>
              <i className="fab fa-js fa-3x"></i>
              <div>Javascript</div>
            </div>
            <div className='technology-card'>
              <i className="fab fa-html5 fa-3x"></i>
              <div>HTML</div>
            </div>
            <div className='technology-card'>
              <i className="fab fa-css3-alt fa-3x"></i>
              <div>CSS</div>
            </div>
            <div className='technology-card'>
              <i className="fab fa-sass fa-3x"></i>
              <div>Sass</div>
            </div>
          </div>
          <div className='technology-card-row'>
            <div className='technology-card'>
              <i className="fab fa-microsoft fa-3x"></i>
              <div>C#</div>
            </div>
            <div className='technology-card'>
              <i className="fab fa-java fa-3x"></i>
              <div>Java</div>
            </div>
            <div className='technology-card'>
              <i className="fab fa-git fa-3x"></i>
              <div>Git</div>
            </div>
          </div>
            {/* 
              Languages - C#, Javascript, React, HTML/CSS, Java, SQL
              Skills - Full Stack Development, Web Services, Unit Tests, Communication, Creativity
              Software - Visual Studio, VS Code, Azure DevOps, Git, Github, MS-SQL
           */}
        </div>
        <div id='projects' className='projects'>

        </div>
        <div id='resume' className='resume'>
        <iframe src="https://docs.google.com/document/d/e/2PACX-1vRnUGNSrpAIKEPNn3w3Rea_r9SLjIQV9RYvxR7vU6LPfdPigQhp7u1jVM6Dt1KgLDB4iWDvmp0FqFy0/pub?embedded=true" width="700"></iframe>        
        </div>
        <div id='contactme' className='contactme'>
        <div className='logo-container'>
            <a href='https://github.com/jtroshynski'><img className='logo' src={github} alt="Github" /></a>
            <a href='https://www.linkedin.com/in/jeremytroshynski/'><img className='logo' src={linkedin} alt="LinkedIn" /></a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
