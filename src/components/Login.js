
import React, { useState } from 'react'
import logo from '../logo/url.png'
import Base from '../base/Base'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
//toast.configure();


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const handleLogin = async()=>{
    const userDetails = {
      email,
      password
    }
    const response = await fetch("https://url-shortener-lev5.onrender.com/users/login",{
      method:'POST',
      body:JSON.stringify(userDetails),
      headers:{
        "Content-Type":"application/json"
      }
    })
    const data = await response.json();
    if(data.token){
      toast(data.message,{
        type:"success",
        //position: "bottom-right"
      })
      console.log(data.message)
      localStorage.setItem('token', data.token);
      localStorage.setItem('id', data.user._id);
      console.log(data.user)
      navigate('/dashboard')
    }else{
      toast(data.message,{
        type:'error',
        //position:"bottom-center"
      })
      console.log(data.message)
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
            Log in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
         <div className='login'>
            <div>
              <label htmlFor="email" className="block text-md font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={((e)=>setEmail(e.target.value))}
                  style={{paddingLeft:'0.7rem', fontFamily:'monospace',fontSize:'0.9rem'}}
                  autoComplete="current-email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className='password-txt'>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-md font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                <Link to="/forgot/password" >
             <b style={{color:"#4F46E5"}}>Forgot Password</b> </Link> 
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  style={{paddingLeft:'0.7rem', fontFamily:'monospace',fontSize:'0.9rem'}}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className='login-btn'>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleLogin}
              >
                Login
              </button>
              <ToastContainer  position="bottom-right"/>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-900">
          Don't have an account?{' '}
           <Link to="/signup" >
             <b style={{color:"#4F46E5"}}>Sign Up</b> </Link> 
            
          </p>
        </div>
      </div>
     
    </Base>
  )
}

export default Login