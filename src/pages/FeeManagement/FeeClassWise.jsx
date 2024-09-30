import React,{ useState,useEffect } from 'react';
import Search from '../../components/Search';
import { BsCollection } from "react-icons/bs";
import axios from 'axios';
import { message } from 'antd';
import { BallTriangle, Bars, TailSpin, ThreeCircles } from 'react-loader-spinner';
import debounce from 'lodash.debounce';
import TakeFeeModal from '../../components/FeeModals/TakeFeeModal';
import FeeDetailModal from '../../components/FeeModals/FeeDetailModal';
import DeleteFeeModal from '../../components/FeeModals/DeleteFeeModal';
import FeeCollectClassWise from './FeeCollectClassWise';
import FeeColllectionWhole from './FeeColllectionWhole';


const FeeClassWise = () => {

      const[schId,setSchId] = useState('');
      const[studentFee,setStudentFee] = useState('');
      const[selectedStandard,setSelectedStandard] = useState('X');
      const [apiClass,setApiClass] = useState('');
      const[loading,setLoading] = useState(false);
      //console.log(studentFee)
      const[takeFeeModal,setTakeFeeModal] = useState(false);
      const[viewFeeModal,setViewFeeModal] = useState(false);
      const[deleteFeeModal,setDeleteFeeModal] = useState(false);
      const[transmitData,setTransmitData] = useState('');
      const[isFeeCollect,setIsFeeCollect] = useState(false);


    useEffect(() => {
        const storedSchId = localStorage.getItem('sch_id');
        if (storedSchId) {
           setSchId(JSON.parse(storedSchId));
        }
      }, []);

   
    const fetchStudentsFee = async(searchQuery) => {
        if (!schId) {
            // Prevent API call if schId is not set
            return;
          }
          setLoading(true)  
        await axios.get(`http://localhost:4000/schoolApi/getStudentsFeeWithSearh?schoolId=${schId}&&search=${searchQuery ?? ''}&&class=${selectedStandard}`,{
            headers : {
                "Content-Type" : "application/json"
            }
        })
        .then((res)=>{
           const result = res.data?.allStudentsFee;
           setStudentFee(result);
            // console.log(result)
           const apiMessage = res.data.message;
           //message.success(apiMessage);
           setLoading(false);
        })
        .catch((err)=>{
            const apiMessage = err.response?.data?.message || 'an error occurred';
            message.error(apiMessage)
        })
    }

    useEffect(()=>{
        if(schId){
        fetchStudentsFee();
        }
    },[schId,selectedStandard])
    ////////////////////////////////////////////////////////searchfilter and debounce
    const [searchText, setSearchText] = useState('');

    const handleSearch = (e) => {
    setSearchText(e.target.value);
    // fetchData(e.target.value);        before debounce 
    debouncedFetchData(searchText);  
    
    if(e.target.value === ''){
      fetchStudentsFee();
      window.location.reload();
      // console.log('ho gya')
     }
    };
    const debouncedFetchData = debounce(fetchStudentsFee, 2000);
    //////////////////////////////////////////////////////////////////////
    const takeFee =(userData)=>{
        setTakeFeeModal(!takeFeeModal);
        setTransmitData(userData);
    }

    const viewFeeDetail =(userData)=>{
      setViewFeeModal(!viewFeeModal);
      setTransmitData(userData);
    }

  const viewDeleteFee =(userData)=>{
    setDeleteFeeModal(!deleteFeeModal);
    setTransmitData(userData);
   }
    ///////////////////////////////////////////////////////////////
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
  const studentFee1 = studentFee.slice(firstIndex,lastIndex);
  const nPage = studentFee ? Math.ceil(studentFee.length/recordsPerPage) : 0 ;


  return (
    <>
    <div className='w-[82%] overflow-hidden'>
        <Search searchText={searchText} handleSearch={handleSearch} />
        
        
        <div className='flex justify-between md:gap-10  mt-4 py-2 bg-[#1877f2]'>
          <p className='invisible'>Dummy</p>
        <p className='flex items-center gap-2 text:sm md:text-xl font-Rubik text-white'>Class {selectedStandard} 
          <span className='hidden md:block'>Students  </span>
          <span className='ml-1 md:ml-0'>Fee Info (2024-25)</span> </p>
        {/* <select className='outline-none rounded-xl px-1 bg-blue-200 w-12 sm:w-14' value={selectedStandard} onChange={(e)=>setSelectedStandard(e.target.value)}>
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
         <div className='sm:mr-4 flex items-center sm:gap-4'>
        <p className='flex  text-xs sm:text-base font-Rubik text-gray-100'><span className='md:hidden'>T Stu : </span>
        <span className='hidden md:block'>Total Students :</span>
         {studentFee.length}</p>
        <p className='text-xs sm:text-base font-Rubik text-gray-100' onClick={''}>Collection </p>
        <BsCollection className='text-white cursor-pointer' onClick={()=>setIsFeeCollect(!isFeeCollect)}/>
        </div>
        </div> 

        { loading ? <div className='relative top-[30%] left-[40%] '><Bars className=''  /></div>  :  
        
      <div className="mt-3 ml-1 overflow-x-auto max-w-screen-xl mx-auto ">
     <div className="inline-block whitespace-nowrap animation-slide bg-blue-50">
        <table>
      <tr className='gap-4 bg-green-300'>
        <th className='px-2 py-2 sm:min-w-20  border border-gray-400 font-medium'>Sr</th>
        <th className='sm:min-w-44 text-sm px-2 py-2  border border-gray-400 font-medium  '>Name</th> 
        <th className='sm:min-w-44 text-sm px-2 py-2 border border-gray-400 font-medium  '>Class</th> 
        <th className='px-2 py-2 border border-gray-400 sm:min-w-44 text-sm font-medium '>Total Amount Due</th>
        <th className='px-2 py-2 border border-gray-400 sm:min-w-44 text-sm font-medium'>Amount Rcvd</th>
        <th className='px-2 py-2 border border-gray-400 sm:min-w-44 text-sm font-medium'>Amount Pending</th>
        <th className='px-2 py-2 border border-gray-400 sm:min-w-44 text-sm font-medium'>Actions</th> 
      </tr>
     
      { studentFee1.length > 0 ? (
      studentFee1.map((userData,index) =>(
        
      <tr className=' mt-10' key={index} >
        <td className='py-2 border border-gray-400 text-sm text-center w-10'>{index+1}</td>
        <td className='py-2 border border-gray-400 text-sm text-center'>{userData.name}</td>
        <td className='py-2 border border-gray-400 text-sm text-center'>{userData.class}</td>
        <td className='py-2 border border-gray-400 text-sm text-center'>{userData.totalAmountDue}</td>
        <td className='py-2 border border-gray-400 text-sm text-center'>{userData.totalAmountAccepted}</td>
        <td className='py-2 border border-gray-400 text-sm text-center'>{userData.amountPending}</td>
        <td className='py-2 px-2 border border-gray-400 text-sm text-center min-w-56 flex gap-4'>
        <p className=' text-green-600 border-b border-green-600 cursor-pointer' onClick={()=>viewFeeDetail(userData)}>View Detail</p>
          <p className='text-green-600 border-b border-green-600 cursor-pointer' 
            onClick={()=>takeFee(userData)}>TakeFee</p>
          <p className='text-red-600 border-b border-red-600 cursor-pointer' 
            onClick={()=>viewDeleteFee(userData)}>Delete</p>
        </td>
      </tr>
       ))
      ) : " " } 

      </table>
      </div>
    </div>
    }

    {nPage > 1 ? ( 
        <div className='fixed bottom-2 md:bottom-8 w-full flex justify-evenly mt-4'>
      
      <button className={`bg-blue-400 px-4 py-2  rounded-xl text-white`} onClick={prePage}>Previous</button>
          
      <button className={`bg-blue-400 px-6 py-2 rounded-xl text-white`} onClick={nextPage} >Next</button>
      <div className='bg-red-200 px-6 py-2 rounded-lg '>Page {currentPage} of {nPage}</div>
      </div>
     ) : null
      } 
     </div> 

     { takeFeeModal && <TakeFeeModal transmitData={transmitData} setTakeFeeModal={setTakeFeeModal} fetchStudentsFee={fetchStudentsFee} /> }
     { viewFeeModal && <FeeDetailModal transmitData={transmitData} setViewFeeModal={setViewFeeModal} fetchStudentsFee={fetchStudentsFee} /> }
     { deleteFeeModal && <DeleteFeeModal transmitData={transmitData} setDeleteFeeModal={setDeleteFeeModal} fetchStudentsFee={fetchStudentsFee} /> }
     {/* { isFeeCollect && <FeeCollectClassWise setIsFeeCollect={setIsFeeCollect} selectedStandard={selectedStandard} /> } */}
     { isFeeCollect && <FeeColllectionWhole setIsFeeCollect={setIsFeeCollect}  /> }
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

export default FeeClassWise