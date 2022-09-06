import React from 'react'
import { Navigate, NavLink,useNavigate } from 'react-router-dom';
import Cards from '../genric/Cards';
import UserCard from '../takeway/UserCard';
import { UserContext } from './../../App';
import Session from './Session';
import {getTakeawayDetails} from './../../Shared/UserServices'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
const stripePromise = loadStripe('pk_test_51LXJQGSGGPs6zlpy6pqKYZPlw5Sltf7ua2QsYGXVYwygfd3ui6UoAt7UmHAXN8A16CsspHUHeak1kN0MTEcBZoRn009UJlG8Rb');


export default function UserHome() {
  let navigate = useNavigate(); 
  const userInfo=React.useContext(UserContext).userInfo
  const [recordsData, setRecordsData] = React.useState([])
  const id=localStorage.getItem('id')
  React.useEffect(()=>{
    console.log("jksdvck")
    if(localStorage.getItem("setup")){
      console.log("change ")
      navigate('/profile')
    }
    if(id){
        getTakeawayDetails(id)
        .then(function (response) {
          setRecordsData(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    console.log(recordsData)
  },[])
  return (
    <div>
    <Elements stripe={stripePromise}>
      <Session />
    </Elements>
    <div className='userCardSection'>
        {recordsData&&recordsData.length>0?
        recordsData.map((item,index)=>{
          return <NavLink key={index} to={`/ViewRecords/id:${item.id}`}>
          <UserCard title={item.name} count={item.count} id={item.id} color={"#dfe5f8"}/></NavLink>
        })
        :"No data"}
      </div>
    </div>

  )
}
