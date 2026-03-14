import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GlobalContext from "./GlobalContext";
import { API_BASE } from "./api";
const AppContext = ({ children }) => {
    const [user, setUser] = useState({});
    const [userId, setUserId] = useState('');
    const [userAuth, setUserAuth] = useState(false)
    const [login, setLogin] = useState(false)
    const navigate = useNavigate()
    function checkUser(userRole, role) {
        let token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        // Normalize roles for check
        const normalizedUserRole = userRole === 'teacher' ? 'faculty' : userRole;
        const normalizedRole = role === 'teacher' ? 'faculty' : role;
        
        if (normalizedUserRole !== normalizedRole) {
            navigate('/login');
        }
    }

    useEffect(() => {
        async function authUser() {
            try {
                let token = localStorage.getItem('token');
                if (!token) return;

                let response = await axios.get(`${API_BASE}/api/auth/verify`, {
                    headers: {
                        token: token,
                        Authorization: `Bearer ${token}`
                    }
                });
                
                let details = response.data.user;
                if (!details) return;

                let userId = details.id;
                
                if (details.role === 'student') {
                    let userResponse = await axios.get(`${API_BASE}/api/student/findStudent`, {
                        params: {
                            id: userId
                        }
                    });
                    
                    if (userResponse.data && userResponse.data.length > 0) {
                        setUser(userResponse.data[0]);
                    } else if (userResponse.data) {
                         setUser(userResponse.data);
                    } else {
                        // If not in MongoDB but in Supabase (bypass), set basic data
                        setUser({ id: userId, name: details.name, role: 'student', email: details.email });
                    }
                } else if (details.role === 'teacher' || details.role === 'faculty') {
                    let userResponse = await axios.get(`${API_BASE}/api/teacher/findTeacher`, {
                        params: {
                            id: userId
                        }
                    });
                     if (userResponse.data && userResponse.data.length > 0) {
                        setUser(userResponse.data[0]);
                    } else if (userResponse.data) {
                         setUser(userResponse.data);
                    } else {
                        // If not in MongoDB but in Supabase (bypass), set basic data
                        setUser({ id: userId, name: details.name, role: 'faculty', email: details.email });
                    }
                } else if (details.role === 'admin') {
                    // Admin role doesn't have a specific findAdmin route, use mock data or faculty data
                    setUser({ id: userId, name: details.name, role: 'admin', email: details.email });
                }

                setUserId(userId);
                setUserAuth(true);
                setLogin(true);
            } catch (error) {
                console.error("Authentication failed:", error);
                setUserAuth(false);
                setLogin(false);
                localStorage.removeItem('token');
            }
        }
        authUser();
    }, [navigate])

    return (
        <GlobalContext.Provider value={{ user, setUser, userId, userAuth, login, setLogin, setUserAuth, checkUser, navigate }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default AppContext;