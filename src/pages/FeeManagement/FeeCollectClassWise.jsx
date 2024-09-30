import React,{ useState,useEffect } from 'react';
import RedButton from '../../components/Global/RedButton';
import axios from 'axios';
import { message } from 'antd';

const FeeCollectClassWise = ({setIsFeeCollect,selectedStandard}) => {

    const[allFeeData,setAllFeeData] = useState('');
    const[schId,setSchId] = useState('');
    //console.log(allFeeData)

    useEffect(() => {
        const storedSchId = localStorage.getItem('sch_id');
        if (storedSchId) {
           setSchId(JSON.parse(storedSchId));
        }
      }, []);

   
    const fetchFeeCollectionClassW = async() => {
        if (!schId) {
            // Prevent API call if schId is not set
            return;
          }
        //   setLoading(true)  
        await axios.get(`http://localhost:4000/schoolApi/getFeeCollectionCW?schoolId=${schId}&&class=${selectedStandard}`,{
            headers : {
                "Content-Type" : "application/json"
            }
        })
        .then((res)=>{
           const result = res.data;
           setAllFeeData(result);
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
           fetchFeeCollectionClassW();
        }
    },[schId,selectedStandard])


  return (
    <>
      <div className='fixed top-16 left-[20%] bg-gray-200 w-[60%]'>
      <p className='sm:text-2xl py-2 text-center font-Rubik bg-[#ed6d64]'>Class {selectedStandard} Fee Collection Details </p>
       <div className='mt-4 grid grid-cols-2 px-6 text-sm sm:text-base'>
        <p>April : {allFeeData.aprilFeeCollection} </p>
        <p>May : {allFeeData.mayFeeCollection} </p>
        <p>June : {allFeeData.juneFeeCollection} </p>
        <p>July : {allFeeData.julyFeeCollection} </p>
        <p>Aug : {allFeeData.augustFeeCollection} </p>
        <p>Sept : {allFeeData.septemberFeeCollection} </p>
        <p>Oct : {allFeeData.octoberFeeCollection} </p>
        <p>Nov : {allFeeData.novemberFeeCollection} </p>
        <p>Dec : {allFeeData.decemberFeeCollection} </p>
        <p>Jan : {allFeeData.janFeeCollection}</p>
        <p>Feb : {allFeeData.febFeeCollection} </p>
        <p>March : {allFeeData.marchFeeCollection}</p>
       </div>

      <div className=' p-4 flex justify-end'>
      <RedButton buttonName='Cancel' onClick={()=>setIsFeeCollect(false)} />
      </div>
      </div>
    </>
  )
}

export default FeeCollectClassWise