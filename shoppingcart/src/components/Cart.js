import React, { Component } from 'react'
import UserNavbar from './UserNavbar'
import { connect } from 'react-redux'
import Axios from 'axios'

export class Cart extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             userId:'',
             cart:[]
        }
    }
    componentDidMount(){
        const userId = this.props.userId
        console.log(userId)
        if(userId.length>1){
         Axios.get('http://localhost:3004/cart/'+userId).then(res=>{
             console.log({result:res.data.cart})
       })
        }else{
            this.props.history.push('/login')
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
      };
}

export default connect(mapStateToProps)(Cart)
