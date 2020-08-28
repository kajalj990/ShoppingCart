import React, { Component } from 'react';
import CategorySideNav from './CategorySideNav';
import logo from '../logo.png';
import * as actionCreator from '../store/actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class Navbar extends Component {
  render() {
    return (
      <div className='font'>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
          <img
            src={logo}
            alt='logo'
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '25px',
              backgroundColor: 'white',
            }}
          />
          <Link className='navbar-brand nav-link' to='/home'>
            Shoppy
          </Link>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item nav-link navbar-brand'>
                <CategorySideNav />
              </li>
            </ul>
            <ul className='navbar-nav mr-auto'>
              <li>
                <form className='nav-link' action='/search'>
                  <input
                    type='text'
                    placeholder='Search'
                    name='search'
                    style={{
                      width: '500px',
                      borderRadius: '5px',
                      height: '50px',
                      padding: '10px',
                    }}
                    className=' mr-sm-2'
                  />
                  <button
                    className='btn-success'
                    style={{
                      width: '100px',
                      height: '50px',
                      padding: 'auto',
                      borderRadius: '5px',
                    }}
                  >
                    Search
                  </button>
                </form>
              </li>
            </ul>
            {!this.props.isAuthenticated ? (
              <ul className='nav navbar-nav  my-2 my-lg-0 nav-item'>
                <li>
                  <Link className='nav-link navbar-brand' to='/login'>
                    Login
                  </Link>
                </li>

                <li>
                  <Link className='nav-link navbar-brand' to='/signup'>
                    SignUp
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className='nav navbar-nav  my-2 my-lg-0 nav-item'>
                <li
                  className='nav-link navbar-brand'
                  onClick={this.props.logout}
                >
                  Logout
                </li>
                <li className='nav-item'>
                  <Link className='nav-link navbar-brand' to='/Cart'>
                    Cart
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(actionCreator.performLogout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
