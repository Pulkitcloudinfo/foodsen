import React from 'react'
import { NavLink,useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import Table from '../genric/Table';
import TopHeader from '../genric/TopHeader';
import Header from '../genric/Header';
import AddDiv from '../genric/AddDiv';
import ShowDiv from '../genric/ShowDiv';
import {getAllTakewayTypes,getAllMenuItems,changeMenuStatus,createMenuItems,getMenuItemById,updateMenuItems,deleteMenuItemById} from './../../Shared/Services'

export default function MenuItems() {
  let navigate = useNavigate();
  const [isAdmin, setIsAdmin] = React.useState(false) 
  const [arrayOfStatus, setArrayOfStatus] = React.useState([])
  const [pageStatus, setPageStatus] = React.useState(false)
  const [takeawayTypes, setTakeawayTypes] = React.useState([])
  const [allMenuItems, setAllMenuItems] = React.useState([])
  const [idForUpdate, setIdForUpdate] = React.useState('')

  const [stateObject, setStateObject] = React.useState({
    name:'',
    type:''
  })
  const [updateObject, setUpdateObject] = React.useState({
    name:'',
    type:''
  })
  const [test, setTest] = React.useState(false)
  const userInfo=React.useContext(UserContext).userInfo

  const changeCreateStateFunc=(key,value)=>{
    setStateObject((old)=>{
      return {...old,[key]:value}
    })
  }
  const changeUpdateStateFunc=(key,value)=>{
    setUpdateObject((old)=>{
      return {...old,[key]:value}
    })
  }
  const inputdata=[
    {
      name:"Item Name",
      type:"text",
      placeholder:"Name",
      value:stateObject.name,
      valueForUpdate:updateObject.name,
      key:"name",
      clickevent:changeCreateStateFunc,
      updateClickEvent:changeUpdateStateFunc
      
    },
    {
      name:"Type",
      type:"select",
      option:[
        {
          name:"Indian",value:1},
          {name:"Chinese",value:2}
      ],
      key:"type",
      valueForUpdate:updateObject.type,
      value:stateObject.type,
      placeholder:"Type",
      clickevent:changeCreateStateFunc,
      updateClickEvent:changeUpdateStateFunc

    }
  ]
  const changeStatus=(id,status,index)=>{
    changeMenuStatus(id,status,index)
    .then(function (response) {
      setArrayOfStatus((old)=>{
        old[index] = !old[index]
        return[...old]
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  const insertIntoDb=()=>{
    if(stateObject.name&&stateObject.type){
      createMenuItems(stateObject)
      .then(function (response) {
        alert("Added Successfully")
        setPageStatus(!pageStatus)
      })
      .catch(function (error) {
        console.log(error);
        alert("something went wrong")
      });
    }else{
      alert("All fields are mandatory")
    }
  }
  const editMenuItems=()=>{
    updateMenuItems(idForUpdate,updateObject)
    .then(function (response) {
      alert("upadated")
      setTest(!test)
    })
    .catch(function (error) {
      console.log(error);
      alert("Internal Error")
    });
  }

  const editById=(id)=>{
    getMenuItemById(id)
    .then(function (response) {
      console.log("lol",response.data[0])
      setIdForUpdate(response.data[0].id)
      console.log(response.data[0].id)
      setUpdateObject((old)=>{

        return {...old,name:response.data[0].name,type:response.data[0].takeawayType}
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  const deleteMenuItem=(id,index)=>{
    if (window.confirm("Are you sure?")) {
      deleteMenuItemById({id:id})
      .then(function (response) {
        setAllMenuItems((old)=>{
          old.splice(index,1)
          return [...old]
        })
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    else{
    return 
    }
  }


  React.useEffect(()=>{
    if(userInfo.role==='Admin'){
      setIsAdmin(true)
    }
    if(!userInfo){
      let role=localStorage.getItem('role')
        if(role==='Admin'){
          setIsAdmin(true)
        }   
        else{
          navigate('/')
        }
      }
    getAllTakewayTypes()
    .then(function (response) {
      setTakeawayTypes(...response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
    getAllMenuItems()
    .then(function (response) {
      console.log(response.data)
      const tempArray = new Array(response.data.length).fill(false)
      let data=response.data
      let arr = []
      for(let x in data){
        if(data[x].status===1){
          tempArray[x]=true
        }
        arr.push({id:data[x].id,type: data[x].takeaway_type.name,name:data[x].name, status:data[x].status})
      }
      setAllMenuItems(arr)
      setArrayOfStatus([...tempArray])
    })
    .catch(function (error) {
      console.log(error);
    });

  },[test])
  console.log(allMenuItems)
  return (
    <div className='masterDiv'>
      <Header isAdmin={isAdmin}/>
      <div className='mainPage'>
      <TopHeader isAdmin={isAdmin} title={"Menu Items"}/>
      <div className={pageStatus?'':'secondTop'}>
        <div className='pageHeading'>Menu Items</div>
          {pageStatus?
            <AddDiv inputdata={inputdata} save={insertIntoDb} update={editMenuItems} />
            :
            <button className='createbtn'
            onClick={()=>{
              setPageStatus(!pageStatus)
            }}
            >Create</button>
          }
        </div>
        <ShowDiv 
          columns={["name","type",]}
          arrayOfStatus={arrayOfStatus}
          changeStatus={changeStatus} 
          dataToShow={allMenuItems}
          EditRoute={editById}
          delete={deleteMenuItem}
          inputdata={inputdata} 
          save={insertIntoDb}
          pageStatus={pageStatus}
          update={editMenuItems}
        />
      </div>
    </div>
  )
}
