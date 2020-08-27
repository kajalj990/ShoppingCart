import React, { Component } from 'react'
import CategorySideNav from './CategorySideNav'
import logo from '../logo.png'
export class Navbar extends Component {
    render() {
        return (
          <div className="font">
         <nav className="navbar navbar-expand-lg navbar-dark bg-dark">          
           <img src={logo} alt="logo" style={{width:"50px", height:"50px",borderRadius:"25px",backgroundColor:"white"}}/>
            <a className="navbar-brand nav-link" href="/home">Shoppy</a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item nav-link navbar-brand"><CategorySideNav/></li>
              </ul>
                <ul className="navbar-nav mr-auto">
                <li >
                  <form className="nav-link" action="/search">
                    <input type="text" placeholder="Search" name="search" style={{width: "500px",'borderRadius':'5px',height:"50px",padding:'10px'}} className=" mr-sm-2" />
                    <button className="btn-success" style={{width:"100px",height:"50px" ,padding:"auto" ,'borderRadius':'5px'}}>Search</button>
                  </form>
              </li>
              </ul>
            <ul className="nav navbar-nav  my-2 my-lg-0 nav-item">
              <li> <a className="nav-link navbar-brand" href="/login">Login</a></li>
              <li> <a className="nav-link navbar-brand" href="/signup">SignUp</a></li>
            </ul>
            </div>
          </nav>
</div>
    )
  }
}

export default Navbar

