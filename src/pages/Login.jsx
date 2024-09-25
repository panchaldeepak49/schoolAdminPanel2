import React,{ useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { userRequest } from '../components/RequestMethod';
import { message } from 'antd';
import axios from 'axios'

const Login = () => {
    
    const navigate = useNavigate();
    
    const[email, setEmail] = useState('');
    const [password,setPassword] =  useState('');
    const [showPassword,setShowPassword] = useState(false);
    
    const data = JSON.stringify({
        "email" : email,
        "password" : password
    })
   
    const handleLogin=async()=>{
        await axios.post('http://localhost:4000/schoolApi/login',data,
          {
            headers : {
              'Content-Type' : 'application/json'
            }
          }
        )
        .then((res)=>{
          //console.log(res)
             const result = res.data.details;
             const apiMessage = res.data.message;
             message.success(apiMessage);
            //  localStorage.setItem("token",JSON.stringify(res.data.token));
             localStorage.setItem("school",JSON.stringify(res.data?.details?.name));
             localStorage.setItem("sch_id",JSON.stringify(res.data?.details?._id));
             navigate('/home');
             window.location.reload();
        }).catch((err)=>{
            const errorMessage = err.response.data.message || 'an error occurred'
            message.error(errorMessage)
        })
    }

  return (

    <>
    <div className="fixed top-20 md:top-32 left-[16%] md:left-[24%]  flex flex-col items-center justify-center  md:w-[400px] md:h-[300px] bg-[#fff] border-2 border-[#fc3903] shadow-xl rounded-lg p-2">
          
          <h1 className=' text-xl md:text-2xl font-semibold'>Admin Login</h1>
          <input className='border-2 border-[#dddfe2] rounded-lg w-[92%] text-base text-[#1d2129] outline-none mt-4 py-1 md:py-2 pl-2' type= "text" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your e-mail"></input>
          <div className='flex items-center justify-between border-2 border-[#dddfe2] rounded-lg w-[92%] text-base text-[#1d2129] outline-none mt-4 py-1 md:py-2 pl-2 pr-6 md:pr-2'>
          <input className='outline-none' type={showPassword ? "text" : "password"} name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password"></input>
          <div className='' onClick={()=>setShowPassword(!showPassword)}>
                {showPassword ? <FaEye /> : <FaEyeSlash /> }
             </div>
             </div>
          <button className=" flex justify-center bg-[#1877f2] border-2 border-[#1877f2] rounded-xl w-[92%] outline-none text-white md:text-xl font-semibold md:py-1 mt-6 mb-4 cursor-pointer" onClick={handleLogin} >Next</button>
          <div className='flex gap-2 text-sm'>
          <Link to='/signUp' className='cursor-pointer hover:text-[#fc3903]'>SignUp |</Link>
          <Link to='/forgot' className='cursor-pointer hover:text-[#fc3903]'>Forgot password</Link>
          </div>
      </div>
    </>
  )
}

export default Login