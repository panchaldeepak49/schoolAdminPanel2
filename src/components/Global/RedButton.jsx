import React from 'react'

const RedButton = ({buttonName,onClick}) => {
  return (
    <>
    <div className='py-1 sm:py-2 px-3 sm:px-6 bg-red-500 hover:bg-green-600 text-sm sm:text-base text-white rounded-md  cursor-pointer' onClick={onClick}>
        {buttonName}
    </div>
    </>
  )
}

export default RedButton