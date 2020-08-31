import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom';

class PaymentPage extends Component{
    state={
        payment:'',
        submitDisabled:true
    }
    onChange=(e)=> {
        this.setState({ 
            payment : e.target.value,
            submitDisabled:false
        });

        if(this.state.payment == 'pod'){
            this.props.history.push('/orders')
        }else{
            this.props.history.push('/payDetails')
        }
       
      }

      proceed(){
         return(<Redirect to = "/Order"/>)
      }
    render(){
        return (
            <div>
                <div>
                    <h4>Choose your payment option</h4>
                    <input
                    className='form-check-input'
                    type='radio'
                    name='payment'
                    onInput={this.onChange}
                    id='inlineRadiom'
                    onClick={(e)=>this.onChange(e)}
                    onBlur={this.onChange}
                    value='pod'
                    checked={this.state.payment === 'pod'}
                    onChange={this.onChange}/>
                    <label className='form-check-label' htmlFor='inlineRadiom'>
                    Pay OnDelievery
                  </label><br/> 
                  <input
                    className='form-check-input'
                    type='radio'
                    name='payment'
                    onInput={this.onChange}
                    id='inlineRadiom'
                    onClick={(e)=>this.onChange(e)}
                    onBlur={this.onChange}
                    value='online'
                    checked={this.state.payment === 'online'}
                    onChange={this.onChange}/>
                    <label className='form-check-label' htmlFor='inlineRadiom'>
                    Online pay
                  </label>
                </div>
                <div><button type="button" className="btn btn-success" disabled={this.state.submitDisabled} onClick={this.proceed()}>Proceed</button></div>
            </div>
        )
    }
}

export default PaymentPage
