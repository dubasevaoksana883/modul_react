import React, { Component } from 'react';
import './App.css';
import SignIn from './Components/SignIn/index.js';
import {Provider}  from 'react-redux';
import store from './store.js'

class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <div className="App">
          <SignIn />
        </div>
      </Provider>
    );
  }
}

export default App;
