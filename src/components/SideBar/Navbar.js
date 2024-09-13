import React, { useState, useContext } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { GoVerified } from "react-icons/go";
import { RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom";
import SidebarData from "./Sidebardata.js";
import { BiSolidDownArrow } from "react-icons/bi";
import "./sidebar.css";
import { IconContext } from "react-icons";
import { AuthContext } from "../../Contexts/AuthContext.js";
import {toast} from 'react-toastify';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const { user, setUser } = useContext(AuthContext);

  const showSidebar = () => setSidebar(!sidebar);
  const logoutToast = () => toast.success("LoggedOut Successfully");
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    logoutToast();
  }
  return (
    <IconContext.Provider value={{ color: "undefined" }}>
      <div className="navflex">
        <div className="sidebar">

          <div className="navbar">
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          </div>
          <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
            <ul className="nav-menu-items" onClick={showSidebar}>
              <li className="navbar-toggle">
                <Link to="#" className="menu-bars">
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        <div className="viewprofile">
          <div className="greeting">
            <button class="dropbtn">HI,{user?.fullname}{user?.isverified?<GoVerified />:<RxCrossCircled />}<BiSolidDownArrow /></button>
            <div class="dropdown-content">
              <a><button style={{
                border: 'none',
                background: 'none',
                fontSize: '16px', 
                color:'white',
                cursor: 'pointer' 
              }} onClick={handleLogout}>Logout</button></a>
            </div>
          </div>
          <div>
            <CgProfile size={40} />
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
}

export default Navbar;