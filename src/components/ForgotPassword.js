import React, { useState } from 'react'
import Base from '../base/Base'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import logo from '../logo/url.png'
function ForgotPassword() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleForgotPassword = async()=>{
        const userEmail={
        email
    }
    const response = await fetch('https://url-shortener-lev5.onrender.com/users/forgot/password',{
          method:'POST',
          body:JSON.stringify(userEmail),
          headers:{
            'Content-Type':'application/json'
          }
        })
        const data = await response.json();

        if(data.message){
          toast(data.message, {
            type: 'success',
            position: toast.POSITION.TOP_CENTER,
        })
        navigate('/')

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
            Forgot Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Enter your register email address we'll send you a link to get back into your account.
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
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
                onClick={handleForgotPassword }
              >
                Submit
              </button>
            </div>
          

          <p className="mt-10 text-center text-sm text-gray-900">
            Back to {' '}
            <Link to="/signup" >
             <b style={{color:"#4F46E5"}}>Sign Up</b> </Link> 
            
          </p>
        </div>
      </div>
   </Base>
  )
}

export default ForgotPassword