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

  render() {
    return (
    <div className="container">
      
              {this.state.orders.map( item=>{
                return(
                  <div className="centered">
                  <div className="Order">
                    <h4>Order Date:{item.orderdDate}</h4>
                  <p>{item.cartId}</p>
                  </div><br/>
                  </div>
                )               
              })}
                {/* // 
                // <p> <span className="price">5Rs</span></p>
                // <p> product 1 <span className="price">8Rs</span></p>
                // <p> product 1 <span className="price">2Rs</span></p>
                // <hr/>
                // <p>Total <span className="price" style={{color:"black"}}><b>30Rs</b></span></p> */}
    </div>);
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
  };
};

export default connect(mapStateToProps)(Orders);
