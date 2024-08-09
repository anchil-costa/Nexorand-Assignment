import React, {  useState } from 'react'
import Logo from '../assets/logo2.png'
import { Link } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import { ImAppleinc } from "react-icons/im";
import signup_img from '../assets/signup banner.png'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate= useNavigate();
  const[email,setEmail]= useState('');
  const[password,setPassword] = useState('');



const handleSubmit = async (e) =>{
  const userData = {
   email,
   password
  };


  try{
    const response = await axios.post('http://localhost:5000/signup',userData)

    const {token}= response.data;

    localStorage.setItem('jwtToken', token);

    const user= getUserDetails();
    if(user){
      console.log(`Logged in as: ${user.email}`)

    }

    alert('Signup Success', response.data.message)
    navigate('/')


    


  }
  catch(error){
    console.error('Registration Fail:', error);
  }

}

const getUserDetails=()=>{
  const token = localStorage.getItem('jwtToken');

  if (token) {
    try {
        const userDetails = jwtDecode(token);
        console.log('User details:', userDetails);
        return userDetails;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}

return null;
}

  return (
    <div className='flex'>
        <div className='flex w-[736px] h-[856.5px]'>
            <div className='flex w-[736px] h-[856.5px] px-[48px] pt-[48px] pb-[12px] flex-col'>
            <div className='flex'>
                  <Link to='/'><img src={Logo} alt='logo'/></Link>
                </div>
                <div className='flex flex-col w-[640px] h-[796.5px] px-[24px] pt-[96px] pb-[24px]'>
                    <div className='flex flex-col justify-center items-center mb-[48px]'><h1 className='text-[48px] font-extrabold mb-[16px]'>Join Linktree</h1>
                    <div><p className='text-[#676B5F]'>Sign up for free!</p></div>
                    </div>
                    <div className='flex flex-col'>
                      <div><input className='h-[51.2px] w-full bg-[#F6F7F5] py-[16px] px-[16px] rounded-lg' type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email'/></div>
                      <div className='mt-3'><input className='h-[51.2px] w-full bg-[#F6F7F5] py-[16px] px-[16px] rounded-lg text-[black]' type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'/></div>
                      <div className='mt-[50px]'><button className='w-full h-[48px] bg-[#2665D6] rounded-full text-white text-[16px] font-bold' onClick={handleSubmit}>Create Account</button></div>
                      <div className='flex pt-[24px] w-full h-auto'><p className='text-[14px] text-[#676B5F]'>By clicking Create account, you agree to Linktree's privacy notice, T&Cs and to receive offers, news and updates.</p></div>
                      <div className=' flex flex-col w-full h-[168px]'>
                        <div className='flex justify-center items-center my-[12px]'><p className='text-[#676B5F] text-[16px]'>OR</p></div>
                        <div className='flex '><button className=' flex justify-center items-center w-full h-[48px] mb-[12px]  rounded-full  text-[16px] font-bold border'><div className='mr-[8px]'><FcGoogle size={24} /></div> <div>Sign up with Google</div></button></div>
                        <div className='flex '><button className=' flex justify-center items-center w-full h-[48px] mb-[12px]  rounded-full  text-[16px] font-bold border'><div className='mr-[8px]'><ImAppleinc size={24} /></div> <div>Sign up with Apple</div></button></div>
                      </div>
                      <div className='flex mt-[32px] justify-center items-center'><p className='text-[14px] text-[#676B5F]'>Already have an account? Log in</p></div>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex w-[783.2px] h-[856.5px]'>
          <img className='w-full h-full' src={signup_img} alt='banner' />
        </div>
    </div>
  )
}

export default Signup