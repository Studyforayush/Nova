import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import TeacherNavBar from './TeacherNavBar';
import Test from './Test';
import SingleCourse from './SingleCourse';
import axios from 'axios';
import { API_BASE } from '../api';

const SearchCourse = () => {
    let {searchQuery} = useParams();
    const [allCourses, setAllCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);

  let getCourses = async () => {
    try {
      let response = await axios.get(`${API_BASE}/api/courses/getAllcourses`);
      // console.log(response.data);
      let arr = response.data;
      arr.reverse();
      setAllCourses(arr);
      allCourses.reverse()
      const filteredCourses = allCourses.filter((course) =>
      course.courseTitle.toLowerCase().includes(searchQuery.toLowerCase())
      
      )
      setAllCourses(filteredCourses)
    //   setFilteredCourses(filteredCourses)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCourses();
  }, [])
   
  return (
    <div>
       <TeacherNavBar  />
        <Test allCourses={allCourses} setAllCourses={setAllCourses}/>
        <SingleCourse allCourses={allCourses} setAllCourses={setAllCourses}/>
        {/* <SingleCourse allCourses={filteredCourses} setAllCourses={setAllCourses}/> */}
        {/* <SingleCourse allCourses={filteredCourses} setAllCourses={setAllCourses}/> */}
        {/* <SingleCourse allCourses={filteredCourses} setAllCourses={setAllCourses}/>  */}

    </div>
  )
}

export default SearchCourse