import React, { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import '../../css/admin/adminLogin.css';
// import { login }from '../../Shared/Services'
import { UserContext } from "../../App";


export default function AdminLogin() {
  const navigate = useNavigate();  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [wrongPassword, setwrongPassword] = useState(false)
  // var isLoggedIn=localStorage.getItem("name")
  
  const userInfo=React.useContext(UserContext).userInfo
  const setUserInfo=React.useContext(UserContext).setUserInfo

    const submit=(e)=>{
    e.preventDefault()
    // login(email,password)
    .then(function (result) {
        alert("success")
        console.log(result,"result")
        localStorage.setItem('id', result.data.id)
        localStorage.setItem("role",'Admin')
        setUserInfo({
          role:'Admin',
          id:result.data.id
        })  
      })
    .catch(function (error) {
      // console.log(error);
      setwrongPassword(true)
      setTimeout(()=>{
      setwrongPassword(false)
      },2000)
    });
  }
     
     
  React.useEffect(()=>{
    if(userInfo.role==="Admin"){
      console.log(userInfo)
      navigate('/Home')
    }else{
      let role=localStorage.getItem('role')      
        if(role==='role'){
          navigate('/Home')
        }
    }
  },[userInfo])
  console.log(userInfo,"ok")
  return (
    <div className="Login">
      <center><h3>Admin Login</h3></center>
      <form 
      onSubmit={(e)=>submit(e)}
      >
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
          onChange={(e) =>{
            setEmail(e.target.value)
          }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          />
        </div>
        {wrongPassword&&<span className='passwordWarning'> Wrong email name or password</span>}
        <div>
        <button type="submit" className="btn btn-primary" onClick={submit}>Submit</button>
        </div>
      </form>
    </div>
  )
}
