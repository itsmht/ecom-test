import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router';
import Navigation from '../Shared/Navigation';
import Searchbar from '../Shared/Searchbar';
import banner3 from '../../images/slideshow/banner3.jpg'
import './ProductDetails.css';
import Footer from '../Shared/Footer/Footer';
import { Link } from 'react-router-dom';
import RelatedProducts from './Relatedproducts/RelatedProducts';
import { Reviews } from './Reviews/Reviews';
const ProductDetails = () => {
    
    
    const[productDetails,setProductDetails] = useState({});
    const roundedRating = Math.round(productDetails.ratings);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [quantity, setQuantity] = useState(1);
  


    const { slug } = useParams();
    // console.log(slug);


    const incrementQuantity = () => {
      setQuantity(quantity + 1);
    };
  
    // Function to decrement the quantity, ensuring it doesn't go below 1
    const decrementQuantity = () => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    };

    useEffect(()=>{
        fetch(`https://corp.glbpowerplant.com/api/productDetails/${slug}`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data.data.ratings);
            setCurrentImageIndex(0);
            setProductDetails(data.data);
        })

    },[slug])

    const handleImageClick = (index) => {
      setCurrentImageIndex(index);
    };

  return (
    <div >
      <Navigation></Navigation>
      <Searchbar></Searchbar>
    <div style={{marginLeft:'20px',marginRight:'20px'}}>

      <div class="grid grid-cols-3 gap-4 mt-20">
        {/* dynamic images */}

     


          <div  className='flex'>
                     {/* Render dynamic images */}
        <div style={{width:'150px'}} className='flex flex-col justify-center content-center'>
        {productDetails.product_images &&
          productDetails.product_images.map((imageUrl, index) => (
            <div key={index} onClick={() => handleImageClick(index)}>
              <img
              width="150px"
                src={imageUrl}
                alt={`Product Image ${index + 1}`}
                className={currentImageIndex === index ? 'selected' : ''}
              />
            </div>
          ))}
        </div>



<div className=''>
          {productDetails.product_images && (
          <div>
            <img
            width="100%"
              src={
                currentImageIndex !== null
                  ? productDetails.product_images[currentImageIndex]
                  : productDetails.product_images[0] // Display the first image by default
              }
              alt="Selected Product Image"
            />
          </div>
        )}
          </div>
          </div>    


      
        <div className='text-left mx-10'>

        <h1 className="text-left text-4xl font-bold mb-10">
            {productDetails.product && productDetails.product[0]
              ? productDetails.product[0].product_name
              : "Product Name Not Available"}
          </h1>

          <button className='border p-2 px-8 mb-3'>Sold By</button>
       

       <p className='text-left'>
    Rating:
    {Array.from({ length: 5 }, (_, index) => {
        if (index < Math.floor(productDetails.ratings)) {
            // Display full gold star for full rating
            return <FontAwesomeIcon icon={faStar} key={index} style={{ color: 'gold' }} />;
        } else if (index === Math.floor(productDetails?.ratings)) {
            // Display a half gold star for the first half
            return (
                <span key={index}>
                    <FontAwesomeIcon icon={faStarHalfAlt} style={{ color: 'gold' }} />
                </span>
            );
        } else {
            // Display no star (white star) for the rest
            return <FontAwesomeIcon icon={faStar} key={index} style={{ color: 'white' }} />;
        }
    })}
</p>


<p>
{productDetails.product && productDetails.product[0]
              ? productDetails.product[0].product_brand
              : "Product Name Not Available"}
</p>

<p>
  Minimum Buy: 
{productDetails.product && productDetails.product[0]
              ? productDetails.product[0].product_min_buy_quantity
              : "Product Name Not Available"}
</p>


<p className='text-2xl my-5' style={{borderBottom:'1px solid black',borderTop:'1px solid black'}}>
   $
{productDetails.product && productDetails.product[0]
              ? productDetails.product[0].product_discounted_price
              : "Product Name Not Available"}

              <span style={{textDecoration:'line-through'}} className='ms-5'> 
               $ {productDetails.product && productDetails.product[0]
              && productDetails.product[0].product_actual_price}
              </span>
</p>

<p> Quantity</p>

<div className="flex items-center mt-3 justify-around">
            
           <div className='border border-black-200'>
            
           <button className="border p-2" onClick={decrementQuantity}>
              -
            </button>
            <span className="mx-2 text-bold">{quantity}</span>
            <button className="border p-2" onClick={incrementQuantity}>
              +
            </button>
           </div>

           <button className="btn btn-warning">Buy now</button>


           <div className='text-4xl border p-1 rounded-lg'><i class="fa-solid fa-share"></i></div>

          </div>
        </div>







        <div>

        <div className="card w-96 bg-gray-200 shadow-xl">
  <div className="card-body">
    <ul className='text-left text-xl space-y-4'>
      <li><i class="fa-solid fa-truck-fast"></i> Shipping Worldwide</li>
      <li><i class="fa-solid fa-person-walking-arrow-loop-left"></i> Free 7 day return if eligible</li>
      <li><i class="fa-solid fa-wallet"></i> Available cash on delivery</li>
      <li><i class="fa-solid fa-money-bill-wheat"></i> supplier will provide bills</li>
      <li><i class="fa-solid fa-cart-shopping"></i> Minimum buy</li>
    </ul>
    
   
  </div>
</div>


<div className='mt-10'>
<img
                className='rounded-lg'
                width='80%'
                height=''
                src={banner3}
                alt=''
               
              />
</div>
        </div>
        </div>
        
{/* Grid end */}


<div>
<img
                className='rounded-lg'
                width=''
                height=''
                src={banner3}
                alt=''
               
              />
</div>

<div className="divider"></div> 

<div className='grid grid-cols-3 gap-4 mt-20'>

  <div className='col-span-2 border p-2'>

   <div className='text-left'>
   <button><Link className='text-2xl text-bold border'>Description</Link></button>
    <button><Link to={`/details/${slug}/reviews`} className='text-2xl text-bold border ms-5'>Review</Link></button>
   </div>
  <div style={{height:'800px'}} className="">
             <Outlet></Outlet>
  </div>


  </div>


  <div>
  <div className="card lg:card-side bg-base-100 shadow-xl">
  <figure><img src={banner3} alt="Album"/></figure>
 
</div>
  </div>

</div>

{/* Related products */}
<RelatedProducts></RelatedProducts>







<Footer></Footer>


    </div>
    </div>
  )
}

export default ProductDetails