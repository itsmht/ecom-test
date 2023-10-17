
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const ElectronicsItem = () => {
    const[electronics,setElectronics] = useState([]);

    useEffect(()=>{
        fetch('https://corp.glbpowerplant.com/api/homepageProducts')
        .then(res=>res.json())
        .then(data=>{
            console.log(data.data[0].slug);
            const firstThreeItems = data.data.slice(0, 4);
            setElectronics(firstThreeItems)
        })
        
       

    },[]);
    return (
       <div className='container mx-auto'>
        <h1 className="text-left text-4xl antialiased font-bold my-4">Electronic Items</h1><br/>
          <Link to='/'>  <p className='text-right text-2xl px-5'>view more</p></Link>
        <div className="grid grid-cols-4 gap-x-10 card-normal">
        {electronics.map(item => (
            
            <div className="card bg-base-100 shadow-xl">
                
                <Link to={`/details/${item.slug}`}>
                            <div className="">
                                <img style={{ width: '300px' }} src={item.images[0]} alt="" />
                            </div>
                        </Link>


          <div className="card-body ">
            <Link to={`/details/${item.id}`}    ><h2 className="card-title">{item.title}</h2></Link>
            <p className='text-left'>Price:{item.price}</p>
            <p className='text-left'>
    Rating:
    {Array.from({ length: 5 }, (_, index) => {
        if (index < Math.floor(item.rating)) {
            // Display full gold star for full rating
            return <FontAwesomeIcon icon={faStar} key={index} style={{ color: 'gold' }} />;
        } else if (index === Math.floor(item.rating)) {
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


          </div>
          </div>
        ))}
        
      </div>
     





       </div>
    );
};

export default ElectronicsItem;