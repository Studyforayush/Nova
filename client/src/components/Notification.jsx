import React, { useEffect, useState } from "react";
import { FiCheckSquare, FiX } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

const SlideInNotifications = ({displayText,buttonText}) => {
  const [notifications, setNotifications] = useState([]);

  const removeNotif = (id) => {
    setNotifications((pv) => pv.filter((n) => n.id !== id));
  };

  return (
    <div className="w-full bg-white min-h-[50px] flex items-center justify-center">
      <button
        onClick={() => {
          setNotifications((pv) => [generateRandomNotif(), ...pv]);
        }}
        className="w-full text-sm text-white bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all font-medium px-3 py-2 rounded mt-1 "
        style={{fontSize:'1.0rem'}}
      >
        Add Chapter
      </button>
      <div className="flex flex-col gap-1 w-72 fixed top-2 right-2 z-50 pointer-events-none">
        <AnimatePresence>
          {notifications.map((n) => (
            <Notification removeNotif={removeNotif} {...n} key={n.id} displayText={displayText} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const NOTIFICATION_TTL = 5000;

const Notification = ({ text, id, removeNotif,displayText }) => {
  useEffect(() => {
    const timeoutRef = setTimeout(() => {
      removeNotif(id);
    }, NOTIFICATION_TTL);

    return () => clearTimeout(timeoutRef);
  }, []);

  return (
    <motion.div
      layout
      initial={{ y: -15, scale: 0.95 }}
      animate={{ y: 0, scale: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="p-1 flex items-start rounded gap-2 text-xs font-medium shadow-lg text-white bg-green-500 pointer-events-auto "
    >
      <FiCheckSquare className=" mt-2" />
      <span className="mt-1.5">{displayText}</span>
      <button onClick={() => removeNotif(id)} className="ml-auto mt-0  text-white border-0 bg-green-500 focus-0 border-0" style={{border:'0px transparent'}}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>

      </button>
    </motion.div>
  );
};

export default SlideInNotifications;

const generateRandomNotif = () => {
  const names = [
    "John Anderson",
    "Emily Peterson",
    "Frank Daniels",
    "Laura Williams",
    "Donald Sanders",
    "Tom Smith",
    "Alexandra Black",
  ];

  const randomIndex = Math.floor(Math.random() * names.length);

  const data = {
    id: Math.random(),
    text: `New notification from ${names[randomIndex]}`,
  };

  return data;
};