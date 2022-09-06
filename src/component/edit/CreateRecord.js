import React from "react";
import Header from "../genric/Header";
import Footer from "../genric/Footer";
import TopHeader from "../genric/TopHeader";
import { UserContext } from "../../App";

import { getEntitiesById ,addEntityToTable,editEntity,getTableByIdForRecordCreation, createRecordInTable,} from '../../Shared/Services';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useNavigate
  } from "react-router-dom";

export default function CreateRecord() {
  const userInfo=React.useContext(UserContext).userInfo
  const [isAdmin, setIsAdmin] = React.useState(false)

  let navigate = useNavigate();
  const [data, setData] = React.useState({
    name:'',
    id:'',
    tablename:'',
    entityIds:[]
  
  })
  let inputType=['','datetime-local','Text']
  const [tableNameForCreateRecord, setTableNameForCreateRecord] = React.useState('')
  const [entities, setEntities] = React.useState([])
  const [chnageEntities, setChnageEntities] = React.useState([])
  const [pageRefresh, setpageRefresh] = React.useState(false)
 
    let {id}=useParams()
    let intId=id.split(':')
    intId=intId[1]
    console.log(id)

    const insertIntoDB=()=>{
      let data={
        takeawayId:localStorage.getItem('id'),
        tableName:tableNameForCreateRecord,
        dataforInsert:[{
          columnName: "userId",
          columnValue:localStorage.getItem('id')
        }]
      }
      // console.log(takeawayId,"takeawayId")
      // console.log(tableName,"tableName")
      // console.log(columnName,"columnName")
      // console.log(columnValue,"columnValue")

      console.log(chnageEntities)
      for(let x of chnageEntities){
        data.dataforInsert.push({
          columnName:x.key,
          columnValue:x.value
        })
      }
      console.log(data) 
      createRecordInTable(data)
      .then(function (response) {
        console.log(response.data);
        alert("Record Created")
      })
      .catch(function (error) {
        console.log(error);
      });


      }
      const clickevent=(index,key,value)=>{
        // console.log(index,key,value)
        setChnageEntities((old)=>{
          old[index].value=value
          return [...old]
      })
      }

    const updateEntity=()=>{
      
    }
    React.useEffect(()=>{
      if(userInfo.role==='Admin'){
        setIsAdmin(true)
      }
      if(!userInfo){
        if(localStorage.getItem('role')){
          if(userInfo.role==='Admin'){
            setIsAdmin(true)
          }   
        }else{
          navigate('/')
        }
      }
        if(intId){
          getTableByIdForRecordCreation(intId)
          .then(function (response) {
            console.log(response.data[0].tablename);
            console.log(response.data[1]);
            setTableNameForCreateRecord(response.data[0].tablename)
            setData(response.data[0])
            let data=response.data[1]
            
            console.log(data)
            for (let x in data){
              setChnageEntities((old)=>{
                old[x]={
                  name:data[x].name,
                  id:data[x].id,
                  type:data[x].type,
                  value:'',
                  key:'col'+data[x].id,
                  clickevent:clickevent

                }
                return [...old]
            })
            }
          })
          .catch(function (error) {
            console.log(error);
          });

        }else{
            return
        }
    },[])
  
  return (
    <div className='masterDiv'>
          <Header/>
      <div className='mainPage'>
      <TopHeader title={`Create Record`}/>
      <h3>{data.name} Record</h3>
      <div className='CreateRecordDiv'>
        <div className='CreateRecordDivInput'>
          {
            chnageEntities?chnageEntities.map((item,index)=>{
              return <>
              <div className='form-group'>
              <label>{item.name}</label>
                <input type={inputType[item.type]}  value={item.value} className='customInput' 
                onChange={(e)=>{
                  item.clickevent(index,item.key,e.target.value)
                }}
                
                />
              </div>
              </>

            })
          
          :''}
          {chnageEntities&&
          <span className=''>
            <button type="submit" className="createbtn"
              onClick={insertIntoDB}
              >Add
            </button>
          </span> 

          }
        </div>
      </div>

        <Footer/>
      </div>
    </div>
  )
}
