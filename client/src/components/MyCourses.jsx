import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from "../GlobalContext";
import SingleCourse from './SingleCourse'
import TeacherNavBar from './TeacherNavBar'
import { useParams } from 'react-router-dom'
import { API_BASE } from '../api';

const MyCourses = () => {
    const {user} = useGlobalContext()
    let {id} = useParams()
    let [allCourses,setAllCourses]= useState([])
    const [profile,setProfile] = useState(false);
    const [home,setHome] = useState(false);
    const [createCourse,setCreateCourse] = useState(false);
    const [mycourses,setCourses] = useState(true);
    useEffect(()=>{
             
        async function myCourses(){
          try {
                let response = await axios.get(`${API_BASE}/api/teacher/mycourses`,{
                    params:{
                        id
                    }
                })
                console.log(response.data)
                setAllCourses(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        myCourses()
    },[id])
    if( allCourses.length===0){
      return <div>
        <TeacherNavBar profile={profile} home={home} mycourses={mycourses} createCourse={createCourse}/>
 <h1 style={{textAlign:'initial',paddingLeft:'2rem',paddingTop:'1rem'}}>Your Courses</h1>
        <h1>No Courses Yet...</h1>
      </div>
    }
  return (
    <div>
        <TeacherNavBar profile={profile} home={home} mycourses={mycourses} createCourse={createCourse}/>
 <h1 style={{textAlign:'initial',paddingLeft:'2rem',paddingTop:'1rem'}}>Your Courses</h1>

 <SingleCourse allCourses={allCourses} setAllCourses={setAllCourses} />


    </div>
  )
}

export default MyCourses