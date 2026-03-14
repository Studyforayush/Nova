import React, { useEffect, useState } from 'react';
import StudentNavBar from './StudentNavBar';
import { useGlobalContext } from "../GlobalContext";
import SingleCourse from './SingleCourse';

const StudentCart = () => {
    const [allCourses, setAllCourses] = useState([]);
    const { user } = useGlobalContext();
    let cart = user.cart;

    useEffect(() => {
        setAllCourses(cart);
    }, [cart]);
    

    if (!allCourses || allCourses.length === 0) {
        return (
            <div>
                <StudentNavBar />
                <h1 className='m-10 p-10'>Your Cart is empty</h1>
            </div>
        )
    }
    

    return (
        <div>
            <StudentNavBar />
            <SingleCourse allCourses={allCourses} />
        </div>
    );
}

export default StudentCart;
