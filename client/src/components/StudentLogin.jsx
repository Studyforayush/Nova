import {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../api';
import { useGlobalContext } from '../GlobalContext';

const StudentLogin = () => {
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const { userAuth, setUserAuth, setLogin, user } = useGlobalContext();
  
    // Redirect if already authenticated
    useEffect(() => {
        if (userAuth && user?.role === 'student') {
            navigate('/studentMain');
        }
    }, [userAuth, user, navigate]);

    const [studentLoginData, setStudentLoginData] = useState({
      email: '',
      password: ''
    });

    const handleChange = (e) => {
      setStudentLoginData({ ...studentLoginData, [e.target.name]: e.target.value });
    };

    let handleSubmit = async (e) => {
      e.preventDefault();
      try {
        let response = await axios.post(`${API_BASE}/api/student/studentLogin`, {
          ...studentLoginData
        });
        
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            setUserAuth(true);
            setLogin(true);
            navigate('/studentMain');
        } else {
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 4000);
        }
      } catch (error) {
        console.error(error);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 4000);
      }
    };



   

        const tableItems = [
            {
                name: "Liam James",
                email: "liamjames@example.com",
                position: "Software engineer",
                salary: "$100K"
            },
            {
                name: "Olivia Emma",
                email: "oliviaemma@example.com",
                position: "Product designer",
                salary: "$90K"
            },
            {
                name: "William Benjamin",
                email: "william.benjamin@example.com",
                position: "Front-end developer",
                salary: "$80K"
            },
            {
                name: "Henry Theodore",
                email: "henrytheodore@example.com",
                position: "Laravel engineer",
                salary: "$120K"
            },
            {
                name: "Amelia Elijah",
                email: "amelia.elijah@example.com",
                position: "Open source manager",
                salary: "$75K"
            },
        ]
    
        return (
            <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                <div className="items-start justify-between md:flex">
                    
                    <div className="mt-3 md:mt-0">
                        <button
                            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
                        >
                            Add member
                        </button>
                    </div>
                </div>
                <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                    <table className="w-full table-auto text-sm text-left">
                     
                        <tbody className="text-gray-600 divide-y">
                            {
                                tableItems.map((ele, index) => (
                                    <tr key={index} className='hover:bg-gray-100'>
                                        
                                        <td className="px-6 py-4 whitespace-nowrap ">eiuu</td>
                                        <td className="text-right px-6 whitespace-nowrap">
                                            <button href="javascript:void()" className="py-2 px-3 font-medium text-indigo-600 mx-1 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                                                Edit
                                            </button>
                                            <button href="javascript:void()" className="py-2 leading-none px-3 mx-1 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

export default StudentLogin