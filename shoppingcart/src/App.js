import React, { Component } from 'react';

import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import UserNavbar from './components/UserNavbar';
import Product from './components/Product';
import CategorySideNav from './components/CategorySideNav';
import CategoryProducts from './components/CategoryProducts';
import SearchProduct from './components/SearchProduct';
import ErrorPage from './components/ErrorPage';
import Cart from './components/Cart';
class App extends Component {
  
  render() {
    return (
      <Router>
        <div className="App">
         <Navbar/>
         <Route path="/product/:id" component={Product}/>
         <Route path="/search" component={SearchProduct}/>
         <Route path="/user"  component={UserNavbar}></Route>
        <Route path="/home" component={Home}></Route>
        <Route path="/error" component={ErrorPage}></Route>
        <Route path="/category/:category" component={CategoryProducts}></Route>
        <Route path="/cart" component={Cart}></Route>
        <Route path="/login" component={Login }></Route>
        <Route path="/signup" component={Register }></Route>
        </div>
      </Router >
    )
  }
}

export default App

