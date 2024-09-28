import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Home from '../pages/Dashboard/Home';
import Login from '../pages/Login';
import SignUp from '../components/SignUp';
import ForgotPassword from '../components/ForgotPassword';
import Navbar from '../components/Navbar';
import Admission from '../pages/Admission/Admission';
import AllStandardStu from '../pages/Dashboard/AllStandardStu';
import StudentClassWise from '../pages/Dashboard/StudentClassWise';
import FeeClassWise from '../pages/FeeManagement/FeeClassWise';
import ClassAndFee from '../pages/ClassManagement/ClassAndFee';
import StaffManagement from '../pages/StaffManagement/StaffManagement';

const Path = () => {

  const NavbarWrapper = () => {
    const currentLocation = window.location.pathname;
    const match = ['/'].some((route)=>route===currentLocation);
    // console.log("ffafa",match,currentLocation)
    if(match){
      return null;
     
      }
      else{
        // return <PrivateRoute><Navbar /></PrivateRoute>
        return <Navbar />
      }
   }


  return (
    <>
    <Router>
      <div className='flex'>
       <NavbarWrapper />
        <Routes>
            <Route path="/" element = {<Login />} />
            <Route path="/signUp" element = {<SignUp />} />
            <Route path="/forgot" element = {<ForgotPassword />} />
            <Route path="/home" element = {<Home />} />
            <Route path= "/admission" element={<Admission />}></Route>
            <Route path= "/allStanStudents" element={<AllStandardStu />}></Route>
            <Route path= "/stuClassWise" element={<StudentClassWise />}></Route>
            <Route path= "/feeManagement" element={<FeeClassWise />}></Route>
            <Route path= "/classManagement" element={<ClassAndFee />}></Route>
            <Route path= "/staffManagement" element={<StaffManagement />}></Route>
        </Routes>
        </div>
    </Router>
    </>
  )
}

export default Path