import React,{ useState,useEffect } from 'react';
import axios from 'axios';
import { message } from 'antd';
import BluButton from '../Global/BluButton';
import RedButton from '../Global/RedButton';

const CreateFeeModal = ({transmitData,setShowCreateFeeModal,fetchAllAdmission}) => {

    const[stuId,setstuId] = useState(transmitData._id);
  const[name,setName] = useState(transmitData.name);
  const[gclass,setGclass] = useState(transmitData.class);
  
//   const[image,setImage] = useState(displayingData.imageUrl);
  const [schId,setSchId] = useState('');
  var [april, setApril] = useState('');
  var[may,setMay] = useState('');
  var[june,setJune] = useState('');
  var[july,setJuly] = useState('');
  var[august,setAugust] = useState('');
  var[september,setSeptember] = useState('');
  var[october,setOctober] = useState('');
  var[november,setNovember] = useState('');
  var[december,setDecember] = useState('');
  var[january,setJanuary] = useState('');
  var[feb,setFeb] = useState('');
  var[march,setMarch] = useState('');
  var[totalAmountRcvd, setTotalAmountRcvd] = useState('');

  useEffect(() => {
    setstuId(stuId);
    setName(name);
    // setImage(image);
    // Set other state variables here...
  }, [transmitData]);

  const currentDate = new Date();
  const monthNames = [
    "January", "February", "March","April", "May", "June","July", "August", "September", "October",
     "November", "December",];
  const currentMonthIndex = currentDate.getMonth();
  const currentMonthName = monthNames[currentMonthIndex];
  //console.log(currentMonthName); 

  const totalAmountDue = '';
  
  var amountPending = totalAmountDue - totalAmountRcvd;

  useEffect(() => {
    const storedSchId = localStorage.getItem('sch_id');
    if (storedSchId) {
       setSchId(JSON.parse(storedSchId));
    }
  }, []);

  let studentFeeDetails = JSON.stringify({
    "schoolId" : schId,
    "stuId" : stuId,
    "name" : name,
    "class" : gclass,
    // "imageUrl" :image,
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

  const handleSubmit = async()=>{
    await axios.post('http://localhost:4000/schoolApi/postStudentFee',studentFeeDetails,{
        headers : {
            "Content-Type" : "application/json"
        }
    }
    )
    .then((res)=>{
        const apiMessage = res.data.message;
        message.success(apiMessage);
        setShowCreateFeeModal(false);
    })
    .catch((err)=>{
        const apiMessage = err.response.data.message || 'an error occurred';
        message.error(apiMessage);
    })
  }

  return (
    <>
      <div className='fixed top-12 left-42 bg-gray-200 w-[90%] z-50'>
        <p className='mt-2 text-2xl text-center font-Rubik'>Create Fee Modal </p>
        <div className='flex w-[100%] bg-red-400 mt-5'>
        <div className='flex flex-col gap-5 ml-2 w-[50%]'>
            {/* <img src={image} className='w-32 rounded-md' alt="missing" ></img> */}
        <input type='text' value={stuId}  className='w-[70%] py-1 pl-2  rounded-md  border-2' placeholder='Enter Id*'></input>
        <input type='text' value={name}  className='w-[70%] py-1 pl-2  rounded-md  border-2' placeholder='Enter Name*'></input>
        
        <p><span className='font-semibold'>Standard:</span> {gclass}</p>
        <p className='flex gap-2'><span className='font-semibold '>Base Fee:</span></p>
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
        

        <BluButton buttonName='Create' onClick={()=>handleSubmit()} />
        <RedButton buttonName='Cancel' onClick={()=>setShowCreateFeeModal(false)} />
        
        </div>
    </div>
    </>
  )
}

export default CreateFeeModal