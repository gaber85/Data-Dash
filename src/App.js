import React, { Component } from 'react';
import styled from '@emotion/styled';
import './App.css';
import Dashboard from './containers/Dashboard';
import Nav from './components/Nav';

class App extends Component {
  render() {
    return (
      <MainContainer className="main-container">
        <Nav text='Weather Dashboards'/>
        <Dashboard />
        <Nav />
      </MainContainer>
    );
  }
}

const MainContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default App;
