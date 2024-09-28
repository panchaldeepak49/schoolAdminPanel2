import React from 'react'

const FeeDetailModal = ({transmitData,setViewFeeModal,}) => {

    //console.log(transmitData)
  return (
    <>
      <div className='fixed top-2 md:top-10 left-[40%] md:w-[25%] px-4 py-2 md:py-4 bg-blue-200 rounded-xl border border-green-500'>
      {/* <img src={feeData.imageUrl} className='w-16 md:w-32 rounded-md' alt='missing'></img> */}
      <p className='mt-1 md:mt-2 text-sm md:text-base font-medium'>Name : <span className='font-Playwrite'>{transmitData.name}</span></p>
      <div className='grid grid-cols-2 gap-1 md:mt-4'>
      
      <p className='text-sm md:text-base md:font-medium'>Apr  :<span>{transmitData.april}</span> </p>
      <p className='text-sm md:text-base md:font-medium'>May : <span className='font-normal'>{transmitData.may}</span></p>
      <p className='text-sm md:text-base md:font-medium'>June : <span className='font-normal'>{transmitData.june}</span></p>
      <p className='text-sm md:text-base md:font-medium'>July : <span className='font-normal'>{transmitData.july}</span></p>
      <p className='text-sm md:text-base md:font-medium'>Aug : <span className='font-normal'>{transmitData.august}</span></p>
      <p className='text-sm md:text-base md:font-medium'>Sept : <span className='font-normal'>{transmitData.september}</span></p>
      <p className='text-sm md:text-base md:font-medium'>Oct : <span className='font-normal'>{transmitData.october}</span></p>
      <p className='text-sm md:text-base md:font-medium'>Nov : <span className='font-normal'>{transmitData.november}</span></p>
      <p className='text-sm md:text-base md:font-medium'>Dec : <span className='font-normal'>{transmitData.december}</span></p>
      <p className='text-sm md:text-base md:font-medium'>Jan : <span className='font-normal'>{transmitData.january}</span></p>
      <p className='text-sm md:text-base md:font-medium'>Feb : <span className='font-normal'>{transmitData.feb}</span></p>
      <p className='text-sm md:text-base md:font-medium'>March : <span className='font-normal'>{transmitData.march}</span></p>
      </div>
      
      <p className='mt-1 md:mt-4 text-sm md:text-base md:font-medium'>Exam Fee : {transmitData.examFee}</p>
      <p className='text-sm md:text-base md:font-medium'>Additional : {transmitData.additional}</p>
      <p className=' text-sm md:text-base md:font-medium'>Amount Due : {transmitData.totalAmountDue}</p>
      <p className=' text-sm md:text-base md:font-medium'>Amount Accepted : {transmitData.totalAmountAccepted}</p>
      <p className='text-sm md:text-base md:font-medium'>Amount Pending : {transmitData.amountPending}</p>
      {/* <p> : {feeData.}</p> */}
     
      
       <button className='mt-1 md:mt-5 bg-green-500 flex justify-center w-[100%] rounded-md ' onClick={()=>setViewFeeModal(false)}>Close</button>
    </div>
    </>
  )
}

export default FeeDetailModal