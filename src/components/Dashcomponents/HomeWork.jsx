import React,{ useState,useEffect } from 'react';
import BluButton from '../Global/BluButton';
import RedButton from '../Global/RedButton';
import axios from 'axios';
import { message } from 'antd';

const HomeWork = ({setIsHomeWork,selectedStandard}) => {

    const[schId,setSchId] = useState('');
    const[contacts,setContacts] = useState('');
    const[description,setDescription] = useState('');
    //console.log(contacts)

    useEffect(() => {
        const storedSchId = localStorage.getItem('sch_id');
        if (storedSchId) {
           setSchId(JSON.parse(storedSchId));
        }
      }, []);

   
    const fetchContactsWClass = async() => {
        if (!schId) {
            // Prevent API call if schId is not set
            return;
          }
        await axios.get(`http://localhost:4000/schoolApi/getAllAdmissionContact?schoolId=${schId}&&class=${selectedStandard}`,{
            headers : {
                "Content-Type" : "application/json"
            }
        })
        .then((res)=>{
           const result = res.data?.contactArray;
           setContacts(result);
           const apiMessage = res.data.message;
           message.success(apiMessage)
        })
        .catch((err)=>{
            const apiMessage = err.response?.data?.message || 'an error occurred';
            message.error(apiMessage)
        })
    }

    useEffect(()=>{
        if(schId){
          fetchContactsWClass();
        }
    },[schId,selectedStandard])
    ////////////////////////////////////////////////////////////////////////////////

  return (
    <div className=' fixed top-[20%] left-[35%] w-[40%]  border border-green-500 bg-gray-100 rounded-md'>
        <p className=' pl-4 py-1 bg-green-400 font-semibold'>
            Send HomeWork
        </p>
    <textarea rows='5' cols='60' placeholder='Message' className='m-4 border-2 border-gray-200 outline-none pl-2 pt-2 rounded-md' 
        value={description} onChange={(e)=>setDescription(e.target.value)} />


    <div className='flex gap-2 justify-end px-2 pb-2'>
    <BluButton buttonName="Send"/>
    <RedButton buttonName="Cancel" onClick={()=>setIsHomeWork(false)} />
    </div>
    </div>
  )
}

export default HomeWork