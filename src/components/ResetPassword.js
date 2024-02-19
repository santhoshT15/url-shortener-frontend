import React, { useState } from 'react'
import Base from '../base/Base'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../logo/url.png'
function ResetPassword() {
    const {token} = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleResetPassword = async()=>{
        const resetPassword ={
            password,
            confirmPassword
        }
        const response = await fetch(`https://url-shortener-lev5.onrender.com/users/reset/password/${token}`,{
            method:'POST',
            body:JSON.stringify(resetPassword),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const data = await response.json();
        console.log(data)
        if(data.message){
            toast(data.message, {
              type: 'success',
              position: toast.POSITION.TOP_CENTER, 
          })
            localStorage.setItem("token",data.token)
            navigate("/")
            return;
          }else{
            toast(data.error, {
              position: toast.POSITION.TOP_CENTER,
              type: 'error',
             
          })
    }
}

  return (
    <Base>
         <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 loginpage" >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto logo"
            src={logo}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Password Reset
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                New Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="text"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  style={{paddingLeft:'0.7rem', fontFamily:'monospace',fontSize:'0.9rem'}}
                  autoComplete="current-email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirm password"
                  name="confirm password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e)=>setConfirmPassword(e.target.value)}
                  style={{paddingLeft:'0.7rem', fontFamily:'monospace',fontSize:'0.9rem'}}
                  autoComplete="current-email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className='login-btn'>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleResetPassword}
              >
                Sumbit
              </button>
            </div>

        </div>
      </div>
    </Base>
  )
}

export default ResetPassword