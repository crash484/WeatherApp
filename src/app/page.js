"use client";
import Image from "next/image";
import axios from "axios";
import dotenv from 'dotenv'
import { useState } from "react";
import {BsSearch} from 'react-icons/bs'
import Weather from '../../components/Weather'
import Spinner from '../../components/Spinner'



export default function Home() {
  dotenv.config();

  const [city,setCity]=useState('');
  const [weather,setWeather]= useState({});
  const [loading , setLoading]= useState(false);


  const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_API_KEY}`;

  const fetchWeather=  (e)=>{
    e.preventDefault();
    setLoading(true);
    axios.get(url).then((response)=>{
        setWeather(response.data);
    })
    setCity('');
    setLoading(false);
  }



    return (
      <div>
   {/*overlay*/}
     <div className="absolute h-max top-0 left-0 right-0 bottom-0 bg-black/40 z-[1]"/>  
   {/*Background image*/}
       <Image 
       src='https://images.unsplash.com/photo-1463957602136-f76240540eb5?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
       fill
       className="object-cover"
       alt="Image"
       />
   
       {/* Search*/}
       <div className='relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 px-4 text-white z-10'>
       <form 
            onSubmit={fetchWeather} 
            className="flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-gray rounded-2xl">
       <div>
         <input 
         onChange={(e)=>{setCity(e.target.value)
         }}
         className='bg-transparent border-none text-white focus:outline-none text-2xl p-2'
         type='text'
         placeholder='Search city'
         />
       </div>
       <button onClick={fetchWeather}>
         <BsSearch size={20} />
       </button>
     </form>
   </div>
   
   {/*weather */}
         {weather.main && <Weather data={weather}/>}
   
      </div>
     );
   }
   
  

  