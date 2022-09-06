import React from 'react'
import Header from '../genric/Header';
import Footer from '../genric/Footer';
import TopHeader from '../genric/TopHeader';
import { UserContext } from '../../App';
import {getAllDataInsideAReacordTable} from '../../Shared/Services';
import {getTakeawayDataInsideAReacordTable} from '../../Shared/UserServices'
import Moment from 'react-moment';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useNavigate
  } from "react-router-dom";


export default function ViewRecords() {

    const userInfo=React.useContext(UserContext).userInfo
    const [isAdmin, setIsAdmin] = React.useState(false)
    const [columns, setColumns] = React.useState([])
    const [dataToShow, setDataToShow] = React.useState([])
    const [columnsToShow, setColumnsToShow] = React.useState([])
    const [i, seti] = React.useState(0)
    let navigate = useNavigate();
    let {id}=useParams()
    let intId=id.split(':')
    intId=intId[1]
    let monthArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const dateFormat=(dateValue)=>{
       let d=new Date(dateValue)
       return returnTwoDig(d.getDate()) + '-'+ returnTwoDig(monthArray[(d.getMonth() )]) + '-' + returnTwoDig(d.getFullYear()) + " " + returnTwoDig(d.getHours()) + ':' +returnTwoDig( d.getMinutes()) 

    }
    const returnTwoDig=(value)=>{
      if(value<10){ 
        return "0"+value
      }else{
        return value
      }
    }


    React.useEffect(()=>{
        if(userInfo.role=='admin'){
          console.log("1 if")
            setIsAdmin(true)
          }
          if(!userInfo){
            console.log("2 if")
            if(localStorage.getItem('role')){
              console.log("3 if")
              if(userInfo.role=='admin'){
                console.log("4 if")
                setIsAdmin(true)
              }   
            }else{
              console.log("1 esle")
              navigate('/')
            }
          }
          if(intId){
            console.log(intId,"if=d")
            if(localStorage.getItem("role")=='admin'){
                console.log("admin")
            getAllDataInsideAReacordTable(intId)
            .then(function (response) {
                console.log("------dffrt--->>???",response.data.data);
                console.log(response.data.column)
                setColumnsToShow(response.data.column)
                setColumns(Object.keys(response.data.data[0]))
                setDataToShow(response.data.data[0])
                
              })
              .catch(function (error) {
                console.log(error);
              });
            }else{
                console.log("jcvhjsdv")
                let id=localStorage.getItem('id')
                getTakeawayDataInsideAReacordTable(intId,id)
                .then(function (response) {
                    console.log("--------->>???",response);
                    setColumnsToShow(response.data.column)
                    setColumns(Object.keys(response.data.data[0]))
                    setDataToShow(response.data.data)
                  })
                  .catch(function (error) { 
                    console.log(error);
                  });

            }

  
          }else{
              return
          }

    },[])
    React.useEffect(()=>{
        console.log(columns,dataToShow)
    },[columns,dataToShow])


    return (
    <div className='masterDiv'>
        <Header isAdmin={localStorage.getItem('role')=='admin'?true:false}/>
        <div className='mainPage'>
            <TopHeader title={`View Record`} isAdmin={localStorage.getItem('role')=='admin'?true:false}/>
            <div className='recordDataShow'>
                {dataToShow&&<table className='recordTable'>
                    {
                        columnsToShow.map((item,index)=>{
                            if(!item.name.startsWith("modified_at")&& !item.name.startsWith("created_at")&&!item.name.startsWith("userId")){
                                return <th key={index}>{item.name.replaceAll('_',' ')}</th>
                            }else{
                                return
                            }
                        })
                    }
                    {dataToShow.slice(i*5, (i+1)*5).map((dataObject,index1)=>{
                        return <tr key={index1}>
                            {columnsToShow.map((objectKey,index2)=>{
                                if(objectKey)
                                if(!objectKey.nametogetData.startsWith("modified_at")&& !objectKey.nametogetData.startsWith("created_at")&&!objectKey.nametogetData.startsWith("userId")){
                                    if(objectKey.type==1){
                                        // return <td>  <Moment format="D MMM YYYY"> {dataObject[objectKey.nametogetData]}</Moment>{dataObject[objectKey.nametogetData]}</td>
                                        return <td>  {dateFormat(dataObject[objectKey.nametogetData])}</td>
                                    }
                                    else{
                                        return <td key={index2}> {dataObject[objectKey.nametogetData]}</td> 
                                    }
                                }else{
                                    return
                                }
                               
                            })} 
                        </tr>
                    })

                    }
                </table>}
                {dataToShow.length>0&&
                  <div className="bottomBtnDiv">
                      <button className='nextBtn' onClick={()=>{
                        seti((old)=> {
                            let x = old - 1
                            if(x < 0){
                              alert('dasdasd')
                              x=0
                            }
                            return x
                          })
                      }}>Previous</button>
                      <button className='nextBtn'
                        onClick={()=>{
                          seti((old)=> {
                            let nextI = old + 1;
                            if(nextI >= Math.ceil(dataToShow.length/5)){
                              nextI=old
                              alert('no text')
                            }
                            return nextI
                          })
                      }}>Next</button>
                  </div>
                }
            </div>

        <   Footer/>
        </div>
    </div>
    )
}
