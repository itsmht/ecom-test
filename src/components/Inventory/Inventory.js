import React, { useEffect, useState } from 'react'
import Navigation from '../Shared/Navigation'
import Searchbar from '../Shared/Searchbar'

export const Inventory = () => {
    const[items,setItems] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    
    console.log(items);
  

    const handleProceed = (itemId) => {


        const token = "WuVVJ3nOy9cEljDKnFz91oAV3XXQa3fqVKoXcQNk5nOJz2sUcak97EAzJmib6lQj";
        const data = {
            my_product_id: itemId,
            product_quantity:quantity,
            product_amount_per_quantity: totalPrice
          
        };
        console.log('data',data);
      
        // Send the POST request
        fetch('https://corp.glbpowerplant.com/api/sellProduct', {
          method: 'POST',
          headers: {  
            'Authorization': `${token}`,         
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify(data), 
        })
          .then((response) => {
            if (response.ok) {
            
             alert('Product sold successfully');
              
              document.getElementById(`my_modal_${itemId}`).close();
            } else {
              
              alert('Failed to sell the product');
            }
          })
          .catch((error) => {
            
            console.error('Network error:', error);
          });
      };
      




      useEffect(() => {
        fetch('https://corp.glbpowerplant.com/api/myProducts', {
          method: 'GET',
          headers: {
            'Authorization': 'WuVVJ3nOy9cEljDKnFz91oAV3XXQa3fqVKoXcQNk5nOJz2sUcak97EAzJmib6lQj'
          }
        })
        .then(res => res.json())
        .then(data => {
          setItems(data.data);
          console.log(data.data);
        })
      }, []);
      


    const incrementQuantity = (itemId) => {
        setQuantity(quantity + 1);
        updateTotalPrice(itemId,quantity + 1); 
      };
    
      // Function to decrement the quantity, ensuring it doesn't go below 1
      const decrementQuantity = (itemId) => {
        if (quantity > 1) {
          setQuantity(quantity - 1);
          updateTotalPrice(itemId,quantity - 1); 
        }
      };
      const updateTotalPrice = (itemId,newQuantity) => {
        const selectedItem = items.find((item) => item.id===itemId); 
        if (selectedItem) {
          const pricePerUnit = selectedItem.my_price; 
          setTotalPrice(pricePerUnit * newQuantity);
        }
      };
      
  return (
    <div>
        <Navigation></Navigation>
        <Searchbar></Searchbar>
        
        <div style={{
            marginLeft:'20px',
            marginRight:'20px'
        }}>
            <p className='text-left text-bold text-xl'>Inventory</p>

            {
                    items.map((item) => (
                        <>
                        <div className='flex justify-evenly justify-items-center content-center text-left' key={item.product_id}>
                            <img width='107px' src={item.thumbnail} alt=''/>
                            <p className='text-bold text-xl mt-7'>{item.title}</p>
                            <p className='text-xl mt-7'> Avilable {item.my_stock}</p>
                           
                            <button className="btn btn-warning mt-7" onClick={()=>document.getElementById(`my_modal_${item.product_id}`).showModal()}>Sell</button>


                            <dialog style={{width:''}} id={`my_modal_${item.product_id}`} className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                            <div className='flex'>
                            <img width='225px' src={item.thumbnail} alt=''/>
                                <div className='mt-7'>
                                <h3 className="font-bold text-2xl">{item.title}</h3>
                                <p className="pt-2">Available {item.my_price}</p>
                                
                                

                                <div className='mt-5'>
    
        
                                        <div className='flex items-center'>
                                            <div>
                                            <p className=''>Quantity</p>
                                            <div className='border border-black-200 bg-gray-200 rounded-lg'>    
                                                <button className="p-2" onClick={()=>decrementQuantity(item.product_id)}> - </button>
                                                <span className="mx-2 text-bold">{quantity}</span>
                                                <button className="p-2" onClick={()=>incrementQuantity(item.product_id)}> +  </button>
                                            </div>
                                            </div>
                                            
                                            <div style={{marginBottom:'6px'}} className='ml-5'>
                                                <p className=''>Price per Unit</p>
                                                <p className='border border-black-200 bg-gray-200 rounded-lg p-2'>{item.my_price}</p>
                                            </div>
                                        </div>
                                    </div>

{/* Total price */}
<div className='flex mt-5 justify-between'>
                      <h1 className='text-bold'>Total price</h1>
                      <h1>{totalPrice}</h1>
                    </div>



                                
                                </div>
                            </div>


                                <div className="modal-action">

                                <form method="dialog">
                                   
                                <button className="btn mx-3" onClick={() => handleProceed(item.product_id)}>
  Proceed
</button>


                                    <button className="btn">Cancle</button>
                                </form>
                                </div>
                            </div>
                            </dialog>
                        </div>
                        <div className="divider"></div> 
                        </>
                        
                    ))
                    
                }

        </div>
    </div>
  )
}
