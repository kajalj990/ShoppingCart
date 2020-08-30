import React, { Component } from 'react';
import { connect } from 'react-redux';

const axios = require('axios');
class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: '',
    };
  }

  componentDidMount() {
    console.log(this.props.userId);
    axios
      .get('http://localhost:3005/order/history/' + this.props.userId)
      .then((response) => {
        console.log(response);
      });
  }

  render() {
    return <div></div>;
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
  };
};

export default connect(mapStateToProps)(Orders);
