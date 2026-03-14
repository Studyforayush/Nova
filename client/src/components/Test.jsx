import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import { Select, Option } from "@material-tailwind/react";

const Test = ({allCourses,setAllCourses}) => {
  let navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    
  };
  const handleSubmit = (e)=>{
    if(searchQuery.length==0){
      return;
    }
 
    navigate(`/search/${searchQuery}`)
  
      
  }
 

  return (
  
<>
    <div  style={{margin:'0.5%',marginTop:'1%'}}>
    <div className="relative w-full" style={{marginTop:'1%'}}>
            <input type="search" onChange={handleSearchChange} id="search-dropdown" className="block p-2.5 w-full h-12 z-20 text-sm text-gray-900 bg-gray-10 rounded  border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-indigo-500" placeholder="Search courses..." required />
            <button onClick={handleSubmit} className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-indigo-600 rounded border border-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
                <svg className="w-12 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
                <span className="sr-only">Search</span>
            </button >
        </div>
    <select id="countries" className="bg-gray-10 border border-gray-300 text-gray-900 text-sm rounded focus:ring-indigo-500 focus:border-indigo-500 block w-full h-12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500" style={{marginTop:'0.5%'}}>
  <option selected>Filter Courses by Category</option>
  <option >Web Development</option>
  <option >Data Analytics</option>
  <option >Finance and Marketing</option>
  <option >Health and Fitness</option>
</select>
       
       
      
       
    </div>
</>

  )
}

export default Test