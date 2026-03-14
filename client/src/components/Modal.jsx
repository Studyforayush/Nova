import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { useState } from "react";
import axios from "axios";
import { API_BASE } from '../api';

const SideBar = ({teacher,setTeacher,student,setStudent}) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(student,'sidebar')
  
  return (
    <div className="px-0 py-0 bg-white-900 grid place-content-center mt-4">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity mt-4"
      >
        Update Profile
      </button>
      <SpringModal isOpen={isOpen} setIsOpen={setIsOpen}  teacher={teacher} setTeacher={setTeacher} student={student} setStudent={setStudent}/>
    </div>
  );
};

const SpringModal = ({ isOpen, setIsOpen,teacher,setTeacher,student,setStudent }) => {
  const handleClick =async ()=>{
    if(teacher){
      try {

        setIsOpen(false);
        let id = teacher._id
        
        let response = await axios.post(`${API_BASE}/api/teacher/teacherUpdate`,{...teacher},{
          params:{
              id:id
          }
         })
       
        localStorage.setItem('token',response.data.token)
      } catch (error) {
        console.error(error)
      }
    }
    if(student){

      try {
        setIsOpen(false);
        let id = student._id
        
        let response = await axios.post(`${API_BASE}/api/student/studentUpdate`,{...student},{
          params:{
              id:id
          }
         })
       
        localStorage.setItem('token',response.data.token)
      } catch (error) {
        console.error(error)
      }

    }
   
  }
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
                <FiAlertCircle />
              </div>
          
              <p className="p-10">
              ARE YOU SURE YOU WANT TO UPDATE YOUR PROFILE?

              </p>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                >
                  No, go back
                </button>
                <button
                  onClick={handleClick}
                  className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                >
                  YES!
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SideBar;
