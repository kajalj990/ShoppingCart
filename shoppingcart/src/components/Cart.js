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
    componentDidMount(){
        const cartId = this.props.cartId
        console.log(this.props.cartId)
        if(cartId.length>1){
         Axios.get('http://localhost:3004/cart/'+cartId).then(res=>{
             console.log(res.data.result)
       })
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
        return (
            <div>
                <ul>

                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        userId: state.userId,
        cartId:state.cartId
      };
}

const mapDispatchtoProps =(dispatch)=>{
    return{
        cid: ()=>{
            return dispatch(actionCreator.getCart)
        }
    }
}

export default connect(mapStateToProps,mapDispatchtoProps)(Cart)
