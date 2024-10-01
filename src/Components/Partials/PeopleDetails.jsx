import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncloadperson, removeperson } from '../../Store/actions/personActions';
import { Link, Navigate, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import Loading from './Loading';
import HorizontalCards from "./HorizontalCards";
import DropDown from './DropDown';

const PeopleDetails = () => {
  const {info} = useSelector((state)=>state.person)
  console.log(info)
  const{id} =  useParams()
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const[category,setcategory]= useState("movie");
  const {pathname} = useLocation()
  console.log(info)
  useEffect(()=>{
    dispatch(asyncloadperson(id))
  
  },[id]);
  
  return info ? (
    <div className='px-[10%] w-screen h-[150vh] flex flex-col bg-[#1F1E24]'>
      <nav className='h-[10vh] w-full text-zinc-100 flex gap-10  text-xl items-center'>
          <Link 
            onClick={()=>navigate(-1)} className=" hover:text-[#6556CD] ri-arrow-left-line"

          ></Link>

      </nav>
      <div className='w-full flex  '>
          <div className='w-[20%] '>
            <img className='shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] w-[35vh] object-cover' src={`https://image.tmdb.org/t/p/original/${info.details.profile_path }` } />
            
            <hr className='mt-10 mb-5 border-none h-[2px] bg-zinc-500'/>


            <div className='text-2xl flex gap-x-5 text-white'>
              
              <a target="_blank" href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}><i className="ri-global-line"></i></a>

              <a target="_blank" href={`https://www.facebook.com/${info.externalid.facebook_id}`}><i className="ri-facebook-fill"></i></a>


              <a target="_blank" href={`https://www.instagram.com/${info.externalid.instagram_id}`}><i className="ri-instagram-line"></i></a>
              
              <a target="_blank" href={`https://x.com/${info.externalid.twitter_id}`}><i className="ri-twitter-x-line"></i></a>

              
          </div>



          <h1 className='text-2xl text-zinc-400 font-semibold my-5'>Person Info</h1> 
          <h1 className='text-lg text-zinc-400 font-semibold '>Known For</h1>
          <h1 className=' text-zinc-400  '>{info.details.known_for_department}</h1>


          <h1 className='text-lg text-zinc-400 font-semibold '>Gender</h1>
          <h1 className=' text-zinc-400  '>{info.details.gender ===2 ?"Male":"Female"}</h1>

          <h1 className='text-lg text-zinc-400 font-semibold '>Birthday</h1>
          <h1 className=' text-zinc-400  '>{info.details.birthday}</h1>


          <h1 className='text-lg text-zinc-400 font-semibold '>Death Day</h1>
          <h1 className=' text-zinc-400  '>{info.details.deathday?info.details.deathday:"Still Alive"}</h1>

          <h1 className='text-lg text-zinc-400 font-semibold '>Place Of Birth</h1>
          <h1 className=' text-zinc-400  '>{info.details.place_of_birth}</h1>

          <h1 className='text-lg text-zinc-400 font-semibold '>Also Known As</h1>
          <h1 className=' text-zinc-400  '>{info.details.also_known_as.join(",")}</h1>


















       
          </div>

          <div className='w-[80%] ml-[5%] '>
            <h1 className='text-6xl text-zinc-400 font-black my-5'>{info.details.name}</h1> 
            <h1 className='text-xl text-zinc-400 font-semibold '>Biography</h1>
            <p className='text-zinc-400 mt-3'>{info.details.biography}</p>

            <h1 className=' mt-5 text-lg text-zinc-400 font-semibold '>Known For</h1>
            <HorizontalCards data={info.combinedCredits.cast} />

            <div className='mt-5 w-full flex justify-between '>
              <h1 className='text-xl text-zinc-400 font-semibold '>Acting</h1>
              <DropDown title="Category" options={["tv","movie"]} func={(e)=>setcategory(e.target.value)}/>

            </div>

            <div className='list-disk bg-zinc text-zinc-400 w-full mt-2 h-[50vh] overflow-x-hidden shadow-xl border-2 border-zinc-700 shadow-white p-5'>


              {info[category+"Credits"].cast.map((c,i)=>
              <li key={i} className=' hover:text-white duration-300 cursor-pointer'>
              <Link  to={`/${category}/details/${c.id}`} className=''>
                <p className='inline'>{c.name||c.title||c.original_name||c.original_title}</p>



                <span className='block ml-5'>
                
                {c.character && `Character Name: ${c.character}`}</span>
              </Link>
              </li>)}
              
            </div>
          </div>
          
      </div>



    </div>
  ):<Loading/>
}

export default PeopleDetails