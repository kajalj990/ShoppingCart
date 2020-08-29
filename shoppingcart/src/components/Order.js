import React, { Component } from 'react'
import './order.css'
import { connect } from 'react-redux'

export class Order extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cartId: this.props.cartId
        }
    }

    async componentDidMount() {
        if (this.state.cartId) {

        }
    }

    render() {
        return (
            <div className="centered">
            <div className="container">
            <div className="Order">
                <h4>Order Date:  02/9/2020 </h4>
                <p>product 1 <span className="price">15Rs</span></p>
                <p>product 1  <span className="price">5Rs</span></p>
                <p> product 1 <span className="price">8Rs</span></p>
                <p> product 1 <span className="price">2Rs</span></p>
                <hr/>
                <p>Total <span className="price" style={{color:"black"}}><b>30Rs</b></span></p>
            </div>
        </div>
        </div>
            
        )
    }
}

const mapsStateToProps = (state) => {
    return {
                    cartId: state.cartId
    }
}

export default connect(mapsStateToProps)(Order)
