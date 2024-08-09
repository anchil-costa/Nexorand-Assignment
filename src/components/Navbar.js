import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { Link, useLocation } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'


const Navbar = () => {
    const location= useLocation();
    const token = localStorage.getItem('jwtToken');
    const user = token ? jwtDecode(token) : null;


    if(location.pathname === '/signup'){
        return null;
    }

else
{

  return (
    <div className='flex fixed h-[135.6px] w-[1519.2px] pt-[48px] pr-[96px] pl-[96px]'>
    <div className='flex h-[87.6px] w-[1359.2px] bg-white rounded-full p-[12px] justify-between items-center'>
        <div className=' flex'>
            <div className='flex pt-[8px] pr-[8px] pb-[8px] pl-[32px] space-x-16'>
                <div className='flex items-center justify-center'>
                  <Link to='/'><img src={logo} alt='logo'/></Link>
                </div>
                <div className=' flex items-center'>
                    <ul className=' flex  text-[#676B5F] font-semibold text-[15px] font-sans hover:cursor-pointer '>
                        <li className='hover:bg-[#EFF0EC] px-[16px] py-[11px] rounded-lg'>Templates</li>
                        <li className='hover:bg-[#EFF0EC] px-[16px] py-[11px] rounded-lg'>Marketplace</li>
                        <li className='hover:bg-[#EFF0EC] px-[16px] py-[11px] rounded-lg'>Discover</li>
                        <li className='hover:bg-[#EFF0EC] px-[16px] py-[11px] rounded-lg'>Pricing</li>
                        <li className='hover:bg-[#EFF0EC] px-[16px] py-[11px] rounded-lg'>Learn</li>
                        <li className='hover:bg-[#EFF0EC] px-[16px] py-[11px] rounded-lg'>Search</li>
                    </ul>
                </div>
            </div>
            
        </div>
        { user ? (
            <div><p>{user.email}</p></div>
        ):(
        <div className=' flex h-[62px] w-[263.11px] justify-between'>
                <button className=' w-[102.69px] h-[62px] bg-[#EFF0EC] rounded-lg text-[16px] text-[#1E2330 font-extrabold] '>Log in</button>
                <Link to='/signup'><button className='w-[152.43px] h-[62px] bg-[#1E2330] rounded-full text-white text-[16px] font-bold'>Sign up free</button></Link>
            </div>
        )
}
    </div>
    </div>
  )
}
}

export default Navbar