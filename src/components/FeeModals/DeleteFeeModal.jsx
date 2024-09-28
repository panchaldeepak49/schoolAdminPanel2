import React from 'react';
import axios from 'axios';
import { message } from 'antd';

const DeleteFeeModal = ({transmitData,setDeleteFeeModal,fetchStudentsFee}) => {

    const removeFee = async () => {
        await axios.delete(`http://localhost:4000/schoolApi/deleteStudentFee/${transmitData?._id}`,{
            headers : {
                "Content-Type" : "application/json"
            }
        })
          .then((res) => {
            const apiMessage = res.data.message
            message.success(apiMessage); 
            setDeleteFeeModal(false);
            fetchStudentsFee(); 
          })
          .catch((err) => {
            const errorMessage = err.response?.data?.message || "An error occurred";
            message.error(errorMessage);
          });
      };

  return (
    <>
     <div className='fixed top-[12%] left-[40%] flex flex-col gap-4 py-4 items-center rounded-md w-[25%] bg-gray-200 shadow-xl'>
        <p className='text-sm md:text-base ml-2 md:ml-0'>Are you sure want to remove this student ?</p>
        
        <p className='text-sm md:text-base'>Name : {transmitData?.name}</p>
        <div className='flex gap-10'>
            <button className='bg-red-600 text-sm md:text-base text-white p-1 md:p-2 rounded-md' onClick={()=>removeFee()}>Delete</button>
            <button className='bg-red-600 text-sm md:text-base text-white p-1 md:p-2 rounded-md ' onClick={()=>setDeleteFeeModal(false)}>Cancel</button>
        </div>
    </div>
    </>
  )
}

export default DeleteFeeModal