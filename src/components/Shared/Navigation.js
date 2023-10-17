import React, { } from 'react';
import { Link } from 'react-router-dom';
import quirky from '../../images/quirky1.png'
import './Searchbar.css'
const Navigation = () => {


  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // const toggleMobileMenu = () => {
  //   setIsMobileMenuOpen(!isMobileMenuOpen);
  // };


    return (
      <>

        <div style={{backgroundColor:'rgb(251, 189, 10)'}} className="navbar p-4">
  <div className="navbar-start">


   <Link to='/home'><img className='' style={{width:"140px",height:'90px'}} src={quirky} alt="" /></Link>
    

    <div className="dropdown"> 
    
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        
      
        <li>
          <Link>kkkkkk</Link>
          <ul className="p-2">
            <li><Link>Submenu 1</Link></li>
            <li><Link>Submenu 2</Link></li>
          </ul>
        </li>
        <li><Link>Item 3</Link></li>
        <li><Link to='/about'>About</Link></li>
        
      </ul>
    </div>
    <Link className="btn btn-ghost normal-case text-xl text-slate-950"></Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">

        <li><Link className='text-bold text-2xl font-normal' style={{color:'0D83BA'}} to='/about'>About</Link></li>
        <li><Link className='text-bold text-2xl font-normal' style={{color:'0D83BA'}} to='/contact'>Contact us</Link></li>
        <li><Link className='text-bold text-2xl font-normal' style={{color:'0D83BA'}} to="/inventory">Inventory</Link></li>
        <li><Link className='text-bold text-2xl font-normal' style={{color:'0D83BA'}} to="/recharge">Recharge</Link></li>
      
      <li tabIndex={0}>
        <details>
          <summary className='text-bold text-2xl font-normal' style={{color:'0D83BA'}}>Parent</summary>
          <ul style={{zIndex:"1000"}} className="p-2">
            <li><Link>Submenu 1</Link></li>
            <li><Link>Submenu 2</Link></li>
          </ul>
        </details>
      </li>
      <li><Link className='text-bold text-2xl font-normal' style={{color:'0D83BA'}} to='/products'>Products</Link></li>
    </ul>
  </div>
  <div className="navbar-end">
    <Link to='/signup' className="btn">Signup</Link>
  </div>
</div>



</>


    );
};

export default Navigation;