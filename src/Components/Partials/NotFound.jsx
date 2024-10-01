import React from 'react'
import notFound from "../../../public/404.webp";
const NotFound = () => {
  return (
    <div className='absolute bg-black z-[100] top-0 left-0 w-screen h-screen flex items-center justify-center overflow-hidden  '>
        <img className='' src={notFound}/>
    </div>
  )
}

export default NotFound