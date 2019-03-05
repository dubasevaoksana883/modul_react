import React, { Component } from 'react';
import './App.css';
import SignIn from './Components/SignIn/index.js';

class App extends Component {
  render() {
    return (
        <div className="App">
          <SignIn />
        </div>
    );
  }
}

export default App;
