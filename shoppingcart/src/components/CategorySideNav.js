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
            <div className="dropdown">
                <span className="dropbtn">Categories</span>
                <div className="dropdown-content">
                <a href="/category/schoolbag">School Bags</a><br/>
                <a href="/category/mobile">Mobile</a><br/>
                <a href="/category/Televisions">Television</a><br/>
                <a href="/category/colouringbook">Colouring Books</a><br/>
                <a href="/category/lotion">Body Lotion</a><br/>
                <a href="/home">All products</a>
                </div>
            </div>
        )
    }
}

export default CategorySideNav
