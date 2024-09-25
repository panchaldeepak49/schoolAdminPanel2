import React,{ useState } from 'react';
import CreateFeeModal from '../../components/Dashcomponents/CreateFeeModal';
import ViewDetailModal from '../../components/Dashcomponents/ViewDetailModal';

const Table2 = ({student,fetchAllAdmission}) => {
    
    const [showViewModal,setShowViewModal] = useState(false);
    const [transmitData, setTransmitData] = useState('');

    const [showCreateFeeModal,setShowCreateFeeModal] = useState(false);
    

    const viewUser = (userData)=>{
      setShowViewModal(true);
      setTransmitData(userData);
    }

    const createFee = (userData)=>{
        setShowCreateFeeModal(true);
        setTransmitData(userData);
      }

  return (
    <>
      <div className="  mt-2 overflow-x-auto max-w-screen-xl mx-auto ">
     <div class="inline-block whitespace-nowrap animation-slide">
        <table>
      <tr className='gap-4 bg-blue-200'>
        <th className='px-4 py-2 sm:min-w-14  border border-gray-400'>Sr</th>
        <th className='sm:min-w-48 text-sm py-2 border border-gray-400  '>Name</th> 
        <th className='px-4 py-2 border border-gray-400 sm:min-w-44 text-sm'>Father Name</th>
        <th className='px-4 py-2 border border-gray-400 sm:min-w-36 text-sm '>Class</th>
        <th className='px-4 py-2 border border-gray-400 sm:min-w-36 text-sm'>Roll No.</th>
        <th className='px-4 py-2 border border-gray-400 sm:min-w-36 text-sm'>Contact</th>
        {/* <th className='px-4 py-2 border border-gray-400 sm:min-w-36 text-sm'>Class Teacher</th> */}
        <th className='px-4 py-2 border border-gray-400 sm:min-w-28 text-sm'>Image</th>
        <th className='px-4 py-2 border border-gray-400 sm:min-w-44 text-sm'>Actions</th> 
      </tr>
     
      { student.length > 0 ? (
      student.map((stuData,index) =>(
        
      <tr className=' mt-10 bg-green-50' key={index}>
        <td className='py-2 border border-gray-400 text-sm text-center'>{index+1}</td>
        <td className='py-2 border border-gray-400 text-sm text-center'>{stuData.name}</td>
        <td className='py-2 border border-gray-400 text-sm text-center'>{stuData.fatherName}</td>
        <td className='py-2 border border-gray-400 text-sm text-center'>{stuData.class}</td>
        <td className='py-2 border border-gray-400 text-sm text-center'>{stuData.rollNo}</td>
        <td className='py-2 border border-gray-400 text-sm text-center'>{stuData.contact}</td>
        
        <td className='py-2 border border-gray-400 text-sm '>
        <img src={stuData.imageUrl} className='ml-5 sm:ml-10 w-5 h-5 bg-green-600 rounded-full'></img>
        </td>
        <td className='py-2 px-4 border-b border-r border-gray-400 text-sm text-center flex gap-4'>
        <p className='ml-0 text-green-600 border-b border-green-600 cursor-pointer' onClick={()=>viewUser(stuData)} >View Detail</p>
          {/* <p className='text-red-600 border-b border-red-600 cursor-pointer'  onClick={()=>editUser(stuData)}
            >Edit Data</p> */}
        <p className='text-red-600 border-b border-red-600 cursor-pointer' onClick={()=>createFee(stuData)}
            >Create Fee</p>    
        </td>
        
      </tr>
       ))
       ) : " " } 

      </table>
      </div>
    </div>

    { showViewModal && <ViewDetailModal transmitData={ transmitData } setShowViewModal={setShowViewModal} />}
    { showCreateFeeModal && <CreateFeeModal transmitData={ transmitData }  setShowCreateFeeModal={setShowCreateFeeModal} 
    fetchAllAdmission={fetchAllAdmission} />}
    </>
  )
}

export default Table2