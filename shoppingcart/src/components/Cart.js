import React, { Component } from 'react';
import UserNavbar from './UserNavbar';
import * as actionCreator from '../store/actions';
import { connect } from 'react-redux';
import Axios from 'axios';
<<<<<<< HEAD
import { Redirect, Link } from 'react-router-dom';
=======
>>>>>>> 005747b8df99aceadce0e681fccda12c3d4f3c5d

export class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: '',
            cartId: '',
            ishidden:false
        };
    }

<<<<<<< HEAD
     componentDidUpdate(prevProps) {
        if (prevProps.cart !== this.props.cart) {
            // TODO Manipulate cart data
        }
    }
=======
>>>>>>> 005747b8df99aceadce0e681fccda12c3d4f3c5d

    async componentDidMount() {
        const cartId = this.props.cartId;
        if (cartId) {
            const cart = await this.props.fetchCart(cartId);
            this.setState({ cart: cart ,ishidden:true});
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
    async deleteProduct(productId){
        console.log(productId)
        await this.props.removeProduct(this.props.cartId,productId,this.props.userId)
<<<<<<< HEAD
        if(this.props.cart.TotalPrice){
           return( <div>No Products Available to order</div>)
        }
       
    }
    async placeOrder(){
        console.log(this.props.cartId)
        await this.props.orderProduct(this.props.cartId)
//this.props.history.push('/Order')
=======
        await this.props.fetchCart(this.props.cartId)
        // return(<Redirect to="/Cart"></Redirect>)
    }

    handleCheckout = async () => {
        console.log(this.props.cartId);
        const purchase = await this.props.performCheckout(this.props.cartId);
        console.log(purchase);
        alert('Purchase Successfull')
>>>>>>> 005747b8df99aceadce0e681fccda12c3d4f3c5d
    }
    render() {
        const cart = this.props.cart ? (
            <div className='cart'>
                <h4 className='center' style={{padding: '12px'}}>Hello, <span style={{textTransform:"capitalize"}}>{this.props.cart.customer?.name}</span></h4>
                <p><table className="table table-striped table-bordered table-hover">
                    <tbody>
                        <tr>
                            {/* <th>ProductId</th> */}
                            <th>ProductName</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Operations</th>
                        </tr>
                        {this.props.cart.productList?.map(product => {
                            return (<tr>
                                {/* <td>{product.productId}</td> */}
                                <td>{product.productName}</td>
                                <td>{product.quantity}</td>
                                <td>{product.price}Rs</td>
                                <td> <button className='btn btn-danger' onClick={()=>this.deleteProduct(product.productId)}>Delete Product</button></td>
                            </tr>
                            )
                        })}
                        <tr>
                            <td>TotalPrice:</td>
                            <td colSpan='2'>{this.props.cart.TotalPrice}Rs</td>
                            <td><button className='btn btn-success' onClick={this.handleCheckout}>Check Out</button></td>
                        </tr>
                    </tbody>
                </table>
                </p>
            </div>
        ) : (
                <div className='center'>Loading cart...</div>
            );

        return(
             <div className='container'>
            <div>{cart}</div>
            <div>
                <button className="btn btn-success" disabled={!this.state.ishidden} onClick={()=>this.placeOrder()}>Order</button>
           </div>
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
};

const mapDispatchtoProps = (dispatch) => {
    return {
        fetchCart: (cartId) => {
            return dispatch(actionCreator.getCart(cartId));
        },
        removeProduct:(cartId,productId,userId)=>{
            return dispatch(actionCreator.performRemoveProduct(cartId,productId,userId))
        },
<<<<<<< HEAD
        orderProduct:(cartId)=>{
            return dispatch(actionCreator.placeOrder(cartId))
=======
        performCheckout: (cartId) => {
            return dispatch(actionCreator.performCheckout(cartId))
>>>>>>> 005747b8df99aceadce0e681fccda12c3d4f3c5d
        }
    };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Cart);