import React,{ useState,useEffect } from 'react';
import MyButton from '../../components/Global/MyButton';
import InputField from '../../components/Global/InputField';
import axios from 'axios';
import { message } from 'antd';


const AddClass = ({setIsAddClass,fetchAllClass}) => {
    const [schId,setSchId] = useState('');
    const [standard,setStandard] = useState('');
    const [baseFee,setBaseFee] = useState('');
    //console.log(schId)

    useEffect(() => {
        const storedSchId = localStorage.getItem('sch_id');
        if (storedSchId) {
           setSchId(JSON.parse(storedSchId));
        }
      }, []);

    const data = JSON.stringify({
        "schoolId" : schId,
        "class" : standard,
        "fees" : baseFee
    })

    const saveClass = async()=>{
        if(!schId){
            return 
        }
        await axios.post(`http://localhost:4000/schoolApi/postStudentClass?schoolId=${schId}`,data,{
            headers : {
                "Content-Type" : "application/json"
            }
        })
        .then((res)=>{
            const apiMessage = res.data.message;
            message.success(apiMessage);
            setIsAddClass(false);
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
            Add Class
        </p>
        
        
        <div className='mt-4 px-4 grid grid-cols-2 gap-4'>
        <InputField type='text' placeholder='Class' value={standard} onChange={(e)=>setStandard(e.target.value)}  />
        <InputField type='number' placeholder='Base Fee' value={baseFee} onChange={(e)=>setBaseFee(e.target.value)}  />
        </div>

        <div className='mt-4 flex justify-end gap-4 pr-4 pb-4'>
           <MyButton buttonName='Save' color='green-600'  onClick={saveClass}/>
           <MyButton buttonName='Cancel' color='red-600' onClick={()=>setIsAddClass(false)} />
        </div>
    </div>
    </>
  )
}

export default AddClass