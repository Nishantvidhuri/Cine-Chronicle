import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

function SideNav() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Toggle function to open/close the sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Close the sidebar when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger Icon for mobile, only visible when sidebar is closed */}
      {!isOpen && (
        <button 
          className='md:hidden text-white text-3xl p-5 fixed top-0 left-0 z-30 focus:outline-none' 
          onClick={toggleSidebar}
        >
          <i className="ri-menu-line"></i>
        </button>
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef} // Attach the ref to the sidebar
        className={`fixed top-0 left-0 w-[80%] md:w-[20%] h-[100vh] bg-zinc-900 border-r-2 border-zinc-500 p-5 md:p-10 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-20`}
      >
        <h1 className='text-2xl text-white font-bold flex items-center'>
          <i className="text-[#6556CD] mr-2 ri-tv-fill"></i>
          <span>CineChronicle</span>
        </h1>

        <nav className='flex flex-col text-zinc-400 text-xl'>
          <h1 className='text-white font-semibold text-xl mt-10 mb-5'>
            New Feeds
          </h1>
          <Link to="/trending" className='hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 flex items-center gap-3 p-3 md:p-5' onClick={() => setIsOpen(false)}>
            <i className="ri-fire-fill"></i>
            Trending
          </Link>
          <Link to='/popular' className='hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 flex items-center gap-3 p-3 md:p-5' onClick={() => setIsOpen(false)}>
            <i className="ri-earth-fill"></i>
            Popular
          </Link>
          <Link to="/movies" className='hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 flex items-center gap-3 p-3 md:p-5' onClick={() => setIsOpen(false)}>
            <i className="ri-film-fill"></i>
            Movies
          </Link>
          <Link to="/tv_shows" className='hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 flex items-center gap-3 p-3 md:p-5' onClick={() => setIsOpen(false)}>
            <i className="ri-tv-2-line"></i>
            Tv Shows
          </Link>
          <Link to="/people" className='hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 flex items-center gap-3 p-3 md:p-5' onClick={() => setIsOpen(false)}>
            <i className="ri-user-3-fill"></i>
            People
          </Link>
        </nav>

        <hr className='border-none h-[1px] bg-zinc-400 my-5' />

        <nav className='flex flex-col text-zinc-400 text-xl'>
          <h1 className='text-white font-semibold text-xl mt-10 mb-5'>
            Website Information
          </h1>
          <Link to="/about" className='hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 flex items-center gap-3 p-3 md:p-5' onClick={() => setIsOpen(false)}>
            <i className="mr-2 ri-information-fill"></i>
            About CineChronicle
          </Link>
          <Link to="/contact" className='hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 flex items-center gap-3 p-3 md:p-5' onClick={() => setIsOpen(false)}>
            <i className="mr-2 ri-customer-service-fill"></i>
            Contact Us
          </Link>
        </nav>
      </div>

      {/* Overlay for mobile when the sidebar is open */}
      {isOpen && (
        <div className='fixed inset-0 bg-black opacity-50 z-10' onClick={toggleSidebar}></div>
      )}
    </>
  );
}

export default SideNav;
