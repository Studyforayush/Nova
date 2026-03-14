import axios from 'axios';
import {useState,useEffect} from 'react'
import TeacherNavBar from './TeacherNavBar';
import Modal from './Modal';
import { API_BASE } from '../api';

const TeacherProfile = () => {
    let token = localStorage.getItem('token');
    const [teacher,setTeacher] = useState({})
    const [profile,setProfile] = useState(true);
    const [home,setHome] = useState(false);
    const [createCourse,setCreateCourse] = useState(false);
    const [mycourses,setCourses] = useState(false);
    const [teacherId,setTeacherId] = useState('');
   


    useEffect( ()=>{
      async function authTeacher(){
        try {
          let token = localStorage.getItem('token')

          let response = await axios.get(`${API_BASE}/api/auth/verify`,{
              headers:{
                  token:token
              }
             })
            //  let email = response.data.email;
  
            let details = response.data.userDetails;
            setTeacher(details)
            let userId = details._id;
            console.log(userId)
            setTeacherId(userId);
            console.log(teacherId)
        } catch (error) {
          console.error(error)
        }
      }
         authTeacher();
        // findTeacher();
    },[])

    let handleChange = (e) => {
      setTeacher({ ...teacher, [e.target.name]: e.target.value })
    }
  
  
    let handleSubmit = async (e) => {
      e.preventDefault();
      try {
        let response = await axios.post(`${API_BASE}/api/teacher/teacherUpdate`, {
          ...teacher
        });
  
  
        console.log(response.data)
      
      } catch (error) {
        console.log('this is a error')
        console.error(error)
        
      }
    };

  return (
    <>
    <TeacherNavBar profile={profile} home={home} mycourses={mycourses} createCourse={createCourse}/>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 " id='animation-container'>
  

        <div className="mt-1 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-1" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 m-0" style={{ textAlign: 'initial', fontSize: '1.0rem' }}>
                Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={teacher.name}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6  p-2 px-3"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900" style={{ textAlign: 'initial', fontSize: '1.0rem' }}>
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={teacher.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6  p-2 px-3"
                />
              </div>
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900" style={{ textAlign: 'initial', fontSize: '1.0rem' }}>
                Address
              </label>
              <div className="mt-1">
                <input
                  id="address"
                  name="address"
                  type="text"
                  autoComplete="address"
                  required
                  value={teacher.address}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6  p-2 px-3"
                />
              </div>
            </div>
            <div>
              <label htmlFor="mobileNumber" className="block text-sm font-medium leading-6 text-gray-900" style={{ textAlign: 'initial', fontSize: '1.0rem' }}>
                Mobile Number
              </label>
              <div className="mt-1">
                <input
                  id="mobileNumber"
                  name="mobileNumber"
                  type="text"
                  autoComplete="mobileNumber"
                  required
                  value={teacher.mobileNumber}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6  p-2 px-3"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" id="password" className="block text-sm font-medium leading-6 text-gray-900" style={{ textAlign: 'initial', fontSize: '1.0rem' }}>
                Password
              </label>
              <div className="mt-1">
                <div className="max-w-sm">
                  <div className="flex">
                    <div className="relative flex-1">
                      <input type="text"
                        autoComplete='off'
                        onChange={handleChange} value={teacher.password} name='password'
                        id="hs-strong-password-with-indicator-and-hint-in-popover" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6  p-2 px-3" placeholder="" />
                      <div id="hs-strong-password-popover" className="hidden absolute z-10 w-full bg-white shadow-md rounded-lg p-4 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700" >
                        <div id="hs-strong-password-in-popover" data-hs-strong-password='{
            "target": "#hs-strong-password-with-indicator-and-hint-in-popover",
            "hints": "#hs-strong-password-popover",
            "stripClasses": "hs-strong-password:opacity-100 hs-strong-password-accepted:bg-teal-500 h-2 flex-auto rounded-full bg-blue-500 opacity-50 mx-1",
            "mode": "popover"
          }' className="flex mt-2 -mx-1">
                        </div>

                        <h4 className="mt-3 text-sm font-semibold text-gray-800 dark:text-white">
                          Your password must contain:
                        </h4>

                        <ul className="space-y-1 text-sm text-gray-500">
                          <li data-hs-strong-password-hints-rule-text="min-length" className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2">
                            <span className="hidden" data-check>
                              <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                            </span>
                            <span data-uncheck>
                              <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </span>
                            Minimum number of characters is 8.
                          </li>
                          <li data-hs-strong-password-hints-rule-text="lowercase" className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2">
                            <span className="hidden" data-check>
                              <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                            </span>
                            <span data-uncheck>
                              <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </span>
                            Should contain lowercase.
                          </li>
                          <li data-hs-strong-password-hints-rule-text="uppercase" className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2">
                            <span className="hidden" data-check>
                              <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                            </span>
                            <span data-uncheck>
                              <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </span>
                            Should contain uppercase.
                          </li>
                          <li data-hs-strong-password-hints-rule-text="numbers" className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2">
                            <span className="hidden" data-check>
                              <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                            </span>
                            <span data-uncheck>
                              <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </span>
                            Should contain numbers.
                          </li>
                          <li data-hs-strong-password-hints-rule-text="special-characters" className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2">
                            <span className="hidden" data-check>
                              <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                            </span>
                            <span data-uncheck>
                              <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </span>
                            Should contain special characters.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

           

            <div>
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900" style={{ textAlign: 'initial', fontSize: '1.0rem' }}>
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  autoComplete="description"
                  required
                  value={teacher.description}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 h-24 p-2 px-3"
                ></textarea>
              </div>
            </div>

            {/* <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 mt-4"
                style={{ fontSize: '1.0rem' }}
              >
                Update Profile
              </button>
            </div> */}
            <Modal teacher={teacher} setTeacher={setTeacher} />
          </form>




        </div>
      </div>


    </>
  )
}

export default TeacherProfile