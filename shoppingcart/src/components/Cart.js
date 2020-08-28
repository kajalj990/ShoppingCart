import React, { Component } from 'react'
import UserNavbar from './UserNavbar'
import * as actionCreator from '../store/actions'
import { connect } from 'react-redux'
import Axios from 'axios'


export class Cart extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             userId:'',
             cartId:'',
             cart:[]
        }
    }
    async componentDidMount(){  
        const cartId = this.props.cartId
        console.log(cartId) 
        if(cartId.length>1){
         await this.props.cart(cartId)
        }else{

            if(this.props.userId <1){
                alert("Not Logged In Login please")
                this.props.history.push('/login')
            }
            else{
                alert('Add items in cart')
                this.props.history.push('/home')
            }
        }
    }
    render() {
        const cart = this.props.cart ? (
            <div className="cart">
              <h4 className="center">Hello{console.log(this.state.cart)}</h4>
              <p>{this.props.cart.TotalPrice}</p>
              <div className="center">
                <button className="btn grey" onClick={this.handleClick}>
                  Delete Product
                </button>
              </div>
            </div>
          ) : (
            <div className="center">Loading cart...</div>
          );
      
          return (
            <div className="container">
              {cart}
            </div>
          )
        }
}

const mapStateToProps = (state)=>{
    return {
        userId: state.userId,
        cartId:state.cartId,
        cart:state.cart
      };
}

const mapDispatchtoProps =(dispatch)=>{
    return{
        cart: (cartId)=>{
            return dispatch(actionCreator.getCart(cartId))
        }
    }
}

export default connect(mapStateToProps,mapDispatchtoProps)(Cart)
