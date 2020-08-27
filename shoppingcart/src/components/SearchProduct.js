import React, { Component } from 'react'
import axios from 'axios'
import ErrorPage from './ErrorPage'
import { Link } from 'react-router-dom'
import DisplayProduct from './DisplayProduct'

class SearchProduct extends Component {
  constructor(props) {
    super(props)

    this.state = {
      products: []
    }
  }

  componentDidMount() {
    const search = new URLSearchParams(this.props.location.search).get('search')
       axios
      .get('http://localhost:3002/products/product/' + search)
      .then((response) => {
        console.log(response.data.product);
        this.setState({ products: response.data.product });
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
    )
  }
}
export default SearchProduct
