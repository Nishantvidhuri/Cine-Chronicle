import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NotFound from './NotFound';

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);
  console.log(ytvideo);

  // useEffect to disable and enable scrolling
  useEffect(() => {
    // Disable scrolling when the component mounts
    document.body.style.overflow = 'hidden';

    // Enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className='absolute bg-[rgb(0,0,0,0.9)] z-[100] top-0 left-0 w-screen h-screen flex items-center justify-center overflow-hidden'>
      <Link
        onClick={() => navigate(-1)}
        className="hover:text-[#6556CD] absolute ri-close-large-line text-3xl z-[1000] text-white right-[5%] top-[5%]"
      ></Link>

      {ytvideo ? (
        <ReactPlayer
          height="100%"  // Full height of the container
          width="100%"   // Full width of the container
          controls
          url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
          style={{
            maxWidth: '800px',  // Limit max width for larger screens
            maxHeight: '450px', // Limit max height for larger screens
          }}
        />
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default Trailer;
