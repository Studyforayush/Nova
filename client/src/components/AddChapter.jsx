import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import SlideInNotifications from './Notification';
import { API_BASE } from '../api';

const AddChapter = () => {
    let { courseId } = useParams();
    const navigate = useNavigate()
    const [chapterTitle, setChatperTitle] = useState('');
    const [chapterVideo, setChapterVideo] = useState(null);
    const [chapterDuration, setChapterDuration] = useState('');
    const [videoUrl, setVideoUrl] = useState(null);
    const [video, setVideo] = useState(null);
    const [toggleButton, setToggleButton] = useState(false);
    const [videoValue, setVideoValue] = useState(false);
    const displayText = 'Chapter Added Successfully'


    let uploadFile = async (type, data) => {
        try {
            let cloudName = 'drgqcwxq6';
            let resourceType = type === 'image' ? 'image' : 'video';
            let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

            const res = await axios.post(api, data);
            const { secure_url } = res.data;

            if (resourceType === 'video') {
                setVideoUrl(secure_url);

            }

            return secure_url;
        } catch (error) {
            console.error(error);
        }
    };

    const handleVideoUpload = async (e) => {
        try {
            const newData = new FormData();
            setVideoValue(true)
            newData.append("file", e.target.files[0]);
            newData.append('upload_preset', 'videos_preset');

            setVideo(e.target.files[0]);

            const videoUrl = await uploadFile('video', newData);
            //   setCourseData((prevData) => ({ ...prevData, 'courseImage': videoUrl }));
            setVideoValue(false);
            setChapterVideo(videoUrl)
        
            console.log(chapterVideo)
            console.log(videoUrl);
            const videoElement = document.createElement('video');
            videoElement.src = videoUrl;

            // Wait for metadata to be loaded
            videoElement.addEventListener('loadedmetadata', () => {
                // Access the duration property
                const duration = videoElement.duration;
                console.log(duration, 'duration');
                setChapterDuration(duration);

                // You can now use the duration as needed
                // setChapterVideo(videoUrl);
                // console.log(chapterVideo);

                setVideoValue(false);
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        // if(chapterTitle && chapterVideo)
        try {
            let chapterData = {
                chapterVideo,
                chapterTitle,
                chapterDuration
            }

            let response = await axios.post(`${API_BASE}/api/chapters/addChapter`, { chapterTitle, chapterVideo,chapterDuration }, {

                params: {
                    id: courseId
                }

            })
            setChapterVideo(null);
            setChatperTitle('');
            setChapterDuration('')
            console.log(response);

        } catch (error) {
            console.error(error);
        }

    }
    const handleClick = async () => {
        navigate(`/courseForm/${courseId}`)
    }

    // console.log(courseId)


    return (
        <>
            <div>
                <div className="flex min-h-full flex-1 flex-col justify-center px-3 py-3 lg:px-8" id='flex-container' >

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm" style={{ fontSize: '1.8rem' }}>
                        <form className="space-y-0" onSubmit={handleSubmit} >
                            <div>
                                <label htmlFor="chapterTitle" className="block text-sm font-medium leading-6 text-gray-900" style={{ textAlign: 'initial', fontSize: '1.0rem' }}>
                                    Chapter Title
                                </label>
                                <div className="mt-1 mb-6" >
                                    <input
                                        id="chapterTitle"
                                        name="chapterTitle"
                                        type="text"
                                        value={chapterTitle}
                                        required
                                        onChange={(e) => (setChatperTitle(e.target.value))}
                                        className="block w-full h-11 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2 mb-0"
                                    />
                                </div>
                            </div>

                            <div>
                                {/* <div className="flex items-center justify-between"> */}
                                <label htmlFor="chapterVideo" className="block text-sm font-bold font-medium leading-6 text-gray-900 mt-0" style={{ textAlign: 'initial', fontSize: '1rem' }}>
                                    Chapter Video
                                </label>
                                <input
                                    id="chapterVideo"
                                    name="chapterVideo"
                                    required
                                    onChange={handleVideoUpload}
                                    type="video/mp4"
                                    className="w-full h-11 rounded border-1 py-0  text-gray-900 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 text-lg p-1 mt-1 "
                                    style={{ border: '1px solid grey', marginBottom: '0', backgroundColor: '' }}
                                />
                                {/* </div> */}
                            </div>
                            {videoUrl ? <div className='w-full rounded border-1 h-72'>
                                <video controls autoPlay style={{ border: '1px solid grey', marginTop: '0', borderTop: '0px', margin: '0' }} className='w-full h-full'>
                                    <source src={videoUrl} type="video/mp4" />


                                </video>

                            </div> : videoValue ? <div className='w-full h-72' style={{ border: '1px solid grey', marginTop: '0', borderTop: '0px' }}><div role="status" className="flex items-center justify-center h-full max-w-sm bg-gray-300  animate-pulse dark:bg-gray-700">
                                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div></div> : <div className='w-full h-72' style={{ border: '1px solid grey', marginTop: '0', borderTop: '0px' }}></div>
                            }
                            {
                                videoUrl && chapterTitle ? <div>
                                    <button
                                        type="submit"
                                        className=' p-0 w-full mt-3 border-0'
                                    >
                                        <SlideInNotifications displayText={displayText} />
                                    </button>
                                </div> :
                                    <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-6"
                                            style={{ fontSize: '1.0rem' }}
                                        >
                                            Add Chapter
                                        </button>

                                    </div>

                            }


                            <div>
                                <button
                                    type="button"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-6"
                                    style={{ fontSize: '1.0rem' }}
                                    onClick={handleClick}
                                >
                                    Back to Course
                                </button>

                            </div>



                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default AddChapter