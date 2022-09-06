import React from 'react'
import 'font-awesome/css/font-awesome.min.css';

import {NavLink,useNavigate} from 'react-router-dom';
import TopHeader from '../genric/TopHeader';
import Header from '../genric/Header';
import AddDiv from '../genric/AddDiv';
import {getEntityList,addEntityToTable,sdeleteEntityById,changeEntityStatus,updateEntity,editEntity,getEntitiesById,getEntityBydata} from './../../Shared/Services'
import { UserContext } from '../../App';
import ShowDiv from '../genric/ShowDiv';


export default function Entity() {
 
//navigate is used top navigate the page 

  let navigate = useNavigate();

//all hooks which is used in this function

  const [isAdmin, setIsAdmin] = React.useState(false)
  const userInfo=React.useContext(UserContext).userInfo
  const [entityDetails, setEntityDetails] = React.useState([])
  const [idForUpdate, setIdForUpdate] = React.useState('')
  const [arrayOfStatus, setArrayOfStatus] = React.useState([])
  const [test, setTest] = React.useState(true)
  const [pageStatus, setPageStatus] = React.useState(false)
  const [tableData, setTableData] = React.useState([])

  //hook use for set the insert data

  const [stateObject, setStateObject] = React.useState({
    name:'',
    description:'',
    type:'',
    table:''
  })

    //hook use for set the updated data

  const [updateObject, setUpdateObject] = React.useState({
    name:'',
    description:'',
    type:'',
    table:''
  })

  //function for set the data when data is insert into database and it is used in insert function

  const changeCreateStateFunc=(key,value)=>{
    setStateObject((old)=>{
      return {...old,[key]:value}
    })
  }

   //function for set the updated  data which is used in update function

  const changeUpdateStateFunc=(key,value)=>{
    setUpdateObject((old)=>{
      return {...old,[key]:value}
    })
  }

 //declare all the data which is use in showDiv and AddDiv
    
  const inputdata=[{
    name:"Entity Name",
    type:"text",
    placeholder:"Name",
    value:stateObject.name,
    key:"name",
    valueForUpdate:updateObject.name,
    clickevent:changeCreateStateFunc,
    updateClickEvent:changeUpdateStateFunc
   },
   {
     name:"Description",
     type:"text",
     placeholder:"Description",
     value:stateObject.description,
     key:"description",
     valueForUpdate:updateObject.description,
     clickevent:changeCreateStateFunc,
     updateClickEvent:changeUpdateStateFunc
   },
   {
    name:"Type",
    // type:"select",
    option:[
      {name:"Date",value:1},
      {name:"String",value:2},
      { name:"Dropdown",value:3 }
    ],
    placeholder:"Type",
    value:stateObject.type,
    key:"type",
    valueForUpdate:updateObject.type,
    clickevent:changeCreateStateFunc,
    updateClickEvent:changeUpdateStateFunc
  },
  {
  name:"Table",
    type:"select",
    option:tableData,
    //placeholder:"Table Names",
    value:stateObject.table,
    key:"table",
    valueForUpdate:updateObject.table,
    clickevent:changeCreateStateFunc,
    updateClickEvent:changeUpdateStateFunc
  }
  ]

//function for insert data into the database

  const insertIntoDB=()=>{ 
    if(!stateObject.name && !stateObject.description && !stateObject.type && !stateObject.table){
      alert("All field are mandatory")
    }
      // else if(stateObject.name === stateObject.name){
      //   alert("already exits")
      // }
      else{
      addEntityToTable(stateObject).then(function (response) {
        alert("Added Successfully")
        console.log(response.data,"insertData")
        // window.location.reload()
        setPageStatus(!pageStatus)
      })
      .catch(function (error) {
        alert("Something went wrong")
      });
   
    }
  }

 // function for deleting data from the database

  const deleteEntityById=(id,index)=>{
    if (window.confirm("Are you sure?")) {
      console.log(id)
      setPageStatus(!pageStatus)
      // window.location.reload()
      sdeleteEntityById(id)
      .then(function (response) {
        
        setEntityDetails((old)=>{
          old.splice(index,1)
          return [...old]
        })
       

      })
      .catch(function (error) {
      });
    } else {
      return
    }
  }

  //function for changing the status of product (example product is active or inactive)

  const changeStatus=(id,status,index)=>{
    console.log(index)
    setPageStatus(!pageStatus)
    changeEntityStatus(id,status)
    .then(function (response) {
        setArrayOfStatus((old)=>{
          old[index] = !old[index]
          return[...old]
        })

    })
    .catch(function (error) {
    });
  }

  // we get the here by selecting the edit button in product

  const editById=(id)=>{
    getEntitiesById(id)
    .then((response)=>{
      console.log(response.data[0].id)
      setIdForUpdate(response.data[0].id)
      setUpdateObject({...response.data})
 
  })
  }

  //function for updating the data into the database 

  const updateEntity=()=>{
    console.log(idForUpdate,updateObject)
    // setPageStatus(!pageStatus)
    editEntity(idForUpdate,updateObject)
    .then(function (response) {
      console.log(response.data)
      alert("updated")
      setPageStatus(!pageStatus)
      setTest(!test)
      // window.location.reload()
      console.log(response.data,"hy")
    })
    .catch(function (error) {
      console.log(error);
      alert("Internal Error")
    });
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
      getEntityList().then(function (response) {
        setEntityDetails(response.data)
        const tempArray = new Array(response.data.length).fill(false)
        let data=response.data
        for(let x in data){
          if(data[x].status===1){
            tempArray[x]=true
          }
        }
        setArrayOfStatus([...tempArray])
  
        getEntityBydata();
      })
      .catch(function (error) {
        console.log(error);
      });

     getEntityBydata()
      .then(function (response) {
          //setTabelData(response.data)
          //const tempArray = new Array(response.data.length)
          let data=response.data[0]
  
          let arr = []
           for(let x in data){
              arr.push({name:data[x].Tables_in_foodsenso})
           }
           setTableData(arr)
        })
        .catch(function (error) {
          console.log(error);
        });

 
  },[test])
//showDiv run after click the edit button 

  return (

    <div className='masterDiv'>
      <Header isAdmin={isAdmin}/>
      <div className='mainPage'>
          <TopHeader title={"Entity"} isAdmin={isAdmin}/>
          <div className={pageStatus?'':'secondTop'}>
          <div className='pageHeading'>Entity</div>
            {pageStatus?
              <AddDiv inputdata={inputdata} save={insertIntoDB} update={updateEntity} title={"Entity"} pageStatus={pageStatus}/>
              :
              <button className='createbtn'
                onClick={()=>{
                  setPageStatus(!pageStatus)
                  }}
              >Create</button>
            }
             
          </div>
          <ShowDiv 
          entityDetails={entityDetails} 
          arrayOfStatus={arrayOfStatus} 
          changeStatus={changeStatus} 
          dataToShow={entityDetails}
          columns={["name","description","type",]}
          delete={deleteEntityById}
          EditRoute={editById}
          inputdata={inputdata}
          save={insertIntoDB}
          update={updateEntity} 
          />
      </div>
    </div>
  )
}
 