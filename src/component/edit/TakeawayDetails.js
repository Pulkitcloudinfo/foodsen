import React from 'react'
import Header from '../genric/Header'
import Footer from '../genric/Footer'
import TopHeader from '../genric/TopHeader';
import { getTakeawayById } from './../../Shared/Services';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

export default function TakeawayDetails() {
  const [takeawayData, setTakeawayData] = React.useState([])
  const [name, setname] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [email, setEmail] = React.useState("")
  const [mobile, setMobile] = React.useState('')
  const [pageStatus, setpageStatus] = React.useState(false)
  let { id } = useParams();
  console.log("id from takeaway Details",id)

  React.useEffect(()=>{
    
  },[])

  React.useEffect(()=>{
    console.log(takeawayData)
    
  },[takeawayData])

  return (
    <div className='masterDiv'>
        <Header/>
      <div className='mainPage'>
        <TopHeader />
        
       

        <Footer/>

      </div>
    </div>
  )
}
