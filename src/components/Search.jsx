import React,{ useState, useEffect } from 'react';
import searchImg from '/Images/search.png'
import sortImg from '/Images/sort.png'
import questionImg from '/Images/question.svg'
import pushNotifImg from '/Images/pushnotifig.svg'
import profileImg1 from '../assets/Images/Icon.png'
// import ProfileModal from './ProfileModal'
import Tricolor from '../assets/Images/tricolor.png'
import { FaChevronDown } from "react-icons/fa";

const Search = ({searchText, handleSearch}) => {
   
    const [showProfile,setShowProfile] = useState(false);
    const [user,setUser] = useState('');
    
    useEffect(() => {
        const storedUser = localStorage.getItem('school');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }, []);

    const droppDown = ()=>{  
        //setShowProfile(true);
       setShowProfile((prevShowProfile) => !prevShowProfile);
     }

  return (
    <>
    <div className='flex justify-evenly items-center mt-4'>
    <div className='flex items-center w-[25rem] ml-24 border-2 rounded-xl ' >
      <img src={searchImg} className='w-5 h-4 ml-2'></img>
    <input type='text' placeholder='search' className='w-[84%] outline-none py-1 ml-2'
     value={searchText} onChange={handleSearch}></input>
     <img src={sortImg} className='w-5 h-4'></img>
    </div> 

    <div className='ml-10 flex gap-5 items-center'>
      <img src={questionImg} className='w-5' alt='question'/>
      <img src={Tricolor} className=' w-5' alt='missing' />
      <img src={pushNotifImg} alt='push'/>
    </div>

    <div className=' ml-10 flex gap-5 items-center'>
      <img src={profileImg1} className='w-6' alt='missing'></img>
      <p className='text-sm'>{user}</p>
      {/* <img src={dropDownImg} className='w-3 h-2 cursor-pointer' alt='missing' onClick={()=>droppDown()}></img> */}
      <FaChevronDown className='cursor-pointer' onClick={()=>droppDown()} />
    </div>
    {/* { showProfile && <ProfileModal setShowProfile={setShowProfile}/>}   */}
    </div>
   
    </>
  )
}

export default Search