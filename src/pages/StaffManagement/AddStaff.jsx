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
    const [classAssigned,setClassAssigned] = useState("");
    const [salary,setSalary] = useState("");
    const [bankName,setBankName] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [imgURL,setImgURL] = useState("");
    //console.log(imgURL)

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
        "classAssigned" : classAssigned,
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
        <select className='outline-none border border-gray-300 rounded-md px-1 w-[100%] cursor-pointer' value={classAssigned} onChange={(e)=>setClassAssigned(e.target.value)}>
         <option value=''>No Class</option>
         <option value='V'>V</option>
         <option value='VI-A'>VI-A</option>
         <option value='VI-B'>VI-B</option>
          <option value='VII'>VII</option>
          <option value='VIII-A'>VIII-A</option>
          <option value='VIII-B'>VIII-B</option>
          <option value='IX'>IX</option>
          <option value='X'>X</option>
        </select>
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