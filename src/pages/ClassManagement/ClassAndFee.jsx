import React,{ useState,useEffect } from 'react';
import { SiGoogleclassroom } from "react-icons/si";
import axios from 'axios';
import { message } from 'antd';
import AddClass from './AddClass';
import Search from '../../components/Search';
import debounce from 'lodash.debounce';
import EditClass from './EditClass';
import DeleteClass from './DeleteClass';


const ClassAndFee = () => {
    
    const [schId,setSchId] = useState('');
    const [apiClass,setApiClass] = useState('');
    // const {apiClass,setApiClass} = useContext(MyContext);
    const [passData,setPassData] = useState('');
    const [loading,setLoading] = useState(false);

    const[isAddClass,setIsAddClass] = useState(false);
    const[isEditClass,setIsEditClass] = useState(false);
    const[isDeleteClass,setIsDeleteClass] = useState(false);
    const[transmitData,setTransmitData] = useState('');

    useEffect(() => {
        const storedSchId = localStorage.getItem('sch_id');
        if (storedSchId) {
           setSchId(JSON.parse(storedSchId));
        }
      }, []);

   
    const fetchAllClass = async(searchQuery) => {
        if (!schId) {
            // Prevent API call if schId is not set
            return;
          }
          setLoading(true)  
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
           message.success(apiMessage);
           setLoading(false);
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

    ///////////////////////////////////////////////////////search filter and debounce
    const [searchText, setSearchText] = useState('');

    const handleSearch = (e) => {
      setSearchText(e.target.value);
      // fetchData(e.target.value);        before debounce 
      debouncedFetchData(searchText);  
    
    if(e.target.value === ''){
       fetchAllClass();
       window.location.reload();
       // console.log('ho gya');
     }
    };
    const debouncedFetchData = debounce(fetchAllClass, 2000);
    //////////////////////////////////////////////////////////////

    const handleEdit =(value)=>{
        setTransmitData(value);
        setIsEditClass(true);
    }

    const handleDelete =(value)=>{
        setTransmitData(value);
        setIsDeleteClass(true);
    }

  return (
    <>
     <div className='w-[82%] '>
     <Search value={searchText} handleSearch={handleSearch} />
    
     <div className='flex justify-between sm:gap-14  mt-4 py-2 bg-[#1877f2]'>
        <p className='invisible'>pop</p>
        <p className='sm:text-xl font-Rubik text-white'>Our School Class Management (2024-25)</p>
        <div className='mr-8 flex items-center gap-5'>
        <p className='font-xs sm:font-base font-Rubik text-gray-50'>Total Classes : {apiClass.length} </p>
        
        {/* <p className='flex gap-2 font-rubik cursor-pointer' > */}
        {/* <img src={userImg} className='w-4 sm:w-6 rounded-full' alt='missing'></img> */}
        <SiGoogleclassroom className='text-2xl cursor-pointer' onClick={()=>setIsAddClass(!isAddClass)} />
          {/* </p> */}
        
        </div>
    </div> 
     
    <div className="flex justify-center mt-3 overflow-x-auto max-w-screen-xl mx-auto bg-blue-50 ">
     <div class="inline-block whitespace-nowrap animation-slide">
        <table>
      <tr className='gap-4 bg-green-300'>
        <th className='px-2 py-2 sm:min-w-14  border border-gray-400'>Sr</th>
        <th className='sm:min-w-48 text-sm py-2 border border-gray-400  '>Class</th> 
        <th className='px-2 py-2 border border-gray-400 sm:min-w-36 text-sm '>Fee</th>
        <th className='px-2 py-2 border border-gray-400 sm:min-w-44 text-sm'>Actions</th> 
      </tr>
     
      { apiClass.length > 0 ? (
      apiClass.map((value,index) =>(
        
      <tr className=' mt-10' key={index}>
        <td className='py-2 border border-gray-400 text-sm text-center'>{index+1}</td>
        <td className='py-2 border border-gray-400 text-sm text-center'>{value.class}</td>
        <td className='py-2 border border-gray-400 text-sm text-center'>{value.fees}</td>
        <td className='py-2 px-4 border-b border-r border-gray-400 text-sm  flex justify-center gap-4'>
        <p className='ml-0 text-green-600 border-b border-green-600 cursor-pointer' onClick={()=>handleEdit(value)}  >Edit</p>
          <p className='text-red-600 border-b border-red-600 cursor-pointer' onClick={()=>handleDelete(value)}
            >Delete</p>
        {/* <p className='text-red-600 border-b border-red-600 cursor-pointer' onClick={()=>handleMail(value)}
            >Mail</p>     */}
        </td>
        
      </tr>
       ))
       ) : " " } 

      </table>
      </div>
    </div>
    </div>

    { isAddClass && <AddClass setIsAddClass={setIsAddClass} fetchAllClass={fetchAllClass} /> }
    { isEditClass && <EditClass setIsEditClass={setIsEditClass} fetchAllClass={fetchAllClass} transmitData={transmitData} />}
    { isDeleteClass && <DeleteClass setIsDeleteClass={setIsDeleteClass} fetchAllClass={fetchAllClass} transmitData={transmitData} />}
    </>
  )
}

export default ClassAndFee