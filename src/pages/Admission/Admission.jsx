import React,{ useState,useEffect,useContext } from 'react';
import Tot1 from '../../assets/Images/stu1.jpg';
import { userRequest } from '../../components/RequestMethod';
import axios from 'axios';
import { message } from 'antd';

const Admission = () => {


    const[schId,setSchId] = useState('');
    const[name,setName] = useState('');
    const[fatherName,setFatherName] = useState('');
    const [selectClass, setSelectClass] = useState('');
    const [apiClass,setApiClass] = useState('');
    const[rollNo,setRollNo] = useState('');
    const[address,setAddress] = useState('');
    const[admissionDate,setAdmissionDate] = useState('');
    const[gender,setGender] = useState('');
    const[contact,setContact] = useState('');
    //console.log(selectClass);
    const[imgURL,setImgURL] = useState('');

    useEffect(() => {
        const storedSchId = localStorage.getItem('sch_id');
        if (storedSchId) {
           setSchId(JSON.parse(storedSchId));
        }
      }, []);
     
      let student = JSON.stringify({
        "schoolId" : schId,
        "name" : name,
        "fatherName" : fatherName,
        "class" : selectClass,
        "rollNo" : rollNo,
        "address" : address,
        "admissionDate" : admissionDate,
        "gender" : gender,
        "contact" : contact,
        //"imageUrl" : imgURL,
      });

      const handleSubmit = async()=>{
        await axios.post('http://localhost:4000/schoolApi/admission',student,{
            headers : {
                "Content-Type" : "application/json"
            }
        }
        )
        .then((res)=>{
            const apiMessage = res.data.message;
            message.success(apiMessage);

        })
        .catch((err)=>{
            const apiMessage = err.response.data.message || 'an error occurred';
            message.error(apiMessage)
        })
      }
      ///////////////////////////////////////////////////////////////////////
      const fetchAllClass = async(searchQuery) => {
        if (!schId) {
            // Prevent API call if schId is not set
            return;
          }
           
        await axios.get(`http://localhost:4000/schoolApi/getAllClasses?schoolId=${schId}&&search=${searchQuery ?? " "}`,{
            headers : {
                "Content-Type" : "application/json"
            }
        })
        .then((res)=>{
           const result = res.data?.allClasses;
           setApiClass(result);
            console.log(result)
           const apiMessage = res.data.message;
           message.success(apiMessage);
          
        })
        .catch((err)=>{
            const apiMessage = err.response?.data?.message || 'an error occurred';
            message.error(apiMessage)
        })
    }

    useEffect(()=>{
        if(schId){
          fetchAllClass();
        }
    },[schId])
    
     

  return (
    <>
    <div className='w-[82%] '>
        
        <p className='flex justify-center font-Grey_Qo text-5xl text-white mt-0 py-2 bg-gradient-to-r from-violet-600 to-violet-400 via-blue-500 '>Take Admission (2024-25)</p>
        
        
        <div className='flex w-[100%] bg-gradient-to-r  from-[#f0e1b6] to-[#d7ebc7] via-[#e5f0d1] py-4 px-4'>
        {/* <div className='flex w-[100%] bg-gradient-to-r  from-violet-600 to-violet-400 via-blue-500 py-4 px-4'> */}
        <div className='flex flex-col gap-4 w-[50%]  mt-0 ml-0 '>
        {/* <UploadImgFile imgURL={imgURL} setImgURL={setImgURL} /> */}
        <p className='w-44 h-20 border-2 border-red-400' >Stu</p>
       
        <input type='text' value={name} onChange={(e)=>setName(e.target.value)} className='w-[70%] py-1 pl-2  rounded-md  border-2' placeholder='Enter Name*'></input>
        <input type='text' value={fatherName} onChange={(e)=>setFatherName(e.target.value)} className='w-[70%] py-1 pl-2  rounded-md border-2' placeholder='Father Name*'></input>
       
        {/* <select
                value={selectClass}
                onChange={(e)=>setSelectClass(e.target.value)}
                className='w-[70%] h-10 py-0 pl-0  rounded-md border-2 text-md'
                placeholder={'class'}>
                <option value='' className='text-black' >Choose a class</option>
                <option value={'VI-A'}>VI-A</option>
                <option value={'VI-B'}>VI-B</option>
                <option value={'VII'}>VII</option>
                 <option value={'VIII-A'}>VIII-A</option>
                 <option value={'VIII-B'}>VIII-B</option>
                 <option value={'IX'}>IX</option>
                 <option value={'X'}>X</option>
            </select> */}

          { apiClass.length > 0 ?
           <select className='w-[70%] h-8 outline-none pl-2 rounded-md' value={selectClass} onChange={(e)=>setSelectClass(e.target.value)}>
            <option value='' disabled>Choose Class</option>
            {apiClass.map((data,index)=>(
            <option key={index} value={data.class}>{data.class}</option>
            ))}
           </select> 
            : " "
          }   

        <input type='number' value={rollNo} onChange={(e)=>setRollNo(e.target.value)} className='w-[70%] py-1 pl-2  rounded-md border-2' placeholder='Roll No*'></input>
        <input type='text' value={address} onChange={(e)=>setAddress(e.target.value)} className='w-[70%] py-1 pl-2  rounded-md border-2' placeholder='Address*'></input>
        </div>
        
        
        <div className='flex flex-col gap-4 w-[50%]  mt-4 ml-2 '>
        <img src={Tot1} className=' ml-10 w-[35%] rounded-md' />
        <input type='date' value={admissionDate} onChange={(e)=>setAdmissionDate(e.target.value)} className='w-[70%] mt-6 py-1 pl-2 rounded-md border-2 cursor-pointer' placeholder='Date of Admission*'></input>
       
        <select className='outline-none rounded-md px-1 py-1 w-[70%] cursor-pointer' value={gender} onChange={(e)=>setGender(e.target.value)}>
        <option value='' disabled >Select Gender</option>
         <option value='boy'>Boy</option>
         <option value='girl'>Girl</option>
        </select>
        <input type='number' value={contact} onChange={(e)=>setContact(e.target.value)} className='w-[70%] py-1 pl-2 rounded-md border-2' placeholder='Contact*'></input>
        <button className=' w-[25%] py-2 bg-blue-600 text-white rounded-md' onClick={()=>handleSubmit()}>Submit</button>
        </div>
        </div>


        </div>
    </>
  )
}

export default Admission