import {useState} from 'react'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom';
import { API_BASE } from '../api';

 const CreateCourse = () => {
    const navigate = useNavigate();

    const [courseTitle, setCourseTitle] = useState('');
    
      let handleChange = (e) => {
        setCourseTitle(e.target.value);
      }
    
    
      let handleSubmit = async (e) => {
        e.preventDefault();
       try {
        console.log(courseTitle)
        let response = await axios.post(`${API_BASE}/api/courses/createCourse`,{courseTitle});
        let courseId = response.data.id
        // courseId = useParams()
        navigate(`/createCourse/${courseId}`);
        console.log(courseId);
        
       } catch (error) {
          console.error(error)
       }
      }
  return (
     <div id="flex-container">
         <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm" style={{ fontSize: '1.8rem' }}>
                    <form className="space-y-6"  onSubmit={handleSubmit}>
        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="courseName" className="block text-sm font-medium leading-6 text-gray-900" style={{ fontSize: '2.0rem' }}>
                                    Give a Title to Your Course
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="courseName"
                                    name="courseName"
                                    type="text"
                                    autoComplete='off'
                                    onChange={handleChange}
                                    value={courseTitle}
                                    required
                                    placeholder="Course title..."
                                    className="block w-full h-12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2 my-8 "
                                    style={{fontSize:'1.2rem'}}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                style={{ fontSize: '1.0rem' }}
                            >
                                Continue
                            </button>
                        </div>
        </form>
        </div>

     </div>

  )
}
export default CreateCourse