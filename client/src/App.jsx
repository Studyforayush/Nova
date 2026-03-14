import './App.css'
import LandingPage from './components/LandingPage';
import Ask from './components/Ask';
import Upload from './components/Upload'
import { Routes,Route } from 'react-router-dom';
import TeacherRegister from './components/TeacherRegister';
import StudentRegister from './components/StudentRegister';
import About from './components/About';
import NavbarMain from './components/NavbarMain';
import Modal from './components/Modal';
import Test from './components/Test';
import TeacherNavBar from './components/TeacherNavBar';
import StudentNavBar from './components/StudentNavBar';
import Login from './components/Login';
import StudentLogin from './components/StudentLogin';
import TeacherProfile from './components/TeacherProfile';
import CreateCourse from './components/CreateCourse';
import TeacherMain from './components/TeacherMain';
import StudentMain from './components/StudentMain';
import DisplayCourse from './components/DisplayCourse';
import CourseForm from './components/CourseForm';
import SingleCourse from './components/SingleCourse';
import NewTest from './components/NewTest';
import AddChapter from './components/AddChapter';
import SlideInNotifications from './components/Notification';
import CourseOverview from './components/CourseOverview';
import ErrorNotFound from './components/ErrorNotFound';
import ContactUs from './components/ContactUs';
import StudentProfile from './components/StudentProfile';
import MyCourses from './components/MyCourses';
import Check from './components/Check';
import SearchCourse from './components/SearchCourse';
import StudentCart from './components/StudentCart';
import Layout from './components/Layout';
import Success from './components/Success';
import Cancel from './components/Cancel';
import AdminDashboard from './components/AdminDashboard';
import StudentDashboard from './components/StudentDashboard';
import FacultyDashboard from './components/FacultyDashboard';
import Analytics from './components/Analytics';
import StudentDetails from './components/StudentDetails';
import('preline')
function App() {
  return (
  
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/ask' element={<Ask/>}/>
      <Route path='/upload' element={<Upload/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/studentLogin' element={<StudentLogin/>}/>
      <Route path='/teacherRegister' element={<TeacherRegister/>}/>
      <Route path='/studentRegister' element={<StudentRegister/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/navbar' element={<NavbarMain/>}/>
      <Route path='/Modal' element={<Modal/>}/>
      <Route path='/teacherNavbar' element={<TeacherNavBar/>}/>
      <Route path='/studentNavbar' element={<StudentNavBar/>}/>
      <Route path='/teacherProfile' element={<TeacherProfile/>}/>
      <Route path='/createCourse' element={<CreateCourse/>}/>
      <Route path='/test' element={<Test/>}/>
      <Route path='/teacherMain' element={<TeacherMain/>}/>
      <Route path='/studentMain' element={<StudentMain/>}/>
      <Route path='/displayCourse' element={<DisplayCourse/>}/>
      <Route path='/courseForm' element={<CourseForm/>}/>
      <Route path='/singleCourse' element={<SingleCourse/>}/>
      <Route path='/new' element={<NewTest/>}/>
      <Route path='/courseForm' element={<CourseForm/>}/>
      <Route path='/courseForm/:courseId' element={<CourseForm/>}/>
      <Route path='/addChapter/:courseId' element={<AddChapter/>}/>
      <Route path='/notification' element={<SlideInNotifications/>}/>
      <Route path='/courseOverview/:courseId' element={<CourseOverview/>}/>
      <Route path='*' element={<ErrorNotFound/>}/>
      <Route path='/contact' element={<ContactUs/>}/>
      <Route path='/studentProfile' element={<StudentProfile/>}/>
      <Route path='/mycourses/:id' element={<MyCourses/>}/>
      <Route path='/check' element={<Check/>}/>
      <Route path='/search/:courseName' element={<SearchCourse/>}/>
      <Route path='/cart/:studentId' element={<StudentCart/>}/>
      {/* <Route path='/layout' element={<Layout/>}/> */}
      {/* <Route path='/layout/:courseId' element={<Layout/>}/> */}
      <Route path='/layout/:courseId/:chapter' element={<Layout/>}/>
      <Route path='/success' element={<Success/>}/>
      <Route path='/cancel' element={<Cancel/>}/>
      <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
      <Route path='/student-dashboard' element={<StudentDashboard/>}/>
      <Route path='/faculty-dashboard' element={<FacultyDashboard/>}/>
      <Route path='/analytics' element={<Analytics/>}/>
      <Route path='/student-details' element={<StudentDetails/>}/>
    </Routes>

  )
}

export default App
