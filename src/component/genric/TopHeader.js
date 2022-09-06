import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate,Link } from "react-router-dom";
import { faCoffee ,faVideo,faHome,faTable,faBell,faUserAlt} from '@fortawesome/free-solid-svg-icons'

import { login } from './../../Shared/Services';
import { useState } from 'react';
import Cookies from "js-cookie";
import App from '../../App';


export default function TopHeader(props) {
  let navigate = useNavigate(); 
  const routeChange = (path) =>{  
    navigate(path);
  }
 const [refresh, setRefresh] = useState(false);

  return (
    <div className='topHeader'>
        <div className='topLinks'>
        <span className='pageTitle'>{props.title?props.title:"Page Title"}</span>
        <span className='customBreadcrumb'><FontAwesomeIcon icon={faHome} size="sm" /> / {props.title?props.title:"Page Title"}</span>
        </div>
        <div className='profile '>
          <div className='notification'><FontAwesomeIcon icon={faBell} size="lg" /></div>
          <div className='userName'>
            <div  className="dropdown">
            <button className='profileLink'>
            <div className="dropdown-content">
             
            <a onClick={() =>{
                 localStorage.removeItem('role')
                 Cookies.remove('refreshToken')
                // navigate("/Login")
                // routeChange('/Login')
                window.location = "http://localhost:3000/"
                console.log('Role remove')
                setRefresh(!refresh)
            }}>signOut</a></div> 
              <FontAwesomeIcon icon={faUserAlt} size="lg" /></button>
              </div>
          </div>
        </div>
    </div>
  )

          
}
