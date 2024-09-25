import React,{ useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoArrowBack } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { userRequest } from './RequestMethod';
import axios from 'axios';
import { message } from 'antd';

const SignUp = () => {
    
    const[name,setName] = useState('');
    const[email, setEmail] = useState('');
    const [password,setPassword] =  useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [showPassword,setShowPassword] = useState(false);
    const [showCPassword,setShowCPassword] = useState(false);


    const data = JSON.stringify({
      "name" : name,
      "email" : email,
      "password" : password,
      "confirmPassword" : confirmPassword,
    })


    const handleSignUp =async()=>{
      await axios.post('http://localhost:4000/schoolApi/register',data,{
        headers : {
          "Content-Type" : "application/json"
        }
      }
      )
         .then((res)=>{
         
          const apiMessage = res.data.message ;
          message.success(apiMessage);
         })
         .catch((err)=>{
            const apiMessage = err.response.data.message || 'an error occurred';
             message.error(apiMessage)
         })
    }

  return (
    <>
      <div className="fixed top-20 md:top-32 left-[16%] md:left-[24%]  flex flex-col items-center justify-center  md:w-[400px] md:h-[380px] bg-[#fff] border-2 border-[#fc3903] shadow-xl rounded-lg p-2">
          
          <h1 className=' text-xl md:text-2xl font-semibold'>Admin SignUp</h1>
          <input className='border-2 border-[#dddfe2] rounded-lg w-[92%] text-base text-[#1d2129] outline-none mt-4 py-1 md:py-2 pl-2' type= "text" name="name" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter your School Name"></input>
          <input className='border-2 border-[#dddfe2] rounded-lg w-[92%] text-base text-[#1d2129] outline-none mt-4 py-1 md:py-2 pl-2' type= "text" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your e-mail"></input>
          <div className='flex items-center justify-between border-2 border-[#dddfe2] rounded-lg w-[92%] text-base text-[#1d2129] outline-none mt-4 py-1 md:py-2 pl-2 pr-6 md:pr-2'>
          <input className='outline-none' type={showPassword ? "text" : "password"} name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password"></input>
          <div className='' onClick={()=>setShowPassword(!showPassword)}>
                {showPassword ? <FaEye /> : <FaEyeSlash /> }
             </div>
             </div>

             <div className='flex items-center justify-between border-2 border-[#dddfe2] rounded-lg w-[92%] text-base text-[#1d2129] outline-none mt-4 py-1 md:py-2 pl-2 pr-6 md:pr-2'>
          <input className='outline-none' type={showCPassword ? "text" : "password"} name="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="Confirm password"></input>
          <div className='' onClick={()=>setShowCPassword(!showCPassword)}>
                {showCPassword ? <FaEye /> : <FaEyeSlash /> }
             </div>
             </div>   
          <button className=" flex justify-center bg-[#1877f2] border-2 border-[#1877f2] rounded-xl w-[92%] outline-none text-white md:text-xl font-semibold md:py-1 mt-6 mb-4 cursor-pointer" onClick={handleSignUp}>Next</button>
          <div className='flex justify-end w-[90%] gap-2 text-sm'>
          <Link to='/' className='flex gap-1 items-center cursor-pointer hover:text-[#fc3903] '><IoArrowBack />back </Link>
          </div>
      </div>
    </>
  )
}

export default SignUp