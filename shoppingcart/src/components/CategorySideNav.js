import React, { Component } from 'react'
import './sidenav.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
export class CategorySideNav extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             ishidden:true,
             Categories:[]
        }
    }
    catHidden(){
        this.setState({ishidden:!this.state.ishidden})
    }
    
    render() {
        return (
            <div className="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-toggle="dropdown" >Categories</a>
                <div className="dropdown-content">
                <Link to="/category/schoolbag">School Bags</Link><br/>
                <Link to="/category/mobile">Mobile</Link><br/>
                <Link to="/category/Televisions">Television</Link><br/>
                <Link to="/category/colouringbook">Colouring Books</Link><br/>
                <Link to="/category/bodylotions">Body Lotion</Link><br/>
                <Link to="/home">All products</Link>
                </div>
            </div>
        )
    }
}

export default CategorySideNav
