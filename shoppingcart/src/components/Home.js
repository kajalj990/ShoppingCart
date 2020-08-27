import React, { Component } from 'react';
import skybag from '../uploads/1598175516401skybag.jpg';
import axios from 'axios';
import {Link} from 'react-router-dom'
import './products.css';
import CategorySideNav from './CategorySideNav';
import DisplayProduct from './DisplayProduct';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { products: [] };
  }
  componentDidMount() {
    axios
      .get('http://localhost:3002/products/')
      .then((response) => {
        console.log(response.data.products);
        this.setState({ products: response.data.products });
        //
      })
      .catch((err) => {
        console.log(err);
      });
  }

  productList() {
    return this.state.products.map((currentItem) => {
      return <DisplayProduct product={currentItem} />;
    });
  }

  
  render() {
    return (
      <div className='container-fluid'>
        <section className='Products'>
          {this.productList()}
        </section>
      </div>
    );
  }
}


export default Home;
