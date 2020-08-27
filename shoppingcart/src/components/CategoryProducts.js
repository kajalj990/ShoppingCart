import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import './products.css'
import DisplayProduct from './DisplayProduct';

export class CategoryProducts extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             products:[]
        }
    }
    productList() {
        return this.state.products.map((currentItem) => {
          return <DisplayProduct product={currentItem} />;
        });
    }

    componentDidUpdate(prevProps) {
      if (prevProps.match.params.category !== this.props.match.params.category) {
        this.fetchDatafromServer();
      }
    }
    componentWillMount(){
      this.fetchDatafromServer();
    }

    fetchDatafromServer() {
      axios.get('http://localhost:3002/products/category/'+this.props.match.params.category).then(response=>{
        console.log(response.data.product)
        this.setState({products : response.data.product})
        })
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

export default CategoryProducts
