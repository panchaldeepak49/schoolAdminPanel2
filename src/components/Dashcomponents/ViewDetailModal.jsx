import React,{ useState,useEffect } from 'react';


const ViewDetailModal = ({transmitData,setShowViewModal}) => {

  const [colorClass,setColorClass] = useState('bg-gray-200');
    

  useEffect(()=>{
  const colors = ['bg-green-300', 'bg-orange-300', 'bg-blue-300', 'bg-red-300', 'bg-yellow-300', 'bg-purple-300'];
  let index = 0;

  const intervalId = setInterval(()=>{
    setColorClass(colors[index % colors.length])
    index++
  },10000)

  setTimeout(()=>{
    clearInterval(intervalId)
  },60000)

  return ()=>clearInterval(intervalId)  //clean up on component unmount

  },[]);


  return (
    <>
      <div className={`fixed top-1 md:top-[4%] left-[40%] flex flex-col gap-1 md:gap-4 py-1 md:py-4 px-4 items-center rounded-md md:w-[25%] ${colorClass} shadow-xl
    border border-blue-600 z-50`}>
       <div className='w-[100%] flex justify-between'>
        <p className='font-sans  font-semibold md:text-xl text-blue-600 '>Student Details</p>
        <button className='md:hidden bg-red-500 text-sm md:text-base text-white px-4 py-1 rounded-md animate-pulse' onClick={()=>setShowViewModal(false)}>X</button>
        </div>
        <div className='w-[100%] flex justify-evenly'>
        <img src={transmitData.imageUrl} className='w-12 h-20 md:h-auto md:w-[30%] rounded-md' alt='oops'></img>
        {/* <FallingLines className='text-sm'  /> */}
        </div>
        <div className='flex flex-col gap-0 md:gap-2'>
          
        <p className='text-sm md:text-base font-Rubik'><span className='font-medium md:font-semibold'>Name : </span>{transmitData.name} </p>
        <p className='text-sm md:text-base font-Rubik'><span className='font-medium md:font-semibold'>Father Name : </span> {transmitData.fatherName}</p>
        <p className='text-sm md:text-base font-Rubik'><span className='font-medium md:font-semibold'>Class : </span> {transmitData.class}</p>
        <p className='text-sm md:text-base font-Rubik'><span className='font-medium md:font-semibold'>Roll No : </span> {transmitData.rollNo}</p>
        <p className='text-sm md:text-base font-Rubik'><span className='font-medium md:font-semibold'>Address : </span> {transmitData.address}</p>
        <p className='text-sm md:text-base font-Rubik'><span className='font-medium md:font-semibold'>DOA : </span> {transmitData.admissionDate}</p>
        
        {/* <p className='text-sm md:text-base font-Rubik'><span className='font-medium md:font-semibold'>Class Teacher : </span> {classTeacherName}</p> */}
        <p className='text-sm md:text-base font-Rubik'><span className='font-medium md:font-semibold'>Gender : </span> {transmitData.gender}</p>
        <p className='text-sm md:text-base font-Rubik'><span className='font-medium md:font-semibold'>Contact : </span> {transmitData.contact}</p>
        </div>

        <div className='hidden md:block '>
            <button className='bg-blue-600 text-sm md:text-base text-white px-4 py-1 rounded-md animate-pulse' onClick={()=>setShowViewModal(false)}>Close</button>
            {/* <button className='bg-orange-400 p-2 rounded-md' onClick={()=>updateUser()}>Update</button> */}
        </div>
    </div>
    </>
  )
}

export default ViewDetailModal