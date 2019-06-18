import React, { Component } from 'react';
import me from './images/hexJeremy2.png'
import github from './images/GitHub-Mark/PNG/GitHub-Mark-Light-64px.png'
import linkedin from './images/LinkedIn-Logos/In/Digital/White/2x/In-White-40@2x.png'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={me} className="picture-of-me" alt="Jeremy" />
          <div className='App-intro'>
            <h1 className='intro1'>
              Hi, my name is Jeremy Troshynski.
            </h1>
            <h1 className='intro2'>
            I'm a journeyman software developer.
            </h1>
          </div>
          <div className='logo-container'>
            <a href='https://github.com/jtroshynski'><img className='logo' src={github} alt="Github" /></a>
            <a href='https://www.linkedin.com/in/jeremytroshynski/'><img className='logo' src={linkedin} alt="LinkedIn" /></a>
          </div>
          <div className='navigation-container'>
            <a href='#technologies' className='navigation-link'>Technologies</a>
            <a href='#projects' className='navigation-link'>Projects</a>
            <a href='#resume' className='navigation-link'>Resume</a>
          </div>
        </header>
        <div className='technologies'>

        </div>
        <div className='projects'>

        </div>
        <div className='resume'>

        </div>
      </div>
    );
  }
}

export default App;
