import React from 'react'
import { Link } from 'react-router-dom'

const product_url='/product/'
function DisplayProduct(props) {
    return (
        <div>
    <div className='Product'>
      <Link className="link" to={product_url+props.product._id}>
      <div>
      <center>
        <img src={props.product.productImage} alt='product' style={{ height:'160px', width: '150px' }} />
      </center></div>
      <div style={{paddingTop:"20px"}}>
        <section style={{fontWeight: 'bold'}}>{props.product.productName}</section>
        <section hidden>{props.product.description}</section>
        <p>Price: <b>{props.product.price}</b></p>
<<<<<<< HEAD
      </div>
     <button
        type='button'
        className='btn btn-success'
        key={props.product._id} 
      >
        View Product Details
      </button></Link>
=======
      </div></Link>
>>>>>>> 005747b8df99aceadce0e681fccda12c3d4f3c5d
    </div>
        </div>
    )
}


export default DisplayProduct
