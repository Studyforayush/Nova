import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE } from '../api';

const CourseForm = () => {
  let { courseId } = useParams();
  let [courseData, setCourseData] = useState({
    courseTitle: '',
    courseDescription: '',
    courseImage: null,
    coursePrice: '',
    courseCategory: '',
    courseChapters: [],
    courseQuiz: [],
  });

  let handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  let courseDataFetch = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/courses/getCourse`, {
        params: {
          courseIdValue: courseId,
        },
      });
      console.log(response.data);
      setCourseData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    courseDataFetch();
  }, []);

  return (
    <form
      className="flex flex-col md:flex-row  items-center"
      style={{ minHeight: '100vh', width: '100vw', margin: '0 auto' }}
    >
      <div className="md:w-1/2 p-10 mt-4 md:mt-0">
        <div className="mt-4">
          <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
            Course Title
          </label>
          <input
            id="title"
            name="courseTitle"
            type="text"
            value={courseData.courseTitle}
            onChange={handleChange}
            required
            className="w-full h-11 rounded-md border-2 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm p-2"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
            Course Description
          </label>
          <textarea
            id="description"
            name="courseDescription"
            autoComplete="description"
            required
            className="w-full h-24 rounded-md border-2 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm p-2"
          ></textarea>
        </div>
        <div className="mt-4">
          <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
            Course Description
          </label>
          <textarea
            id="description"
            name="courseDescription"
            autoComplete="description"
            required
            className="w-full h-24 rounded-md border-2 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm p-2"
          ></textarea>
        </div>
        {/* Add other form fields here */}
      </div>
     
      <div className="w-1/2 p-10">
      <div className="mt-4">
          <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
            Course Description
          </label>
          <textarea
            id="description"
            name="courseDescription"
            autoComplete="description"
            required
            className="w-full h-24 rounded-md border-2 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm p-2"
          ></textarea>
        </div>
        <div className="mt-4">
          <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
            Course Description
          </label>
          <textarea
            id="description"
            name="courseDescription"
            autoComplete="description"
            required
            className="w-full h-24 rounded-md border-2 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm p-2"
          ></textarea>
        </div>
        <div className="mt-4">
          <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
            Course Description
          </label>
          <textarea
            id="description"
            name="courseDescription"
            autoComplete="description"
            required
            className="w-full h-24 rounded-md border-2 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm p-2"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full md:w-auto justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create Course
        </button>
      </div>
    </form>
  );
};

export default CourseForm;
