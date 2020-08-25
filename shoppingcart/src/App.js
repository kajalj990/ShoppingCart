import React, { Component } from 'react';

import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Route from 'react-router-dom/Route';

import Navbar from './components/Navbar';
import Home from './components/Home';
class App extends Component {
  render() {
    return (
      <Router>
        <div>
         <Navbar />

        <Route path="/home" component={Home}></Route>
        <Route path="/cart" render={
          () => {
            return (<h1>You chose <span>Cart</span></h1>);
          }
        }></Route>
        <Route path="/login" render={
          () => {
            return (<h1>You chose <span>Login</span></h1>);
          }
        }></Route>


        </div>
      </Router >
    )
  }
}

export default App

