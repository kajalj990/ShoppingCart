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
import Orders from './components/Orders'
import AdminProduct from './components/AdminProduct';
import { ListProduct } from './components/ListProduct';
import PaymentPage from './components/PaymentPage';
import PayDetails from './components/PayDetails';
import { connect } from 'react-redux';
class App extends Component {
  
  render() {
    return (
      <Router>
        <div className="App">
          
         <Navbar/>
         <Route path="/product/:id" component={Product}/>
         <Route path="/search" component={SearchProduct}/>
         <Route path="/admin"  component={UserNavbar}></Route>
        <Route path="/home" component={Home}></Route>
        <Route path="/error" component={ErrorPage}></Route>
        <Route path="/category/:category" component={CategoryProducts}></Route>
        <Route path="/Cart" component={Cart}></Route>
        <Route path="/login" component={Login }></Route>
        <Route path="/signup" component={Register }></Route>
        <Route path="/orders" component={Orders }></Route>
        <Route path ="/pay" component={PaymentPage}></Route>
        <Route path ="/payDetails" component={PayDetails}></Route>
        <Route path="/listproducts/:cartId" component={ListProduct}></Route>
        <Route path="/admin/product" component={AdminProduct}></Route>
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
const mapsStateToProps=(state)=>{
  return{
    userType:state.userType
  }
}
export default connect(mapsStateToProps) (App)

