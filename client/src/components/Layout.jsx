import axios from 'axios'
import {  useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import { API_BASE } from '../api';

const Layout = () => {
  const [transcription, setTranscription] = useState('')
  const [courseData, setCourseData] = useState({});
  const [loading, setLoading] = useState(false)
  let { courseId, chapter } = useParams();
  console.log(courseId, chapter, courseData)
  async function handleClick() {
    try {
      setLoading(true)
      let response = await axios.get(`${API_BASE}/api/courses/transcription`, {
        headers: {
          apiKey: "99624ecb550d4588855a75686d4fd726"
        }
      })
      // console.log(response.data)
      setLoading(false)
      setTranscription(response.data.transcribedText)
      console.log(transcription, 'transcriptonn')
    } catch (error) {
      console.error(error)
    }
    }
    const fetchCourse = async () => {
      try {
        let response = await axios.get(`${API_BASE}/api/courses/fetchCourse`, {
          params: {
            id: courseId
          }
        });
        console.log(response.data, 'course data');
        setCourseData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      console.log('useEffect for fetching course data triggered');
      fetchCourse();
    }, [courseId,chapter]);
    // useEffect(() => {
    //   console.log('check')
    // }, [transcription])


  
  return (
    // <div className='h-full'>
    //     <div className='hidden  md:flex h-64 w-64  border p-5'>
    //         sidebar

    //     </div>

    // </div>
    <div style={{ textAlign: 'initial' }} className="grid grid-cols-1 lg:grid-cols-[330px_1fr] gap-4 p-4 pt-0">
      <aside className="hidden lg:block h-full  " style={{ height: '100vh', borderRight: '1px solid #d8d7d7' }}>
        <h2 className="text-xl font-semibold pl-2 pt-2">{courseData.courseTitle}</h2>
        <div className="flex flex-col gap-4 mt-4">

          {Object.keys(courseData).length !== 0 && courseData.courseChapters.map((ele, index) => {
            return <a href={`/layout/${courseId}/${index}`}
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"

            >
              {/* <div className="border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 h-8 w-8 flex items-center justify-center rounded-full bg-green-500 text-white">
              1
            </div> */}
              <div>
                <h4 className="font-semibold">{ele.chapterTitle}</h4>
                <small className="text-sm text-gray-500">{ele.chapterDuration || 'Duration 10:00'}</small>
              </div>
            </a>
          })
          }
        </div>
      </aside>
      <main>
        <div className="rounded-xl overflow-hidden">
          <span className="w-full aspect-video rounded-md bg-muted"></span>
        </div>
        <div className="py-2 grid gap-2 pl-4">
          {/* <div> */}
          {Object.keys(courseData).length !== 0 && <>
            <video width="100%" controls  className='p-0 px-0  py-1 sm:p-12 md:p-20 md:py-0 md:pt-12 sm:pt-2 sm:pb-2'>
                <source src={courseData.courseChapters[chapter].chapterVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            <h1 className=" pl-0 text-xl font-semibold tracking-tight sm:pl-20">{courseData.courseChapters[chapter].chapterTitle}</h1> </>}
          {/* <div className="bg-white min-h-[200px] flex items-center justify-center"> */}
          <button
            onClick={handleClick}
            className="px-3 py-2 font-medium bg-indigo-500 text-white w-fit transition-all md:ml-20 shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="inline w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
            </svg>
            Summarize
          </button>
          {
            loading ?
              <div role="status" className="w-full animate-pulse pl-20 mt-1">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-100px mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-100px mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-100px mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                {/* <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div> */}
                <span className="sr-only">Loading...</span>
              </div>

              : (!loading && transcription) && <div className='pl-20 mt-1'>
                {transcription}
              </div>
          }
          {/* </div> */}
          {/* </div> */}

          {/* <p className="text-gray-500 dark:text-gray-400">
              In this video, we will cover the basics of the course content including an introduction to the concepts and
              methodologies.
            </p> */}
        </div>
        <div className="block lg:hidden flex flex-col gap-4 mt-4">
          <h2 className="text-xl font-semibold">Course Title</h2>


          <a
            className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"

          >
            {/* <div className="border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 h-8 w-8 flex items-center justify-center rounded-full bg-green-500 text-white">
                1
              </div> */}
            <div>
              <h4 className="font-semibold">Introduction to Course</h4>
              <small className="text-sm text-gray-500">Duration: 10:00</small>
            </div>
          </a>
          <a
            className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"

          >
            {/* <div className="border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 h-8 w-8 flex items-center justify-center rounded-full bg-green-500 text-white">
                2
              </div> */}
            <div>
              <h4 className="font-semibold">Chapter 1: Basics</h4>
              <small className="text-sm text-gray-500">Duration: 35:00</small>
            </div>
          </a>
          <a
            className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"

          >
            {/* <div className="border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 h-8 w-8 flex items-center justify-center rounded-full bg-green-500 text-white">
                3
              </div> */}
            <div>
              <h4 className="font-semibold">Chapter 2: Advanced Topics</h4>
              <small className="text-sm text-gray-500">Duration: 45:00</small>
            </div>
          </a>
        </div>
      </main>
    </div>
  )
}

export default Layout

