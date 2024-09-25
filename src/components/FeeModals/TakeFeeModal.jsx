import React,{ useState,useEffect } from 'react';
import BluButton from '../Global/BluButton';
import RedButton from '../Global/RedButton';
import axios from 'axios';
import { message } from 'antd';


const TakeFeeModal = ({transmitData,setTakeFeeModal,fetchStudentsFee}) => {
    console.log(transmitData)
    const[stuId,setstuId] = useState(transmitData.stuId);
  const[name,setName] = useState(transmitData.name);
  const[fee,setFee] = useState('600');

  var [april, setApril] = useState(transmitData.april);
  var[may,setMay] = useState(transmitData.may);
  var[june,setJune] = useState(transmitData.june);
  var[july,setJuly] = useState(transmitData.july);
  var[august,setAugust] = useState(transmitData.august);
  var[september,setSeptember] = useState(transmitData.september);
  var[october,setOctober] = useState(transmitData.october);
  var[november,setNovember] = useState(transmitData.november);
  var[december,setDecember] = useState(transmitData.december);
  var[january,setJanuary] = useState(transmitData.january);
  var[feb,setFeb] = useState(transmitData.feb);
  var[march,setMarch] = useState(transmitData.march);
  var[totalAmountRcvd, setTotalAmountRcvd] = useState(transmitData.totalAmountAccepted);

  const currentDate = new Date();
  const monthNames = [
    "January", "February", "March","April", "May", "June","July", "August", "September", "October",
     "November", "December",];
  const currentMonthIndex = currentDate.getMonth();
  const currentMonthName = monthNames[currentMonthIndex];
  //console.log(currentMonthIndex); 

  
  const totalAmountDue = fee * (currentMonthIndex-2 );

  useEffect(() => {
    //setFee(reqApiClass.fee)
    // Recalculate totalAmountRcvd and amountPending whenever any of the input values change
    
    const totalAmountRcvdNew = +april + +may + +june + +july + +august + +september + +october + +november + +december + +january + +feb + +march ;
    const totalAmountDue = fee * (new Date().getMonth() );
    setTotalAmountRcvd(totalAmountRcvdNew);
   
  }, [april, may, june, july, august, september, october, november, december, january, feb, march]);

  var amountPending = totalAmountDue - totalAmountRcvd;
  /////////////////////////////////////////////////////////////////////
  let studentFeeDetails = JSON.stringify({
    "schoolId" : transmitData.schoolId,
    "stuId" : stuId,
    "name" : name,
    "april" : april,
    "may" : may,
    "june" : june,
    "july" : july,
    "august" : august,
    "september" : september,
    "october" : october,
    "november" : november,
    "december" : december,
    "january" : january,
    "feb" : feb,
    "march" : march,
    "totalAmountDue" : totalAmountDue,
    "totalAmountAccepted" : totalAmountRcvd,
    "amountPending" : amountPending,
  });
    
  const handleUpdate = async()=>{
    await axios.put(`http://localhost:4000/schoolApi/updateStudentFee/${transmitData._id}`,studentFeeDetails,{
        headers : {
            "Content-Type" : "application/json"
        }
    }
    )
    .then((res)=>{
        const apiMessage = res.data.message;
        message.success(apiMessage);
        setTakeFeeModal(false);
        fetchStudentsFee();
    })
    .catch((err)=>{
        const apiMessage = err.response.data.message || 'an error occurred';
        message.error(apiMessage);
    })
  }

  return (
    <>
     <div className='fixed top-12 left-42 bg-[#ed6d64] w-[90%]'>
        <p className='text-2xl mt-2 text-center font-Rubik'>Accept Fee </p>
        <div className='flex w-[100%] bg-gradient-to-r from-blue-200 to-green-200 via-[#edb35c] mt-5'>
        <div className='flex flex-col gap-5 ml-2 w-[50%]'>
          {/* <img src={displayingData.imageUrl} className='w-32' alt="missing"></img> */}
        <input type='text' value={stuId}  className='w-[70%] py-1 pl-2  rounded-md  border-2' placeholder='Enter Id*'></input>
        <input type='text' value={name}  className='w-[70%] py-1 pl-2  rounded-md  border-2' placeholder='Enter Name*'></input>
        
        <p><span className='font-semibold'>Base Fee:</span> {fee}</p>
        <p><span className='font-semibold'>Total Amount Due:</span> {totalAmountDue}</p>
        <p><span className='font-semibold'>Amount Accepted:</span> {totalAmountRcvd}</p>
        <p><span className='font-semibold'>Total Pending:</span> {amountPending}</p>
        </div>

        <div className='flex flex-col gap-3 ml-2 w-[50%]'>
        <input type='text' value={april} onChange={(e)=>setApril(e.target.value)} className='w-[70%] py-0 pl-2  rounded-md  border-2' placeholder='April'></input>
        <input type='text' value={may} onChange={(e)=>setMay(e.target.value)} className='w-[70%] py-0 pl-2  rounded-md  border-2' placeholder='May'></input>
        <input type='text' value={june} onChange={(e)=>setJune(e.target.value)} className='w-[70%] py-0 pl-2  rounded-md  border-2' placeholder='June'></input>
        <input type='text' value={july} onChange={(e)=>setJuly(e.target.value)} className='w-[70%] py-0 pl-2  rounded-md  border-2' placeholder='July'></input>
        <input type='text' value={august} onChange={(e)=>setAugust(e.target.value)} className='w-[70%] py-0 pl-2  rounded-md  border-2' placeholder='Aug'></input>
        <input type='text' value={september} onChange={(e)=>setSeptember(e.target.value)} className='w-[70%] py-0 pl-2  rounded-md  border-2' placeholder='Sept'></input>
        <input type='text' value={october} onChange={(e)=>setOctober(e.target.value)} className='w-[70%] py-0 pl-2  rounded-md  border-2' placeholder='October*'></input>
        <input type='text' value={november} onChange={(e)=>setNovember(e.target.value)} className='w-[70%] py-0 pl-2  rounded-md  border-2' placeholder='November'></input>
        <input type='text' value={december} onChange={(e)=>setDecember(e.target.value)} className='w-[70%] py-0 pl-2  rounded-md  border-2' placeholder='December'></input>
        <input type='text' value={january} onChange={(e)=>setJanuary(e.target.value)} className='w-[70%] py-0 pl-2  rounded-md  border-2' placeholder='January'></input>
        <input type='text' value={feb} onChange={(e)=>setFeb(e.target.value)} className='w-[70%] py-0 pl-2  rounded-md  border-2' placeholder='Feb'></input>
        <input type='text' value={march} onChange={(e)=>setMarch(e.target.value)} className='w-[70%] py-0 pl-2  rounded-md  border-2' placeholder='March'></input>
        </div>
        </div>
        
        <div className='flex justify-evenly'>
        {/* <button onClick={()=>handleUpdate()} className='px-2 py-2 bg-green-400 rounded-md'>Update</button> */}
        <BluButton buttonName='Update' onClick={()=>handleUpdate()} />
        <RedButton buttonName='Cancel' onClick={()=>setTakeFeeModal(false)} />
        {/* <button onClick={()=>setShowTakeFeeModal(false)}className='px-2 py-2 bg-green-400 rounded-md'>Cancel</button> */}
        
        
        </div>
    </div>
    </>
  )
}

export default TakeFeeModal