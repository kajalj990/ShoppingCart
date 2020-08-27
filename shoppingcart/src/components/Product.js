import React, { Component } from 'react';
import axios from 'axios';
import './products.css';
import * as actionCreator from '../store/actions';
import { connect } from 'react-redux';

export class Product extends Component {
<<<<<<< HEAD
    constructor(props) {
        super(props)
    
        this.state = {
             products:[],
             userId:'',
             quant:''
             }
             this.changeHandle.bind(this)
    }
    
    abc(id,quant){
      console.log(quant)
     // console.log(id,quant)
         const userId=this.props.userId
         //console.log(userId)
        // axios.post('http://localhost:3004/cart',{id,quant,userId}).then(response=>{
        //   console.log(response.data)
       // })
      }
    componentDidMount() {
      console.log(this.props.match.params.id)
      
        axios
          .get('http://localhost:3002/products/'+this.props.match.params.id)
          .then((response) => {
            console.log(response.data.product);
            this.setState({products: response.data.product });
            //
          })
          .catch((err) => {
            console.log(err);
          });
          
      }
       changeHandle(e){
        this.setState({ [e.target.name]: e.target.value });
       }
=======
  constructor(props) {
    super(props);
>>>>>>> 4960c694c87152c899f2cfd37c64f04e6e534fc5

    this.state = {
      products: [],
      userId: '',
      quant: '',
      prodId: this.props.match.params.id
    };
    this.changeHandle.bind(this);
    this.addToCart.bind(this);
  }

  addToCart() {
    const quant = this.state.quant;
    const prodId = this.state.prodId;
    const userId = this.props.userId;
    // axios.post('http://localhost:3004/cart',{id,quant,userId}).then(response=>{
    //   console.log(response.data)
    // })
  }
  componentDidMount() {
    console.log(this.props.match.params.id);

    axios
      .get('http://localhost:3002/products/' + this.props.match.params.id)
      .then((response) => {
        console.log(response.data.product);
        this.setState({ products: response.data.product });
        //
      })
      .catch((err) => {
        console.log(err);
      });
  }
  changeHandle(quantity) {
    this.setState({ quant: quantity });
  }

  //   productList() {
  //     return this.state.products.map((currentItem) => {
  //       return <Products product={currentItem} />;
  //     });}
  render() {
    return (
      <div className='bg'>
        <div style={{ padding: '10px' }}>
          {/* {this.productList()} */}
          <img
            className='prod'
            src={this.state.products.productImage}
            style={{ width: '500px', height: '500px' }}
          />

          <div className='img'>
            <label>Product Name:</label>
            {this.state.products.productName}
            <br />
            <label>Price:</label>
            {this.state.products.price}
            <br />
            <label>Description:</label>
            {this.state.products.description}
            <br />
            <label>Add quantity:</label>
            <input
              type='number'
              min='0'
              max='5'
              value={this.state.quant}
              onChange={event => this.changeHandle(event.target.value)}
            />
            <br />
            <button
              className='btn-success'
              style={{ borderRadius: '5px' }}
              onClick={() => this.addToCart()}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state.userId);
  return {
    userId: state.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    uid: () => {
      console.log('Here');
      return dispatch(actionCreator.getUser);
    },
  };
};
//style={{display:"block",marginLeft:"500px",marginTop:"-200px"}}
//style={{border:"1px solid",}
export default connect(mapStateToProps, mapDispatchToProps)(Product);