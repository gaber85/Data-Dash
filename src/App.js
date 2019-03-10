import React, { Component } from 'react';
import './App.css';
import Dashboard from './containers/Dashboard';
import Nav from './components/Nav';

class App extends Component {
  render() {
    return (
      <div className="main-container">
        <Nav text='Weather Dashboards'/>
        <Dashboard />
        <Nav />
      </div>
    );
  }
}

export default App;
