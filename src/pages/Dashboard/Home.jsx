import React,{ useState,useEffect } from 'react';
import schoolImg2 from '../../assets/Images/school3.jpg';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();
   //console.log(countAll)
   const [colorClass, setColorClass] = useState('bg-gradient-to-r from-pink-400 to-purple-400 via-green-100');
  //  bg-gradient-to-r from-red-200 to-green-200

   useEffect(() => {
    const timer = setTimeout(() => {
      setColorClass('bg-gradient-to-r from-blue-200 to-purple-200');
    }, 20000); // 10 seconds

    // Cleanup the timer
    return () => clearTimeout(timer);
    }, []);

  return (
    <>
     <div className={`w-[82%] ${colorClass}`}>
        <div className='flex justify-center'>
        <img src={schoolImg2} className='mt-4 w-[35%]' alt='missing' />     {/* 20% */}
        </div>
        
        
    <div className='flex justify-center gap-8 sm:gap-14 lg:gap-16'>    
    <div className='mt-4 h-24 sm:h-32 lg:h-40 w-24 sm:w-32 lg:w-40 flex flex-col justify-center items-center bg-teal-400 rounded-xl cursor-pointer
     hover:bg-blue-500 hover:-translate-y-5 scale-100 shadow-lg ease-in-out duration-300 delay-150 '
    onClick={()=>navigate('/allStanStudents')} >
        <p className='font-sans text-base sm:text-lg lg:text-xl' >All BOM</p> 
        
    </div>

    <div className='mt-4 h-24 sm:h-32 lg:h-40 w-24 sm:w-32 lg:w-40  flex flex-col justify-center items-center bg-gradient-to-r from-orange-400 to-orange-400 via-orange-300 rounded-xl hover:rounded-full cursor-pointer
    
    hover:bg-[#e67e22] hover:-translate-y-5 scale-100 shadow-lg ease-in-out duration-300 delay-150'
    onClick={()=>navigate('/stuClassWise')} >
        <p className='font-sans sm:text-lg lg:text-xl ' >BOM Class</p> 
        {/* <p className=' ' >{studentX.length}</p>  */}
    </div>
    <div className='mt-4 h-24 sm:h-32 lg:h-40 w-24 sm:w-32 lg:w-40 flex justify-center items-center bg-green-400 rounded-xl cursor-pointer
    hover:bg-[#2ed573] hover:-translate-y-5 scale-100 shadow-lg ease-in-out duration-300 delay-150'>
        <p className='font-sans sm:text-lg lg:text-xl '> BOM </p> 
    </div>

    <div className='mt-4 h-24 sm:h-32 lg:h-40 w-24 sm:w-32 lg:w-40 flex justify-center items-center bg-blue-400 rounded-xl
    hover:bg-[#1e90ff] hover:-translate-y-5 scale-100 shadow-lg ease-in-out duration-300 delay-150' >
        <p className='font-sans sm:text-lg lg:text-xl ' > BOM </p> 
    </div>
    </div> 

    {/* <Footer /> */}
    
      
    </div>
    </>
  )
}

export default Home