import React, { Component } from 'react';
import { connect } from 'react-redux';
import './order.css'
const axios = require('axios');
class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    };
  }

  componentDidMount() {
    console.log(this.props.userId);
    if(this.props.userId){
    axios
      .get('http://localhost:3005/order/history/' + this.props.userId)
      .then((response) => {
        console.log(response.data)
        this.setState({
          orders:response.data
        })
      });
    }else{
      this.props.history.push('/login')
    }
  }
   
  handleClick(cartId){
    
    this.props.history.push('/listproducts/'+cartId)
  }

  render() {
    return (
    <div className="container">
                {console.log(this.state.orders)}
              {this.state.orders.map( item=>{
                return(
                  <div className="centered">
                  <div className="Order">
                <p>Order Id :{item._id}</p><br/>
                <p>Order Date:{item.orderdDate}</p>
                <hr/>
                <p>Total Price transaction:<span className="price">{item.cart[0].total}Rs</span></p>
                <p><button onClick={()=>this.handleClick(item.cartId)}>View Details</button></p>
                {/* <p>{this}</p> */}
                  </div><br/>
                  </div>
                )               
              })}
    </div>);
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
  };
};

export default connect(mapStateToProps)(Orders);
