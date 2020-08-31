import React, { Component } from 'react';
import * as actionCreator from '../store/actions';
import { connect } from 'react-redux';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: '',
      emailError: '',
      passwordError: '',
      submitted: false,
      userType:''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.handleErrors(e);
  }

  handleErrors(event) {
    event.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    let passwordError =
      password.length < 8 ? 'Password must be 8 characters long!' : '';
    var reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    let emailError = reg.test(email) ? '' : 'Email is not valid!';

    this.setState({ passwordError: passwordError });
    this.setState({ emailError: emailError });

    if (passwordError || emailError) return false;
    else return true;
  }

  async onSubmit(e) {
    this.setState({submitted: true})
    e.preventDefault();

    const user = {
      emailId: this.state.email,
      password: this.state.password,
    };

    if (this.handleErrors(e)) {
      await this.props.login(user);
      console.log(this.props.userType)
      if (!this.props.errorMessage) {
        if(this.props.userType =='Admin')this.props.history.push('/admin')
        else this.props.history.push('/home')
      }
      // else this.props.history.push('/admin/product'); 
      else {this.setState({ errors: this.props.errorMessage });}
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 mt-5 mx-auto'>
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className='h3 mb-3 font-weight-normal'>Please Login</h1>
              <div className='form-group'>
                <label htmlFor='email'>Email address</label>
                <input
                  type='email'
                  className='form-control'
                  name='email'
                  placeholder='Enter email'
                  value={this.state.email}
                  onChange={this.onChange}
                  required
                />
              </div>
              {this.state.emailError && this.state.submitted ? (
                <div className='alert alert-danger'>
                  {this.state.emailError}
                </div>
              ) : null}
              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input
                  type='password'
                  className='form-control'
                  name='password'
                  placeholder='Password'
                  value={this.state.password}
                  onChange={this.onChange}
                  required
                />
              </div>
              {this.state.passwordError && this.state.submitted ? (
                <div className='alert alert-danger'>
                  {this.state.passwordError}
                </div>
              ) : null}

              {this.state.errors && this.state.submitted ? (
                <div className='alert alert-danger'>{this.state.errors}</div>
              ) : null}
              <button
                type='submit'
                className='btn btn-lg btn-primary btn-block'
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  } 
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.errorMessage,
    userType:state.userType
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => {
      console.log('Here');
      return dispatch(actionCreator.performLogin(user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
