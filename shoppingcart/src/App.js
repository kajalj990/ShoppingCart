import React, { Component } from 'react';

import './App.css';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
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
import PaymentPage from './components/PaymentPage';
import Order from './components/Order';
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
        <Route path="/Cart" component={Cart}></Route>
        <Route path="/payment" component= {PaymentPage}/>
        <Route path ="/Order" component ={Order}/>
        <Route path="/login" component={Login }></Route>
        <Route path="/signup" component={Register }></Route>
        <Route
    exact
    path="/"
    render={() => {
        return (
            <Redirect to="/home" />
        )
    }}
/>
        </div>
      </Router >
    )
  }
}

export default App

