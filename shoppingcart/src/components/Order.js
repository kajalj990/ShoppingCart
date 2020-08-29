import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Order extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             cartId : this.props.cartId
        }
    }
    
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

const mapsStateToProps =(state)=>{
    return{
        cartId:state.cartId
    }
}

export default connect(mapsStateToProps)(Order)
