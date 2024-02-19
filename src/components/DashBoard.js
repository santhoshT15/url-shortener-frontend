import React, { useEffect, useState } from 'react'
import axios from "axios";
import Swal from 'sweetalert2';
import Base from '../base/Base'
import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { UilTrashAlt } from '@iconscout/react-unicons'

function Home() {
    const [longUrl, setLongurl] = useState("")
    const [urls, setUrls] = useState([])
    const [data,setData] = useState({})
    //Alert function;
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    const getUrl = async () => {
         try {
            let x = window.localStorage.getItem("id")
            let v = await axios.get(`https://url-shortener-lev5.onrender.com/allUrl/${x}`,{
                headers: {
                  authorization: window.localStorage.getItem("token")
                }});
                const { data } = v;
                const { message, statusCode ,urls} = data
                console.log(data)
                if (statusCode === 200) {
                    setUrls(urls)
                }
                else {                   
                    setData({message})
                
                }

         } catch (error) {
            console.log(error);
         }
    }

    useEffect(() => {
        getUrl()
    }, [])


    const handleDelete = async (id) => {
        try {

            
            let v = await axios.delete(`https://url-shortener-lev5.onrender.com/delete/${id}`,{
                headers: {
                  authorization: window.localStorage.getItem("token")
                }});
            const { data } = v;
            const { message, statusCode } = data
            if (statusCode === 200) {
                getUrl()
                Toast.fire({ icon: 'success', title: message })
            }
             else if(statusCode === 401){
                setData({message})
            }
            else {
                
                Toast.fire({ icon: 'error', title: message })

            }
        } catch (error) {
            console.log(error);
        }

    }

    const handleUrl = async (e) => {
       
        e.preventDefault()
        try {
    
            let v = await axios.post(`https://url-shortener-lev5.onrender.com/createUrl`, {
                id : window.localStorage.getItem("id"),
                longUrl},
                {
                headers: {
                  authorization: window.localStorage.getItem("token")}
                 });
            const {data} =v
            const { message, statusCode } = data
            if (statusCode === 201) {
                getUrl()
                setLongurl("")
                Toast.fire({ icon: 'success', title: message })

            } else if (statusCode === 400) {
                Toast.fire({ icon: 'warning', title: message })
            }
            else if(statusCode === 401){   
              Toast.fire({ icon: 'error', title: message })
            }
            else {
                
                Toast.fire({ icon: 'error', title: message })
            }

        } catch (error) {
            console.log(error);
        }

    }

    return (
      <Base>
       <div className='url-dashboard'>
        <div>
        <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl"  style={{fontFamily:'monospace'}}>URL-Shortener</h2>
            <p className="mt-4 text-lg leading-8 text-gray-300"
            style={{fontFamily:"monospace",fontSize:'1rem'}}
            >
            Enter Your Long URL Here and Get a Short, Shareable Link!
            </p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">
               Long url
              </label>
              <input
                id="email-address"
                style={{fontFamily:'monospace'}}
                name="text"
                type="text"
                value={longUrl} 
                onChange={(e) => setLongurl(e.target.value)}
                required
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                placeholder="Enter your long url... "
              />
              <button
                type="submit"
                style={{fontFamily:'monospace'}}
                onClick={handleUrl}
                className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Shorten URL
              </button>
            </div>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <CalendarDaysIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <dt className="mt-4 font-semibold text-white"  style={{fontFamily:'monospace',fontSize:'1.3rem'}}>Unlimited Shortening</dt>
              <dd className="mt-2 leading-7 text-gray-400"
              style={{fontFamily:"monospace"}}>
              Unleash the Power of Unlimited Shortening, Shorten URLs Every Day, Without Limits.!!
              </dd>
            </div>
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <HandRaisedIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <dt className="mt-4 font-semibold text-white"  style={{fontFamily:'monospace', fontSize:'1.3rem'}}>No spam</dt>
              <dd className="mt-2 leading-7 text-gray-400"
              style={{fontFamily:"monospace"}}
              >
              Link Shortening Magic: No Limits, No Spam, Just Pure Awesomeness!!
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
        <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
        </div>
        <div className='user-table'>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className='heading'>
            <TableCell style={{color:'white',fontFamily:'monospace'}}>S.No</TableCell>
            <TableCell style={{color:'white',fontFamily:'monospace'}} >Long URL</TableCell>
            <TableCell style={{color:'white',fontFamily:'monospace'}} >Short URL</TableCell>
            <TableCell style={{color:'white',fontFamily:'monospace'}} >Total Click</TableCell>
            <TableCell style={{color:'white',fontFamily:'monospace'}} >Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {urls.length > 0 && urls ? (urls.length > 0 && urls.map((item,index) => {
            return <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index+1}
              </TableCell>

              <TableCell >
                <a href={item.longUrl} target="_blank" rel="noopener noreferrer" style={{fontFamily:'monospace'}}>{item.longUrl}</a>
              </TableCell>
              
              <TableCell style={{color:'rgb(36,164,242)',fontFamily:"monospace"}} > 
                <a href={`https://url-shortener-lev5.onrender.com/shortUrl/${item.shortUrl}`} 
                  target="_blank" 
                  rel="noopener noreferrer">{item.shortUrl}
                </a>
              </TableCell>

              <TableCell align='center' style={{fontFamily:'monospace'}}>{item.clickCount}</TableCell>

              <TableCell>
                <button type="button" 
                onClick={() => handleDelete(item._id)}>< UilTrashAlt /></button>
              </TableCell>

            </TableRow>
        })) : (<div className= "message" > <h4 style={{color:'rgb(99,102,241)',fontFamily:'monospace'}}>Please provide the URL to continue...</h4> </div>)}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
        </div> 
      </Base>
    )
}

export default Home