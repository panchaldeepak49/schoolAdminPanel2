import React,{ useState,useEffect } from 'react';
import { IoMailOutline } from "react-icons/io5";
import { MdOutlineAddHomeWork } from "react-icons/md";
import axios from 'axios';
import { message } from 'antd';
import Search from '../../components/Search';
import debounce from 'lodash.debounce';
import Table2 from './Table2';
import HomeWork from '../../components/Dashcomponents/HomeWork';

const StudentClassWise = () => {

    const [schId,setSchId] = useState('');
    const [student,setStudent] = useState('');
    const [selectedStandard,setSelectedStandard] = useState('X');
    const [apiClass,setApiClass] = useState('');
    // console.log(schId)
    // console.log(student)
    const[isHomeWork,setIsHomeWork] = useState(false);

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
        await axios.get(`http://localhost:4000/schoolApi/allAdmissionWCNS?schoolId=${schId}&&search=${searchQuery ?? ''}&&class=${selectedStandard}`,{
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
    },[schId,selectedStandard])
    /////////////////////////////////////////////////////////////searchfilter and debounce

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
/////////////////////////////////////////////////////////////////////////
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
     //  console.log(result)
     const apiMessage = res.data.message;
     //message.success(apiMessage);
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
/////////////////////////////////////////////////////////////////////applying pagination in frontend only
  const [currentPage,setCurrentPage] = useState(1);

   const recordsPerPage = 8;
   const lastIndex = currentPage * recordsPerPage ;
   const firstIndex = lastIndex - recordsPerPage;
   const student1 = student.slice(firstIndex,lastIndex);
   const nPage = student ? Math.ceil(student.length/recordsPerPage) : 0 ;

  return (
    <>
     <div className='w-[82%] overflow-hidden '>
    <Search searchText={searchText} handleSearch={handleSearch} />
        
        {/* <p className='flex justify-center text-xl mt-4 py-2 bg-green-400'>All Registered Students</p> */}
        <div className='flex justify-between items-center mt-4 py-2 bg-[#1877f2]'>
        <p className='invisible'>All Students</p>  
        
        
        <p className='sm:text-xl text-white'>Class {selectedStandard} Students  </p>
        {/* <select className='outline-none rounded-xl px-1 text-xs sm:text-base bg-blue-200 w-10 sm:w-16 cursor-pointer' value={selectedStandard} onChange={(e)=>setSelectedStandard(e.target.value)}>
         <option value='VI-A'>VI-A</option>
         <option value='VI-B'>VI-B</option>
          <option value='VII'>VII</option>
          <option value='VIII-A'>VIII-A</option>
          <option value='VIII-B'>VIII-B</option>
          <option value='IX'>IX</option>
          <option value='X'>X</option>
        </select> */}
        { apiClass.length > 0 ?
           <select className='w-10 sm:w-16 rounded-md bg-orange-300 outline-none text-xs sm:text-base cursor-pointer' value={selectedStandard} onChange={(e)=>setSelectedStandard(e.target.value)}>
            <option value='' disabled>Choose Class</option>
            {apiClass.map((data,index)=>(
            <option key={index} value={data.class}>{data.class}</option>
            ))}
           </select> 
            : " "
          } 

        <div className='pr-4 flex items-center gap-4'>
        <p className=' font-Rubik text-gray-100'>Total Students : {student.length} </p>
        <MdOutlineAddHomeWork className='text-white text-2xl cursor-pointer' onClick={()=>setIsHomeWork(!isHomeWork)} />
        </div>
        </div>  

         <Table2 student={student1} fetchAllAdmission={fetchAllAdmission} />  

         {nPage > 1 ? ( 
        <div className='fixed bottom-2 md:bottom-8 w-full flex justify-evenly mt-4'>
      
      <button className={`bg-blue-400 px-4 py-2  rounded-xl text-white`} onClick={prePage}>Previous</button>
          
      <button className={`bg-blue-400 px-6 py-2 rounded-xl text-white`} onClick={nextPage} >Next</button>
      <div className='bg-red-200 px-6 py-2 rounded-lg '>Page {currentPage} of {nPage}</div>
      </div>
     ) : null
      } 

        </div>

        { isHomeWork && <HomeWork setIsHomeWork={setIsHomeWork} selectedStandard={selectedStandard} /> }
    </>
  )
  function prePage(){
    if(currentPage !== 1){
      setCurrentPage(currentPage - 1);
    }
  }

  function nextPage(){
    if(currentPage !== nPage){
      setCurrentPage(currentPage + 1);
    }
  }
}

export default StudentClassWise