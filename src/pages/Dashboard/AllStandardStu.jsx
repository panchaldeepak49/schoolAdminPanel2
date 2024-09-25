import React,{ useState,useEffect } from 'react';
import { IoMailOutline } from "react-icons/io5";
import Table1 from './Table1';
import { userRequest } from '../../components/RequestMethod';
import axios from 'axios';
import { message } from 'antd';
import Search from '../../components/Search';
import debounce from 'lodash.debounce';

const AllStandardStu = () => {

    const [schId,setSchId] = useState('');
    const [student,setStudent] = useState('');
    // console.log(schId)
    // console.log(student)

    useEffect(() => {
        const storedSchId = localStorage.getItem('sch_id');
        if (storedSchId) {
           setSchId(JSON.parse(storedSchId));
        }
      }, []);

   
    const fetchAllAdmission = async(searchQuery) => {
        if (!schId) {
            // Prevent API call if schId is not set
            return;
          }
        await axios.get(`http://localhost:4000/schoolApi/allAdmission?schoolId=${schId}&&search=${searchQuery ?? ''}&&class=`,{
            headers : {
                "Content-Type" : "application/json"
            }
        })
        .then((res)=>{
           const result = res.data?.allAdmission;
           setStudent(result);
            // console.log(result)
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
        fetchAllAdmission();
        }
    },[schId])
 ///////////////////////////////////////////////////////////searchfilter and debounce

    const [searchText, setSearchText] = useState('');

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    // fetchData(e.target.value);        before debounce 
    debouncedFetchData(searchText);  
  
  if(e.target.value === ''){
     fetchAllAdmission();
     window.location.reload();
     // console.log('ho gya')
   }
  };
  const debouncedFetchData = debounce(fetchAllAdmission, 2000);

  return (
    <>
    <div className='w-[82%] overflow-hidden '>
    <Search searchText={searchText} handleSearch={handleSearch} />
        
        {/* <p className='flex justify-center text-xl mt-4 py-2 bg-green-400'>All Registered Students</p> */}
        <div className='flex justify-between items-center mt-4 py-2 bg-[#1877f2]'>
        <p className='invisible'>All Students</p>  
        {/* <img src={Aero} alt="Convent School" className='ml-4  w-10 ' /> */}
        <p className='text-xl font-Rubik text-white'>All Registered Students</p>
        <div className='pr-4 flex items-center gap-2'>
        <p className=' font-Rubik text-gray-100'>Total Students : {student.length} </p>
        <IoMailOutline className='text-xl'/>
        </div>
        </div>  

         <Table1 student={student} fetchAllAdmission={fetchAllAdmission} />  

        </div>
    </>
  )
}

export default AllStandardStu