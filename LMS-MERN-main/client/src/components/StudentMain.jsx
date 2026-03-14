import React, { useState, useEffect } from 'react'
import StudentNavBar from './StudentNavBar'
import Test from './Test'
import SingleCourse from './SingleCourse'
import { useGlobalContext } from "../GlobalContext";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { API_BASE } from '../api';

const StudentMain = () => {
  const { user, setUser, userAuth, login, checkUser,navigate } = useGlobalContext();
  // const navigate = useNavigate()
  const [home, setHome] = useState(true)
  const [profile, setProfile] = useState(false);
  const [createCourse, setCreateCourse] = useState(false);
  const [mycourses, setCourses] = useState(false);
  
  let token = localStorage.getItem('token');
  async function authTeacher() {
    try {
      let response = await axios.get(`${API_BASE}/api/auth/verify`, {
        headers: {
          token: token
        }
      })

     
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (userAuth && user?.role) {
      checkUser(user.role, 'student');
    }
  }, [userAuth, user]);


  const [allCourses, setAllCourses] = useState([]);
  const [course, setCourse] = useState([]);


  let getCourses = async () => {
    try {
      let response = await axios.get(`${API_BASE}/api/courses/getAllcourses`);
      let arr = response.data;
      arr.reverse();
      setAllCourses(arr);
      setCourse(arr)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    let query = e.target.value
    if (query.length == 0) {
      setAllCourses(course)
      return;
    }
    setSearchQuery(e.target.value);


    const filteredCourses = allCourses.filter((ele) =>
      ele.courseTitle.toLowerCase().includes(query.toLowerCase())
    );
    setAllCourses(filteredCourses)

  };
  const handleSubmit = (e) => {
    if (searchQuery.length == 0) {
      setAllCourses(course)
      return;
    }
    const filteredCourses = allCourses.filter((course) =>
      course.courseTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setAllCourses(filteredCourses)



  }
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    if (category === 'All') {
      setAllCourses(course);
      return;
    }

    const filteredCourses = course.filter(
      (ele) => ele.courseCategory.toLowerCase() === category.toLowerCase()
    );
    setAllCourses(filteredCourses);
  };
  return (
    <div>
      <StudentNavBar />
      <div style={{ margin: '0.5%', marginTop: '1%' }}>
        <div className="relative w-full" style={{ marginTop: '1%' }}>
          <input type="search" onChange={handleSearchChange} id="search-dropdown" className="block p-2.5 w-full h-12 z-20 text-sm text-gray-900 bg-gray-10 rounded  border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-indigo-500" placeholder="Search courses..." required />
          <button onClick={handleSubmit} className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-indigo-600 rounded border border-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
            <svg className="w-12 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
            <span className="sr-only">Search</span>
          </button >
        </div>
        <select onChange={handleCategoryChange}
          id="countries" className="bg-gray-10 border border-gray-300 text-gray-900 text-sm rounded focus:ring-indigo-500 focus:border-indigo-500 block w-full h-12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500" style={{ marginTop: '0.5%' }}>
          <option value="All">All Categories</option>
          <option value="Web Development">Web Development</option>
          <option value="Data Analytics">Data Analytics</option>
          <option value="Finance and Marketing">Finance and Marketing</option>
          <option value="Health and Fitness">Health and Fitness</option>
          <option value="Other">Other</option>
        </select>




      </div>

      {/* <Test/> */}
      <SingleCourse allCourses={allCourses} setAllCourses={setAllCourses} />
      <SingleCourse allCourses={allCourses} setAllCourses={setAllCourses} />
      <SingleCourse allCourses={allCourses} setAllCourses={setAllCourses} />
      <SingleCourse allCourses={allCourses} setAllCourses={setAllCourses} />
      <SingleCourse allCourses={allCourses} setAllCourses={setAllCourses} />
    </div>
  )
}

export default StudentMain