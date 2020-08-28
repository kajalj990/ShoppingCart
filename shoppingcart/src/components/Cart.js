import React, { Component } from 'react';
import UserNavbar from './UserNavbar';
import * as actionCreator from '../store/actions';
import { connect } from 'react-redux';
import Axios from 'axios';

export class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: '',
      cartId: ''
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cart !== this.props.cart) {
      // TODO Manipulate cart data
    }
  }

  async componentDidMount() {
    const cartId = this.props.cartId;
    if (cartId) {
      const cart = await this.props.fetchCart(cartId);
      this.setState({ cart: cart });
    } else {
      if (!this.props.userId) {
        alert('Not Logged In Login please');
        this.props.history.push('/login');
      } else {
        // TODO - REMOVE alerts everywhere
        // TODO - This alert doesnt make sense
        alert('Add items in cart');
        this.props.history.push('/home');
      }
    }
  }
  render() {
    const cart = this.props.cart ? (
      <div className='cart'>
        <h4 className='center'>Hello</h4>
        <p>{this.props.cart.TotalPrice}</p>
        <div className='center'>
          <button className='btn grey' onClick={this.handleClick}>
            Delete Product
          </button>
        </div>
      </div>
    ) : (
      <div className='center'>Loading cart...</div>
    );

    return <div className='container'>{cart}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
    cartId: state.cartId,
    cart: state.cart
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    fetchCart: (cartId) => {
      return dispatch(actionCreator.getCart(cartId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Cart);
