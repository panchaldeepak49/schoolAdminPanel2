import React from 'react'

const MyButton = ({buttonName,color,onClick}) => {
    
  return (
    <>
     <button className={`px-3 py-1 rounded-md font-semibold border border-${color} text-${color} hover:text-white hover:bg-${color}`} onClick={onClick}>{buttonName}</button>
    </>
  )
}

export default MyButton