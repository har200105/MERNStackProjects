import React,{useState} from "react";
import { Link } from 'react-router-dom';
import './Header.css';
import { useSelector } from 'react-redux';


const Header = () => {
  const [clicked, setClicked] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  return (
      <nav className="NavbarItems">
            <Link to="/" style={{
              textDecoration:"none"
            }}>
            <h1 className='navbar-logo'>Shopzzy</h1>
              </Link>
                <div className='menu-icon' onClick={()=>setClicked(!clicked)}>
                    <i className={clicked ?'fas fa-times' :'fas fa-bars'}></i>
                </div>
                <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                    <Link to={"/"}>
                        <li><a href='' className='nav-links'>Home</a></li>
                    </Link>
                    <Link to={"/products"}>
                        <li><a href='' className='nav-links'>Products</a></li>
                    </Link>
                    { !isAuthenticated && <Link to={"/login"}>
                            <li><a href='' className='nav-links'>Login</a></li>
                      </Link>}
                    <Link to={"/cart"}>
                        <li><a href='' className='nav-links'>Cart</a></li>
                    </Link>
                      <Link to={"/Search"}>
                          <li><a href='' className='nav-links'>Search</a></li>
                      </Link>
                       {  isAuthenticated && <Link onClick={()=>console.log("Logout")}>
                                    <li><a href='' className='nav-links'>Logout</a></li>
                        </Link>}  
                      {  isAuthenticated && <Link to="/orders">
                                                  <li><a href='' className='nav-links'>Orders</a></li>
                                    </Link>}  
                          {
                            user?.role==="admin" &&  <Link to={"/admin/dashboard"}>
                                        <li><a href='' className='nav-links'>Admin</a></li>
                                    </Link>
                          }
                        </ul>
            </nav>
  );
};

export default Header;
