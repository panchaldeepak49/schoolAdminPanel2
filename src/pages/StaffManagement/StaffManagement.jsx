import { useState,useEffect } from "react";
import { IoMailOutline } from "react-icons/io5";
import axios from 'axios';
import { message } from "antd";
import { BallTriangle, Bars, TailSpin, ThreeCircles } from 'react-loader-spinner';
import AddStaff from "./AddStaff";
import userImg from '/Images/user.png';
import debounce from "lodash.debounce";
import Search from "../../components/Search";
import EditStaff from "./EditStaff";
import RemoveStaff from "./RemoveStaff";
import SendMailBox from "./SendMailBox";


const StaffManagement = () => {
    
    const[schId,setSchId] = useState('');
    const[loading,setLoading] = useState(false);
    const [user,setUser] = useState("");
    const [isAddStaff,setIsAddStaff] = useState(false);
    const [isEditStaff,setIsEditStaff] = useState(false);
    const [isRemoveStaff,setIsRemoveStaff] = useState(false);
    const [isSendMail,setIsSendMail] = useState(false);
    const [staffData,setStaffData] = useState("");
    const [isSendMailBox,setIsSendMailBox] = useState(false);
    const [transmitData,setTransmitData] = useState('');

    const handleMailBox=()=>{
        setIsSendMailBox(!isSendMailBox)
      } 

      useEffect(() => {
        const storedSchId = localStorage.getItem('sch_id');
        if (storedSchId) {
           setSchId(JSON.parse(storedSchId));
        }
      }, []);

   
    const fetchAllStaff = async(searchQuery) => {
        if (!schId) {
            // Prevent API call if schId is not set
            return;
          }
          setLoading(true)  
        await axios.get(`http://localhost:4000/schoolApi/getAllStaffWSearch?schoolId=${schId}&&search=${searchQuery ?? " "}`,{
            headers : {
                "Content-Type" : "application/json"
            }
        })
        .then((res)=>{
           const result = res.data?.allStaff;
           setUser(result);
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
          fetchAllStaff();
        }
    },[schId])

  
     ////////////////////////////////////////////////////////////////search filter and debounce 
   const [searchText, setSearchText] = useState('');

   const handleSearch = (e) => {
   setSearchText(e.target.value);
   // fetchData(e.target.value);        before debounce 
   debouncedFetchData(searchText);  
   
   if(e.target.value === ''){
    fetchAllStaff();
     //window.location.reload();
     // console.log('ho gya')
    }
   };
   const debouncedFetchData = debounce(fetchAllStaff, 2000);
  /////////////////////////////////////////////////////////////////////////
   const handleEdit=(value)=>{
      setIsEditStaff(true);
      setTransmitData(value);
   }

   const handleDelete=(value)=>{
    setIsRemoveStaff(true);
    setTransmitData(value);
 }
 /////////////////////////////////////////////////////////////////////applying pagination in frontend only
 const [currentPage,setCurrentPage] = useState(1);

 const recordsPerPage = 8;
 const lastIndex = currentPage * recordsPerPage ;
 const firstIndex = lastIndex - recordsPerPage;
 const user1 = user.slice(firstIndex,lastIndex);
 const nPage = user ? Math.ceil(user.length/recordsPerPage) : 0 ;


  return (
    <>
      <div className='w-[82%] '>
     <Search  value={searchText} handleSearch={handleSearch} />

     <div className='flex justify-between sm:gap-14  mt-4 py-2 bg-[#1877f2]'>
        <p className='invisible'>pop</p>
        <p className='sm:text-xl font-Rubik text-white '>Our School Staff Info (2024-25)</p>
        <div className='mr-8 flex items-center gap-5'>
        {/* <p className='font-xs sm:font-base font-Rubik text-gray-50'>Total Staff : {user.length} </p> */}
        
        <p className='flex gap-2 font-rubik cursor-pointer' onClick={()=>setIsAddStaff(!isAddStaff)}>
        <img src={userImg} className='w-4 sm:w-6 rounded-full' alt='missing'></img>
          +</p>
        <p className='font-semibold cursor-pointer flex items-center sm:text-2xl' onClick={()=>setIsSendMailBox(!isSendMailBox)}><IoMailOutline /></p>  
        </div>
    </div> 

    { loading ? <div className='relative top-[30%] left-[40%] '><Bars className=''  /></div>  :  

    <div className="mt-3 overflow-x-auto max-w-screen-xl mx-auto bg-blue-50 ">
     <div class="inline-block whitespace-nowrap animation-slide">
        <table>
      <tr className='gap-4 bg-green-300'>
        <th className='px-2 py-2 sm:min-w-14  border border-gray-400'>Sr</th>
        <th className='sm:min-w-48 text-sm py-2 border border-gray-400  '>Name</th> 
        <th className='px-2 py-2 border border-gray-400 sm:min-w-36 text-sm '>Class Allot.</th>
        <th className='px-2 py-2 border border-gray-400 sm:min-w-36 text-sm '>DOJ</th>
        <th className='px-2 py-2 border border-gray-400 sm:min-w-52 text-sm'>E-mail</th>
        <th className='px-2 py-2 border border-gray-400 sm:min-w-28 text-sm'>Designation</th>
        <th className='px-2 py-2 border border-gray-400 sm:min-w-28 text-sm'>Mobile No.</th>
        <th className='px-2 py-2 border border-gray-400 sm:min-w-28 text-sm '>Salary</th>
        <th className='px-2 py-2 border border-gray-400 sm:min-w-28 text-sm'>Bank</th>
        <th className='px-2 py-2 border border-gray-400 sm:min-w-28 text-sm'>Image</th>
        <th className='px-2 py-2 border border-gray-400 sm:min-w-44 text-sm'>Actions</th> 
      </tr>
     
      { user1.length > 0 ? (
      user1.map((value,index) =>(
        
      <tr className=' mt-10' key={index}>
        <td className='py-2 border border-gray-400 text-sm text-center'>{index+1}</td>
        <td className='py-2 border border-gray-400 text-sm text-center'>{value.name}</td>
        <td className='py-2 border border-gray-400 text-sm text-center'>{value.classAssigned}</td>
        <td className='py-2 border border-gray-400 text-sm text-center'>{value.doj}</td>
        <td className='py-2 border border-gray-400 text-sm text-center'>{value.email}</td>
        <td className='py-2 border border-gray-400 text-sm text-center'>{value.designation}</td>
        <td className='py-2 border border-gray-400 text-sm text-center'>{value.contact}</td>
        <td className='py-2 border border-gray-400 text-sm text-center'>{value.salary}</td>
        <td className='py-2 border border-gray-400 text-sm text-center'>{value.bankName}</td>
        <td className='py-2 border border-gray-400 text-sm text-center'>
        {/* <img src={value.imageUrl} className='ml-5 sm:ml-10 w-5 h-5 bg-green-600 rounded-full'></img> */}
        </td>
        <td className='py-2 px-4 border border-gray-400 text-sm text-center flex gap-4'>
        <p className='ml-0 text-green-600 border-b border-green-600 cursor-pointer' onClick={()=>handleEdit(value)} >Edit</p>
          <p className='text-red-600 border-b border-red-600 cursor-pointer' onClick={()=>handleDelete(value)}
            >Delete</p>
        <p className='text-red-600 border-b border-red-600 cursor-pointer' onClick={()=>handleMail(value)}
            >Mail</p>    
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
      
      <button className={`bg-[#1877f2] hover:bg-violet-600 px-4 py-2  rounded-xl text-white`} onClick={prePage}>Previous</button>
          
      <button className={`bg-[#1877f2] hover:bg-violet-600 px-6 py-2 rounded-xl text-white`} onClick={nextPage} >Next</button>
      <div className='bg-red-200 px-6 py-2 rounded-lg '>Page {currentPage} of {nPage}</div>
      </div>
     ) : null
      } 

    </div>

    { isAddStaff && <AddStaff setIsAddStaff={setIsAddStaff} fetchAllStaff={fetchAllStaff} /> }
    { isEditStaff && <EditStaff setIsEditStaff={setIsEditStaff} transmitData={transmitData} fetchAllStaff={fetchAllStaff} /> }
    { isRemoveStaff && <RemoveStaff setIsRemoveStaff={setIsRemoveStaff} transmitData={transmitData} fetchAllStaff={fetchAllStaff} />}
    { isSendMailBox && <SendMailBox setIsSendMailBox={setIsSendMailBox} /> }
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

export default StaffManagement