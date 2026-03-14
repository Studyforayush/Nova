import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useGlobalContext } from "../GlobalContext";
import { API_BASE } from '../api';
import { motion, AnimatePresence } from 'framer-motion';
import NavbarMain from './NavbarMain';

const CourseForm = () => {
  const {user, userAuth} = useGlobalContext()
  const teacherId = user?._id || user?.id || 'admin-mock-id';
  const navigate = useNavigate()
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState(null);
  const [step, setStep] = useState(1); // 1: Course Info, 2: Chapters
  const [courseId, setCourseId] = useState(null);

  const [courseData, setCourseData] = useState({
    courseTitle: '',  
    courseDescription: '',
    courseImage: '',
    coursePrice: '',
    courseCategory: '',
    teacherId
  });

  const [chapters, setChapters] = useState([]);
  const [currentChapter, setCurrentChapter] = useState({
    chapterTitle: '',
    chapterVideo: '', // Video URL
    chapterDuration: ''
  });
  const [videoFile, setVideoFile] = useState(null);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  useEffect(() => {
    if (!userAuth) {
        navigate('/login');
    }
  }, [userAuth, navigate]);

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  }

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
        setImg(e.target.files[0]);
    }
  };

  const uploadToCloudinary = async (file, type = 'image') => {
    if (!file) return null;
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "unsigned_upload");
    
    try {
        const res = await axios.post(
            `https://api.cloudinary.com/v1_1/drgqcwxq6/${type}/upload`,
            data
        );
        return res.data.secure_url;
    } catch (err) {
        console.error("Cloudinary upload failed", err);
        return null;
    }
  };

  const handleAddChapter = async () => {
    if (!currentChapter.chapterTitle || (!videoFile && !currentChapter.chapterVideo)) {
        showToast("Please provide chapter title and video");
        return;
    }

    setUploadingVideo(true);
    try {
        let videoUrl = currentChapter.chapterVideo;
        if (videoFile) {
            const uploadedUrl = await uploadToCloudinary(videoFile, 'video');
            if (uploadedUrl) videoUrl = uploadedUrl;
        }

        const payload = {
            ...currentChapter,
            chapterVideo: videoUrl,
            chapterDuration: currentChapter.chapterDuration || "10:00"
        };

        const response = await axios.post(`${API_BASE}/api/chapters/addChapter?id=${courseId}`, payload);
        
        if (response.status === 200) {
            setChapters([...chapters, payload]);
            setCurrentChapter({ chapterTitle: '', chapterVideo: '', chapterDuration: '' });
            setVideoFile(null);
            showToast("Chapter added!");
        }
    } catch (error) {
        console.error(error);
        showToast("Failed to add chapter");
    } finally {
        setUploadingVideo(false);
    }
  };

  const handleSubmitCourse = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
        let finalImageUrl = courseData.courseImage;
        if (img) {
            const uploadedUrl = await uploadToCloudinary(img, 'image');
            if (uploadedUrl) finalImageUrl = uploadedUrl;
        }

        const payload = {
            ...courseData,
            courseImage: finalImageUrl,
            teacherId: teacherId,
            teacherName: user?.name || user?.fullName || 'Admin'
        };

        const response = await axios.post(`${API_BASE}/api/courses/createCourse`, payload);
        
        if (response.status === 200) {
            setCourseId(response.data.id);
            setStep(2);
            showToast("Course basic info saved! Now add chapters.");
        }
    } catch (error) {
        console.error(error);
        showToast(error.response?.data?.error || "Failed to create course");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col relative overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>
        </div>

        <NavbarMain />

        <div className="flex-1 flex items-center justify-center p-6 py-12">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-3xl bg-[#0f0f0f] border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative"
            >
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                <div className="mb-10 flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
                            {step === 1 ? "Create New Course" : "Add Course Content"}
                        </h1>
                        <p className="text-gray-500 font-light">
                            {step === 1 ? "Step 1: Basic Information" : `Step 2: Chapters (${chapters.length} added)`}
                        </p>
                    </div>
                    <div className="flex gap-2 mb-2">
                        <div className={`w-3 h-3 rounded-full ${step === 1 ? 'bg-blue-500' : 'bg-blue-500/20'}`}></div>
                        <div className={`w-3 h-3 rounded-full ${step === 2 ? 'bg-purple-500' : 'bg-purple-500/20'}`}></div>
                    </div>
                </div>

                {step === 1 ? (
                    <form onSubmit={handleSubmitCourse} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="md:col-span-2">
                                <label className="block text-xs font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1">Course Title</label>
                                <input 
                                    type="text" 
                                    name="courseTitle"
                                    value={courseData.courseTitle}
                                    onChange={handleChange}
                                    className="w-full bg-[#151515] border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-gray-700"
                                    placeholder="e.g. Advanced Machine Learning 2024"
                                    required
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-xs font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1">Description</label>
                                <textarea 
                                    name="courseDescription"
                                    value={courseData.courseDescription}
                                    onChange={handleChange}
                                    className="w-full bg-[#151515] border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-gray-700 min-h-[120px] resize-none"
                                    placeholder="What will students learn in this course?"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1">Category</label>
                                <select 
                                    name="courseCategory"
                                    value={courseData.courseCategory}
                                    onChange={handleChange}
                                    className="w-full bg-[#151515] border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white/20 transition-all appearance-none"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="Development">Development</option>
                                    <option value="Design">Design</option>
                                    <option value="Business">Business</option>
                                    <option value="Marketing">Marketing</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1">Price (USD)</label>
                                <input 
                                    type="number" 
                                    name="coursePrice"
                                    value={courseData.coursePrice}
                                    onChange={handleChange}
                                    className="w-full bg-[#151515] border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-gray-700"
                                    placeholder="49.99"
                                    required
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-xs font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1">Course Cover Image</label>
                                <div className="group relative w-full h-48 bg-[#151515] border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center transition-all hover:border-white/20 overflow-hidden">
                                    {img ? (
                                        <div className="text-center p-4">
                                            <p className="text-blue-400 font-bold mb-2">File Selected:</p>
                                            <p className="text-sm text-gray-400 truncate max-w-[200px]">{img.name}</p>
                                            <button type="button" onClick={() => setImg(null)} className="mt-4 text-xs text-red-400 hover:underline">Remove</button>
                                        </div>
                                    ) : (
                                        <>
                                            <svg className="w-10 h-10 text-gray-600 mb-4 group-hover:text-gray-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                            </svg>
                                            <p className="text-sm text-gray-600 group-hover:text-gray-400 transition-colors font-medium">Click to upload or drag & drop</p>
                                        </>
                                    )}
                                    <input type="file" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <motion.button 
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                disabled={loading}
                                type="submit" 
                                className={`w-full ${loading ? 'bg-gray-800' : 'bg-white'} text-black font-black py-5 rounded-2xl shadow-2xl transition-all text-lg flex items-center justify-center gap-3`}
                            >
                                {loading ? "Saving..." : "Next: Add Chapters"}
                            </motion.button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-8">
                        <div className="bg-[#151515] p-6 rounded-3xl border border-white/5 space-y-6">
                            <div>
                                <label className="block text-xs font-black text-gray-500 uppercase tracking-[0.2em] mb-3">Chapter Title</label>
                                <input 
                                    type="text" 
                                    value={currentChapter.chapterTitle}
                                    onChange={(e) => setCurrentChapter({...currentChapter, chapterTitle: e.target.value})}
                                    className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50"
                                    placeholder="e.g. Introduction to React"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-black text-gray-500 uppercase tracking-[0.2em] mb-3">Video File</label>
                                    <div className="relative h-[58px] bg-[#0a0a0a] border border-white/5 rounded-xl flex items-center px-6 overflow-hidden">
                                        <span className="text-gray-500 truncate">{videoFile ? videoFile.name : "Select MP4..."}</span>
                                        <input 
                                            type="file" 
                                            onChange={(e) => setVideoFile(e.target.files[0])}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            accept="video/*"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-gray-500 uppercase tracking-[0.2em] mb-3">Duration</label>
                                    <input 
                                        type="text" 
                                        value={currentChapter.chapterDuration}
                                        onChange={(e) => setCurrentChapter({...currentChapter, chapterDuration: e.target.value})}
                                        className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50"
                                        placeholder="e.g. 15:30"
                                    />
                                </div>
                            </div>

                            <motion.button 
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                disabled={uploadingVideo}
                                onClick={handleAddChapter}
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                            >
                                {uploadingVideo ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Uploading Video...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                                        </svg>
                                        Add This Chapter
                                    </>
                                )}
                            </motion.button>
                        </div>

                        {/* Chapters List */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest">Added Chapters</h3>
                            {chapters.length === 0 ? (
                                <p className="text-gray-700 italic text-center py-8">No chapters added yet.</p>
                            ) : (
                                chapters.map((ch, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">{idx + 1}</div>
                                            <div>
                                                <p className="font-bold text-white">{ch.chapterTitle}</p>
                                                <p className="text-xs text-gray-500">{ch.chapterDuration}</p>
                                            </div>
                                        </div>
                                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="pt-8 border-t border-white/5">
                            <motion.button 
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => navigate('/admin-dashboard')}
                                className="w-full bg-white text-black font-black py-5 rounded-2xl shadow-2xl transition-all text-lg"
                            >
                                Finish & Go to Dashboard
                            </motion.button>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>

        <AnimatePresence>
            {toast && (
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 px-8 py-4 bg-white text-black font-black rounded-full shadow-2xl z-50"
                >
                    {toast}
                </motion.div>
            )}
        </AnimatePresence>
    </div>
  );
};

export default CourseForm;
