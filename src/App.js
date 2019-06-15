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
          <p>
            Hi, my name is Jeremy Troshynski. I've been a software developer for two years. <br />
            Click the links below to see what I've been working on.
          </p>
          <div className='logo-container'>
            <a href='https://github.com/jtroshynski'><img className='logo' src={github} alt="Github" /></a>
            <a href='https://www.linkedin.com/in/jeremytroshynski/'><img className='logo' src={linkedin} alt="LinkedIn" /></a>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
