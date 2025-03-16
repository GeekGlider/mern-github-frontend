import React from 'react'
import { FaHeart } from "react-icons/fa";
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

function LikeProfile({userProfile}) {
    const {authUser} = useAuthContext();
    const isOwnProfile = authUser?.username === userProfile.login;
 const handleLikeProfile = async()=>{
    // const url = `http://localhost:5000/api/users/like/${userProfile.login}`;
    // console.log('Requesting URL:', url);

    try {
        const res = await fetch(`https://mern-github-backend.onrender.com/api/users/like/${userProfile.login}` , {
            method : "POST",
            credentials : 'include',
        });
        const data = await res.json();
        toast.success(data.message);
    } catch (error) {
        toast.error(error.message);
    }
    
 };   
 if (!authUser || isOwnProfile) return null;
  return (

   <button className='p-2 text-xs w-full font-medium rounded-md bg-glass border border-blue-400 flex items-center gap-2'
    onClick={handleLikeProfile} >
    <FaHeart size={16} /> Like Profile
   </button>
  )
}

export default LikeProfile;