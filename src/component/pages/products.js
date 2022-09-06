import React from "react";
import {NavLink, useNavigate } from "react-router-dom";
import TopHeader from '../genric/TopHeader';
import Header from '../genric/Header';
import AddDiv from '../genric/AddDiv';
import ShowDiv from '../genric/ShowDiv';

import { UserContext } from "../../App";
import {getProductList, getAllProductById,updateProductById,createProducts,changeProductStatus,deleteProductById} from './../../Shared/Services'

export default function Products(){

//navigate is used top navigate the page 

    let navigate  = useNavigate()

//all hooks which is used in this function

    const userInfo=React.useContext(UserContext).userInfo
    const [isAdmin, setIsAdmin] = React.useState(false)
    const [pageStatus, setPageStatus] = React.useState(false)
    const [arrayOfStatus, setArrayOfStatus] = React.useState([])
    const [productDetails, setProductDetails] = React.useState([])
    const [idForUpdate, setIdForUpdate] = React.useState('')
    const [test, setTest] = React.useState(false)

  //hook use for set the insert data

    const [stateObject, setStateObject] = React.useState({
        name:'',
        category:'',
        description:'',
        measurement:'',
        label:''
    })

    //hook use for set the updated data 

    const [updateObject, setUpdateObject] = React.useState({
        name:'',
        category:'',
        description:'',
        measurement:'',
        label:''
    })

//function for set the data when data is insert into database and it is used in insert function

    const changeCreateStateFunc = (key, value) =>{
        setStateObject((old) =>{
            return{...old,[key]:value}
        })
    }

    //function for set the updated  data which is used in update function

    const changeUpdateStateFunc=(key,value)=>{
        setUpdateObject((old)=>{
          return {...old,[key]:value}
        })
      }

//declare all the data which is use in showDiv and AddDiv

    const inputData = [{
        name:"name",
        type:"text",
        placeholder:"Name",
        key:"name",
        value:stateObject.name,
        valueForUpdate:updateObject.name,
        clickevent:changeCreateStateFunc,
        updateClickEvent:changeUpdateStateFunc
    },
    {
        name:"category",
        type:"select",
        option:[
            {name:"Food", value:1},
            {name:"Equipment", value:2},
            {name:"Storage", value:3},
            {name:"maintenance", value:4}
         ],
         placeholder:"Category",
        key:"category",
        value:stateObject.category,
        valueForUpdate:updateObject.category,
        clickevent:changeCreateStateFunc,
        updateClickEvent:changeUpdateStateFunc
    },
    {
        name:"description",
        type:"text",
        placeholder:"Description",
        key:"description",
        value:stateObject.description,
        valueForUpdate:updateObject.description,
        clickevent:changeCreateStateFunc,
        updateClickEvent:changeUpdateStateFunc
    },
    {
        name:"measurement",
        type:"select",
        option:[
            {name:"Temperature", value:1},
            {name:"Weight", value:2},
            {name:"Date", value:3},
         ],
         placeholder:"Measurement",
        key:"measurement",
        value:stateObject.measurement,
        valueForUpdate:updateObject.measurement,
        clickevent:changeCreateStateFunc,
        updateClickEvent:changeUpdateStateFunc
    },
    {
        name:"label",
        type:"text",
        placeholder:"Label",
        key:"label",
        value:stateObject.label,
        valueForUpdate:updateObject.label,
        clickevent:changeCreateStateFunc,
        updateClickEvent:changeUpdateStateFunc
    }
]

//function for insert data into the database

   const insertIntoDb = () =>{
    if(stateObject.name && stateObject.description && stateObject.category &&stateObject.measurement && stateObject.label){
    createProducts(stateObject)
    .then(function (response) {
        console.log(response.data)
    alert("Added successfully")
    setTest(!test)
    setPageStatus(!pageStatus)
    })
    .catch(function (error) {
        console.log(error)
    })
}else{
    alert("All Field are mandatory")
}
   }

  // function for deleting data from the database
   
   const deleteProduct=(id,index)=>{
    deleteProductById({id:id})
    .then(function(res){
        setProductDetails((old) =>{
            old.splice(index,1)
            return[...old]
        })
        alert("Deleted successfully")
    })
    .catch(function(error){
        console.log(error)
    })
   }


   const getProductById=(id)=>{
    getAllProductById(id)
    .then((response)=>{
    console.log(response.data,"data")
      setIdForUpdate(response.data.id)
    setUpdateObject({...response.data})
    })
    .catch(()=>{
      console.log("Something went wrong")
    })
  }

//function for updating the data into the database 

   const updateProduct=()=>{
    updateProductById(idForUpdate,updateObject)
    .then(function(response){
        //console.log(response.data)
        console.log(JSON.stringify(response.data))
        // setIdForUpdate(response.data[0].id)
        alert("updated successfully")
        setTest(!test)
    })
    .catch(function(error){
        console.log(error)
    })
   }

//function for changing the status of product (example product is active or inactive)

   const changeStatus=(id,status,index)=>{
    changeProductStatus(id,status,index)
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

      //function for showing data in foodSenSo user interface

    getProductList()
    .then(function (response) {
        console.log(response.data);
        setProductDetails(response.data)
        const tempArray = new Array(response.data.length).fill(false)
        let data=response.data
        for(let x in data){
          if(data[x].status===1){
            tempArray[x]=true
          }
        }
        console.log("hello", tempArray)
        setArrayOfStatus([...tempArray])
      })
      .catch(function (error) {
        console.log(error);
      });
      
      // getProductById()
  },[test])
  //showDiv run after click the edit button 
  return (
    <div className='masterDiv'>
      <Header  isAdmin={isAdmin}/>
      <div className='mainPage'>
        <TopHeader isAdmin={isAdmin} title={"Products"}  />
        <div className={pageStatus?'':'secondTop'}>
        <div className='pageHeading'>Products</div>
       {pageStatus?
       <AddDiv inputdata={inputData} save={insertIntoDb}/>
        :
         <button className='createbtn'
         onClick={()=>{
           setPageStatus(!pageStatus)
         }}
         >Create</button> 
        }



            </div>
            <ShowDiv
            arrayOfStatus={arrayOfStatus}
            changeStatus={changeStatus}
            dataToShow={productDetails}
            columns={["name","category","label",]}
            delete={deleteProduct}
            EditRoute={getProductById}
            inputdata={inputData}
            save={insertIntoDb}
            update={updateProduct}/>
        </div>
    </div>
   )
}