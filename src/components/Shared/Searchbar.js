import React, { useState } from 'react'

export default function Searchbar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);

        
      };
    
      const handleSearch = async (e) => {
        e.preventDefault();

  try {
    const response = await fetch('https://corp.glbpowerplant.com/api/searchProduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ searchQuery }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setSearchResults(data.data);
    } else {
      // Handle error here
      console.error('Search failed');
    }
  } catch (error) {
    console.error('Error:', error);
  }
      };
    

  return (
    <div style={{backgroundColor:'white'}} className="navbar1">
      <div className="categories-dropdown">
        <select style={{padding:'15px',backgroundColor: 'inherit',border:'1px solid black',color:'black'}} className=' font-bold'>
          <option className=''  value="all">All Categories</option>
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
          <option value="category3">Category 3</option>
        </select>
      </div>
      <div className="search-bar">
    <input 
    style={{ color: 'black', border:'1px solid black' ,borderEndEndRadius:'0',borderTopRightRadius:'0'}}
     className="search-input border" 
     type="text"
     placeholder="Search..." 
     value={searchQuery}
    onChange={handleInputChange}
     />
   <span style={{border:'1px solid black',padding:'10px',borderTopRightRadius:'20px',borderBottomRightRadius:'20px',backgroundColor:'rgb(251, 189, 10)'}} onClick={handleSearch}> <i style={{color:'black'}} className="fas fa-search search-icon"></i></span>
</div>

<div>
        {Array.isArray(searchResults) && searchResults.length > 0 && (
          searchResults.map((result, index) => (
            <div key={result.id}>
              <p>{result.title}</p>
              {/* Add other product information here */}
            </div>
          ))
        ) 
          
        }
      </div>

      {/* <div  className="cart-icon"> */}
    <i style={{color:'yellow'}} className="fas fa-coins text-2xl px-2"></i>
      <span style={{fontWeight:900,backgroundColor:'rgb(251, 189, 10)',color:'black',padding:'20px',borderRadius:'30%'}} id="coin-value">100.00</span> 
      {/* </div> */}
    </div>

  )
}
