import React, { Component } from 'react'
export class UserNavbar extends Component {
    render() {
        return (
            <div className="font">
         <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand nav-link" href="/home">Shoppy</a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a className="nav-link navbar-brand" href="/home">Products</a>
                </li>
                </ul>
                <ul className="navbar-nav mr-auto">
                <li >
                  <form className="nav-link">
                    <input type="text" placeholder="Search"  style={{width: "800px",'borderRadius':'5px',height:"50px",padding:'10px'}} className=" mr-sm-2" />
                    <button className="btn-success" style={{width:"100px",height:"50px" ,padding:"auto" ,'borderRadius':'5px'}}>Search</button>
                  </form>
              </li>
              </ul>
            <ul className="nav navbar-nav  my-2 my-lg-0 nav-item">
            <li className="nav-item">
                  <a className="nav-link navbar-brand" href="/Cart">Cart</a>
                </li>
              <li>Welcome</li>
            </ul>
            </div>
          </nav>
</div>
    )
  }
}

export default UserNavbar

