import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import TeacherNavBar from "./TeacherNavBar";
import { useParams } from "react-router-dom";
import axios from "axios";
import Check from "./Check";
import { useGlobalContext } from "../GlobalContext";
import StudentNavBar from "./StudentNavBar";
import Toast from "./Toast";
import {loadStripe} from '@stripe/stripe-js';
import { API_BASE } from '../api';

const CourseOverview = () => {
  const [toast, setToast] = useState(null);
  let {courseId} =useParams();
  let {user} = useGlobalContext()
  let role = user.role;
  let id = user._id
  let [courseData,setCourseData] = useState({});
  const [checkResult, setCheckResult] = useState(null);
//   const stats = [
//     {
//         data: "35K",
//         title: "Customers"
//     },
//     {
//         data: "10K+",
//         title: "Downloads"
//     },
//     {
//         data: "40+",
//         title: "Countries"
//     },
//     {
//         data: "30M+",
//         title: "Total revenue"
//     },
// ]

  useEffect(()=>{
     async function fetchCourse(){
      try {
        let response = await axios.get(`${API_BASE}/api/courses/fetchCourse`,{
          params:{
            id:courseId
          }
        })
        console.log(response.data)
        setCourseData(response.data)
      } catch (error) {
        console.error(error)
      }
     }
     fetchCourse()
  },[])
  useEffect(()=>{
    console.log('checking')
  },[])

  const showToast = (message, duration = 2000) => {
    setToast({ message });
    return new Promise((resolve) => {
      setTimeout(() => {
        setToast(null);
        resolve();
      }, 1000);
    });
  };

  const addToCart = async()=>{
    try {
       let response = await axios.post(`${API_BASE}/api/student/addToCart`,{courseData},{
        params:{
           id:id
        }
       })
       console.log(response);
       if (response.status === 200) {
        await showToast(
          "Added to Cart"
        );
       
      } else {
        showToast("Something went wrong!");
      }

    } catch (error) {
      console.error(error);
    }
  }
  const makePayment = async ()=>{
    const stripe = await loadStripe('pk_test_51OMlc3SC1ryoYNe3cIVyBbPxpmMWCQVN7gwG1JhinGVis7px23qRr0H10OFs7aro0GU1XkuDsWJqM72qwOCj3v7E00b9WT4bEl');
    const body ={
      products:courseData,
    }
    const headers={
      "Content-Type":"application/json"
    }
    const response = await axios.post(`${API_BASE}/api/courses/create-checkout-session`,body,{
      headers:headers
    })
    const session = response.data;
    console.log(session)
    const result = stripe.redirectToCheckout({
      sessionId:session.id
    })
    console.log(result)
    setCheckResult(result);
    console.log(checkResult);
    if(result){
      const newResponse = await axios.get(`${API_BASE}/api/courses/check`,result);
    }

  }
  return (
    <>

     {role=='student'?<StudentNavBar/>:<TeacherNavBar/>}
      
     
      
       {/* <section className="w-full px-2 py-0 grid grid-cols-1 md:grid-cols-2  gap-4 max-w-8xl mx-auto pb-8 bg-gray-800 " style={{color:'white',textAlign:'initial'}}> */}
       <section className="w-full px-2 py-0 grid grid-cols-1 md:grid-cols-2  gap-4 max-w-8xl mx-auto pb-8 " style={{backgroundColor:'#F5F5F5',color:'black',textAlign:'initial'}}>

      <div className="pt-9 px-2 md:px-10  " >
                    <img src={courseData.courseImage} className="rounded-lg w-full object-cover" alt="" style={{height:'25rem'}} />
                </div>
      <div className=" p-1 sm:mt-10 text-gray-600 text-base " style={{color:''}}>
     
        <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl" style={{color:''}}>
                           {courseData.courseTitle}
                        </h3>
        <p className="text-base   my-4  max-w-2xl " style={{textAlign:'initial'}}>
        Description: {courseData.courseDescription} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident quasi dolores hic, earum excepturi cum libero ipsum quaerat culpa velit, repellat eum temporibus maxime alias modi ducimus obcaecati amet! Rem commodi obcaecati illum ullam nesciunt voluptatem fugiat totam quis iure! Veritatis tempore aspernatur debitis, enim est excepturi culpa ipsam itaque? lorem100 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam nobis in
          error repellat voluptatibus ad.
        </p>
        <p className="text-base   my-4 " style={{textAlign:'initial'}}>
          <span >

          Category: {courseData.courseCategory || 'traversy media'}
          </span>
        </p>
        <p className="text-base   my-4 " style={{textAlign:'initial'}}>
          <span >

          Author: {courseData.teacherName || 'traversy media'}
          </span>
        </p>
        
        <button 
        onClick={makePayment}
        className="bg-indigo-500 text-white font-medium py-2 px-4 rounded transition-all hover:bg-indigo-600 active:scale-95" >
          Enroll Now for ₹{courseData.coursePrice}.00
        </button>
        {role=='student'?<button
        onClick={addToCart}
         className="block mt-3 bg-indigo-500 text-white font-medium py-2 px-4 rounded transition-all hover:bg-indigo-600 active:scale-95" >
          Add to Cart
        </button>:''}

      </div>
      {toast && <Toast message={toast.message} onClose={toast.onClose} />}
      
    </section>  
    {/* <section className="py-10 "  style={{backgroundColor:'#F5F5F5 ',color:'black '}} >
            <div className="w-full max-w-screen-xl mx-auto px-0 text-gray-600  items-start justify-between lg:flex md:px-0 ">
                <div className="w-full sm:hidden lg:block lg:max-w-2xl ">
                    <img src={courseData.courseImage} className="rounded-lg w-full" alt="" />
                </div>
                <div className="mt-6 gap-12 sm:mt-0 md:flex lg:block "  >
                    <div className="max-w-2xl" style={{textAlign:'initial'}}>
                        <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                           {courseData.courseTitle}
                        </h3>
                        <p className="mt-3 max-w-xl">
                           Description: {courseData.courseDescription} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis sollicitudin quam ut tincidunt.
                        </p>
                        <p className="mt-3 max-w-xl">
                         Category: {courseData.courseCategory}
                        </p>
                        <p className="mt-3 max-w-xl">
                         Author: {courseData.teacherName || 'traversy media'}
                        </p>
                    </div>
                    <div className="flex-none mt-6 md:mt-0 lg:mt-6">
                     
                    </div>
                </div>
            </div>
        </section> */}
        <Check/>
    </>
  
  );
};



export default CourseOverview;