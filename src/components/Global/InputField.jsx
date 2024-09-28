import React from 'react'

const InputField = ({type,placeholder,value,onChange}) => {
  return (
    <>
    <input type={type} placeholder={placeholder} className='pl-2 py-1 outline-none border border-gray-300 rounded-md'
    value={value}  onChange={onChange} />
    </>
  )
}

export default InputField