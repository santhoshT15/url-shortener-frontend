import React, { useState } from 'react'
import Base from '../base/Base'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from '../logo/url.png'
function Signup() {
 const [firstName, setFirstName] = useState('');
 const [lastName, setLastName] = useState('');
 const [email,setEmail] = useState('');
 const [password, setPassword] = useState('')
 const navigate = useNavigate();
 const handleLogin= async()=>{
    
    const newUser = {
        firstName,
        lastName,
        email,
        password
    }
    const response = await fetch("https://url-shortener-lev5.onrender.com/users/signup",{
        method:'POST',
        body:JSON.stringify(newUser),
        headers:{
            'Content-Type':'application/json'
        }
    })
    const data = await response.json();
    console.log(data)
    if(data.token){
        toast.success(data.message,{
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          
        })
        console.log(data.message)
        localStorage.setItem('token', data.token)
        navigate('/')
    }else{
        toast.error(data.message,{
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          
        })
        console.log(data.message)
    }

 }

  return (
   <Base>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-20 w-auto logo"
              src={logo}
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create new account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
           
            <div>
                <label htmlFor="name" className="block text-md font-medium leading-6 text-gray-900">
                 First Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={firstName}
                    onChange={(e)=>setFirstName(e.target.value)}
                    style={{paddingLeft:'0.7rem', fontFamily:'monospace',fontSize:'0.9rem'}}
                    autoComplete="current-name"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="name" className="block text-md font-medium leading-6 text-gray-900">
                 Last Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={lastName}
                    onChange={(e)=>setLastName(e.target.value)}
                    style={{paddingLeft:'0.7rem', fontFamily:'monospace',fontSize:'0.9rem'}}
                    autoComplete="current-name"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div className="password-txt">
                <label htmlFor="email" className="block text-md font-medium leading-6 text-gray-900">
                  Email address
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
  
              <div className="password-txt">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-md font-medium leading-6 text-gray-900">
                    Password
                  </label>
                 
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
  
              <div className="login-btn">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                 onClick={handleLogin}
                >
                  Sign up
                </button>
                <ToastContainer />
              </div>
  
            <p className="mt-10 text-center text-sm text-gray-500">
            Have an account?{' '}
            <Link to="/" >
             <b style={{color:"#4F46E5"}}>Log in</b> </Link> 
            </p>
          </div>
        </div>
   </Base>
  )
}

export default Signup