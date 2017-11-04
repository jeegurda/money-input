import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import MoneyInput from './MoneyInput.jsx'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">I'm redux as fuck</h1>
        </header>
        <MoneyInput
          value={ this.props.val }
          onChange={ val => {
            this.props.dispatch({ type: 'INPUT', payload: val })
          } }
          style={{
            marginTop: 50,
            width: 200,
            height: 40,
            borderRadius: 3,
            fontSize: 18,
            border: '1px solid black'
          }}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    val: state.val
  })
)(App);
