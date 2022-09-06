import React from 'react'
import { useNavigate } from "react-router-dom";
import Footer from '../genric/Footer';
import Header from '../genric/Header';
import AddDiv from '../genric/AddDiv';
// import {checkLogIn} from './../../Shared/Services'


export default function EditPage() {
  const inputdata=[{
    name:"Entity Name",
    type:"text",
    placeholder:"Enter Name",
    // clickevent:setentityname
   },
   {
     name:"Description",
     type:"text",
     placeholder:"Enter Description",
    //  clickevent:setdescription
   }]
 

  return (
    <div className='container'>
      <Header/>
      <center><h2>Edit</h2></center>
        <AddDiv title={"Add Entity"} inputdata={inputdata}/>
      <Footer/>
    </div>
  )
}
