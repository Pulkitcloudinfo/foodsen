import React  from 'react';
import {useState,} from 'react';
import './App.css';
import './css/user.css'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from './component/user/Login';
import Register from './component/user/Register'
import AdminLogin from './component/admin/AdminLogin'
import AdminHome from './component/pages/Home'
import AdminEnitity from './component/pages/Entity'
import EditPage from './component/pages/EditPage'
import MenuItems from './component/pages/MenuItems'
import Records from './component/pages/Records'
import RecordTables from './component/pages/RecordTables'
import Surveyor from './component/pages/Surveyor'
import Takeaway from './component/pages/Takeaway'
import Appliances from './component/pages/Appliances'
import TakeawayModification from './component/edit/TakeawayDetails';
import CreateRecord from './component/edit/CreateRecord';
import SurveyorDetails from './component/edit/SurveyorDetails';
import MenuItemsDetails from './component/edit/MenuItemsDetails';
import ViewRecords from './component/edit/ViewRecords';
import TakeawayProfile from './component/takeway/TakeawayProfile'
import TakeawayRecords from './component/takeway/TakeawayRecords'
import Session from './component/user/Session'
import Settings from './component/user/Settings';
import Products from './component/pages/products'; 
import TrainingSessions from './component/pages/TrainingSessions'
const stripePromise = loadStripe('pk_test_51LXJQGSGGPs6zlpy6pqKYZPlw5Sltf7ua2QsYGXVYwygfd3ui6UoAt7UmHAXN8A16CsspHUHeak1kN0MTEcBZoRn009UJlG8Rb');
export const UserContext= React.createContext()

function App() {
  // const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState('')
  const [isLoggedIn, setisLoggedIn] = useState(false)
  // const checkLogIn=localStorage.getItem('id')
  // const role=localStorage.getItem('role')
  console.log("from app function ---------------------------------------------------<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
console.log(userInfo);
  // console.log(checkLogIn,role)
  
  // React.useEffect(()=>{
  //   if(role ){
  //     setUserInfo({
  //       id:checkLogIn,
  //       role:role
  //     })
  //   // }else{
  //   //   navigate('/Login')
  //   }
  // },[])

  return (
    
    <>  
    {/* <AuthApi.Provider value={{auth, setAuth}}> */}
<Elements stripe={stripePromise}>
        <UserContext.Provider value={{userInfo:userInfo,setUserInfo:setUserInfo}}>
        <Routes>
          <Route  index  exact path="/" element={<Login setisLoggedIn={setisLoggedIn}/>} /> 
          {/* <Route path ="/dashboard" element={<dashboard/>}/> */}
          <Route  index  exact path="/register" element={<Register/>} />  
          {/* <Route  index  exact path="/stripeSubscription" element={<StripeSubscription/>} />  */}
          <Route  index  exact path="/Login" element={<Login/>}/>
          <Route path="/admin" element={<AdminLogin/>} />  
          <Route path="/Home" element={<AdminHome/>} />  
          <Route path="/Entity" element={<AdminEnitity/>} />  
          <Route path="/edit" element={<EditPage/>} />  
          <Route path="/MenuItems" element={<MenuItems/>} />
          <Route path="/Products" element={<Products/>} />
          <Route path="/Appliances" element={<Appliances/>} />  
          <Route path="/Record" element={<RecordTables/>} />  
          <Route path="/Surveyor" element={<Surveyor/>} />  
          <Route path="/TakeAway" element={<Takeaway/>} />  
          {/* <Route path="/Products" element={<Products/>} /> */}
          <Route path="/TakeAway/Details" element={<TakeawayModification/>} />  
          <Route path="/CreateRecord/:id" element={<CreateRecord/>} />  
          <Route path="/Surveyor/Details/:id" element={<SurveyorDetails/>} />  
          <Route path="/MenuItems/Details/:id" element={<MenuItemsDetails/>} />  
          <Route path="/ViewRecords/:id" element={<ViewRecords/>} />  
          <Route path="/Records" element={<TakeawayRecords/>} />  
          <Route path="/Session" element={<Session/>} />  
          <Route path="/TrainingSessions" element={<TrainingSessions/>} /> 
          <Route path="/profile" element={<TakeawayProfile/>} />  
          <Route path="/Settings" element={<Settings/>} />  
        </Routes>
        
  
        </UserContext.Provider>
        </Elements>
        {/* </AuthApi.Provider> */}
    
    </>
  );
}

export default App;
