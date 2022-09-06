import React from 'react'
// import { useState } from 'react';

import { NavLink,useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import {countOfAllTakeaways,getAllAppliances,refreshTokens} from './../../Shared/Services'
import TopHeader from '../genric/TopHeader';
import Header from '../genric/Header';

import Cards from '../genric/Cards';
import UserHome from '../user/UserHome';
import { useState } from 'react'
// const jwt = require('jsonwebtoken')




export default function Home() {
  const navigate = useNavigate();
  const userInfo=React.useContext(UserContext).userInfo
  const [count, setcount] = React.useState([0,0])
  const [isAdmin, setIsAdmin] = React.useState(true)
  const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [verifyToken, setVerifyToken] = useState('')
   


  let takeawaycount=''
  const getvalue=(data)=>{
  let key=Object.keys(data)
  return data[key]
  }

  React.useEffect(()=>{ 
    refreshToken()
    if(userInfo.role==='Admin'){
      console.log(userInfo)
      setIsAdmin(true)
    }
    if(!userInfo){
      let role=localStorage.getItem('role')
      if(role){
        if(role==='Admin'){
          setIsAdmin(true)
        }   
      }else{
        console.log("from home else")
        navigate('/')
      }
    }
    
    countOfAllTakeaways()
    .then(function (response) {
      console.log("dklgtpodr",response)
      takeawaycount=getvalue(response.data)
      setcount((old)=>{
        old[0]=takeawaycount
        return [...old]
      }) 
    })
    .catch(function (error) {
      console.log(error);
    });
    getAllAppliances()
    .then((response)=>{
      setcount((old)=>{
        old[1]=response.data.length
        return[...old]
      })

    })
    
    .catch((e)=>{
      console.log(e)
    })



  },[])

// console.log(localStroage.id);
  const refreshToken = async () => {
    try {
        const response = await refreshTokens()
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setName(decoded.name);
        setExpire(decoded.exp);
        setVerifyToken(response.data.user[0].refresh_token)
        // jwt.verify(verifyToken,process.env.REFRESH_TOKEN_SECRET,(err, result) =>{
        //   if(err){
        //     navigate('/Login')
        //   }else{
        //     navigate('/Home')
        //   }

        // })
        if(response.data.user[0].refresh_token){
          console.log("hello")
          navigate('/Home')
        }
        else{
          console.log("hy")
          navigate('/Login')
        }
    } catch (error) {
        if (error.response) {
            navigate("/");
            console.log('error-------------->>>>')
        }
    }
}

// refreshToken()
const axiosJWT = axios.create();

axiosJWT.interceptors.request.use(async (config) => {
    const currentDate = new Date();
    if (expire * 1000 < currentDate.getTime()) {
      const response = await refreshTokens()
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setName(decoded.name);
        setExpire(decoded.exp);
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

  return (
    
    <div className='masterDiv'>
      <Header isAdmin={isAdmin}/>
      <div className='mainPage'>
        <TopHeader isAdmin={isAdmin} title={"Home"}/>
        <div className='pageHeading'>Home</div>
        <div className='homePageDiv'>
          {isAdmin?
            <>
              <div className='cardSection'>
              <NavLink to={`/Takeaway`}><Cards title={"Takeaway"} count={count[0]} color={"#F2EAED"} /></NavLink>
              <NavLink to={`/Appliances`}><Cards title={"Kitchen"} count={count[1]} color={"#EAFCFC"}/></NavLink>
              </div>
            </>  
            :<UserHome />
          }
        </div>
      </div>
    </div>
  )
}
