import React, { Component } from 'react';
import UserNavbar from './UserNavbar';
import * as actionCreator from '../store/actions';
import { connect } from 'react-redux';
import Axios from 'axios';
import { Link } from 'react-router-dom';

export class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: '',
            cartId: '',
            ishidden:false
        };
    }


    async componentDidMount() {
        const cartId = this.props.cartId;
        if (cartId) {
            const cart = await this.props.fetchCart(cartId);
            this.setState({ cart: cart ,ishidden:true});
        } else {
            if (!this.props.userId) {
                this.props.history.push('/login');
            } else{
                this.props.history.push('/home');
            }
        }
    }
    async deleteProduct(productId){
        console.log(productId)
        await this.props.removeProduct(this.props.cartId,productId,this.props.userId)
        await this.props.fetchCart(this.props.cartId)
        // return(<Redirect to="/Cart"></Redirect>)
    }

    handleCheckout = async () => {
        console.log(this.props.cartId);
        const purchase = await this.props.performCheckout(this.props.cartId, this.props.userId);
        console.log(purchase);
        this.props.history.push('/orders')
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
              <Link to="/orders">  <button className="btn btn-success" disabled={!this.state.ishidden}>
                  Check Your Orders</button></Link>
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
        performCheckout: (cartId, userId) => {
            return dispatch(actionCreator.performCheckout(cartId, userId))
        }
    };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Cart);