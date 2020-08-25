import React, { Component } from 'react'
import skybag from '../uploads/1598175516401skybag.jpg'
import axios from 'axios'
const Products = props => (
   
        <div className="row-md-4">
        <table className="">
       <tr> <td rowSpan="5" width="20%"><center><img src={skybag} /></center>{/*props.product.productImage*/}</td></tr>
      
       <tr><td width="50%">
           <ul style={{listStyle:"none" ,lineHeight:"40px"}}>
           <li>Name:{props.product.productName}</li>
        <li>Description:{props.product.description}</li>
        <li hidden>{props.product.quantity}</li>
        <li hidden>{props.product._id}</li>
        {/* <td>{props.product.category}</td> */}
        <li>Price:{props.product.price}/-Rs</li></ul></td>
        <td rowSpan="5"><button type="button" className="btn btn-success    ">Add to Cart</button><h4></h4></td></tr>
        <br/>       
        </table>
        </div>

)
class Home extends Component {
    constructor(props) {
        super(props);

        this.state = { products: [ ] }
    }
    componentDidMount() {
        axios.get('http://localhost:3002/products/')
            .then(response => {
                console.log(response.data.products )
                this.setState({ products: response.data.products})
                //
            })
            .catch((err) => {
                console.log(err)
            })
    }

    productList() {
        return this.state.products.map(currentItem=>{
            return <Products product = {currentItem}/>
        })
    }
    render() {
        return (
            <div className="container-fluid">
                <center><h3><span style={{borderRadius:"6px",border:"1px",padding:"20px" }}>Products</span></h3></center>
                <div className="container-fluid">

                    <div className="">
                        
                            { this.productList() }

                        
                        {/* <div className="col-lg-2 mr-4 ">
                            Image 2
                    </div>
                        <div className="col-lg-2 mr-4">
                            Image 3
                    </div>
                        <div className="col-lg-2 mr-4">
                            Image 4
                    </div>
                        <div className="col-lg-2 mr-3 ">
                            Image 5
                    </div> */}
                        <div className="col-lg-10 text-center">View More</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home