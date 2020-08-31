import React, { Component } from 'react'

import Axios from 'axios'
import { connect } from 'react-redux'

export class ListProduct extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             cart:[]
        }
    }
    

    componentDidMount(){
        
        const cartId=this.props.match.params.cartId
        console.log(cartId)
        Axios.get('http://localhost:3004/cart/'+cartId).then(res=>{
            console.log(res.data)
            this.setState({cart:res.data})
        })
    }

    render() {
        return (
            <div>
                <p><table className="table table-striped table-bordered table-hover">
                    <tbody>
                        <tr>
                            <th>ProductName</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                        {this.state.cart.productList?.map(product => {
                            return (<tr>
                                <td>{product.productName}</td>
                                <td>{product.quantity}</td>
                                <td>{product.price}Rs</td>
                            </tr>
                            )
                        })}
                        <tr>
                            <td>TotalPrice:</td>
                            <td colSpan='2'>{this.state.cart.TotalPrice}Rs</td>
                        </tr> 
                    </tbody>
                </table></p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      userId: state.userId,
    };
  };

export default connect(mapStateToProps)(ListProduct)
