import React, { Component } from 'react';
import * as actionCreator from '../store/actions';
import { connect } from 'react-redux';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      submitted: false,
      name: '',
      gender: '',
      address: '',
      phoneNo: '',
      emailId: '',
      password: '',
      userType: 'customer',
      errors: {
        nameError: '',
        genderError: '',
        addressError: '',
        phoneNoError: '',
        emailIdError: '',
        passwordError: '',
        error: '',
      },
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.handleError(e);
  }

  handleError(e) {
    let flag = true;
    let nameError = '';
    let genderError = '';
    let addressError = '';
    let phoneNoError = '';
    let emailIdError = '';
    let passwordError = '';
    if (this.state.name === '') {
      nameError = 'Field Cannot be empty';
      flag = false;
    } else nameError = '';

    if (this.state.gender === '') {
      genderError = 'Gender Unspecified';
      flag = false;
    } else genderError = '';

    if (this.state.password === '' || this.state.password.length <= 8) {
      passwordError = 'Minimum password length must be 8';
      flag = false;
    } else passwordError = '';

    var reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    if (this.state.emailId === '' || !reg.test(this.state.emailId)) {
      emailIdError = 'INvalid EMail';
      flag = false;
    } else emailIdError = '';

    if (this.state.phoneNo === '' || this.state.phoneNo.length !== 10) {
      phoneNoError = 'Phonenumber must be 10 digits';
      flag = false;
    } else phoneNoError = '';

    if (this.state.address === '') {
      addressError = 'Field cannot be Empty';
      flag = false;
    } else addressError = '';

    this.setState({
      errors: {
        nameError: nameError,
        genderError: genderError,
        passwordError: passwordError,
        emailIdError: emailIdError,
        phoneNoError: phoneNoError,
        addressError: addressError,
      },
    });
    return flag;
  }
  onSubmit(e) {
    this.setState({ submitted: true });
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      gender: this.state.gender,
      address: this.state.address,
      phoneNo: this.state.phoneNo,
      emailId: this.state.emailId,
      password: this.state.password,
      userType: this.state.userType,
    };
    if (this.handleError(e))
      this.props
        .register(newUser)
        .then((res) => {
          this.setState({
            errors: {
              success: 'Successfully Registered',
            },
          });
          setTimeout(() => {
            this.props.history.push(`/login`);
          }, 2000);
        })
        .catch((error) => {
          this.setState({
            errors: {
              error: error.message,
            },
          });
        });
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 mt-5 mx-auto'>
            <form onSubmit={this.onSubmit}>
              <h1 className='h3 mb-3 font-weight-normal'>Register</h1>
              <div className='form-group'>
                <label htmlFor='name'>Name</label>
                <input
                  type='text'
                  className='form-control'
                  name='name'
                  onBlur={this.onChange}
                  placeholder='Enter your name'
                  onInput={this.onChange}
                  value={this.state.name}
                  onChange={this.onChange}
                />
                {this.state.errors.nameError && this.state.submitted ? (
                  <div className='alert alert-danger'>
                    {this.state.errors.nameError}
                  </div>
                ) : null}
              </div>
              <div className='form-group'>
                <label htmlFor='gender'>Gender</label>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='gender'
                    onInput={this.onChange}
                    id='inlineRadiom'
                    onClick={this.onChange}
                    onBlur={this.onChange}
                    value='m'
                    checked={this.state.gender === 'm'}
                    onChange={this.onChange}
                  />
                  <label className='form-check-label' htmlFor='inlineRadiom'>
                    Male
                  </label>
                </div>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='gender'
                    onInput={this.onChange}
                    id='inlineRadiom'
                    value='f'
                    onBlur={this.onChange}
                    onClick={this.onChange}
                    checked={this.state.gender === 'f'}
                    onChange={this.onChange}
                  />
                  <label className='form-check-label' htmlFor='inlineRadiom'>
                    female
                  </label>
                </div>
                {this.state.errors.genderError && this.state.submitted ? (
                  <div className='alert alert-danger'>
                    {this.state.errors.genderError}
                  </div>
                ) : null}
              </div>
              <div className='form-group'>
                <label htmlFor='address'>Address</label>
                <textarea
                  className='form-control'
                  name='address'
                  onBlur={this.onChange}
                  onInput={this.onChange}
                  placeholder='Enter address'
                  value={this.state.address}
                  onChange={this.onChange}
                />
                {this.state.errors.addressError && this.state.submitted ? (
                  <div className='alert alert-danger'>
                    {this.state.errors.addressError}
                  </div>
                ) : null}
              </div>
              <div className='form-group'>
                <label htmlFor='phoneNo'>Mobile No</label>
                <input
                  type='number'
                  className='form-control'
                  name='phoneNo'
                  onBlur={this.onChange}
                  maxLength='10'
                  onInput={this.onChange}
                  placeholder='Enter mobileNo'
                  value={this.state.phoneNo}
                  onChange={this.onChange}
                />
                {this.state.errors.phoneNoError && this.state.submitted ? (
                  <div className='alert alert-danger'>
                    {this.state.errors.phoneNoError}
                  </div>
                ) : null}
              </div>
              <div className='form-group'>
                <label htmlFor='email'>Email Id</label>
                <input
                  type='email'
                  className='form-control'
                  name='emailId'
                  onBlur={this.onChange}
                  onInput={this.onChange}
                  placeholder='Enter email'
                  value={this.state.emailId}
                  onChange={this.onChange}
                />
                {this.state.errors.emailIdError && this.state.submitted ? (
                  <div className='alert alert-danger'>
                    {this.state.errors.emailIdError}
                  </div>
                ) : null}
              </div>
              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input
                  type='password'
                  className='form-control'
                  onBlur={this.onChange}
                  onInput={this.onChange}
                  name='password'
                  placeholder='Password'
                  value={this.state.password}
                  onChange={this.onChange}
                />
                {this.state.errors.passwordError && this.state.submitted ? (
                  <div className='alert alert-danger'>
                    {this.state.errors.passwordError}
                  </div>
                ) : null}
              </div>
              {this.state.errors.success && this.state.submitted ? (
                <div className='alert alert-success'>
                  {this.state.errors.success}
                </div>
              ) : null}
              {this.state.errors.error && this.state.submitted ? (
                <div className='alert alert-danger'>
                  {this.state.errors.error}
                </div>
              ) : null}
              <button
                type='submit'
                className='btn btn-lg btn-success btn-block'
              >
                Register!
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (user) => {
      console.log('Here');
      return dispatch(actionCreator.performRegister(user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
