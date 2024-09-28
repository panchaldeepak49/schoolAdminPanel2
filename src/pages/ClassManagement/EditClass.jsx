import React,{ useState } from 'react';
import MyButton from '../../components/Global/MyButton';
import InputField from '../../components/Global/InputField';
import axios from 'axios';
import { message } from 'antd';

const EditClass = ({ setIsEditClass,transmitData,fetchAllClass }) => {

    const [standard,setStandard] = useState(transmitData.class);
    const [baseFee,setBaseFee] = useState(transmitData.fees);
    //console.log(passData)

    const data = JSON.stringify({
        "class" : standard,
        "fees" : baseFee
    })

    const updateClass = async()=>{
        await axios.patch(`http://localhost:4000/schoolApi/updateClassNFee/${transmitData._id}`,data,{
            headers : {
                "Content-Type" : "application/json"
            }
        })
        .then((res)=>{
            const apiMessage = res.data.message;
            message.success(apiMessage);
            setIsEditClass(false);
            fetchAllClass();
        })
        .catch((err)=>{
            const apiMessage = err.response.data.message || 'an error occurred';
            message.error(apiMessage)
        })
      }

  return (
    <>
      <div className='fixed top-[20%] left-[30%] w-[40%] border-2 border-green-400 rounded-md bg-white'>
        <p className=' pl-4 py-1 bg-green-400 font-semibold'>
            Edit Class
        </p>
        
        <div className='mt-4 px-4 grid grid-cols-2 gap-4'>
        <InputField type='text' placeholder='Class' value={standard} onChange={(e)=>setStandard(e.target.value)}  />
        <InputField type='number' placeholder='Base Fee' value={baseFee} onChange={(e)=>setBaseFee(e.target.value)}  />
        </div>

        <div className='mt-4 flex justify-end gap-4 pr-4 pb-4'>
           <MyButton buttonName='Update' color='green-600' onClick={updateClass} />
           <MyButton buttonName='Cancel' color='red-600' onClick={()=>setIsEditClass(false)} />
        </div>
    </div>
    </>
  )
}

export default EditClass