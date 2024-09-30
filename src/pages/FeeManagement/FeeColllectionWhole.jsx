import React,{ useState,useEffect } from 'react';
import RedButton from '../../components/Global/RedButton';
import axios from 'axios';
import { message } from 'antd';

const FeeColllectionWhole = ({setIsFeeCollect}) => {

    const[schoolFeeData,setSchoolFeeData] = useState('');
    const[schId,setSchId] = useState('');

    useEffect(() => {
        const storedSchId = localStorage.getItem('sch_id');
        if (storedSchId) {
           setSchId(JSON.parse(storedSchId));
        }
      }, []);

   
    const fetchFeeCollectionWhole = async() => {
        if (!schId) {
            // Prevent API call if schId is not set
            return;
          }
        //   setLoading(true)  
        await axios.get(`http://localhost:4000/schoolApi/getFeeCollectionWhole?schoolId=${schId}`,{
            headers : {
                "Content-Type" : "application/json"
            }
        })
        .then((res)=>{
           const result = res.data;
           setSchoolFeeData(result);
           //  console.log(result)
           const apiMessage = res.data.message;
           message.success(apiMessage);
        //    setLoading(false);
        })
        .catch((err)=>{
            const apiMessage = err.response?.data?.message || 'an error occurred';
            message.error(apiMessage)
        })
    }

    useEffect(()=>{
        if(schId){
            fetchFeeCollectionWhole();
        }
    },[schId]);


  return (
    <>
      <div className='fixed top-16 left-[20%] bg-gray-200 w-[60%]'>
      <p className='sm:text-2xl py-2 text-center font-Rubik bg-[#ed6d64]'>School Fee Collection Details(2024-25) </p>
       <div className='mt-4 grid grid-cols-2 px-6 text-sm sm:text-base'>
        <p>April : {schoolFeeData.aprilFeeCollection} </p>
        <p>May : {schoolFeeData.mayFeeCollection} </p>
        <p>June : {schoolFeeData.juneFeeCollection} </p>
        <p>July : {schoolFeeData.julyFeeCollection} </p>
        <p>Aug : {schoolFeeData.augustFeeCollection} </p>
        <p>Sept : {schoolFeeData.septemberFeeCollection} </p>
        <p>Oct : {schoolFeeData.octoberFeeCollection} </p>
        <p>Nov : {schoolFeeData.novemberFeeCollection} </p>
        <p>Dec : {schoolFeeData.decemberFeeCollection} </p>
        <p>Jan : {schoolFeeData.janFeeCollection}</p>
        <p>Feb : {schoolFeeData.febFeeCollection} </p>
        <p>March : {schoolFeeData.marchFeeCollection}</p>
       </div>

      <div className=' p-4 flex justify-end'>
      <RedButton buttonName='Cancel' onClick={()=>setIsFeeCollect(false)} />
      </div>
      </div>
    </>
  )
}

export default FeeColllectionWhole