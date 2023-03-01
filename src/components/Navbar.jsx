import { Link, useNavigate, useLocation } from "react-router-dom";
import { BiUser } from "react-icons/bi"
import { RiShoppingBasketLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import {BsDot} from "react-icons/bs"
const Navbar = () => {

  const [isAlertActive, setIsAlertActive] = useState(false);

  useEffect(()=>{
    if(localStorage.getItem("alert")){
      setIsAlertActive(true)
    }
  }, [])

  const [isOpen, setIsOpen] = useState(false);

  let navigate = useNavigate()

  const handleLogout = async() =>{
    setIsOpen(false)
    await signOut(auth)
    navigate("/")
    localStorage.removeItem("alert");
  }
  
  let currentLocation = useLocation();

  return (
    <nav>
      {currentLocation.pathname === "/purchase" ? <button onClick={()=> navigate("/home")} >Back</button> : <span></span>}
      <div>
        <Link to="/purchase">
          <RiShoppingBasketLine className="icons"  />
          <BsDot className={`newUpdates-dot ${isAlertActive ? "" : "newUpdates-dot-disable"}`}/>
        </Link>
        <BiUser className="icons" onClick={()=> setIsOpen(prev=> prev ? false : true)}  />
      </div>
        <div className={`context-menu ${isOpen ? "context-menu-active" : ""}`}>
          <p>{auth.currentUser?.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
    </nav>
  );
}
 
export default Navbar;