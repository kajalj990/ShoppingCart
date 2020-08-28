import React, { Component } from 'react';
import UserNavbar from './UserNavbar';
import * as actionCreator from '../store/actions';
import { connect } from 'react-redux';
import Axios from 'axios';

export class Cart extends Component {
<<<<<<< HEAD
    constructor(props) {
        super(props)

        this.state = {
            userId: '',
            cartId: '',
            cart: []
        }
    }
    async componentDidMount() {
        const cartId = this.props.cartId
        console.log(cartId)
        if (cartId.length > 1) {
            await this.props.getCart(cartId)
        } else {

            if (this.props.userId < 1) {
                alert("Not Logged In Login please")
                this.props.history.push('/login')
            }
            else {
                alert('Add items in cart')
                this.props.history.push('/home')
            }
        }
    }
    render() {
        const cart = this.props.cart ? (
            <div className="cart">
                <h4 className="center">Cart Items</h4>
                <table className="table table-dark">
                    <tbody>
                        <tr>
                            <th>ProductName</th>
                            <th>Product Quantity</th>
                            <th>Price</th></tr>
                        <tr>
                            <td>product 1</td>
                            <td><input type="number"></input></td>
                            <td>Price</td>
                            <td><button className="btn btn-success" onClick={this.handleClick}>
                    Delete Product
                </button></td>
                        </tr>
                    </tbody>

                </table>
                
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

const mapStateToProps = (state) => {
    return {
        userId: state.userId,
        cartId: state.cartId,
        cart: state.cart
    };
}

const mapDispatchtoProps = (dispatch) => {
    return {
        getCart: (cartId) => {
            return dispatch(actionCreator.getCart(cartId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(Cart)
=======
  constructor(props) {
    super(props);

    this.state = {
      userId: '',
      cartId: '',
      cart: '',
    };
  }

  async componentDidMount() {
    const cartId = this.props.cartId;
    if (cartId) {
      const cart = await this.props.cart(cartId);
      this.setState({ cart: cart });
    } else {
      if (this.props.userId) {
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
    cartId: state.cartId
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    cart: (cartId) => {
      return dispatch(actionCreator.getCart(cartId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Cart);
>>>>>>> 6f0f2c113d89dc44c8d5dd11e2233b2eab0006b2
