import React,{ useState,useEffect } from 'react';
import InputField from '../../components/Global/InputField';
import MyButton from '../../components/Global/MyButton';
import axios from 'axios';
import { message } from 'antd';


const AddStaff = ({setIsAddStaff,fetchAllStaff}) => {

    const [schId,setSchId] = useState("")
    const [name,setName] = useState("");
    const [doj,setDoj] = useState("");
    const [gender,setGender] = useState("");
    const [email,setEmail] = useState("");
    const [contact,setContact] = useState("");
    const [address,setAddress] = useState("");
    const [designation,setDesignation] = useState("");
    // const [classAssigned,setClassAssigned] = useState("");
    const [selectClass,setSelectClass] = useState("");
    const [salary,setSalary] = useState("");
    const [bankName,setBankName] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [imgURL,setImgURL] = useState("");
    //console.log(imgURL)
    const [apiClass,setApiClass] = useState("");

    useEffect(() => {
        const storedSchId = localStorage.getItem('sch_id');
        if (storedSchId) {
           setSchId(JSON.parse(storedSchId));
        }
      }, []);

    const staffData = JSON.stringify({
        "schoolId" : schId,
        "name" : name,
        "doj" : doj,
        "gender" : gender,
        "email" : email,
        "contact" : contact,
        "address" : address,
        "designation" : designation,
        "classAssigned" : selectClass,
        "salary" : salary,
        "bankName" : bankName,
        "imageUrl" : imgURL,
    })

    const saveStaff = async()=>{
        if(!schId){
            return 
        }
        await axios.post(`http://localhost:4000/schoolApi/postStaff?schoolId=${schId}`,staffData,{
            headers : {
                "Content-Type" : "application/json"
            }
        })
        .then((res)=>{
            const apiMessage = res.data.message;
            message.success(apiMessage);
            setIsAddStaff(false);
            fetchAllStaff();
        })
        .catch((err)=>{
            const apiMessage = err.response.data.message || 'an error occurred';
            message.error(apiMessage)
        })
      }
    //////////////////////////////////////////////////////////////////////////////////////////
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
            // console.log(result)
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
     <div className='fixed top-10 left-[25%] w-[60%] border-2 border-green-400 rounded-md bg-white'>
        <p className=' pl-4 py-1 bg-green-400 font-semibold'>
            Add Staff
        </p>
        
        {/* <UploadImgFile imgURL={imgURL} setImgURL={setImgURL} /> */}
        <div className='mt-4 px-4 grid grid-cols-2 gap-4'>
        <InputField type='text' placeholder='Name' value={name}  onChange={(e)=>setName(e.target.value)} />
        <InputField type='text' placeholder='DOJ' value={doj}  onChange={(e)=>setDoj(e.target.value)} />
        <InputField type='text' placeholder='Gender' value={gender}  onChange={(e)=>setGender(e.target.value)} />
        <InputField type='text' placeholder='E-mail' value={email}  onChange={(e)=>setEmail(e.target.value)} />
        <InputField type='text' placeholder='Contact Info' value={contact}  onChange={(e)=>setContact(e.target.value)} />
        <InputField type='text' placeholder='Address' value={address}  onChange={(e)=>setAddress(e.target.value)}/>
        <InputField type='text' placeholder='Designation' value={designation}  onChange={(e)=>setDesignation(e.target.value)}/>
        {/* <InputField type='text' placeholder='Class Allot' value={classAssigned}  onChange={(e)=>setClassAssigned(e.target.value)}/> */}
        {/* <select className='outline-none border border-gray-300 rounded-md px-1 w-[100%] cursor-pointer' value={classAssigned} onChange={(e)=>setClassAssigned(e.target.value)}>
         <option value=''>No Class</option>
         <option value='V'>V</option>
         <option value='VI-A'>VI-A</option>
         <option value='VI-B'>VI-B</option>
          <option value='VII'>VII</option>
          <option value='VIII-A'>VIII-A</option>
          <option value='VIII-B'>VIII-B</option>
          <option value='IX'>IX</option>
          <option value='X'>X</option>
        </select> */}

        { apiClass.length > 0 ?
           <select className='w-[100%] h-8 border border-gray-300 outline-none pl-2 rounded-md' value={selectClass} onChange={(e)=>setSelectClass(e.target.value)}>
            <option value='' disabled>Choose Class</option>
            {apiClass.map((data,index)=>(
            <option key={index} value={data.class}>{data.class}</option>
            ))}
           </select> 
            : " "
          } 
        <InputField type='text' placeholder='Salary' value={salary}  onChange={(e)=>setSalary(e.target.value)}/>
        <InputField type='text' placeholder='Bank Name' value={bankName}  onChange={(e)=>setBankName(e.target.value)}/>
        </div>

        <div className='mt-4 flex justify-end gap-4 pr-4 pb-4'>
           <MyButton buttonName='Save' color='green-600' onClick={saveStaff} />
            <MyButton buttonName='Cancel' color='red-600' onClick={()=>setIsAddStaff(false)} />
        </div>
    </div>
    </>
  )
}

export default AddStaff